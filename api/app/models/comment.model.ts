/** @format */

import { Document, model, Schema } from "mongoose";


export interface CommentDocument extends Document {
    user: string;
    body: string;
    reference: string;
}

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Author is required"]
        },
        body: {
            type: String,
            minLength: [2, "Comment body must be at least 2 characters long"],
            maxLength: [500, "Comment body must not be more than 500 characters long"],
            required: [true, "Comment body is required"]
        },
        reference: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const Comment = model<CommentDocument>("Comment", commentSchema);

export default Comment;