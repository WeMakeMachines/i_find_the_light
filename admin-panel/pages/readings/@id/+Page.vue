<template>
  <h1 class="mb-10">Readings</h1>
  <Readings :initial-readings="data.readings" />
</template>

<script lang="ts" setup>
import type { Data } from "./+data";
import { useData } from "vike-vue/useData";
import Readings from "./Readings.vue";

const data = useData<Data>();
</script>
