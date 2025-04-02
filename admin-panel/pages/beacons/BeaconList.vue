<template>
  <ul>
    <li v-for="(item, index) in beaconList" :key="index">
      <span>Name: {{ item.name }}</span>
      <span>ID: {{ item.id }}</span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Beacon } from "../../../types/types";

const props = defineProps<{ initialBeaconList: Beacon[] }>();
const beaconList = ref(props.initialBeaconList);
</script>
