#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status
trap "echo '❌ Uninstall failed'; exit 1" ERR

APP_NAME="iftl"
SERVICE_FILE="/etc/systemd/system/$APP_NAME.service"
APP_EXECUTABLE="/opt/iftl/$APP_NAME.sh"

sudo systemctl stop iftl.service
sudo systemctl disable iftl.service
sudo rm /etc/systemd/system/$APP_NAME.service
sudo systemctl daemon-reload

rm -rf /opt/iftl

echo "Uninstall complete! 🌿"