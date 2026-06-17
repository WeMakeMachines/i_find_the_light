<template>
  <a :class="{ active: isActive }" :style="disabled ? { pointerEvents: 'none', opacity: 0.3 } : {}">
    <slot />
  </a>
</template>

<script lang="ts" setup>
import { usePageContext } from "vike-vue/usePageContext";
import { computed, useAttrs } from "vue";

const pageContext = usePageContext();
const { disabled, href } = useAttrs();
const isActive = computed(() => {
  const { urlPathname } = pageContext;
  return href === "/" ? urlPathname === href : urlPathname.startsWith(href);
});
</script>

<style scoped>
a.active {
  background-color: #eee;
}
</style>
