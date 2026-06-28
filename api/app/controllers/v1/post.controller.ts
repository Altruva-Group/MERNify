/** @format */

import { KAFKA_TOPICS, STATUS_CODES } from "@/constants";
import { errorHandlerWrapper } from "@/helpers";
// import { UserDocument } from "@/models";
import { Logs } from "@/monitoring";
import { ZodSchema } from "@/schemas";
import { KafkaProducer } from "@/streaming";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { postWorker } from "@/workers";
import crypto from "crypto";
import { getOrSetCache } from "@/cache";
import { v1Services } from "@/services";

const getPostHandler = asyncHandler(
    async (
        req: Request<ZodSchema.PostSchema.GetPostInput['params']>, 
        res: Response) => {
    try {
        const postId = req.params.postId as string;

        const result = await getOrSetCache(postId, () => v1Services.getPost({postId}));

        if (result) {
            if (result['errMessage']) {
                res.status(result['statusCode']).json({
                    success: false,
                    message: result['errMessage']
                });
                return;
            } else {
                res.status(STATUS_CODES.SUCCESS.OK).json({
                    success: true,
                    message: "Post Fetched",
                    data: result
                });
                return;
            }
        } else {
            res.status(STATUS_CODES.CLIENT_ERRORS.BAD_REQUEST).json({
                success: false,
                message: "Post Fetching Failed"
            });
            return;
        }

    } catch (error) {
        Logs.error("Get Post Error:", error);
        res.status(STATUS_CODES.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Server Error! Try again later"
        })
    }
})

const getPostsHandler = asyncHandler(
    async (
        req: Request<ZodSchema.PostSchema.GetPostsInput['params']>, 
        res: Response, next: NextFunction) => {
    try {
        const queryString = req.query;
        const userId = req.user.id;

        const results = await getOrSetCache(`${String(userId)}_posts`, () => postWorker("getPosts", {
            userId,
            queryString
        }));

        if (results) {
            if (results['errMessage']) {
                Logs.error("Get result Error:", results['errMessage'])
                res.status(results['statusCode']).json({
                    success: false,
                    message: results['errMessage']
                });
                return;
            } else {
                res.status(STATUS_CODES.SUCCESS.OK).json({
                    success: true,
                    message: "Posts Fetched",
                    data: results
                });
                return;
            }
        } else {
            Logs.error("Get result Error:", "Error Occurred");
            res.status(STATUS_CODES.CLIENT_ERRORS.BAD_REQUEST).json({
                success: false,
                message: "Error Occurred"
            });
            return;
        }

    } catch (error) {
        Logs.error("Get result Error:", error);
        res.status(STATUS_CODES.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Server Error! Please Try Again Later"
        })
    }
})

const createPostHandler = asyncHandler(
    async (
        req: Request<{}, {}, ZodSchema.PostSchema.CreatePostInput["body"]>, 
        res: Response, 
        next: NextFunction) => {
    try {
        const details = req.body;
        const userId = req.user.id;

        const correlationId = crypto.randomUUID();

        await KafkaProducer(KAFKA_TOPICS.CREATE_POST, {
            serviceName: 'createPost', 
            correlationId,
            payload: {
                userId, 
                details
            }
        });

         // return 'accepted' with reference id and link
         res.status(202).json({
            message: "Creating post in progress",
            correlationId,
            statusUrl: `/api/v1/streaming/status/${correlationId}`
        });
    } catch (error) {
        Logs.error("Create Post Error:", error);
        res.status(STATUS_CODES.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Server Error! Try Again Later"
        })
    }
})

const updatePostHandler = asyncHandler(
    async (
        req: Request<ZodSchema.PostSchema.UpdatePostInput['params'], {}, ZodSchema.PostSchema.UpdatePostInput['body']>, 
        res: Response, 
        next: NextFunction) => {
    try {
        const postId = req.params;
        const details = req.body;
        const userId = req.user.id;

        const correlationId = crypto.randomUUID();
        
        await KafkaProducer(KAFKA_TOPICS.UPDATE_POST, {
            serviceName: 'updatePost', 
            correlationId,
            payload: {
                userId, 
                postId,
                details
            }
        });

        // return 'accepted' with reference id and link
        res.status(202).json({
            message: "Updating post in progress",
            correlationId,
            statusUrl: `/api/v1/streaming/status/${correlationId}`
        });
    } catch (error) {
        Logs.error("Update Post Error:", error);
        res.status(STATUS_CODES.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Server Error"
        })
    }
})

const deletePostHandler = asyncHandler(
    async (
        req: Request<ZodSchema.PostSchema.DeletePostInput['params']>, 
        res: Response, 
        next: NextFunction) => {
    try {
        const postId = req.params;
        const userId = req.user.id;

        const correlationId = crypto.randomUUID();

        await KafkaProducer(KAFKA_TOPICS.DELETE_POST, {
            serviceName: 'deletePost',
            correlationId,
            payload: { 
                userId, 
                postId 
            }
        });

        // return 'accepted' with reference id and link
        res.status(202).json({
            message: "Deleting post in progress",
            correlationId,
            statusUrl: `/api/v1/streaming/status/${correlationId}`
        });
    } catch (error) {
        Logs.error("Delete Post Error:", error);
        res.status(STATUS_CODES.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Server Error! Please Try Again Later"
        })
    }
})

const deletePostsHandler = asyncHandler(
    async (
        req: Request<ZodSchema.PostSchema.DeletePostInput['params']>, 
        res: Response, 
        next: NextFunction) => {
    try {
        const userId = req.user.id;

        const result = await postWorker('deletePosts', userId);

        if (result) {
            if (result['errMessage']) {
                res.status(result['statusCode']).json({
                    success: false,
                    message: result['errMessage']
                });
                return;
            } else {
                res.status(result['statusCode']).json({
                    success: true,
                    message: result['message'],
                });
                return;
            }
        } else {
            res.status(STATUS_CODES.CLIENT_ERRORS.BAD_REQUEST).json({
                success: false,
                message: "Error Occurred"
            });
            return;
        }

    } catch (error) {
        Logs.error("Delete result Error:", error);
        res.status(STATUS_CODES.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Server Error"
        })
    }
})

export const getPosts = errorHandlerWrapper(getPostsHandler);
export const createPost = errorHandlerWrapper(createPostHandler);
export const deletePosts = errorHandlerWrapper(deletePostsHandler);
export const getPost = errorHandlerWrapper(getPostHandler);
export const updatePost = errorHandlerWrapper(updatePostHandler);
export const deletePost = errorHandlerWrapper(deletePostHandler);
