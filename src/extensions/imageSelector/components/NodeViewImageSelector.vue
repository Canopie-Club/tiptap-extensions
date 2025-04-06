<template>
  <node-view-wrapper class="image-selector-node-view">
    <div 
      class="image-selector-container"
      :class="{ 'has-image': !!node.attrs.src }"
    >
      <div v-if="!node.attrs.src" class="image-placeholder" @click="selectImage">
        <div class="placeholder-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <div class="placeholder-text">Click to select an image</div>
      </div>
      <div v-else class="image-container">
        <img :src="node.attrs.src" :alt="node.attrs.alt || ''" />
        <div class="image-controls">
          <button class="control-button edit" @click="selectImage" title="Change image">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button class="control-button remove" @click="removeImage" title="Remove image">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewWrapper } from '@tiptap/vue-3'
import { Editor } from '@tiptap/core'
import { ImageSelectorOptions } from '../extension'

const props = defineProps({
  editor: {
    type: Object as () => Editor,
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

const selectImage = async () => {
  const onSelectImage = props.extension.options.onSelectImage
  
  if (typeof onSelectImage === 'function') {
    try {
      const imageSrc = await onSelectImage(props.editor, props.node.attrs)
      
      if (imageSrc) {
        props.updateAttributes({
          src: imageSrc
        })
      }
    } catch (error) {
      console.error('Failed to select image:', error)
    }
  } else {
    console.warn('No image selection function provided to ImageSelector extension')
  }
}

const removeImage = () => {
  props.updateAttributes({
    src: null,
    alt: null,
    title: null
  })
}
</script>

<style scoped>
.image-selector-node-view {
  position: relative;
  margin: 1rem 0;
}

.image-selector-container {
  position: relative;
  width: 100%;
  min-height: 120px;
  border-radius: 0.5rem;
  overflow: hidden;
}

.image-placeholder {
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 200px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.image-placeholder:hover {
  background-color: #e5e7eb;
}

.placeholder-icon {
  color: #6b7280;
  margin-bottom: 1rem;
}

.placeholder-text {
  color: #6b7280;
  font-size: 0.9rem;
}

.image-container {
  position: relative;
  width: 100%;
}

.image-container img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.image-controls {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.image-container:hover .image-controls {
  opacity: 1;
}

.control-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 0.25rem;
  color: #6b7280;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.control-button:hover {
  background-color: white;
}

.control-button.edit:hover {
  color: #3b82f6;
}

.control-button.remove:hover {
  color: #ef4444;
}
</style>