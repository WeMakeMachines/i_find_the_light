# I find the light

Server (station) for gathering readings from ESP32 sensors (beacons)

![Bun](https://img.shields.io/badge/bun-282a36?style=for-the-badge&logo=bun&logoColor=fbf0df)
![Fastify](https://img.shields.io/badge/fastify-202020?style=for-the-badge&logo=fastify&logoColor=white)
![SQLite](https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

## What am I?

- I am a simple API
- I allow beacons to connect and post their readings - temperature and light (lux)
- I store the readings locally in an SQLite database
- I _will_ provide a GUI to allow for easier configuration and analysis of data (future)

![Topography](./topography.svg)

## Terminology used

- __Beacon__ - a sensor that takes readings from its environment and periodically broadcasts this
- __Station__ - the server (this) that collects data from the beacons

## Installation

**Pre-requisites**

Make sure your system has;

- GIT
- [bun](https://bun.sh/)

**Linux**

This script will install the server to `/opt/iftl`, immediately register it as a service (via systemd), and start:

```shell
wget https://raw.githubusercontent.com/WeMakeMachines/i_find_the_light/refs/heads/main/install.sh -O - | sh
```

## Uninstalling

An uninstall script is [provided](./uninstall.sh)

## Configuring

All configuration takes place in the `.env` file.

See the [.env.sample](.env.sample) file for details.

UNIT
- 1 = METRIC (default)
- 2 = IMPERIAL