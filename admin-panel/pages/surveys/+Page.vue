<template>
  <main>
    <h1>Surveys</h1>
    <SurveyList :initial-survey-list="data.surveys" />
  </main>
</template>

<script lang="ts" setup>
import type { Data } from "./+data";
import { useData } from "vike-vue/useData";
import SurveyList from "./SurveyList.vue";

const data = useData<Data>();
</script>
