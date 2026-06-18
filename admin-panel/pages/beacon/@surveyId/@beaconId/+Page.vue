<template>
  <h1 class="mb-10">Beacon (ID: {{ beaconId }})</h1>
  <Panel class="pb-20 mb-10">
    <template #header><h3 class="text-white text-lg font-semibold">Details</h3></template>
    <div class="flex">
      <div class="mr-10">
        <div class="flex">
          <p class="w-45">Self reported name:</p>
          <p class="font-bold">{{ beacon.beaconName }}</p>
        </div>
        <div class="flex">
          <p class="w-45">Assigned to survey id:</p>
          <p class="font-bold">{{ surveyId }}</p>
        </div>
        <div class="flex">
          <p class="w-45">Device Key:</p>
          <p class="font-bold">{{ beacon.deviceKey }}</p>
        </div>
      </div>
      <div>
        <div class="flex">
          <p class="w-45">Total readings:</p>
          <p class="font-bold">{{ readings.length }}</p>
        </div>
        <div class="flex">
          <p class="w-45">First seen:</p>
          <p class="font-bold">
            <template v-if="readings.length">
              <p>
                {{ humanReadableDate(readings[0].readingTimestamp) }}
                {{ humanReadableTime(readings[0].readingTimestamp) }}
              </p>
            </template>
          </p>
        </div>
        <div class="flex">
          <p class="w-45">Last seen:</p>
          <p class="font-bold">
            <template v-if="readings.length">
              <p>
                {{ humanReadableDate(readings[readings.length - 1].readingTimestamp) }}
                {{ humanReadableTime(readings[readings.length - 1].readingTimestamp) }}
              </p>
            </template>
          </p>
        </div>
      </div>
    </div>
    <div class="absolute bottom-3 left-3">
      <Link
        :disabled="Boolean(!readings.length)"
        class="flex text-white bg-green-500 inline-flex items-center hover:text-white hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
      >
        <svg
          class="w-6 h-6 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2"
            d="M16.0001 7.99997c-1.629-1.629-3.9007-1.91488-6.06614.25057C7.76851 10.416 2.82151 18.0286 4.4505 19.6576c1.629 1.629 9.2416-3.318 11.4071-5.4834 2.0932-2.0933 1.7715-4.54524.1425-6.17423Zm0 0 3.2595-3.15144m-3.2595 3.15144V4m0 3.99997 4 .00002m-3.7978 5.80211-2.1999-2.2155M8.30216 10.211l2.07194 2.0421m-1.25873 3.1838 2.11173 2.1633"
          />
        </svg>

        Raw Data
      </Link>
    </div>
  </Panel>

  <h2>Chart</h2>
  <div id="chart" style="width: 100%; height: 400px"></div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useData } from "vike-vue/useData";

import Link from "../../../../components/Link.vue";
import Panel from "../../../../components/Panel.vue";

import { createLineChart, ChartData } from "../../../../utils/chartist";
import { humanReadableDate, humanReadableTime } from "../../../../utils/date";
import { Reading } from "../../../../../types/sqlite";

import type { Data } from "./+data";
import "chartist/dist/index.css";

const { beacon, beaconId, readings, surveyId } = useData<Data>();

onMounted(async () => {
  const lineChartData = mapLuxToLineChart(readings);

  createLineChart("#chart", lineChartData);
});

function mapLuxToLineChart(readings: Reading[]): { series: [ChartData[]] } {
  const luxData = readings.map((reading) => {
    return { x: reading.readingTimestamp, y: reading.lux };
  });

  return {
    series: [luxData],
  };
}
</script>
