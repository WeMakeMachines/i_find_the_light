<template>
  <h1 class="mb-10">Active Beacons</h1>
  <p>Here you can see all beacons currently registered on the active survey.</p>
  <template v-if="activeSurveyId !== null">
    <p class="mb-10">All beacons below are assigned to survey ID {{ activeSurveyId }}.</p>
    <template v-if="beacons.length">
      <BeaconList :beacon-list="beacons" @delete-beacon="handleDeleteBeacon" />
    </template>
  </template>
  <template v-else>
    <p>You currently do not have an active survey.</p>
  </template>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useData } from "vike-vue/useData";
import BeaconList from "./BeaconList.vue";

import type { Data } from "./+data";
import { Beacon } from "../../../types/sqlite";

const data = useData<Data>();
const activeSurveyId = data.activeSurveyId;
const beacons = ref<Beacon[]>(data.beacons);

function handleDeleteBeacon(beaconId: number) {
  if (activeSurveyId !== null) deleteBeacon(activeSurveyId, beaconId);
}

async function deleteBeacon(surveyId: number, beaconId: number) {
  try {
    const res = await fetch(`/surveys/${surveyId}/beacons/${beaconId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const updatedBeacons = beacons.value.filter((beacon) => beacon.beaconId !== beaconId);
      beacons.value = updatedBeacons;
    } else {
    }
  } catch (err) {}
}
</script>
