# I find the light

Server (station) for gathering readings from ESP32 sensors (beacons)

![Bun](https://img.shields.io/badge/bun-282a36?style=for-the-badge&logo=bun&logoColor=fbf0df)
![Fastify](https://img.shields.io/badge/fastify-202020?style=for-the-badge&logo=fastify&logoColor=white)
![SQLite](https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Vue.js](https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Vike](https://img.shields.io/badge/Vike-35495E?style=for-the-badge&logoColor=4FC08D)

## What am I?

- I provide a REST API
- I provide a graphical interface for configuring surveys and viewing survey data
- I send survey configuration to connected [beacons](https://github.com/WeMakeMachines/i_find_the_light_beacon)
- I allow beacons to connect and post their readings
- I store the readings locally in an SQLite database
- [Demo](https://iftl.wemakemachines.com/demo)

## Terminology used

- **Beacon** - a sensor that takes readings from its environment and periodically broadcasts this
- **Station** - the server (this) that collects data from the beacons

![Topography](./topography.svg)

## Setup

Requires git, [bun](https://bun.sh/)

1. `bun install`
2. `bun run build`
3. `bun start`

The admin panel can be viewed locally over port 3111, for example [http://localhost:3111](http://localhost:3111)

### Setting up a systemd service

There are a few scripts that can help with that;

- `create-systemd-service.sh` (assumes app is installed under `/opt/iftl`)
- `remove-systemd-service.sh`
