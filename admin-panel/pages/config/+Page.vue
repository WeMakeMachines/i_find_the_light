<template>
  <main>
    <h1>Beacon Config</h1>
    <Config :config="data.beaconConfig" />
  </main>
</template>

<script lang="ts" setup>
import type { Data } from "./+data";
import { useData } from "vike-vue/useData";
import Config from "./Config.vue";

const data = useData<Data>();
</script>
