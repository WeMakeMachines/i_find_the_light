<template>
  <main>
    <h2 class="mb-10">Archive</h2>

    <SurveyList :surveys="archivedSurveys" />
  </main>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useData } from "vike-vue/useData";

import SurveyList from "./SurveyList.vue";

import type { Data } from "./+data";

const data = useData<Data>();

const archivedSurveys = ref(data.archivedSurveys);
</script>
