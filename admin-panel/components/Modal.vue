<template>
  <div
    v-if="visible"
    id="modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div @click="emit('cancelModal')" class="absolute inset-0 bg-black/50"></div>

    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow sm:p-5">
        <!-- Modal header -->
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ title }}
          </h3>
          <button
            @click="emit('cancelModal')"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <slot />
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  cancelModal: [];
}>();

const { title } = defineProps<{
  title: string;
  visible: boolean;
}>();
</script>
