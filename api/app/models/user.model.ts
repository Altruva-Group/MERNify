/** @format */

import { Document, model, Schema } from "mongoose";
import validator from "validator";


export interface UserDocument extends Document {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password?: string;
    role: string;
    refreshToken?: string;
    refreshTokenExpiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            minLength: [2, "First name must be at least 2 characters long"],
            maxLength: [12, "First name must not be more than 12 characters long"],
            required: [true, "Firstname is required"]
        },
        lastname: {
            type: String,
            minLength: [2, "First name must be at least 2 characters long"],
            maxLength: [12, "First name must not be more than 12 characters long"],
            required: [true, "Lastname is required"]
        },
        username: {
            type: String,
            minLength: [2, "Username must be at least 2 characters long"],
            maxLength: [12, "Username must not be more than 12 characters long"],
            required: [true, "Username is required"],
            unique: [true, "Please choose another username"],
            // validate: validator
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Please use another email"],
            validate: validator.isEmail,
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        },
        refreshToken: {
            type: String,
        },
        refreshTokenExpiresAt: {
            type: Date,
        }
    },
    {
        timestamps: true
    }
)

const User = model<UserDocument>("User", userSchema);

export default User;