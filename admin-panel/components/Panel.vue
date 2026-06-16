<template>
  <div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
    <div class="bg-gray-700 p-3">
      <slot name="header" />
    </div>
    <div class="p-3">
      <slot />
    </div>
  </div>
</template>
