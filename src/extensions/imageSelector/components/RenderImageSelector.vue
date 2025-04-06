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
  margin: 1rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
}

.image-selector-render img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.image-placeholder {
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 120px;
}

.placeholder-icon {
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.placeholder-text {
  color: #6b7280;
  font-size: 0.9rem;
}
</style>