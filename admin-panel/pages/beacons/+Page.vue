<template>
  <div>
    <h1>Registered Beacons</h1>
    <BeaconList :initial-beacon-list="data.beacons" />
  </div>
</template>

<script lang="ts" setup>
import type { Data } from "./+data";
import { useData } from "vike-vue/useData";
import BeaconList from "./BeaconList.vue";

const data = useData<Data>();
</script>
