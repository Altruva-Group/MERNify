/** @format */


import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Logs } from '@/monitoring';


dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        Logs.info("Connecting to DB", `Ongoing...`)
        const conn = await mongoose.connect(process.env.MONGODB_URI!);
        Logs.success("Connected to DB:", `Successfully connected to DB`)

        if (conn) {
            const db = mongoose.connection;

            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function() {
                console.log('DB connections successful');
                Logs.success("DB connection successful", `Server connected to DB.`);
            })
        }
    } catch (error) {
        Logs.error(
            "Connect DB Error:", 
            `Error connecting to MongoDB Database!`
        );
        Logs.error("Connect DB Error RAW:", error);
        process.exit(1); 
    }
}

export default connectDB;