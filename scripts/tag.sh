#!/bin/bash


echo "Tagging all Images and pushing to local registry..."
docker tag mongo:6.0 localhost:10000/mongo
docker tag prom/prometheus:latest localhost:10000/prometheus
docker tag grafana/grafana:latest localhost:10000/grafana
docker tag elasticsearch:8.2.0 localhost:10000/elasticsearch
docker tag logstash:8.2.0 localhost:10000/logstash
docker tag kibana:8.2.0 localhost:10000/kibana
docker tag wurstmeister/zookeeper:latest localhost:10000/zookeeper
docker tag wurstmeister/kafka:latest localhost:10000/kafka
docker tag redis:alpine localhost:10000/redis
docker tag api_template localhost:10000/api_template
docker tag ui_template localhost:10000/ui_template
docker tag nginx localhost:10000/nginx


echo "Pushing images to local registry:2..."
docker push localhost:10000/mongo
docker push localhost:10000/prometheus
docker push localhost:10000/grafana
docker push localhost:10000/elasticsearch
docker push localhost:10000/logstash
docker push localhost:10000/kibana
docker push localhost:10000/zookeeper
docker push localhost:10000/kafka
docker push localhost:10000/redis
docker push localhost:10000/api_template
docker push localhost:10000/ui_template
docker push localhost:10000/nginx

