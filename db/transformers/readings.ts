import type { ReadingWithBeaconName, ReadingsByBeaconId } from "../../../shared/sqlite";

export function groupReadingsByBeaconId(readings: ReadingWithBeaconName[]): ReadingsByBeaconId {
  const results: ReadingsByBeaconId = {};

  const beaconIds: number[] = [...new Set(readings.map((reading) => reading.beaconId))].sort((a, b) => Number(a > b));

  beaconIds.forEach((beaconId) => {
    const readingsFromBeacon = readings.filter((reading) => reading.beaconId === beaconId);
    results[beaconId] = readingsFromBeacon;
  });

  return results;
}
