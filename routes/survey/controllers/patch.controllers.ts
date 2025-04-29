import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import { updateSurveyMakeActive } from "../../../services/sqlite/queries/surveys";
import db from "../../../services/sqlite";

export const patch = {
  setSurveyToActive,
};

class InvalidSurveyId extends Error {}

export function setSurveyToActive(
  request: FastifyRequest<{ Querystring: { survey_id: string } }>,
  reply: FastifyReply,
) {
  try {
    const surveyId = Number(request.query.survey_id);

    if (!request.query.survey_id || isNaN(surveyId)) throw new InvalidSurveyId("Invalid survey id provided");

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
