export type BeaconId = number;

export type Beacon = {
  id: BeaconId,
  name: string;
}

export type Reading = {
  beacon_id: BeaconId;
  lux: number;
  temperature: number;
  timestamp: number;
  unit: number;
};

export type ReadingBody = Reading[] | Reading;

export type HandshakeBody = { name: string };

export type HandshakeReply = {
  beacon_id: BeaconId;
  rtc_calibration: number;
  poll_interval_seconds: number;
  schedule_start: number;
  schedule_end: number;
  unit: number;
};
