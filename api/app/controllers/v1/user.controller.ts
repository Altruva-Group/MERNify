/** @format */


import { KAFKA_TOPICS, STATUS_CODES } from "@/constants";
import { errorHandlerWrapper, Validators } from "@/helpers";
import { Logs } from "@/monitoring";
import { ZodSchema } from "@/schemas";
import { KafkaProducer } from "@/streaming/kafka";
import { UpdateUserRequestType } from "@/types";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getOrSetCache } from "@/cache";
import { userWorker } from "@/workers";
import crypto from "crypto";
import { v1Services } from "@/services";


const getUserHandler = asyncHandler(
    async (
        req: Request<ZodSchema.UserSchema.GetUserInput["params"]>, 
        res: Response) => {
    try {
        const profileId = req.params.profileId as string;

        const result = await getOrSetCache(profileId, () => v1Services.getUser({profileId}));

        if (result !== null) {
            if (result['errMessage']) {
                res.status(result['statusCode']).json({
                    success: false,
                    message: result['errMessage'],
                })
                return;
            } else {
                res.status(STATUS_CODES.SUCCESS.OK).json({
                    success: true,
                    message: "User Profile Fetched",
                    data: result
                });
                return;
            } 
        } else {
            res.status(STATUS_CODES.CLIENT_ERRORS.BAD_REQUEST).json({
                success: false,
                message: "Fetch User Failed"
            });
            return;
        }
    } catch (error) {
        Logs.error("Get User Handler Error:", error);
        res.status(STATUS_CODES.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Server Error! Please Try Again Later"
        });  
        return;      
    }
})

const getUsersHandler = asyncHandler(
    async (
        req: Request, 
        res: Response) => {
    try {
        // const user = req.user;
        // if (user.role !== 'admin') {
        //     res.status(STATUS_CODES.CLIENT_ERRORS.UNAUTHORIZED).json({
        //         success: false,
        //         message: "Unauthorized"
        //     })
        // }

        const results = await getOrSetCache('users', () => userWorker("getUsers"));

        if (results) {
            if (results['errMessage']) {
                res.status(results['statusCode']).json({
                    success: false,
                    message: results['errMessage'],
                    data: [],
                });
                return;
            } else {
                res.status(STATUS_CODES.SUCCESS.OK).json({
                    success: true,
                    message: "Users Profile Fetched",
                    data: results
                });
                return;
            } 
        } else {
            res.status(STATUS_CODES.CLIENT_ERRORS.BAD_REQUEST).json({
                success: false,
                message: "Fetching Users Failed"
            });
            return;
        }
    } catch (error) {
        Logs.error("Get Users Handler Error:", error);
        res.status(STATUS_CODES.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Server Error! Please Try Again Later"
        });
        return;        
    }
})

const updateUserHandler = asyncHandler(
    async (
        req: Request<ZodSchema.UserSchema.UpdateUserInput["params"], {user: any}, UpdateUserRequestType>, 
        res: Response) => {
    try {
        const profileId = req.params;
        const details = req.body;

        const correlationId = crypto.randomUUID();

        await KafkaProducer(KAFKA_TOPICS.UPDATE_USER, {
            serviceName: 'updateUser',
            correlationId,
            payload: {
                profileId,
                details
            }
        });

        // return 'accepted' with reference id and link
        res.status(202).json({
            message: "Updating User Profile in progress",
            correlationId,
            statusUrl: `/api/v1/streaming/status/${correlationId}`
        });
    } catch (error) {
        Logs.error("Update User Ctrl Error:", error);
        res.status(STATUS_CODES.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Server Error! Please Try Again Later"
        })        
    }
})

const deleteUserHandler = asyncHandler(
    async (
        req: Request<ZodSchema.UserSchema.DeleteUserInput["params"]>, 
        res: Response) => {
    try {
        const profileId = req.params.profileId as string;

        const correlationId = crypto.randomUUID();

        KafkaProducer(KAFKA_TOPICS.DELETE_USER, {
            serviceName: 'deleteUser',
            correlationId,
            payload: profileId
        });

        // return 'accepted' with reference id and link
        res.status(202).json({
            message: "Deleting User Profile in progress",
            correlationId,
            statusUrl: `/api/v1/streaming/status/${correlationId}`
        });
    } catch (error) {
        Logs.error("Delete User Ctrl Error:", error);
        res.status(STATUS_CODES.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Server Error! Please Try Again Later"
        })        
    }
})


export const getUser    = errorHandlerWrapper(getUserHandler);
export const getUsers   = errorHandlerWrapper(getUsersHandler);
export const updateUser = errorHandlerWrapper(updateUserHandler);
export const deleteUser = errorHandlerWrapper(deleteUserHandler);