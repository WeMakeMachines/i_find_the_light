export type BeaconId = number | bigint;

export type Beacon = {
  id: BeaconId;
  name: string;
};

export type Reading = {
  beacon_id: number;
  timestamp: number;
  lux: number;
  temperature: number;
  unit: Unit;
};

export enum Unit {
  METRIC = 1,
  IMPERIAL = 2,
}
