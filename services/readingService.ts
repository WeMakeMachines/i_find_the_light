import type { CreateReadingInput } from "../shared/types";

export function makeReadingService(surveyReadingsQueries: any) {
  return {
    getSurveyReadingsByBeaconId(surveyId: number, beaconId: number) {
      return surveyReadingsQueries.selectSurveyReadingsByBeaconId(surveyId, beaconId);
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
