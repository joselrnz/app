#!/bin/bash

echo "Starting development server..."
echo ""

cd frontend

# Add node to PATH temporarily
export PATH="$(pwd)/../node-v18.17.0-win-x64:$PATH"

# Start the dev server
node ../node-v18.17.0-win-x64/node_modules/npm/bin/npm-cli.js run dev

