import { FastifyInstance } from "fastify";

import { plugins } from "../../plugins";
import { controllers } from "./controllers/";
import { beaconConfigSchema } from "./schemas.route";

export default async function admin(fastify: FastifyInstance) {
  await fastify.register(plugins.beaconConfig);

  fastify.post("/config", { schema: beaconConfigSchema }, controllers.post.modifyBeaconConfig);
}
