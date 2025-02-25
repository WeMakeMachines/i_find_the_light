# I find the light

Server (accumulator) for readings from ESP32 sensors

## What am I?

- I am a simple API built using the [Fastify](https://fastify.dev/) framework
- I allow nodes to connect and post their readings - temperature and light (lux)
- I store the readings locally in an SQLite database

## Configuring

All configuration takes place in the `.env` file

UNIT
- 1 = METRIC (default)
- 2 = IMPERIAL

## Running

Requires [bun](https://bun.sh/)

```
bun install
bun run start
```