import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import { surveyService } from "../../../services";
import type { CreateSurveyInput } from "../../../types/types";

export const patch = {
  setSurveyActiveState,
  setSurveyArchiveState,
  setSurveyDraftState,
  updateSurvey,
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

export function updateSurvey(
  request: FastifyRequest<{ Params: { surveyId: string }; Body: Partial<CreateSurveyInput> }>,
  reply: FastifyReply,
) {
  try {
    const surveyId = Number(request.params.surveyId);
    const surveyInput = { ...request.body };

    if (!request.params.surveyId || isNaN(surveyId)) throw new InvalidSurveyId("Invalid survey id provided");

    return surveyService.updateSurvey(surveyId, surveyInput);
  } catch (error) {
    if (error instanceof InvalidSurveyId) {
      reply.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      return { error: error.message };
    } else {
      return { error: "Server error" };
    }
  }
}
