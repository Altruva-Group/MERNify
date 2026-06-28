/** @format */

import { admin, consumer } from "./kafka";
import { addStreamingRecord } from "@/cache";
import { Logs } from "@/monitoring";
import { v1Services } from "@/services";

const run = async () => {
    try {
        await consumer.run({
            eachMessage: async ({ topic, message }) => {
                Logs.info("", "****************** Message Arrived In Consumer ******************");
                const topics = await admin.listTopics();
                if (!topics.includes(topic)) {
                    Logs.error("Received message for invalid topic:", topic);
                    return;
                }
                
                const { headers, key } = message;
                const value = JSON.parse(message.value.toString());

                Logs.info("Kafka Consumer message:", { topic, headers });

                const serviceName = headers?.serviceName?.toString();
                if (!serviceName || typeof v1Services[serviceName] !== 'function') {
                    Logs.error(`Service name not found or invalid:`, serviceName);
                    return;
                }

                try {
                    const response = await v1Services[serviceName](value);

                    // store response in cache
                    await addStreamingRecord(String(key), response);
                } catch (error) {
                    Logs.error("Error processing broadcasted message:", error);
                    return null;
                }
            }
        });
    } catch (error) {
        Logs.error("Error in Kafka consumer:", error);
    }
}

export default run;
