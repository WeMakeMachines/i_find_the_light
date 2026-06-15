import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";

import { surveyService } from "../../../services";

import type { CreateSurveyInput } from "../../../types/types";

export const post = {
  createSurvey,
};

async function createSurvey(request: FastifyRequest<{ Body: CreateSurveyInput }>, reply: FastifyReply) {
  try {
    return surveyService.createSurvey({ ...request.body });
  } catch (error) {
    reply.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

    return { error: "Unable to process request" };
  }
}
