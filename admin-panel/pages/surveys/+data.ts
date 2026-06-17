// https://vike.dev/data
import type { PageContextServer } from "vike/types";

import { surveyService } from "../../../services";
import { SurveyStatus, type Survey } from "../../../types/sqlite";

export type Data = {
  activeSurveys: Survey[];
  draftedSurveys: Survey[];
};

export default async function data(_pageContext: PageContextServer) {
  const response: {
    activeSurveys: Survey[];
    draftedSurveys: Survey[];
  } = {
    activeSurveys: [],
    draftedSurveys: [],
  };

  const activeSurvey = surveyService.getActiveSurvey();

  if (activeSurvey !== null) response.activeSurveys.push(activeSurvey);

  const allSurveys = surveyService.getAllSurveys();

  response.draftedSurveys = allSurveys.filter((survey: Survey) => survey.status === SurveyStatus.DRAFT);

  return response;
}
