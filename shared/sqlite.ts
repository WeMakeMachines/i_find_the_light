export type Survey = {
  id: number;
  description: string;
  poll_interval_seconds: number;
  unit: number;
  expected_beacons: number;
  active: boolean;
};
