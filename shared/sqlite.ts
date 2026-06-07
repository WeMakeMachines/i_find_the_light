import type { CreateSurveyInput, CreateReadingInput } from "./types";

export type Survey = CreateSurveyInput & {
  id: number;
  status: string;
};

export type Reading = CreateReadingInput & {
  id: number;
  serverTimestamp: number;
};

export type Beacon = {
  beaconId: number;
  beaconName: string;
  deviceKey: string; // Hardware UUID or MAC addres
  surveyId: number;
};

export type ReadingWithBeaconName = Reading & {
  name: string;
};

export type ReadingsByBeaconId = {
  [id: number]: ReadingWithBeaconName[];
};

export enum SurveyStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  ARCHIVED = "archived",
}
