<template>
  <node-view-wrapper class="fancy-border-node-view">
    <div class="fancy-border-controls">
      <div class="control-group">
        <label>Color:</label>
        <input type="color" :value="node.attrs.borderColor" @input="updateBorderColor" />
      </div>
      <div class="control-group">
        <label>Width:</label>
        <input 
          type="number" 
          :value="node.attrs.borderWidth" 
          @input="updateBorderWidth" 
          min="1" 
          max="10" 
        />
      </div>
      <div class="control-group">
        <label>Style:</label>
        <select :value="node.attrs.borderStyle" @change="updateBorderStyle">
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
          <option value="double">Double</option>
        </select>
      </div>
    </div>
    <div 
      class="fancy-border-content" 
      :style="{
        border: `${node.attrs.borderWidth}px ${node.attrs.borderStyle} ${node.attrs.borderColor}`,
        padding: '1rem',
        margin: '1rem 0',
        borderRadius: '0.25rem',
        backgroundColor: 'rgba(59, 130, 246, 0.05)'
      }"
    >
      <node-view-content />
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'

const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
  node: {
    type: Object,
    required: true,
  },
  updateAttributes: {
    type: Function,
    required: true,
  },
  extension: {
    type: Object,
    required: true,
  },
})

const updateBorderColor = (event: Event) => {
  const target = event.target as HTMLInputElement
  props.updateAttributes({
    borderColor: target.value,
  })
}

const updateBorderWidth = (event: Event) => {
  const target = event.target as HTMLInputElement
  props.updateAttributes({
    borderWidth: parseInt(target.value, 10) || 1,
  })
}

const updateBorderStyle = (event: Event) => {
  const target = event.target as HTMLSelectElement
  props.updateAttributes({
    borderStyle: target.value,
  })
}
</script>

<style scoped>
.fancy-border-node-view {
  position: relative;
  margin: 1rem 0;
}

.fancy-border-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  background-color: #f3f4f6;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-group label {
  font-size: 0.875rem;
  font-weight: 500;
}

.fancy-border-content {
  position: relative;
}
</style>