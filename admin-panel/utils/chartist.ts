import { AutoScaleAxis, LineChart } from "chartist";

import { humanReadableTime } from "../utils/date";

import type { LineChartData } from "chartist";
import type { Reading } from "../../shared/types";
import type { ReadingBeaconJoin } from "../../services/sqlite/queries/readings";

export type ChartDataInSeries = { name: string; data: ChartData[] };
export type ChartData = { x: number; y: number };
export type RangeAxisX = { low: number; high: number };

export function createLineChart(query: string, data: LineChartData, rangeAxisX: RangeAxisX) {
  const options = {
    showArea: true,
    axisX: {
      type: AutoScaleAxis,
      onlyInteger: true,
      low: rangeAxisX.low,
      high: rangeAxisX.high,
      scaleMinSpace: 40,
      labelInterpolationFnc: (value: number) => humanReadableTime(value),
    },
    axisY: {
      onlyInteger: true,
    },
  };

  return new LineChart(query, data, options);
}

export function getLowHighReadings(readings: Reading[] | ReadingBeaconJoin[]): RangeAxisX {
  const timestamps = readings.map((reading) => reading.timestamp).sort();

  const low = timestamps[0];
  const high = timestamps[timestamps.length - 1];

  return { low, high };
}
