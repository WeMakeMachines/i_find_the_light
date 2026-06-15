<template>
  <main>
    <h2>Surveys</h2>

    <div class="flex justify-end">
      <button
        @click="handleCreateSurvey"
        type="button"
        class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none"
      >
        <svg
          class="h-3.5 w-3.5 mr-2"
          fill="currentColor"
          viewbox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          />
        </svg>
        Create survey
      </button>
    </div>

    <SurveyList
      :surveys="surveys"
      :archived="false"
      @deleteSurvey="deleteSurvey"
      @editSurvey="handleEditSurvey"
      class="mb-10"
    />

    <h2>Archived Surveys</h2>
    <SurveyList :surveys="archivedSurveys" :archived="true" />

    <Modal
      :title="modalMode === 'create' ? 'Create Survey' : 'Edit Survey'"
      :visible="modalVisible"
      @cancelModal="resetModal"
    >
      <div class="flex mb-5">
        <div class="mr-10">
          <h2 class="mb-2">Start date / time</h2>
          <DateTimeInput v-model="editingSurvey.startTimestamp" />
        </div>

        <div>
          <h2 class="mb-2">End date / time</h2>
          <DateTimeInput v-model="editingSurvey.endTimestamp" />
        </div>
      </div>

      <div class="mb-5">
        <h2 class="mb-2">Polling interval (seconds)</h2>
        <input
          v-model.number="editingSurvey.pollIntervalSeconds"
          type="number"
          min="1"
          max="21600"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="mb-5">
        <h2 class="mb-2">Description</h2>
        <textarea
          v-model="editingSurvey.description"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <template #actions>
        <div class="flex items-center space-x-4">
          <button
            @click="handleSubmitSurvey"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Save
          </button>
        </div>
      </template>
    </Modal>
  </main>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useData } from "vike-vue/useData";

import DateTimeInput from "./DateTimeInput.vue";
import Modal from "../../components/Modal.vue";
import SurveyList from "./SurveyList.vue";

import { getTodayAsTimestamp } from "../../utils/date.js";
import type { Data } from "./+data";
import { SurveyStatus, type Survey } from "../../../types/sqlite";

enum ModalMode {
  CREATE = "create",
  EDIT = "edit",
  NO_MODE = "no_mode",
}

const data = useData<Data>();

const surveyDefaults: Survey = {
  id: 0,
  startTimestamp: getTodayAsTimestamp(),
  endTimestamp: getTodayAsTimestamp(),
  description: "",
  pollIntervalSeconds: 60,
  status: SurveyStatus.DRAFT,
};

const modalVisible = ref<boolean>(false);
const surveys = ref(data.surveys);
const archivedSurveys = ref(data.archivedSurveys);
const editingSurvey = ref<Survey>(surveyDefaults);
const modalMode = ref<ModalMode>(ModalMode.NO_MODE);

function resetModal() {
  editingSurvey.value = surveyDefaults;
  modalVisible.value = false;
  modalMode.value = ModalMode.NO_MODE;
}

function handleCreateSurvey() {
  editingSurvey.value = surveyDefaults;
  modalMode.value = ModalMode.CREATE;
  modalVisible.value = true;
}

function handleEditSurvey(id: number) {
  const survey = surveys.value.find((survey) => survey.id === id);
  if (!survey) return;

  modalMode.value = ModalMode.EDIT;
  editingSurvey.value = survey;
  modalVisible.value = true;
}

async function handleSubmitSurvey() {
  switch (modalMode.value) {
    case ModalMode.CREATE: {
      const res = await fetch(`/surveys/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSurvey.value),
      });

      if (res.ok) {
        const newSurvey = await res.json();
        surveys.value.push(newSurvey);
      }
      break;
    }

    case ModalMode.EDIT: {
      const res = await fetch(`/surveys/${editingSurvey.value.id}/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSurvey.value),
      });

      if (res.ok) {
        const updated = await res.json();
        const idx = surveys.value.findIndex((s) => s.id === updated.id);
        if (idx !== -1) surveys.value[idx] = updated;
      }
    }
  }

  resetModal();
}

async function deleteSurvey(surveyId: number) {
  const res = await fetch(`/surveys/${surveyId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    surveys.value = surveys.value.filter((s) => s.id !== surveyId);
  }
}
</script>
