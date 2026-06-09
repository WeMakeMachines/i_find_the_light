import { FastifyInstance } from "fastify";

import { del } from "./controllers/delete.controllers";
import { get } from "./controllers/get.controllers";

export async function beaconsRoutes(fastify: FastifyInstance) {
  fastify.delete("/", del.deleteAllBeacons);
}

export async function surveysBeaconsRoutes(fastify: FastifyInstance) {
  fastify.delete("/:beaconId", del.deleteBeacon);
  fastify.delete("/", del.deleteSurveyBeacons);
  fastify.get("/", get.allSurveyBeacons);
}
