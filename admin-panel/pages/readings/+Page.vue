<template>
  <main>
    <h1>Readings</h1>
    <Readings :initial-readings="data.readings" />
  </main>
</template>

<script lang="ts" setup>
import type { Data } from "./+data";
import { useData } from "vike-vue/useData";
import Readings from "./Readings.vue";

const data = useData<Data>();
</script>
