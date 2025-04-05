import { FastifyInstance } from "fastify";

import { controllers } from "./controllers";
import { handshakeSchema, readingSchema } from "./schemas.route";

export default async function beacon(fastify: FastifyInstance) {
  fastify.delete("/", controllers.del.beacons);
  fastify.get("/", controllers.get.beacons);
  fastify.delete("/readings", controllers.del.readings);
  fastify.get("/readings", controllers.get.readings);
  fastify.post("/readings", { schema: readingSchema }, controllers.post.readings);
  fastify.post("/handshake", { schema: handshakeSchema }, controllers.post.handshake);
}
