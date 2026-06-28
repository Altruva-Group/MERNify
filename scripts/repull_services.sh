#!/bin/bash


echo "Repulling services..."

# Rebuild services
for arg in "$@"; do
    echo "Rebuilding $arg..."
    if [ "$arg" == "api" ]; then
        docker compose down api01 api02
        sleep 5
        docker compose up -d --build api01 api02 # --scale api=2
    else
        docker compose down $arg
        sleep 5
        docker compose up -d --build $arg
    fi
    echo "$arg successfully pulled and rebuilt."
done
