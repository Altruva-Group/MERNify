/** @format */


import { Document, model, Schema } from "mongoose";


export interface NotificationDocument extends Document {
    sender: string;
    recipients: string[];
    subject: string;
    body: string;
    reference: string;
}

const notificationSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        recipients: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        subject: {
            type: String,
        },
        body: {
            type: String,
        },
        reference: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const Notification = model<NotificationDocument>("Notification", notificationSchema);

export default Notification;