import { FastifyInstance } from "fastify";

import { del } from "./controllers/delete.controllers";
import { get } from "./controllers/get.controllers";
import { patch } from "./controllers/patch.controllers";
import { post } from "./controllers/post.controllers";

import { surveysBeaconsRoutes } from "../beacons/routes";
import { surveysReadingsRoutes } from "../readings/routes";

import { createSurveySchema } from "./schemas";

export async function surveysRoutes(fastify: FastifyInstance) {
  fastify.delete("/", del.deleteAllSurveys);
  fastify.delete("/:surveyId", del.deleteSurvey);
  fastify.get("/", get.allSurveys);
  fastify.get("/:surveyId", get.survey);
  fastify.patch("/:surveyId/activate", patch.setSurveyActiveState);
  fastify.patch("/:surveyId/archive", patch.setSurveyArchiveState);
  fastify.patch("/:surveyId/deactivate", patch.setSurveyDraftState);
  fastify.patch("/:surveyId/update", patch.updateSurvey);
  fastify.post("/", { schema: createSurveySchema }, post.createSurvey);

  // nested routes
  fastify.register(surveysBeaconsRoutes, { prefix: "/:surveyId/beacons" });
  fastify.register(surveysReadingsRoutes, { prefix: "/:surveyId/readings" });
}
