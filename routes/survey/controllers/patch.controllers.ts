import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import { updateSurveyMakeActive } from "../../../services/sqlite/queries/surveys";
import db from "../../../services/sqlite";

export const patch = {
  setSurveyToActive,
};

class InvalidSurveyId extends Error {}

export function setSurveyToActive(request: FastifyRequest<{ Params: { surveyId: string } }>, reply: FastifyReply) {
  try {
    const surveyId = Number(request.params.surveyId);

    if (!request.params.surveyId || isNaN(surveyId)) throw new InvalidSurveyId("Invalid survey id provided");

    updateSurveyMakeActive(db, surveyId);

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
