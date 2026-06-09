import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";

import { surveyService } from "../../../fastify-entry";

import type { CreateSurveyInput } from "../../../shared/types";

export const post = {
  createSurvey,
};

async function createSurvey(request: FastifyRequest<{ Body: CreateSurveyInput }>, reply: FastifyReply) {
  try {
    const addedSurvey = surveyService.createSurvey({ ...request.body });

    return addedSurvey;
  } catch (error) {
    reply.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    console.log(error);
    return { error: "Unable to process request" };
  }
}
