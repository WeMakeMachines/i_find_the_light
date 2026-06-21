<template>
  <main>
    <h2>Active Survey</h2>

    <SurveyList :surveys="activeSurveys" @deleteSurvey="handleDeleteActiveSurvey" class="mt-10 mb-10" />

    <h2>Drafted Surveys</h2>

    <div class="flex justify-end">
      <button
        @click="handleCreateSurvey"
        type="button"
        class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none"
      >
        <svg
          class="h-6 w-6 mr-2"
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
        Draft new survey
      </button>
    </div>

    <SurveyList :surveys="draftedSurveys" @deleteSurvey="handleDeleteDraftedSurvey" @editSurvey="handleEditSurvey" />

    <Modal
      :title="modalMode === 'create' ? 'Create Survey' : 'Edit Survey'"
      :visible="modalVisible"
      @cancelModal="resetModal"
    >
      <div class="mb-5">
        <h2 class="mb-2">Name</h2>
        <input
          v-model="editingSurvey.name"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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
import { deleteSurvey, updateSurvey } from "../../services/survey.service.js";

enum ModalMode {
  CREATE = "create",
  EDIT = "edit",
  NO_MODE = "no_mode",
}

const data = useData<Data>();

const surveyDefaults: Survey = {
  id: 0,
  name: "Survey",
  startTimestamp: getTodayAsTimestamp(),
  endTimestamp: getTodayAsTimestamp(),
  description: "",
  pollIntervalSeconds: 60,
  status: SurveyStatus.DRAFT,
};

const modalVisible = ref<boolean>(false);
const activeSurveys = ref(data.activeSurveys);
const draftedSurveys = ref(data.draftedSurveys);
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
  const survey = draftedSurveys.value.find((survey) => survey.id === id);
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
        draftedSurveys.value.push(newSurvey);
      }
      break;
    }

    case ModalMode.EDIT: {
      const response = await updateSurvey(editingSurvey.value.id, editingSurvey.value);

      if (response) {
        const index = draftedSurveys.value.findIndex((survey) => survey.id === response.id);
        if (index !== -1) draftedSurveys.value[index] = response;
      }
    }
  }

  resetModal();
}

async function handleDeleteActiveSurvey(surveyId: number) {
  const response = await deleteSurvey(surveyId);

  if (response) {
    activeSurveys.value = [];
  }
}

async function handleDeleteDraftedSurvey(surveyId: number) {
  const response = await deleteSurvey(surveyId);

  if (response) {
    draftedSurveys.value = draftedSurveys.value.filter((s) => s.id !== surveyId);
  }
}
</script>
