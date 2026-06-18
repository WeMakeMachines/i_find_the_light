<template>
  <a
    :href="`${basePath}/${href}`"
    :class="{ active: isActive }"
    :style="disabled ? { pointerEvents: 'none', opacity: 0.3 } : {}"
  >
    <slot />
  </a>
</template>

<script lang="ts" setup>
import { usePageContext } from "vike-vue/usePageContext";
import { computed } from "vue";

const pageContext = usePageContext();

const { href, disabled } = defineProps<{
  href: string;
  disabled?: boolean;
}>();

const isActive = computed(() => {
  const { urlPathname } = pageContext;

  return urlPathname.includes(href);
});

const basePath = import.meta.env.VITE_BASE_PATH;
</script>

<style scoped>
a.active {
  background-color: #eee;
}
</style>
