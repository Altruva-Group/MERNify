#!/bin/bash

echo "Removing persisted data..."
docker volume rm $(docker volume ls -q | grep mongo) 2>/dev/null

echo "Removing unused networks..."
docker network prune -f

echo "MongoDB Clusters shut down and data removed."















# # Shut down all services (Mongodb)
# # remove all Mongodb Data
# echo "Removing MongoDB Data"
# docker exec -i configsvr01 bash -c "rm -rf /data/db/*"
# # docker exec -it configsvr02 bash -c 'rs.reconfig({ _id: "rs-config-server", version: 1, members: [] }, { force: true })'

# sleep 10
# echo "Shutting down all Config Servers..."
# docker exec -i configsvr01 mongosh <<EOF
# db.adminCommand({ shutdown: 1 })
# EOF

# sleep 5
# docker exec -i configsvr02 mongosh <<EOF
# db.adminCommand({ shutdown: 1 })
# EOF

# sleep 5
# docker exec -i configsvr03 mongosh <<EOF
# db.adminCommand({ shutdown: 1 })
# EOF
# # docker exec -it router mongosh --eval "db.shutdownServer()"
# # docker exec -it shard01a mongosh --eval "db.shutdownServer()"
# # docker exec -it shard01b mongosh --eval "db.shutdownServer()"
# # docker exec -it shard01c mongosh --eval "db.shutdownServer()"
