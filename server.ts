import Fastify from "fastify";

import { postHandshake, postReading } from "./controllers/node.controller";

const PORT = Number(process.env.PORT) || 3111;

const fastify = Fastify({
  logger: true,
});

fastify.post("/handshake", postHandshake);
fastify.post("/reading", postReading);

// Run the server!
try {
  await fastify.listen({ port: PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
