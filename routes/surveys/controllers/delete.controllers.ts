import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";

import { surveyService } from "../../../fastify-entry";

export const del = {
  deleteAllSurveys,
  deleteSurvey,
};

async function deleteSurvey(request: FastifyRequest<{ Params: { surveyId: string } }>, reply: FastifyReply) {
  try {
    const surveyId = Number(request.params.surveyId);

    return surveyService.deleteSurvey(surveyId);
  } catch (error) {
    reply.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return { error: "Unable to process request" };
  }
}

async function deleteAllSurveys(_: FastifyRequest, reply: FastifyReply) {
  try {
    return surveyService.deleteAllSurveys();
  } catch (error) {
    reply.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    return { error: "Unable to process request" };
  }
}
