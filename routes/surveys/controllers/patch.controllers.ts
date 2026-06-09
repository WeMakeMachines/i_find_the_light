import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import { surveyService } from "../../../fastify-entry";

export const patch = {
  setSurveyActiveState,
  setSurveyArchiveState,
  setSurveyDraftState,
};

class InvalidSurveyId extends Error {}

export function setSurveyActiveState(request: FastifyRequest<{ Params: { surveyId: string } }>, reply: FastifyReply) {
  try {
    const surveyId = Number(request.params.surveyId);

    if (!request.params.surveyId || isNaN(surveyId)) throw new InvalidSurveyId("Invalid survey id provided");

    surveyService.setSurveyActiveState(surveyId);

    return { message: `Successfully activated ${surveyId}` };
  } catch (error) {
    if (error instanceof InvalidSurveyId) {
      reply.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      return { error: error.message };
    } else {
      return { error: "Server error" };
    }
  }
}

export function setSurveyArchiveState(request: FastifyRequest<{ Params: { surveyId: string } }>, reply: FastifyReply) {
  try {
    const surveyId = Number(request.params.surveyId);

    if (!request.params.surveyId || isNaN(surveyId)) throw new InvalidSurveyId("Invalid survey id provided");

    surveyService.setSurveyArchiveState(surveyId);

    return { message: `Successfully archived ${surveyId}` };
  } catch (error) {
    if (error instanceof InvalidSurveyId) {
      reply.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      return { error: error.message };
    } else {
      return { error: "Server error" };
    }
  }
}

export function setSurveyDraftState(request: FastifyRequest<{ Params: { surveyId: string } }>, reply: FastifyReply) {
  try {
    const surveyId = Number(request.params.surveyId);

    if (!request.params.surveyId || isNaN(surveyId)) throw new InvalidSurveyId("Invalid survey id provided");

    surveyService.setSurveyDraftState(surveyId);

    return { message: `Successfully drafted ${surveyId}` };
  } catch (error) {
    if (error instanceof InvalidSurveyId) {
      reply.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      return { error: error.message };
    } else {
      return { error: "Server error" };
    }
  }
}
