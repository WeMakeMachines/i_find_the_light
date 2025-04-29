<template>
  <p v-if="message">{{ message }}</p>
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>Description</th>
        <th>Poll interval (seconds)</th>
        <th>Expected beacons</th>
        <th>Unit</th>
        <th>Active?</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="survey in surveyList" :key="survey.id">
        <td>{{ survey.id }}</td>
        <td>{{ survey.description }}</td>
        <td>{{ survey.poll_interval_seconds }}</td>
        <td>{{ survey.expected_beacons }}</td>
        <td>{{ survey.unit }}</td>
        <td v-if="survey.active">Active!</td>
        <td v-else><button @click="activateSurvey(survey.id)">Activate</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import type { Survey } from "../../../shared/sqlite";

const message = ref("");
const props = defineProps<{ initialSurveyList: Survey[] }>();
const surveyList = ref(props.initialSurveyList);

async function activateSurvey(surveyId: number) {
  try {
    const res = await fetch(`/survey/activate/${surveyId}`, {
      method: "PATCH",
    });
    if (res.ok) {
      message.value = "Updated";
      updateSetActiveSurvey(surveyId);
    } else {
      message.value = "Something went wrong.";
    }
  } catch (err) {
    message.value = "Error: " + err.message;
  }
}

function updateSetActiveSurvey(id: number) {
  surveyList.value = surveyList.value.map((survey) => {
    return survey.id === id ? { ...survey, active: true } : { ...survey, active: false };
  });
}
</script>
