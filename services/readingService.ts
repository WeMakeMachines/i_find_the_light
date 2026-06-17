import type { CreateReadingInput } from "../types/types";

export function makeReadingService(surveyReadingsQueries: any) {
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
