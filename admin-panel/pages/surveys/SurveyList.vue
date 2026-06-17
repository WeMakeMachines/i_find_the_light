<style scoped>
@reference "tailwindcss";

.grid-header {
  @apply p-2 bg-gray-700 text-white text-left whitespace-nowrap text-xs leading-6 font-semibold uppercase;
}

.grid-row {
  @apply p-2 text-left whitespace-nowrap text-sm leading-6 font-medium text-gray-900;
}
</style>

<template>
  <div v-if="surveys.length" class="bg-white relative shadow-md sm:rounded-lg overflow-hidden overflow-x-auto">
    <div class="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_3fr]">
      <div class="grid-header">id</div>
      <div class="grid-header">name</div>
      <div class="grid-header">Start</div>
      <div class="grid-header">End</div>
      <div class="grid-header">Polling</div>
      <div class="grid-header"></div>
      <template v-for="survey in surveys" :key="survey.id">
        <div class="grid-row">{{ survey.id }}</div>
        <div class="grid-row">{{ survey.name }}</div>

        <div class="grid-row">
          <p>{{ humanReadableDate(survey.startTimestamp) }}</p>
          <p>{{ humanReadableTime(survey.startTimestamp) }}</p>
        </div>

        <div class="grid-row">
          <p>{{ humanReadableDate(survey.endTimestamp) }}</p>
          <p>{{ humanReadableTime(survey.endTimestamp) }}</p>
        </div>

        <div class="grid-row">{{ survey.pollIntervalSeconds }}s</div>

        <div class="grid-row text-center justify-self-end">
          <template v-if="survey.status === SurveyStatus.DRAFT">
            <button
              @click="editSurvey(survey.id)"
              type="button"
              class="text-white bg-yellow-500 inline-flex items-center hover:text-white hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
            >
              <svg
                class="w-6 h-6 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                />
              </svg>

              Edit
            </button>
          </template>

          <Link
            :href="'survey-detail/' + survey.id"
            class="ml-5 flex text-white bg-green-500 inline-flex items-center hover:text-white hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
          >
            <svg
              class="w-6 h-6 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
            View
          </Link>
          <button
            @click="deleteSurvey(survey.id)"
            type="button"
            class="ml-5 text-red-300 inline-flex items-center hover:text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm pl-4 pr-2 py-2 text-center"
          >
            <svg class="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </template>
    </div>
  </div>
  <div v-else>No data</div>
</template>

<script lang="ts" setup>
import Link from "../../components/Link.vue";

import type { Survey } from "../../../types/sqlite";
import { humanReadableDate, humanReadableTime } from "../../utils/date";
import { SurveyStatus } from "../../../types/sqlite";

defineProps<{
  surveys: Survey[];
}>();

const emit = defineEmits<{
  (e: "deleteSurvey", id: number): void;
  (e: "editSurvey", id: number): void;
}>();

function deleteSurvey(id: number) {
  emit("deleteSurvey", id);
}

function editSurvey(id: number) {
  emit("editSurvey", id);
}
</script>
