// https://vike.dev/data
import type { PageContextServer } from "vike/types";

import { beaconService, surveyService } from "../../../services";
import type { Beacon } from "../../../types/sqlite";

export type Data = {
  activeSurveyId: number | null;
  beacons: Beacon[];
};

export default async function data(_pageContext: PageContextServer) {
  const activeSurveyId = surveyService.getActiveSurveyId();
  let beacons: Beacon[] = [];

  if (activeSurveyId) {
    beacons = beaconService.getSurveyBeacons(activeSurveyId);
  }

  return { activeSurveyId, beacons };
}
