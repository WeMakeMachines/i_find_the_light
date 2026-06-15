<template>
  <div v-if="surveys.length" class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-4 py-3">id</th>
            <th scope="col" class="px-4 py-3">Start</th>
            <th scope="col" class="px-4 py-3">End</th>
            <th scope="col" class="px-4 py-3">Polling</th>
            <th scope="col" class="px-4 py-3">Status</th>
            <th scope="col" class="px-4 py-3"></th>
            <th scope="col" class="px-4 py-3"></th>
            <th scope="col" class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="survey in surveys" :key="survey.id" class="border-b border-dotted">
            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ survey.id }}
            </th>
            <td class="px-4 py-3">
              <p>{{ humanReadableDate(survey.startTimestamp) }}</p>
              <p>{{ humanReadableTime(survey.startTimestamp) }}</p>
            </td>
            <td class="px-4 py-3">
              <p>{{ humanReadableDate(survey.endTimestamp) }}</p>
              <p>{{ humanReadableTime(survey.endTimestamp) }}</p>
            </td>
            <td class="px-4 py-3">{{ survey.pollIntervalSeconds }}s</td>
            <td class="px-4 py-3">
              <span class="border text-xs font-medium px-1.5 py-0.5 rounded">{{ survey.status }}</span>
            </td>
            <td class="px-4 py-3">
              <div v-if="survey.status === SurveyStatus.DRAFT" class="grid-row">
                <button
                  @click="editSurvey(survey.id)"
                  type="button"
                  class="text-white bg-yellow-500 inline-flex items-center hover:text-white hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:text-yellow-500 dark:hover:text-white dark:hover:bg-yellow-600 dark:focus:ring-yellow-900"
                >
                  Edit
                </button>
              </div>
            </td>
            <td class="px-4 py-3">
              <button
                type="button"
                class="text-white bg-green-500 inline-flex items-center hover:text-white hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
              >
                View
              </button>
            </td>
            <td class="px-4 py-3">
              <button
                @click="deleteSurvey(survey.id)"
                type="button"
                class="text-red-300 inline-flex items-center hover:text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm pl-4 pr-2 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                <svg
                  class="w-5 h-5 mr-1 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>No surveys</div>
</template>

<script lang="ts" setup>
import type { Survey } from "../../../types/sqlite";
import { humanReadableDate, humanReadableTime } from "../../utils/date";
import { SurveyStatus } from "../../../types/sqlite";

defineProps<{
  surveys: Survey[];
  archived: boolean;
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
