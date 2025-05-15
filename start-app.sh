#!/bin/bash

# Helper script to start the Environmental Analysis Platform

echo "Starting Environmental Analysis Platform..."

# Check for Docker and Docker Compose
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Build and start the services
echo "Building and starting services..."
docker-compose up -d --build

# Wait for a moment to ensure services are running
sleep 5

# Check if services are running
if docker-compose ps | grep -q 'Up'; then
    echo "Services are running!"
    echo "Access the application at: http://localhost"
    echo "Access the API at: http://localhost:8000"
    echo "API documentation available at: http://localhost:8000/docs"
    echo ""
    echo "To view logs: docker-compose logs -f"
    echo "To stop the application: docker-compose down"
else
    echo "There was an issue starting the services. Check the logs with: docker-compose logs"
    exit 1
fi 