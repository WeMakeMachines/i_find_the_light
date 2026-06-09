import { FastifyRequest } from "fastify";

import { beaconService } from "../../../fastify-entry";

export const get = {
  allSurveyBeacons,
};

async function allSurveyBeacons(request: FastifyRequest<{ Params: { surveyId: string } }>) {
  const surveyId = Number(request.params.surveyId);

  return beaconService.getSurveyBeacons(surveyId);
}
