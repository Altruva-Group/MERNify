/** @format */

import { Logs } from "@/monitoring";
import { admin, producer } from "./kafka";

const run = async (topic: string, msg: any) => {
    if (msg) {
        try {
            // producing message
            await producer.send({
                topic,
                messages: [{ 
                    headers: { serviceName: msg.serviceName },
                    key: msg.correlationId,
                    value: JSON.stringify(msg.payload) 
                }]
            });
            Logs.success(`Message sent for topic:`, topic); // msg
        } catch (error) {
            Logs.error("Error in Kafka producer:", error);
        }
    }
}

export default run;