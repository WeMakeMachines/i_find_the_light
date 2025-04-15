<template>
  <div v-if="readings">
    <h2>Chart</h2>
    <div id="chart" style="width: 100%; height: 400px"></div>
  </div>
  <div v-else><p>No readings collected</p></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import { createLineChart, ChartDataInSeries } from "../../utils/chartist";

import type { ReadingsByBeaconId } from "../../../shared/types";

const props = defineProps<{ initialReadings: ReadingsByBeaconId | null }>();
const readings = ref(props.initialReadings);

function mapLuxToLineChart(readings: ReadingsByBeaconId): { series: ChartDataInSeries[] } {
  const series: ChartDataInSeries[] = [];

  for (const [beaconId, beaconData] of Object.entries(readings)) {
    const luxData = beaconData.map((reading) => {
      return { x: reading.timestamp, y: reading.lux };
    });

    series.push({ name: beaconId.toString(), data: luxData });
  }

  console.log(series);

  return {
    series,
  };
}

onMounted(async () => {
  if (readings.value) {
    const lineChartData = mapLuxToLineChart(readings.value);

    createLineChart("#chart", lineChartData);
  }
});
</script>

<style>
.data-list {
  display: grid;
  grid-template-columns: max-content auto;
  row-gap: 0.5rem;
  column-gap: 1rem;
}
.data-list dt {
  font-weight: bold;
}
.data-list dd {
  margin: 0;
  color: #666;
}
</style>
