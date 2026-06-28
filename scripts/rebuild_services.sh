#!/bin/bash


echo "Rebuilding services..."

# Rebuild services
for arg in "$@"; do
    echo "Rebuilding $arg..."
    if [ "$arg" == "api" ]; then
        docker compose down api01 api02
        sleep 5
        docker compose up -d --build --no-deps api01 api02 # --scale api=2
    else
        docker compose down $arg
        sleep 5
        docker compose up -d --build --no-deps $arg
    fi
    echo "$arg successfully rebuilt."
done
