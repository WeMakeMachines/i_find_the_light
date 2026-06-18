// https://vike.dev/data
import type { PageContextServer } from "vike/types";

import { surveyService } from "../../../services";
import type { SurveyWithBeaconReadingCounts } from "../../../types/sqlite";

export type Data = {
  archivedSurveys: SurveyWithBeaconReadingCounts[];
};

export default async function data(_pageContext: PageContextServer) {
  const archivedSurveys = surveyService.getArchivedSurveys();

  return { archivedSurveys };
}
