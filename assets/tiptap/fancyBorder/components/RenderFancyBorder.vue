<template>
  <div 
    class="fancy-border" 
    :style="borderStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { JSONContent } from '@tiptap/core';
import { computed } from 'vue';
import { renderComponent } from '../../starter/renderer';

const props = defineProps<{ content: JSONContent }>();

const borderStyle = computed(() => {
  const { borderColor, borderWidth, borderStyle } = props.content.attrs || {};
  return {
    border: `${borderWidth || 1}px ${borderStyle || 'solid'} ${borderColor || '#000000'}`,
    padding: '1rem',
    margin: '1rem 0',
    borderRadius: '0.25rem',
  };
});
</script>

<style scoped>
.fancy-border {
  display: block;
  background-color: rgba(59, 130, 246, 0.05);
}
</style>