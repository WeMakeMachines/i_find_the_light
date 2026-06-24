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

./create-systemd-service.sh