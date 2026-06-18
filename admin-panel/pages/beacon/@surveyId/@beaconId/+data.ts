// https://vike.dev/data
import type { PageContextServer } from "vike/types";

import { beaconService, readingService } from "../../../../../services";
import type { Beacon, Reading } from "../../../../../types/sqlite";

export type Data = {
  beacon: Beacon;
  beaconId: number;
  readings: Reading[];
  surveyId: number;
};

export default async function data(_pageContext: PageContextServer) {
  const beaconId = Number(_pageContext.routeParams.beaconId);
  const surveyId = Number(_pageContext.routeParams.surveyId);
  const beacon = beaconService.getSurveyBeacon(surveyId, beaconId);
  const readings = readingService.getSurveyBeaconReadings(surveyId, beaconId);

  return { beacon, beaconId, readings, surveyId };
}
