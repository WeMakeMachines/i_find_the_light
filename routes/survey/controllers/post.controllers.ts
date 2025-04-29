import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";

import { insertSurvey } from "../../../services/sqlite/queries/surveys";
import db from "../../../services/sqlite";

import type { SurveyParameters } from "../../../shared/types";

export const post = {
  createSurvey,
};

async function createSurvey(request: FastifyRequest<{ Body: SurveyParameters }>, reply: FastifyReply) {
  try {
    const addedSurvey = insertSurvey(db, { ...request.body });

    return addedSurvey;
  } catch (error) {
    reply.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    console.log(error);
    return { error: "Unable to process request" };
  }
}
