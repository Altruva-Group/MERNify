#!/bin/bash


# setup package.json files
cp ./api/package-template.json ./api/package.json                   # API
cp ./client/package-template.json ./client/package.json             # CLIENT

# install dependencies
cd ./api && npm i && cd ../client && npm i

# setup .env files
cp .env-template .env

# start the application
bash ./scripts/start.sh

# feel free to use the rest of the files inside the ./scripts/ dir. Only the ./scripts/start.sh script has been used.

# setup complete
echo "Setup complete! You can now access the application at http://localhost:5173."
echo "For other use cases, check the ./scripts dir. Only the ./scripts/start.sh script has been used to start the application."