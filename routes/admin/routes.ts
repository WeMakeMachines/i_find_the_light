import { FastifyInstance } from "fastify";

import { controllers } from "./controllers";

export async function admin(fastify: FastifyInstance) {
  fastify.get("/download-database", controllers.get.getDatabaseFile);
}
