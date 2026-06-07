export type CreateSurveyInput = {
  startTimestamp: number;
  endTimestamp: number;
  description?: string;
  pollIntervalSeconds?: number;
};

export type CreateReadingInput = {
  surveyId: number;
  beaconId: number;
  beaconTimestamp: number;
  lux: number;
  temperature: number;
};

export enum Unit {
  METRIC = 1,
  IMPERIAL = 2,
}

export enum ServerMode {
  SETUP = "setup",
  READ = "read",
}
