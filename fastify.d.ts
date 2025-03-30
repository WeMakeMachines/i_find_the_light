import { FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    beaconConfig: {
      pollIntervalSeconds: number;
      scheduleStart: number;
      scheduleEnd: number;
      unit: number;
    };
  }
}
