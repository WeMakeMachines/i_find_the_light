import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";

import { deleteSurvey, truncateSurveys } from "../../../services/sqlite/queries/surveys";
import db from "../../../services/sqlite";

export const del = {
  surveys,
};

async function surveys(request: FastifyRequest<{ Querystring: { survey_id: string } }>, reply: FastifyReply) {
  try {
    const surveyId = Number(request.query.survey_id);

    if (!request.query.survey_id || isNaN(surveyId)) return truncateSurveys(db);

    const survey = deleteSurvey(db, surveyId);

    return survey;
  } catch (error) {
    reply.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return { error: "Unable to process request" };
  }
}
