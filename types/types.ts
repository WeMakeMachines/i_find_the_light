import type { BeaconId, Reading } from "../shared/types";
import type { BeaconConfigProps } from "../config/beacon.config";

export type RequestBodyWithBeaconConfig = Partial<BeaconConfigProps>;

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
