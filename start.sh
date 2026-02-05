#!/bin/bash

echo "=================================="
echo "ElevenLabs TTS UI - Starting Server"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed."
    echo "Please run: bash install.sh"
    exit 1
fi

# Check if backend dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "ERROR: Backend dependencies not installed."
    echo "Please run: bash install.sh"
    exit 1
fi

# Check if frontend is built
if [ ! -d "elevenlabsui/build" ]; then
    echo "ERROR: Frontend not built."
    echo "Please run: bash install.sh"
    exit 1
fi

echo "Starting server..."
echo ""
echo "Open your browser to: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "=================================="
echo ""

# Start the backend server
cd backend
npm start
