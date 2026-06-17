// https://vike.dev/data
import type { PageContextServer } from "vike/types";

import { beaconService, readingService, surveyService } from "../../../../services";
import type { Beacon, Survey } from "../../../../types/sqlite";

export type Data = {
  survey: Survey;
  beaconsCount: number;
  readingsCount: number;
  beacons: Beacon[];
};

export default async function data(_pageContext: PageContextServer) {
  const surveyId = Number(_pageContext.routeParams.id);
  const survey = surveyService.getSurvey(surveyId);
  const beacons = beaconService.getSurveyBeacons(surveyId);
  const beaconsCount = beaconService.countSurveyBeacons(surveyId);
  const readingsCount = readingService.countSurveyReadings(surveyId);

  return { beacons, beaconsCount, readingsCount, survey };
}
