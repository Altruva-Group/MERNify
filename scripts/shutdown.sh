#!/bin/bash

# Shut down all services (Mongodb)
echo "Shutting down Application..."
# remove all Mongodb Data

echo "Shutting down all services..."
docker compose down -v
echo "All Services stopped."

sleep 5

echo "Removing all MongoDB Data..."
bash ./mongo/scripts/shutdown/shutdown-db.sh

echo "Cleanup Successful."