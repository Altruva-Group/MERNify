# SETUPS


## GRAFANA
```
sudo chown -R 472:472 ./grafana/data
sudo chmod -R 777 ./grafana/data
sudo chmod 777 ./grafana/**/*
```


## REBUILD SERVER
```
    docker-compose up -d --no-deps --build server
```

<!-- 🔍 Explanation

    up -d → Runs the container in detached mode (in the background).
    --no-deps → Ensures that only the server service is rebuilt and other services remain untouched (it won’t restart dependent services like grafana, mongodb, etc.).
    --build → Forces rebuilding the server container using the existing image without pulling a new image.
    server → Specifies that only the server service should be rebuilt. -->


## ZOOKEEPER

Check if Zookeeper is running 
```
echo ruok | nc localhost 2181
```
Response should be: 'imok' if zookeeper is running

Check Zookeeper status:
```
echo srvr | nc localhost 2181
```

Check Zookeeper logs for errors
```
cat /opt/zookeeper-3.4.13/bin/../logs/zookeeper.log
```

## KAFKA

Check if kafka containers are running
```
docker ps --filter "name=kafka"
docker ps --filter "name=zookeeper"
```

If they are not running, check their logs for errors
```
docker logs kafka
docker logs zookeeper
```

Verify Kafka broker status
```
docker exec -it kafka kafka-topics.sh --bootstrap-server localhost:9092 --list
```
If you see a list of topics, Kafka is running properly


Check Kafka connectivity from API
```
docker exec -it server sh
nc -zv kafka 9092
```
if it fails, there is network issues


Check Docker Network configuration
```
docker network ls
```
Then inspect the network Kafka is in:
```
docker network inspect backend
```


Check Kafka listener configuration
```
cat /opt/kafka/config/server.properties | grep "listeners"
```
It should have PLAINTEST://0.0.0.0:9092 or similar


Test Producing and Consuming Messages
```
docker exec -it kafka kafka-console-producer.sh --broker-list localhost:9092 --topic test
```

Type a message and hit enter.

Then run a consumer:
```
docker exec -it kafka kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning
```


Check API logs
```
docker logs server
```


## MONGODB SHARD

Add key file authentication to Mongodb
```
openssl rand -base64 756 > mongo/mongodb.key
chmod 400 mongo/mongodb.key
```

Convert All mongodb scripts files to Unix style
```
dos2unix ./mongo/scripts/*
```







## VIEW CONTAINER FILES

 <!-- docker exec -it <container_name> sh ls -lah /usr/src/api -->
 <!-- 1_mern-server-2 -->
```
 <!-- docker exec -it 1_mern-server-1 sh -->
 docker exec -it 1_mern-server-2 sh ls -lah /usr/src/api
```


# SWARM
Swarm initialized: current node (4br1d5yoq1hy4yjrpy96rwwwd) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-2b42wagw84pxv2w9f63kar001xhsn7foicrz8doad7xg53l6fs-22sfn8h6es6do6hboc6n9s3yi 192.168.65.3:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.