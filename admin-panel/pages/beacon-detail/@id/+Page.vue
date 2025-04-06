<template>
  <div>
    <h1>Beacon {{ data.beaconId }}</h1>
    <BeaconDetail :initial-readings="data.readings" />
  </div>
</template>

<script lang="ts" setup>
import type { Data } from "./+data";
import { useData } from "vike-vue/useData";
import BeaconDetail from "./BeaconDetail.vue";

const data = useData<Data>();
</script>
