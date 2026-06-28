#!/bin/bash

set e

echo "Complete Rebuilding of Project..."
bash ./shutdown.sh
sleep 10

echo "Pulling Images From Base"
echo "Pulling first wave..."
docker compose up -d --build shard01 shard01-secondary shard01-arbiter shard02 shard02-secondary shard02-arbiter shard03 shard03-secondary shard03-arbiter kafka zookeeper prometheus elasticsearch redis

echo "Waiting for 15 seconds..."
sleep 15

echo "Pulling second wave..."
docker compose up -d --build kafka kibana configsvr01 configsvr02 configsvr03 router01 router02

echo "Waiting for 2 minutes..."
sleep 120

echo "Pulling third wave..."
docker compose up -d --build logstash

echo "Waiting for 15 seconds..."
sleep 15

# check_kafka_status() {
#     echo "Checking Kafka service status..."
#     if ! docker compose exec kafka kafka-broker-api-versions --bootstrap-server kafka:9092; then
#         echo "Kafka service is not running. Exiting..."
#         exit 1
#     fi
#     echo "Kafka service is running."
# }

# check_kafka_topics() {
#     local retries=5
#     local count=0
#     local success=false

#     echo "Checking Kafka topics readiness..."
#     while [ $count -lt $retries ]; do
#         if docker compose exec kafka kafka-topics --bootstrap-server kafka:9092 --list; then
#             success=true
#             break
#         fi
#         echo "Kafka topics not ready, retrying in 10 seconds..."
#         sleep 10
#         count=$((count + 1))
#     done

#     if [ "$success" = false ]; then
#         echo "Kafka topics are not ready after $retries retries. Exiting..."
#         exit 1
#     fi
#     echo "Kafka topics are ready."
# }

# # Check Kafka service status
# check_kafka_status

# # Check Kafka topics readiness
# check_kafka_topics

sleep 20
# setup mongoDB Shards
bash ./mongo/scripts/startup/setup_mongodb_shards.sh

echo "Waiting for 5 minutes before starting APIs"
sleep 300
echo "Pulling fourth wave..."
docker compose up -d --build api01 api02

echo "Waiting for 15 seconds..."
sleep 15

echo "Pulling fifth wave..."
docker compose up -d --build client nginx

echo "All processes successfully completed. Happy Building!"


# sleep
# # Setup elasticsearch security

# # Setup Kibana security

# # Setup Logstash security

echo "All processes successfully completed. Happy Building!"


# rollback
rollback() {
    echo "Rolling back all setups due to error..."
    bash ./shutdown.sh
    echo "All services successfully rolled back."
    exit 1
}

trap rollback ERR
