<template>
  <div v-if="readings.length">
    <h2>Chart</h2>
    <div id="chart" style="width: 100%; height: 400px"></div>
  </div>
  <div v-else><p>No readings collected</p></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import { createLineChart, getLowHighReadings, ChartDataInSeries } from "../../utils/chartist";

import type { Reading } from "../../../shared/types";

const props = defineProps<{ initialReadings: Reading[] }>();
const readings = ref(props.initialReadings);

function getUniqueBeaconIds(readings: Reading[]): number[] {
  const beaconIds: number[] = readings.map((reading) => reading.beacon_id);

  return [...new Set(beaconIds)].sort();
}

function mapLuxToLineChart(readings: Reading[]): { series: ChartDataInSeries[] } {
  const beaconIds = getUniqueBeaconIds(readings);

  const series: ChartDataInSeries[] = [];

  beaconIds.forEach((beaconId: number) => {
    const beaconData = readings.filter((reading) => reading.beacon_id === beaconId);
    const luxData = beaconData.map((reading) => {
      return { x: reading.timestamp, y: reading.lux };
    });

    series.push({ name: beaconId.toString(), data: luxData });
  });

  return {
    series,
  };
}

onMounted(async () => {
  const lineChartData = mapLuxToLineChart(readings.value);
  const range = getLowHighReadings(readings.value);

  createLineChart("#chart", lineChartData, range);
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
