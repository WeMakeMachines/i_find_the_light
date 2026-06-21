import type { CreateSurveyInput } from "../types/types";
import { SurveyStatus } from "../types/sqlite";

class SurveyServiceError extends Error {}

function constrainSurveyInputStrings(surveyInput: Partial<CreateSurveyInput>) {
  const constrainedSurveyInput = {
    ...surveyInput,
  };

  if ("name" in surveyInput) constrainedSurveyInput.name = surveyInput.name?.slice(0, 30);
  if ("description" in surveyInput) constrainedSurveyInput.description = surveyInput.description?.slice(0, 300);

  return constrainedSurveyInput;
}

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

    getArchivedSurveys() {
      return surveysQueries.selectArchivedSurveys();
    },

    createSurvey(survey: CreateSurveyInput) {
      const constrainedSurveyInput = constrainSurveyInputStrings(survey);

      return surveysQueries.insertSurvey(constrainedSurveyInput);
    },

    setSurveyActiveState(surveyId: number) {
      const survey = this.getSurvey(surveyId);

      if (survey.status === SurveyStatus.ARCHIVED) throw new SurveyServiceError("Unable to activate archived survey");

      const currentActiveSurvey = surveysQueries.selectActiveSurvey();

      if (currentActiveSurvey !== null) {
        this.setSurveyArchiveState(currentActiveSurvey.id);
      }

      return surveysQueries.updateSurveyStatus(surveyId, SurveyStatus.ACTIVE);
    },

    updateSurvey(surveyId: number, surveyInput: Partial<CreateSurveyInput>) {
      const survey = this.getSurvey(surveyId);

      if (survey.status !== SurveyStatus.DRAFT)
        throw new SurveyServiceError("Unable to edit active or archived surveys");

      const constrainedSurveyInput = constrainSurveyInputStrings(surveyInput);

      return surveysQueries.updateSurvey(surveyId, constrainedSurveyInput);
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
