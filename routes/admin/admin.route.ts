import { FastifyInstance } from "fastify";

import { controllers } from "./controllers";
import { beaconConfigSchema } from "./schemas.route";

export default async function admin(fastify: FastifyInstance) {
  fastify.post("/config", { schema: beaconConfigSchema }, controllers.post.modifyBeaconConfig);
}
