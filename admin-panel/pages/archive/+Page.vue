<template>
  <main>
    <h2 class="mb-10">Archive</h2>

    <SurveyList :surveys="archivedSurveys" @delete-survey="handleDeleteSurvey" />
  </main>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useData } from "vike-vue/useData";

import SurveyList from "./SurveyList.vue";

import { deleteSurvey } from "../../services/survey.service.js";
import type { Data } from "./+data";

const data = useData<Data>();

const archivedSurveys = ref(data.archivedSurveys);

async function handleDeleteSurvey(surveyId: number) {
  const response = await deleteSurvey(surveyId);

  if (response) {
    archivedSurveys.value = archivedSurveys.value.filter((survey) => survey.id !== surveyId);
  }
}
</script>
