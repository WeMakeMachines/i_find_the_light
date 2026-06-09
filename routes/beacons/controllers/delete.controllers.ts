import { FastifyRequest } from "fastify";

import { beaconService } from "../../../fastify-entry";

export const del = {
  deleteAllBeacons,
  deleteBeacon,
  deleteSurveyBeacons,
};

async function deleteAllBeacons() {
  return beaconService.deleteAllBeacons();
}

async function deleteBeacon(request: FastifyRequest<{ Params: { surveyId: string; beaconId: string } }>) {
  const surveyId = Number(request.params.surveyId);
  const beaconId = Number(request.params.beaconId);

  return beaconService.deleteBeacon(surveyId, beaconId);
}

async function deleteSurveyBeacons(request: FastifyRequest<{ Params: { surveyId: string } }>) {
  const surveyId = Number(request.params.surveyId);

  return beaconService.deleteAllSurveyBeacons(surveyId);
}
