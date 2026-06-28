docker exec -i router01 mongosh --eval 'sh.addShard("rs-shard-01/shard01-node:27017")'
docker exec -i router01 mongosh --eval 'sh.addShard("rs-shard-02/shard02-node:27017")'
docker exec -i router01 mongosh --eval 'sh.addShard("rs-shard-03/shard03-node:27017")'

docker exec -i router02 mongosh --eval 'sh.addShard("rs-shard-01/shard01-node:27017")'
docker exec -i router02 mongosh --eval 'sh.addShard("rs-shard-02/shard02-node:27017")'
docker exec -i router02 mongosh --eval 'sh.addShard("rs-shard-03/shard03-node:27017")'
