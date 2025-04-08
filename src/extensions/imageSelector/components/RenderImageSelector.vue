<template>
  <div class="image-selector-render">
    <img v-if="content.attrs?.src" 
         :src="content.attrs.src" 
         :alt="content.attrs.alt || ''" 
         :title="content.attrs.title || ''" />
    <div v-else class="image-placeholder">
      <div class="placeholder-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
      <div class="placeholder-text">No image selected</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";

defineProps<{ content: JSONContent }>();
</script>

<style scoped>
.image-selector-render {
  @apply my-4 rounded-lg overflow-hidden;
}

.image-selector-render img {
  @apply block w-full h-auto object-contain;
}

.image-placeholder {
  @apply bg-gray-100 flex flex-col items-center justify-center w-full h-full min-h-[120px];
}

.placeholder-icon {
  @apply text-gray-500 mb-2;
}

.placeholder-text {
  @apply text-gray-500 text-sm;
}
</style>