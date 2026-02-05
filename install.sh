#!/bin/bash

echo "=================================="
echo "ElevenLabs TTS UI - Installation"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org"
    echo "Or in Termux: pkg install nodejs"
    exit 1
fi

echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo ""

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
if npm install; then
    echo "Backend dependencies installed successfully."
else
    echo "ERROR: Failed to install backend dependencies."
    exit 1
fi
cd ..
echo ""

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd elevenlabsui
if npm install; then
    echo "Frontend dependencies installed successfully."
else
    echo "ERROR: Failed to install frontend dependencies."
    exit 1
fi
echo ""

# Build frontend
echo "Building frontend for production..."
if npm run build; then
    echo "Frontend built successfully."
else
    echo "ERROR: Failed to build frontend."
    exit 1
fi
cd ..
echo ""

echo "=================================="
echo "Installation complete!"
echo "=================================="
echo ""
echo "To start the server, run:"
echo "  bash start.sh"
echo ""
echo "Or manually:"
echo "  cd backend"
echo "  npm start"
echo ""
echo "Then open your browser to: http://localhost:3001"
echo ""
