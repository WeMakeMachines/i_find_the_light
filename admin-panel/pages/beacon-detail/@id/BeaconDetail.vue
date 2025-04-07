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
      <dd>{{ humanReadableDateTime(readings[0].timestamp) }}</dd>
      <dt>Last reading:</dt>
      <dd>{{ humanReadableDateTime(readings[readings.length - 1].timestamp) }}</dd>
    </dl>
    <h2>Raw data</h2>
    <ul>
      <li v-for="(reading, index) in readings" :key="index">
        <dl class="data-list">
          <dt>Time</dt>
          <dd>{{ humanReadableTime(reading.timestamp) }}</dd>
          <dt>Temperature</dt>
          <dd>{{ reading.temperature }} {{ reading.unit === Unit.METRIC ? "C" : "F" }}</dd>
          <dt>Lux</dt>
          <dd>{{ reading.lux }}</dd>
        </dl>
      </li>
    </ul>
  </div>
  <div v-else><p>No readings collected</p></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ReadingBeaconJoin } from "../../../../services/sqlite/queries/readings";
import { humanReadableDateTime, humanReadableTime } from "../../../../helpers/date";
import { Unit } from "../../../../types/types";

const props = defineProps<{ initialReadings: ReadingBeaconJoin[] }>();
const readings = ref(props.initialReadings);
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
