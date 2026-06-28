/** @format */
import { Kafka, Partitioners } from "kafkajs";
import { Logs } from "../../monitoring";
import { KAFKA_TOPICS } from "@/constants";

const kafka = new Kafka({
    clientId: "MERN_TEMPLATE_API",
    brokers: ["kafka:9092"],
    retry: {
        initialRetryTime: 5000,
        retries: 10,
    },
});

const topics = Object.values(KAFKA_TOPICS);

export const admin = kafka.admin();
export const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
});
export const consumer = kafka.consumer({ groupId: "kafka" });

const initKafka = async () => {
    try {
        // connect admin and producer first
        await admin.connect();
        await producer.connect();
        Logs.success("Kafka", "Kafka Producer connected and ready to send messages.");

        Logs.info("Kafka Topics", "Creating Kafka topic...");
        const existingTopics = await admin.listTopics();
        const topicsToCreate = topics.filter((topic) => !existingTopics.includes(topic));

        if (topicsToCreate.length > 0) {
            await admin.createTopics({
                waitForLeaders: true,
                topics: topicsToCreate.map((topic) => ({ 
                    topic,
                    numPartitions: 1,
                    replicationFactor: 1,
                })),
            });
        }
        Logs.success("Kafka Topic", "Kafka topics created");

        // connect consumer and subscribe to the topic
        await consumer.connect();
        await consumer.subscribe({
            topics, // subscribe to all topics
            fromBeginning: true,
        });
        Logs.success("Kafka", "Kafka Consumer connected and listening...");
    } catch (error) {
        Logs.error("Kafka", `Kafka connections failed: ${error}`);
        process.exit(1);
    }
};

// Gracefully close Kafka on app shutdown
process.on("SIGINT", async () => {
    Logs.info("Kafka", "Shutting down Kafka...");
    await producer.disconnect();
    await consumer.disconnect();
    await admin.disconnect();
    Logs.success("Kafka", "Kafka successfully disconnected.");
    process.exit(0);
});

export default initKafka;
