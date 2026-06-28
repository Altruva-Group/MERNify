#!/bin/bash


echo "Restarting services..."

# Rebuild services
for arg in "$@"; do
    if [ "$arg" == "api" ]; then
        docker compose down api01 api02
        sleep 5
        docker compose up -d --no-deps api01 api02 # --scale server=2
    else
        docker compose down $arg
        sleep 5
        docker compose up -d --no-deps $arg
    fi
    echo "$arg successfully restarted."
done
