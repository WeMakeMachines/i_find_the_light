export type CreateBeaconInput = {
  beaconName: string;
  deviceKey: string; // Hardware UUID or MAC addres
};

export type CreateReadingInput = {
  surveyId: number;
  beaconId: number;
  readingTimestamp: number;
  lux: number;
  temperature: number;
};

export type CreateSurveyInput = {
  name?: string;
  startTimestamp: number;
  endTimestamp: number;
  description?: string;
  pollIntervalSeconds?: number;
};

export enum Unit {
  METRIC = 1,
  IMPERIAL = 2,
}

export type RequestBodyWithReading = CreateReadingInput[] | CreateReadingInput;

export type BeaconConfig = {
  beaconId: number;
  surveyId: number;
  pollIntervalSeconds: number;
  startTimestamp: number;
  endTimestamp: number;
  currentDateTime: number;
};
