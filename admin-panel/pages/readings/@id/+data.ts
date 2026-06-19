// https://vike.dev/data
import type { PageContextServer } from "vike/types";

import { readingService } from "../../../../services";
import type { ReadingsByBeaconId } from "../../../../types/sqlite";

export type Data = {
  readings: ReadingsByBeaconId;
};

export default async function data(_pageContext: PageContextServer) {
  const surveyId = Number(_pageContext.routeParams.id);
  const readings = readingService.getSurveyReadingsGroupByBeacon(surveyId);

  return { readings };
}
