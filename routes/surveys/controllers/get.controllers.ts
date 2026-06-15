import { FastifyRequest } from "fastify";

import { surveyService } from "../../../services";

export const get = {
  allSurveys,
  survey,
};

async function allSurveys() {
  return surveyService.getAllSurveys();
}

async function survey(request: FastifyRequest<{ Params: { surveyId: string } }>) {
  const surveyId = Number(request.params.surveyId);

  return surveyService.getSurvey(surveyId);
}
