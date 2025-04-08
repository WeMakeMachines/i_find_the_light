<template>
  <div v-if="readings.length">
    <dl class="data-list">
      <dt>Assigned id:</dt>
      <dd>{{ readings[0].id }}</dd>
      <dt>Self reported name:</dt>
      <dd>{{ readings[0].name }}</dd>
      <dt>Total readings:</dt>
      <dd>{{ readings.length }}</dd>
      <dt>First reading:</dt>
      <dd>{{ humanReadableDateTime(readings[0].timestamp * 1000) }}</dd>
      <dt>Last reading:</dt>
      <dd>{{ humanReadableDateTime(readings[readings.length - 1].timestamp * 1000) }}</dd>
    </dl>
    <h2>Raw data</h2>
    <button @click="showRawData = !showRawData">Show / hide</button>
    <ul v-if="showRawData">
      <li v-for="(reading, index) in readings" :key="index">
        <dl class="data-list">
          <dt>Time</dt>
          <dd>{{ humanReadableTime(reading.timestamp * 1000) }}</dd>
          <dt>Temperature</dt>
          <dd>{{ reading.temperature }} {{ reading.unit === Unit.METRIC ? "C" : "F" }}</dd>
          <dt>Lux</dt>
          <dd>{{ reading.lux }}</dd>
        </dl>
      </li>
    </ul>
    <h2>Chart</h2>
    <div id="chart" style="width: 100%; height: 400px"></div>
  </div>
  <div v-else><p>No readings collected</p></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import { humanReadableDateTime, humanReadableTime } from "../../../utils/date";
import { createLineChart, getLowHighReadings, ChartData } from "../../../utils/chartist";

import { Unit } from "../../../../types/types";
import type { ReadingBeaconJoin } from "../../../../services/sqlite/queries/readings";

const props = defineProps<{ initialReadings: ReadingBeaconJoin[] }>();
const readings = ref(props.initialReadings);
const showRawData = ref(false);

function mapLuxToLineChart(readings: ReadingBeaconJoin[]): { series: [ChartData[]] } {
  const luxData = readings.map((reading) => {
    return { x: reading.timestamp, y: reading.lux };
  });

  return {
    series: [luxData],
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
