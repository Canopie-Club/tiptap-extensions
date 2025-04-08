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
import type { ImageSelectorOptions } from '../extension'

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

<style lang="scss" scoped>
.image-selector-node-view {
  @apply relative my-4;

  .image-selector-container {
    @apply relative w-full min-h-[120px] rounded-lg overflow-hidden;

    .image-placeholder {
      @apply bg-gray-100 flex flex-col items-center justify-center w-full h-full min-h-[200px] cursor-pointer transition-colors duration-200;

      &:hover {
        @apply bg-gray-200;
      }

      .placeholder-icon {
        @apply text-gray-500 mb-4;
      }

      .placeholder-text {
        @apply text-gray-500 text-sm;
      }
    }

    .image-container {
      @apply relative w-full;

      img {
        @apply block w-full h-auto object-contain;
      }

      .image-controls {
        @apply absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity duration-200;

        .control-button {
          @apply flex items-center justify-center w-8 h-8 bg-white/90 border-none rounded text-gray-500 cursor-pointer transition-colors duration-200;

          &:hover {
            @apply bg-white;
          }

          &.edit:hover {
            @apply text-blue-500;
          }

          &.remove:hover {
            @apply text-red-500;
          }
        }
      }

      &:hover {
        .image-controls {
          @apply opacity-100;
        }
      }
    }
  }
}
</style>