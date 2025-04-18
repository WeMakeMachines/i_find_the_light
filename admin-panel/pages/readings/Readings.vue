<template>
  <div v-if="readings">
    <h2>Chart</h2>
    <ul>
      <li v-for="(beacon, index) in beacons" :key="beacon.id">
        <label>Beacon ID: {{ beacon.id }} <input type="checkbox" v-model="beacons[index].checked" /></label>
      </li>
    </ul>
    <div id="chart" style="width: 100%; height: 400px"></div>
  </div>
  <div v-else><p>No readings collected</p></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

import { createLineChart, ChartDataInSeries } from "../../utils/chartist";

import type { ReadingsByBeaconId } from "../../../shared/types";

import "chartist/dist/index.css";

const props = defineProps<{ initialReadings: ReadingsByBeaconId | null }>();
const readings = ref(props.initialReadings);
const beacons = ref(mapBeacons(readings.value));
const lineChartData = ref(mapLuxToLineChart(readings.value));

watch(
  () => beacons.value.map((b) => b.checked),
  () => {
    lineChartData.value = mapLuxToLineChart(readings.value);
    drawChart();
  },
);

function mapBeacons(readings: ReadingsByBeaconId | null) {
  if (!readings) return [];

  return Object.keys(readings).map((beaconId) => {
    return { id: beaconId, checked: true };
  });
}

function mapLuxToLineChart(readings: ReadingsByBeaconId | null): { series: ChartDataInSeries[] } | null {
  if (!readings) return null;

  const series: ChartDataInSeries[] = [];

  for (const [beaconId, beaconData] of Object.entries(readings)) {
    const beacon = beacons.value.find((beacon) => beacon.id === beaconId);

    if (beacon?.checked) {
      const luxData = beaconData.map((reading) => {
        return { x: reading.timestamp, y: reading.lux };
      });

      series.push({ name: beaconId.toString(), data: luxData });
    }
  }

  return {
    series,
  };
}

function drawChart() {
  if (lineChartData.value) {
    createLineChart("#chart", lineChartData.value);
  }
}

onMounted(async () => {
  drawChart();
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
