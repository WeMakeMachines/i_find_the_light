import { FastifyInstance } from "fastify";

import { post } from "./controllers/post.controller";
import { bootstrapSchema } from "./schemas";
import { transformBeaconConfigHook } from "../../plugins/beacons/hooks";

export async function bootstrapRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/",
    schema: bootstrapSchema,
    handler: post.bootstrap,
    onSend: transformBeaconConfigHook,
  });
}
