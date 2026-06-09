import type { CreateSurveyInput } from "../types/types";
import { SurveyStatus } from "../types/sqlite";

class SurveyServiceError extends Error {}

export function makeSurveyService(surveysQueries: any) {
  return {
    getSurvey(surveyId: number) {
      return surveysQueries.selectSurvey(surveyId);
    },

    getAllSurveys() {
      return surveysQueries.selectAllSurveys();
    },

    getActiveSurvey() {
      return surveysQueries.selectActiveSurvey();
    },

    createSurvey(survey: CreateSurveyInput) {
      return surveysQueries.insertSurvey(survey);
    },

    setSurveyActiveState(surveyId: number) {
      const survey = this.getSurvey(surveyId);

      if (survey.status === SurveyStatus.ARCHIVED) throw new SurveyServiceError("Unable to activate archived survey");

      const currentActiveSurvey = surveysQueries.selectActiveSurvey();

      if (currentActiveSurvey !== null) {
        this.setSurveyDraftState(currentActiveSurvey.id);
      }

      return surveysQueries.updateSurveyStatus(surveyId, SurveyStatus.ACTIVE);
    },

    setSurveyArchiveState(surveyId: number) {
      const survey = this.getSurvey(surveyId);

      if (survey.status === SurveyStatus.ARCHIVED) throw new SurveyServiceError("Survey already archived");

      return surveysQueries.updateSurveyStatus(surveyId, SurveyStatus.ARCHIVED);
    },

    setSurveyDraftState(surveyId: number) {
      const survey = this.getSurvey(surveyId);

      if (survey.status === SurveyStatus.ARCHIVED) throw new SurveyServiceError("Unable to draft archived survey");

      return surveysQueries.updateSurveyStatus(surveyId, SurveyStatus.DRAFT);
    },

    deleteAllSurveys() {
      return surveysQueries.deleteAllSurveys();
    },

    deleteSurvey(surveyId: number) {
      return surveysQueries.deleteSurvey(surveyId);
    },
  };
}
