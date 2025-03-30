export type BeaconId = number | bigint;

export type Beacon = {
  id: BeaconId;
  name: string;
};

export type BeaconConfig = {
  pollIntervalSeconds: number;
  scheduleStart: number;
  scheduleEnd: number;
  unit: number;
};

export type Reading = {
  beacon_id: BeaconId;
  timestamp: number;
  lux: number;
  temperature: number;
  unit: number;
};

export type RequestBodyWithBeaconConfig = Partial<BeaconConfig>;

export type RequestBodyWithReading = Reading[] | Reading;

export type RequestBodyWithHandshake = { name: string };

export type ReplyBodyWithHandshake = {
  beacon_id: BeaconId;
  rtc_calibration: number;
  poll_interval_seconds: number;
  schedule_start: number;
  schedule_end: number;
  unit: number;
};
