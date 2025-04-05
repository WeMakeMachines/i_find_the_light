#!/bin/bash

APP_NAME="iftl"
SERVICE_FILE="/etc/systemd/system/$APP_NAME.service"
APP_EXECUTABLE="/opt/iftl/$APP_NAME.sh"

sudo systemctl stop iftl.service
sudo systemctl disable iftl.service
sudo rm /etc/systemd/system/$APP_NAME.service
sudo systemctl daemon-reload

rm -rf /opt/iftl
