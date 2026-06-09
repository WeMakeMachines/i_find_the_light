import type { Beacon } from "../types/sqlite";
import type { CreateBeaconInput } from "../types/types";

export class BeaconAlreadyRegisteredError extends Error {}
export class NoActiveSurveyError extends Error {}
export class SurveyArchivedError extends Error {}

export function makeBeaconService(surveysQueries: any, surveyBeaconsQueries: any) {
  return {
    getSurveyBeacons(surveyId: number) {
      return surveyBeaconsQueries.selectSurveyBeacons(surveyId);
    },

    createBeacon(createBeaconInput: CreateBeaconInput): Beacon {
      const activeSurvey = surveysQueries.selectActiveSurvey();

      if (activeSurvey === null) throw new NoActiveSurveyError("No configuration data to send as no survey is active");

      const existingBeacons = surveyBeaconsQueries.selectSurveyBeacons(activeSurvey.id);
      const alreadyRegistered = existingBeacons.find(
        (beacon: Beacon) => beacon.deviceKey === createBeaconInput.deviceKey,
      );

      if (alreadyRegistered) return alreadyRegistered;

      const beacon = {
        ...createBeaconInput,
        beaconId: existingBeacons.length + 1,
        surveyId: activeSurvey.id,
      };

      return surveyBeaconsQueries.insertSurveyBeacon(beacon);
    },

    deleteAllBeacons() {
      return surveyBeaconsQueries.deleteAllBeacons();
    },

    deleteAllSurveyBeacons(surveyId: number) {
      return surveyBeaconsQueries.deleteAllSurveyBeacons(surveyId);
    },

    deleteBeacon(surveyId: number, beaconId: number) {
      if (surveysQueries.checkSurveyIsNotArchived(surveyId)) {
        return surveyBeaconsQueries.deleteSurveyBeacon(surveyId, beaconId);
      } else throw new SurveyArchivedError("Unable to delete beacon, survey is archived");
    },
  };
}
