
docker exec -i shard03-node mongosh <<EOF
rs.initiate(
    {
        _id: "rs-shard-03",
        version: 1,
        members: [
            { _id: 0, host : "shard03-node:27017" },
            { _id: 1, host : "shard03-secondary:27017" },
            { _id: 2, host : "shard03-arbiter:27017" },
        ]
    }
)
EOF