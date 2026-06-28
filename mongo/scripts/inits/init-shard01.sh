
docker exec -i shard01-node mongosh <<EOF
rs.initiate(
    {
        _id: "rs-shard-01", 
        version: 1, 
        members: [ 
            { _id: 0, host : "shard01-node:27017" }, 
            { _id: 1, host : "shard01-secondary:27017" }, 
            { _id: 2, host : "shard01-arbiter:27017" },   
        ] 
    }
)
EOF
# docker exec -it shard01 mongosh --eval 'sh.enableSharding("test")'