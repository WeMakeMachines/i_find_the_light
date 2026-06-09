import { FastifyRequest } from "fastify";

import { readingService } from "../../../fastify-entry";

export const get = {
  getSurveyReadings,
  getSurveyReadingsByBeaconId,
};

class GetReadingError extends Error {}

async function getSurveyReadings(request: FastifyRequest<{ Params: { surveyId: number } }>) {
  const { surveyId } = request.params;

  return readingService.getSurveyReadings(surveyId);
}

async function getSurveyReadingsByBeaconId(
  request: FastifyRequest<{ Params: { surveyId: number }; Querystring: { beaconId?: string } }>,
) {
  const { surveyId } = request.params;
  const beaconId = Number(request.query.beaconId);

  if (beaconId === undefined) {
    return readingService.getSurveyReadingsGroupByBeacon(surveyId);
  }

  if (!Number.isInteger(beaconId)) {
    throw new GetReadingError("Invalid beaconId");
  }

  return readingService.getSurveyReadingsByBeaconId(surveyId, beaconId);
}
