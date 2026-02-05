#!/bin/bash

echo "=================================="
echo "ElevenLabs TTS UI - Update"
echo "=================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "ERROR: Git is not installed."
    echo "Cannot update without git."
    exit 1
fi

# Check if this is a git repository
if [ ! -d ".git" ]; then
    echo "ERROR: This directory is not a git repository."
    echo "Cannot update. Please clone from GitHub instead."
    exit 1
fi

echo "Pulling latest changes from GitHub..."
if git pull origin main; then
    echo "Successfully pulled latest changes."
else
    echo "ERROR: Failed to pull changes."
    echo "You may have local modifications. Try:"
    echo "  git stash"
    echo "  bash update.sh"
    exit 1
fi
echo ""

# Update backend dependencies
echo "Updating backend dependencies..."
cd backend
if npm install; then
    echo "Backend dependencies updated."
else
    echo "WARNING: Failed to update backend dependencies."
fi
cd ..
echo ""

# Update frontend dependencies and rebuild
echo "Updating frontend dependencies..."
cd elevenlabsui
if npm install; then
    echo "Frontend dependencies updated."
else
    echo "WARNING: Failed to update frontend dependencies."
fi
echo ""

echo "Rebuilding frontend..."
if npm run build; then
    echo "Frontend rebuilt successfully."
else
    echo "WARNING: Failed to rebuild frontend."
fi
cd ..
echo ""

echo "=================================="
echo "Update complete!"
echo "=================================="
echo ""
echo "To start the server, run:"
echo "  bash start.sh"
echo ""
