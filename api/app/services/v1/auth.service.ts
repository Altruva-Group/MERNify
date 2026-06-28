/** @format */

import { UserDocument, UserModel } from "@/models";
import { Logs } from "@/monitoring";
import { ZodSchema } from "@/schemas";
import { GenerateToken } from "@/utils";
import { STATUS_CODES } from "@/constants";
import { omit } from "lodash";
import bcrypt from "bcryptjs";
import { updateCache } from "@/cache";


export const register = async ({
    firstname,
    lastname,
    username,
    email,
    password,
    role
}: ZodSchema.UserSchema.CreateUserInput["body"]): Promise<UserDocument | object | null> => {
    try {
        const foundUsername = await UserModel.findOne({ username });
        if (foundUsername) {
            return {
                statusCode: STATUS_CODES.CLIENT_ERRORS.BAD_REQUEST,
                errMessage: "Username already taken",
            };
        }
        const foundEmail = await UserModel.findOne({ email })
        if (foundEmail) return {
            statusCode: STATUS_CODES.CLIENT_ERRORS.BAD_REQUEST,
            errMessage: "Email already taken",
        };

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await UserModel.create({
            firstname,
            lastname,
            username,
            email,
            password: hashPassword,
            role: role
        })
        
        return {
            statusCode: STATUS_CODES.SUCCESS.CREATED,
            message: "Registration successful",
            data: omit(newUser.toJSON(), "password", "__v"),
        };
    } catch (error: any) {
        Logs.error("Register Service Error:", error);
        return null;
    }
}

export const login = async ({
    detail, password
}: ZodSchema.UserSchema.LoginUserInput["body"]): Promise<{ accessToken: string; user: UserDocument } | object | null> => {
    try {
        // console.log("Login service:", {detail})
        let foundUser = await UserModel.findOne({ username: detail });
        if (!foundUser) foundUser = await UserModel.findOne({ email: detail });

        if (!foundUser) {
            return {
                statusCode: STATUS_CODES.CLIENT_ERRORS.BAD_REQUEST,
                errMessage: "Account Not Found",
            };
        }

        const validatedUser = await bcrypt.compare(password, foundUser.password);

        if (!validatedUser) return {
            statusCode: STATUS_CODES.CLIENT_ERRORS.BAD_REQUEST,
            errMessage: "Invalid Login Details",
        }; 

        try {
            // generate tokens
            const accessToken = GenerateToken((foundUser._id as string), "access");
            const refreshToken = GenerateToken((foundUser._id as string), "refresh");

            foundUser.refreshToken = refreshToken;
            await foundUser.save();

            const user = omit(foundUser.toJSON(), "password", "__v");

            // await updateCache(user._id, user);

            return {accessToken, user}
        } catch (error) {
            Logs.error("Login Service Error - Client Error:", error);
            return {
                statusCode: STATUS_CODES.CLIENT_ERRORS.BAD_REQUEST,
                errMessage: "Error Occurred",
            }; 
        }
    } catch (error) {
        Logs.error("Login Service Error - Server Error:", error);
        return null;
    }
}