
docker exec -i shard02-node mongosh <<EOF
rs.initiate(
    { 
        _id: "rs-shard-02", 
        version: 1,
        members: [         
            { _id: 0, host : "shard02-node:27017" },         
            { _id: 1, host : "shard02-secondary:27017" },		 
            { _id: 2, host : "shard02-arbiter:27017" },      
        ]   
    }
)
EOF