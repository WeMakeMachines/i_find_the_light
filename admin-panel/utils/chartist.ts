import { AutoScaleAxis, LineChart } from "chartist";

import { humanReadableTime } from "../utils/date";

import type { LineChartData } from "chartist";

export type ChartDataInSeries = { name: string; data: ChartData[] };
export type ChartData = { x: number; y: number };

export function createLineChart(query: string, data: LineChartData) {
  const options = {
    showArea: true,
    axisX: {
      type: AutoScaleAxis,
      onlyInteger: true,
      scaleMinSpace: 40,
      labelInterpolationFnc: (value: number) => humanReadableTime(value),
    },
    axisY: {
      onlyInteger: true,
    },
  };

  return new LineChart(query, data, options);
}
