import type { CreateReadingInput } from "../types/types";

class CreateReadingError extends Error {}

export function makeReadingService(surveyReadingsQueries: any, surveysQueries: any) {
  return {
    countSurveyReadings(surveyId: number) {
      return surveyReadingsQueries.selectCountSurveyReadings(surveyId);
    },

    getSurveyBeaconReadings(surveyId: number, beaconId: number) {
      return surveyReadingsQueries.selectSurveyBeaconReadings(surveyId, beaconId);
    },

    getSurveyReadings(surveyId: number) {
      return surveyReadingsQueries.selectSurveyReadings(surveyId);
    },

    getSurveyReadingsGroupByBeacon(surveyId: number) {
      return surveyReadingsQueries.selectSurveyReadingsGroupByBeacon(surveyId);
    },

    createReading(reading: CreateReadingInput) {
      const activeSurveyId = surveysQueries.selectActiveSurveyId();

      if (activeSurveyId !== reading.surveyId) {
        throw new CreateReadingError("Survey is not active");
      }

      return surveyReadingsQueries.insertReading(reading);
    },

    deleteAllReadings() {
      return surveyReadingsQueries.deleteAllReadings();
    },

    deleteSurveyReadings(surveyId: number) {
      return surveyReadingsQueries.deleteSurveyReadings(surveyId);
    },
  };
}
