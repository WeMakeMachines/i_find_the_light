import { FastifyRequest } from "fastify";
import { BeaconConfig } from "./types";

declare module "fastify" {
  interface FastifyRequest {
    beaconConfig: BeaconConfig;
  }
}
