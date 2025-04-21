import { FastifyInstance } from "fastify";

import { controllers } from "./controllers";
import { beaconConfigSchema } from "./schemas";

export default async function admin(fastify: FastifyInstance) {
  fastify.post("/config", { schema: beaconConfigSchema }, controllers.post.modifyBeaconConfig);
  fastify.get("/download-database", controllers.get.getDatabaseFile);
}
