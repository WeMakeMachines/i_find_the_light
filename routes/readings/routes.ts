import { FastifyInstance } from "fastify";

import { transformBeaconSubmitReadingHook } from "../../plugins/beacons/hooks";

import { del } from "./controllers/delete.controllers";
import { get } from "./controllers/get.controllers";
import { post } from "./controllers/post.controllers";
import { readingSchema } from "./schemas";

export async function readingsRoutes(fastify: FastifyInstance) {
  fastify.delete("/", del.allReadings);
}

export async function surveysReadingsRoutes(fastify: FastifyInstance) {
  fastify.delete("/", del.surveyReadings);
  fastify.get("/", get.getSurveyReadings);
  fastify.route({
    method: "POST",
    url: "/",
    schema: readingSchema,
    handler: post.readings,
    preValidation: transformBeaconSubmitReadingHook,
  });
}
