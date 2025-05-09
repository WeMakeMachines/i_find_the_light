#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status
trap "echo '❌ Install failed'; exit 1" ERR

echo "___   _                             "
echo " |  _|_o._  _| _|_|_  _  |o _ |__|_ "
echo "_|_  | || |(_|  |_| |(/_ ||(_|| ||_ "
echo "                            _|      "

sudo mkdir /opt/iftl
cd /opt/iftl
git clone https://github.com/WeMakeMachines/i_find_the_light.git .
cp .env.sample .env
bun install

# Install service
APP_NAME="iftl"
SERVICE_FILE="/etc/systemd/system/$APP_NAME.service"
APP_EXECUTABLE="/opt/iftl/$APP_NAME.sh"

# Give permissions to executable
chmod +x "$APP_EXECUTABLE"

# Create systemd service file
cat <<EOF > "$SERVICE_FILE"
[Unit]
Description=I find the light (station)
After=network.target

[Service]
Type=simple
ExecStart=/bin/bash $APP_EXECUTABLE
Restart=always
RestartSec=1
User=${USER}
WorkingDirectory=/opt/iftl
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

# Set correct permissions
chmod 644 "$SERVICE_FILE"

# Reload systemd and enable service
systemctl daemon-reload
systemctl enable "$APP_NAME"

echo "Installation complete. Running service with default parameters..."

systemctl start "$APP_NAME"
systemctl status "$APP_NAME"

echo "Install complete! 🌿"