import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

async function beaconConfig(fastify: FastifyInstance) {
  // Attach beacon config using a getter function
  fastify.decorateRequest("beaconConfig", null);

  fastify.addHook("preHandler", async (request) => {
    request.beaconConfig = {
      pollIntervalSeconds: Number(process.env.BEACON_POLL_INTERVAL_SECONDS),
      scheduleStart: Number(process.env.BEACON_SCHEDULE_START),
      scheduleEnd: Number(process.env.BEACON_SCHEDULE_END),
      unit: Number(process.env.UNIT),
    };
  });
}

export default fp(beaconConfig);
