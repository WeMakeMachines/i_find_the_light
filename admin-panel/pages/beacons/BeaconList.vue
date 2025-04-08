<template>
  <ul>
    <li v-for="(item, index) in beaconList" :key="index">
      <span>{{ item.name }} / id {{ item.id }}</span>
      <span><Link :href="'beacon-detail/' + item.id"> Details </Link></span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import Link from "../../components/Link.vue";

import type { Beacon } from "../../../shared/types";

const props = defineProps<{ initialBeaconList: Beacon[] }>();
const beaconList = ref(props.initialBeaconList);
</script>
