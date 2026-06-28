/** @format */


import dotenv from "dotenv";
import app from "../app";
import connectDB from "./database";
import { Logs, Metrics } from "@/monitoring";
import { InitKafka } from "@/streaming";
import { initRedis } from "@/globals";


dotenv.config();

const port = process.env.PORT || 5000;

const runServer = async () => {
    try {
        Logs.info("Server starting", "...");
        // start kafka processes (producer and consumer)
        await InitKafka();
        // Start Redis Server
        await initRedis();

        // app server
        app.listen(port, async () => {
            Logs.success(`Server running in ${process.env.DEV_MODE ? "Development" : "Production"} Mode on port -`, port);
        
            // connect db
            await connectDB();
        })

        // metrics server
        Metrics.startServerMetrics();
    } catch (error) {
        Logs.error("Run Server Error:", error);
    }
}

export default runServer;