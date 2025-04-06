<template>
  <ul>
    <li v-for="(item, index) in beaconList" :key="index">
      <span>Name: {{ item.name }}</span>
      <span
        ><Link :href="'beacon-detail/' + item.id"> ID: {{ item.id }}</Link></span
      >
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Beacon } from "../../../types/types";
import Link from "../../components/Link.vue";

const props = defineProps<{ initialBeaconList: Beacon[] }>();
const beaconList = ref(props.initialBeaconList);
</script>
