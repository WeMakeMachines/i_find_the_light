#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status
trap "echo '❌ Update failed'; exit 1" ERR

APP_NAME="iftl"

echo "Stopping service..."
systemctl stop "$APP_NAME"

git pull

echo "Starting service..."
systemctl start "$APP_NAME"

echo "Update complete! 🌿"