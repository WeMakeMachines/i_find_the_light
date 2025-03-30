import { FastifyInstance } from "fastify";
import { controllers } from "./controllers/";

export default async function beacon(fastify: FastifyInstance) {
  fastify.get("/", controllers.get.beacons);
  fastify.get("/readings", controllers.get.readings);
  fastify.post("/readings", controllers.post.readings);
  fastify.post("/handshake", controllers.post.handshake);
}
