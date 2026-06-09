import { FastifyInstance } from "fastify";

import { post } from "./controllers/post.controller";
import { bootstrapSchema } from "./schemas";

export async function bootstrapRoutes(fastify: FastifyInstance) {
  fastify.post("/", { schema: bootstrapSchema }, post.bootstrap);
}
