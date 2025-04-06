<template>
  <ul>
    <li v-for="(reading, index) in readings" :key="index">
      <span>Beacon ID: {{ reading.beacon_id }}</span>
      <span>Date: {{ new Date(reading.timestamp) }}</span>
      <span>Temperature: {{ reading.temperature }}</span>
      <span>Lux: {{ reading.lux }}</span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Reading } from "../../../../types/types";

const props = defineProps<{ initialReadings: Reading[] }>();
const readings = ref(props.initialReadings);
</script>
