// https://vike.dev/data
import type { PageContextServer } from "vike/types";

import { surveyService } from "../../../services";
import { SurveyStatus, type Survey } from "../../../types/sqlite";

export type Data = {
  activeSurvey: Survey[];
  draftedSurveys: Survey[];
};

export default async function data(_pageContext: PageContextServer) {
  const response: {
    activeSurvey: Survey[];
    draftedSurveys: Survey[];
  } = {
    activeSurvey: [],
    draftedSurveys: [],
  };

  const activeSurvey = surveyService.getActiveSurvey();

  if (activeSurvey !== null) response.activeSurvey.push(activeSurvey);

  const allSurveys = surveyService.getAllSurveys();

  response.draftedSurveys = allSurveys.filter((survey: Survey) => survey.status === SurveyStatus.DRAFT);

  return response;
}
