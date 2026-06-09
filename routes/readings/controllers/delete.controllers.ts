import { FastifyRequest } from "fastify";

import { readingService } from "../../../fastify-entry";

export const del = {
  allReadings,
  surveyReadings,
};

async function allReadings() {
  readingService.deleteAllReadings();
}

async function surveyReadings(request: FastifyRequest<{ Params: { surveyId: number } }>) {
  readingService.deleteSurveyReadings(request.params.surveyId);
}
