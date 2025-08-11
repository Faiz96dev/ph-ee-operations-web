#!/bin/bash

# Script to run Angular app in Docker with hot reload

echo "🚀 Starting Angular app in Docker development mode..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker compose -f docker-compose.dev.yml down

# Build and start the development container
echo "🔨 Building and starting development container..."
docker compose -f docker-compose.dev.yml up --build

echo "✅ Development server should be running at http://localhost:4200"
echo "📝 Any changes to source code will automatically trigger rebuild and reload"
