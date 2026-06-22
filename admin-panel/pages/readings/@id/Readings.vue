<template>
  <div v-if="hasReadings">
    <h2>Lux Chart</h2>
    <ul class="grid grid-cols-3 gap-2 w-fit">
      <li v-for="(beacon, index) in beacons" :key="beacon.id" class="border-b border-dotted">
        <label>Beacon ID: {{ beacon.id }} <input type="checkbox" v-model="beacons[index].checked" /></label>
      </li>
    </ul>
    <canvas id="lux-chart" style="width: 100%; height: 400px"></canvas>
  </div>
  <div v-else><p>No readings collected</p></div>
</template>

<script lang="ts" setup>
import "chartjs-adapter-date-fns";
import { Chart, registerables } from "chart.js";
import { onMounted, ref, watch } from "vue";

import type { ReadingsByBeaconId } from "../../../../types/sqlite";

const props = defineProps<{ initialReadings: ReadingsByBeaconId }>();
const readingsByBeaconId = ref(props.initialReadings);
const hasReadings = readingsByBeaconId === null ? false : true;
const beacons = ref(mapBeacons(readingsByBeaconId.value));

let chart: Chart | null = null;

onMounted(async () => {
  if (hasReadings) {
    Chart.register(...registerables);

    const ctx = document.getElementById("lux-chart");

    chart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: mapBeaconReadingsToLineChart(readingsByBeaconId.value),
      },
      options: {
        scales: {
          x: {
            type: "time",
          },
        },
      },
    });
  }
});

watch(
  beacons,
  () => {
    if (chart === null) return;

    chart.data.datasets = mapBeaconReadingsToLineChart(readingsByBeaconId.value);
    chart.update("none");
  },
  { deep: true },
);

function mapBeacons(readings: ReadingsByBeaconId | null): { id: string; checked: boolean }[] {
  if (!readings) return [];

  return Object.keys(readings).map((beaconId) => ({ id: beaconId, checked: true }));
}

function mapBeaconReadingsToLineChart(
  readings: ReadingsByBeaconId,
): { label: string; data: { x: number; y: number }[] }[] {
  const mappedReadings: { label: string; data: { x: number; y: number }[] }[] = [];

  for (const [beaconId, beaconData] of Object.entries(readings)) {
    // check if beaconId has been unchecked
    const checked = Boolean(beacons.value.find((beacon) => beacon.id === beaconId && beacon.checked));

    if (!checked) continue;

    const dataset = {
      label: `ID ${beaconId}`,
      data: beaconData.map((data) => ({ x: data.readingTimestamp, y: data.lux })),
    };

    mappedReadings.push(dataset);
  }

  return mappedReadings;
}
</script>
