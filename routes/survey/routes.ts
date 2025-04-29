import { FastifyInstance } from "fastify";

import { controllers } from "./controllers";
import { surveyParametersSchema } from "./schemas";

export default async function survey(fastify: FastifyInstance) {
  fastify.delete("/", controllers.del.surveys);
  fastify.get("/", controllers.get.surveys);
  fastify.patch("/activate/:surveyId", controllers.patch.setSurveyToActive);
  fastify.post("/", { schema: surveyParametersSchema }, controllers.post.createSurvey);
}
