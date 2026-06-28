/** @format */


import { UserController } from "@/controllers";
import { adminMiddleware, authorizationMiddleware, ZodValidation } from "@/middlewares";
import { ZodSchema } from "@/schemas";
import { Router } from "express";


const userRouter = Router();

// get users :admin
userRouter.get("/all", adminMiddleware, UserController.getUsers);
// get user
userRouter.get("/:profileId", ZodValidation(ZodSchema.UserSchema.getUserSchema), UserController.getUser);
// update user 
userRouter.patch("/:profileId", authorizationMiddleware, UserController.updateUser);
// delete user
userRouter.delete("/:profileId", authorizationMiddleware, UserController.deleteUser);


export default userRouter;
