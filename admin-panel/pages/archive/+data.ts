// https://vike.dev/data
import type { PageContextServer } from "vike/types";

import { surveyService } from "../../../services";
import { SurveyStatus, type Survey } from "../../../types/sqlite";

export type Data = {
  archivedSurveys: Survey[];
};

export default async function data(_pageContext: PageContextServer) {
  const allSurveys = surveyService.getAllSurveys();

  const archivedSurveys = allSurveys.filter((survey: Survey) => survey.status === SurveyStatus.ARCHIVED);

  return { archivedSurveys };
}
