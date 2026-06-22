import type { Reading } from "../../types/sqlite";

export function findGlobalMaximum(
  dataset: Record<string, unknown>[],
  key: string,
): { value: number | undefined; index: number | undefined } {
  const globalMaximum: { value: number | undefined; index: number | undefined } = {
    value: undefined,
    index: undefined,
  };

  dataset.forEach((record, index) => {
    const value = record[key];

    if (typeof value === "number") {
      if (globalMaximum.value === undefined || value > globalMaximum.value) {
        globalMaximum.value = Math.round(value);
        globalMaximum.index = index;
      }
    }
  });

  return globalMaximum;
}

export function mapLuxToLineChart(readings: Reading[]): { x: number; y: number }[] {
  const luxData = readings.map((reading) => {
    return { x: reading.readingTimestamp, y: Math.round(reading.lux) };
  });

  return luxData;
}
