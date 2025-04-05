<template>
  <main>
    <h1>Readings</h1>
    <ReadingList :initial-reading-list="data.readings" />
  </main>
</template>

<script lang="ts" setup>
import type { Data } from "./+data";
import { useData } from "vike-vue/useData";
import ReadingList from "./ReadingList.vue";

const data = useData<Data>();
</script>
