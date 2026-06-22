<template>
  <div v-if="hasReadings">
    <h2>Lux Chart</h2>
    <canvas id="lux-chart" style="width: 100%; height: 400px"></canvas>
  </div>
  <div v-else><p>No readings collected</p></div>
</template>

<script lang="ts" setup>
import "chartjs-adapter-date-fns";
import { Chart, registerables } from "chart.js";
import { onMounted, ref } from "vue";

import type { ReadingsByBeaconId } from "../../../../types/sqlite";

const props = defineProps<{ initialReadings: ReadingsByBeaconId }>();
const readingsByBeaconId = ref(props.initialReadings);
const hasReadings = readingsByBeaconId === null ? false : true;

onMounted(async () => {
  if (hasReadings) {
    Chart.register(...registerables);

    const ctx = document.getElementById("lux-chart");

    new Chart(ctx, {
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

function mapBeaconReadingsToLineChart(
  readings: ReadingsByBeaconId,
): { label: string; data: { x: number; y: number }[] }[] {
  const mappedReadings: { label: string; data: { x: number; y: number }[] }[] = [];

  for (const [beaconId, beaconData] of Object.entries(readings)) {
    const dataset = {
      label: `Beacon ID ${beaconId}`,
      data: beaconData.map((data) => ({ x: data.readingTimestamp, y: data.lux })),
    };

    mappedReadings.push(dataset);
  }

  return mappedReadings;
}
</script>
