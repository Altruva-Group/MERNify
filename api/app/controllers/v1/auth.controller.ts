/** @format */


import { errorHandlerWrapper, Validators } from "@/helpers";
import { KafkaProducer } from "@/streaming";
import { KAFKA_TOPICS, STATUS_CODES } from "@/constants";
import { Logs } from "@/monitoring";
import { ZodSchema } from "@/schemas";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import { v1Services } from "@/services";


const registerUserHandler = asyncHandler(
    async (
        req: Request<{}, {}, ZodSchema.UserSchema.CreateUserInput["body"]>,
        res: Response
    ) => {
        try {
            // Logs.info("Reg User Handler", req.body)
            // joi validation // not needed for ts project // just poc
            const error = await Validators.ValidateUser(req.body);
            Logs.info("User Validator errors:", await error)
            if (error) {
                res.status(STATUS_CODES.CLIENT_ERRORS.BAD_REQUEST).json({
                    success: false,
                    message: ( error as any).details[0].message
                })
                return;
            }

            const { firstname, lastname, username, email, password } = req.body; // confirmPassword
            const correlationId = crypto.randomUUID();

            // send to kafka 
            await KafkaProducer(KAFKA_TOPICS.REGISTER_USER, {
                serviceName: 'register',                    
                correlationId,
                payload: { firstname, lastname, username, email, password, role: 'user' }
            });

            // return 'accepted' with reference id and link
            res.status(202).json({
                message: "Registration in progress",
                correlationId,
                statusUrl: `/api/v1/streaming/status/${correlationId}`
            });
        } catch (error: any) {
            Logs.error("Register User Ctrl Error:", error);

            res.status(STATUS_CODES.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Server Error! Try Again Later"
            })
        }
    }
);

const loginUserHandler = asyncHandler(
    async (
        req: Request<{}, {}, ZodSchema.UserSchema.LoginUserInput["body"]>,
        res: Response
    ) => {
        try {
            const { detail, password } = req.body;

            const result = await v1Services.login({ detail, password });

            if (result !== null) {
                if (result['errMessage']) {
                    res.status(result['statusCode']).json({
                        success: false,
                        message: result['errMessage']
                    });
                    return;
                } else {
                    res.status(STATUS_CODES.SUCCESS.OK).json({
                        success: true,
                        message: "Login Successful",
                        data: result,
                    })
                }
            } else {
                res.status(STATUS_CODES.CLIENT_ERRORS.BAD_REQUEST).json({
                    success: false,
                    message: "Login Failed"
                })
            }            
        } catch (error) {
            Logs.error("Login User Error:", error)
            res.status(STATUS_CODES.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Server Error! Try Again Later"
            })
        }
    }
)


export const register = errorHandlerWrapper(registerUserHandler);
export const login = errorHandlerWrapper(loginUserHandler);