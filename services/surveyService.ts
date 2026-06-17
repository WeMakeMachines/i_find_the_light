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

    getActiveSurveyId() {
      return surveysQueries.selectActiveSurveyId();
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

    updateSurvey(surveyId: number, surveyInput: Partial<CreateSurveyInput>) {
      const survey = this.getSurvey(surveyId);

      if (survey.status !== SurveyStatus.DRAFT)
        throw new SurveyServiceError("Unable to edit active or archived surveys");

      return surveysQueries.updateSurvey(surveyId, surveyInput);
    },

    setSurveyArchiveState(surveyId: number) {
      const survey = this.getSurvey(surveyId);

      if (survey.status === SurveyStatus.ARCHIVED) throw new SurveyServiceError("Survey already archived");
      if (survey.status === SurveyStatus.DRAFT) throw new SurveyServiceError("Cannot archive a drafted survey");

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
