import Fastify from "fastify";

import { getBeacons, getReadings, postHandshake, postReadings } from "./controllers/beacon.controller";

const PORT = Number(process.env.PORT) || 3111;

const fastify = Fastify({
  logger: {
    level: 'info',
    file: './log.txt'
  },
});

fastify.get("/beacons", getBeacons);
fastify.get("/readings", getReadings);

fastify.post("/handshake", postHandshake);
fastify.post("/readings", postReadings);

// Run the server!
try {
  await fastify.listen({ port: PORT, host: "0.0.0.0" });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
