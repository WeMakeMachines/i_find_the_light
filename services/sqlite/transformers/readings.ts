import type { ReadingWithId, ReadingsByBeaconId } from "../../../shared/types";

export function groupReadingsByBeaconId(readings: ReadingWithId[]): ReadingsByBeaconId {
  const results: ReadingsByBeaconId = {};

  const beaconIds: number[] = [...new Set(readings.map((reading) => reading.beacon_id))].sort((a, b) => Number(a > b));

  beaconIds.forEach((beaconId) => {
    const readingsFromBeacon = readings.filter((reading) => reading.beacon_id === beaconId);
    results[beaconId] = readingsFromBeacon;
  });

  return results;
}
