import Fastify from "fastify";

import { getReadings, postHandshake, postReadings } from "./controllers/node.controller";

const PORT = Number(process.env.PORT) || 3111;

const fastify = Fastify({
  logger: true,
});

fastify.get("/readings", getReadings);

fastify.post("/handshake", postHandshake);
fastify.post("/readings", postReadings);

// Run the server!
try {
  await fastify.listen({ port: PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
