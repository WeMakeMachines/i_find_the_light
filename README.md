# I find the light

Server (station) for gathering readings from ESP32 sensors (beacons)

![Bun](https://img.shields.io/badge/bun-282a36?style=for-the-badge&logo=bun&logoColor=fbf0df)
![Fastify](https://img.shields.io/badge/fastify-202020?style=for-the-badge&logo=fastify&logoColor=white)
![SQLite](https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Vue.js](https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Vike](https://img.shields.io/badge/Vike-35495E?style=for-the-badge&logoColor=4FC08D)

## What am I?

- I am a simple API
- I allow beacons to connect and post their readings - temperature and light (lux)
- I store the readings locally in an SQLite database

![Topography](./topography.svg)

## Terminology used

- **Beacon** - a sensor that takes readings from its environment and periodically broadcasts this
- **Station** - the server (this) that collects data from the beacons

## Running

> Make sure your system has;
>
> - GIT
> - [bun](https://bun.sh/)

1. `bun install`
2. `bun start`

## Beacons

Beacon regisistration is idempotent. A beacon does not receive a new Id if it registers more than once. This is because registrations are based on the device key.

## Installing on a server

This script will install the the application to `/opt/iftl`, immediately register it as a service (via systemd), and start:

```shell
wget https://raw.githubusercontent.com/WeMakeMachines/i_find_the_light/refs/heads/main/install.sh -O - | bash
```

## Uninstalling

A systemd service uninstall script is [provided](./uninstall.sh)
