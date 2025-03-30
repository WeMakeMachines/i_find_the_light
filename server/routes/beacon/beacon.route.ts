import { FastifyInstance } from "fastify";

import { plugins } from "../../plugins";
import { controllers } from "./controllers/";
import { handshakeSchema, readingSchema } from "./schemas.route";

export default async function beacon(fastify: FastifyInstance) {
  await fastify.register(plugins.beaconConfig);

  fastify.get("/", controllers.get.beacons);
  fastify.get("/readings", controllers.get.readings);
  fastify.post("/readings", { schema: readingSchema }, controllers.post.readings);
  fastify.post("/handshake", { schema: handshakeSchema }, controllers.post.handshake);
}
