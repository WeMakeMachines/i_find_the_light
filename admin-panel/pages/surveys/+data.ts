// https://vike.dev/data
import type { PageContextServer } from "vike/types";

import { surveyService } from "../../../services";
import { SurveyStatus, type Survey } from "../../../types/sqlite";

export type Data = {
  surveys: Survey[];
  archivedSurveys: Survey[];
};

export default async function data(_pageContext: PageContextServer) {
  const allSurveys = surveyService.getAllSurveys();

  const surveys = allSurveys.filter((survey: Survey) => survey.status !== SurveyStatus.ARCHIVED);
  const archivedSurveys = allSurveys.filter((survey: Survey) => survey.status === SurveyStatus.ARCHIVED);

  return { surveys, archivedSurveys };
}
