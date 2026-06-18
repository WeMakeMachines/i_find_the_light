import { FastifyInstance, FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from "fastify";
import { StatusCodes } from "http-status-codes";
import validator from "validator";

import { del } from "./controllers/delete.controllers";
import { get } from "./controllers/get.controllers";
import { patch } from "./controllers/patch.controllers";
import { post } from "./controllers/post.controllers";

import { surveysBeaconsRoutes } from "../beacons/routes";
import { surveysReadingsRoutes } from "../readings/routes";

import { surveySchema } from "./schemas";
import { CreateSurveyInput } from "../../types/types";

function validateSurveyInput(
  req: FastifyRequest<{ Body: CreateSurveyInput }>,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes,
) {
  const body = req.body;

  if (!body.startTimestamp) {
    reply.code(StatusCodes.UNPROCESSABLE_ENTITY).send({
      error: "startTimestamp is required",
    });

    return;
  }

  if (!body.endTimestamp) {
    reply.code(StatusCodes.UNPROCESSABLE_ENTITY).send({
      error: "endTimestamp is required",
    });

    return;
  }

  done();
}

function sanitiseSurveyInput<T extends FastifyRequest<{ Body: Partial<CreateSurveyInput> }>>(
  req: T,
  _: FastifyReply,
  done: DoneFuncWithErrOrRes,
) {
  const body = req.body;

  if (body.name) body.name = validator.trim(body.name);
  if (body.description) body.description = validator.trim(body.description);

  req.body = body;
  done();
}

export async function surveysRoutes(fastify: FastifyInstance) {
  fastify.delete("/", del.deleteAllSurveys);
  fastify.delete("/:surveyId", del.deleteSurvey);
  fastify.get("/", get.allSurveys);
  fastify.get("/:surveyId", get.survey);
  fastify.patch("/:surveyId/activate", patch.setSurveyActiveState);
  fastify.patch("/:surveyId/archive", patch.setSurveyArchiveState);
  fastify.patch("/:surveyId/deactivate", patch.setSurveyDraftState);
  fastify.patch(
    "/:surveyId/update",
    {
      schema: surveySchema,
      preHandler: sanitiseSurveyInput,
    },
    patch.updateSurvey,
  );
  fastify.post(
    "/",
    {
      schema: surveySchema,
      preHandler: [validateSurveyInput, sanitiseSurveyInput],
    },
    post.createSurvey,
  );

  // nested routes
  fastify.register(surveysBeaconsRoutes, { prefix: "/:surveyId/beacons" });
  fastify.register(surveysReadingsRoutes, { prefix: "/:surveyId/readings" });
}
