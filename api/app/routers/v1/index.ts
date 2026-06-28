/** @format */


import authRouter from "./auth.router";
import userRouter from "./user.router";
import postRouter from "./post.router";
import commentRouter from "./comment.router";
import notificationRouter from "./notification.router";
import streamingRouter from "./streaming.router";
import { authMiddleware } from "@/middlewares";
import { Router } from "express";


const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/user", authMiddleware, userRouter);
v1Router.use("/post", authMiddleware, postRouter);
v1Router.use("/comment", authMiddleware, commentRouter);
v1Router.use("/notification", authMiddleware, notificationRouter);
v1Router.use("/streaming", authMiddleware, streamingRouter)


export default v1Router;