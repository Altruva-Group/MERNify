#!/bin/bash

set -e

# setup mongoDB Shards
# rebuild Mongodb Config Servers
echo "Rebuilding Mongodb Config Servers..."
bash ./mongo/scripts/inits/init-configserver.sh
echo "Config Servers successfully initiated."

echo "Waiting for 15 seconds..."
sleep 15

# configuring Mongodb Shard Servers
echo "Configuring Mongodb Shard Servers..."
bash ./mongo/scripts/inits/init-shard01.sh
bash ./mongo/scripts/inits/init-shard02.sh
bash ./mongo/scripts/inits/init-shard03.sh
echo "Mongodb Shard servers initiated."

echo "Waiting for 15 seconds..."
sleep 15

# # configuring Mongodb Router
echo "Configuring Mongodb Routers..."
bash ./mongo/scripts/inits/init-routers.sh
echo "MongoDB Routers successfully initialized with the Shard servers."


echo "All MongoDB Shards connected successfully!"


# rollback
rollback() {
    echo "Rolling back all setups due to error..."
    bash shutdown.sh
    echo "All services successfully rolled back."
    exit 1
}

trap rollback ERR