<template>
  <node-view-wrapper class="youtube-wrapper" :class="{ 'responsive': node.attrs.responsive }">
    <div class="youtube-container">
      <iframe
        class="youtube-iframe"
        :src="node.attrs.src"
        :width="!node.attrs.responsive ? node.attrs.width : undefined"
        :height="!node.attrs.responsive ? node.attrs.height : undefined"
        frameborder="0"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
    <div class="youtube-controls">
      <div class="youtube-controls-group">
        <button @click="openSettings" class="youtube-control-button">
          <span class="icon">⚙️</span>
          <span>Settings</span>
        </button>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps(['editor', 'node', 'updateAttributes', 'deleteNode'])

const openSettings = () => {
  // Extract current videoId from src to pre-fill the prompt
  const currentId = props.node.attrs.videoId
  
  const input = prompt('YouTube Video ID or URL:', currentId)
  
  if (input === null) return // User cancelled
  
  if (!input.trim()) {
    // If empty input, user wants to remove the video
    props.deleteNode()
    return
  }
  
  // Extract video ID if full URL was provided
  const matches = {
    // youtu.be URL
    shortUrl: /youtu\.be\/([a-zA-Z0-9_-]+)/.exec(input),
    // Regular youtube.com URL with v= parameter
    standardUrl: /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/.exec(input),
    // Embed youtube.com URL
    embedUrl: /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/.exec(input)
  }
  
  const extractedId = matches.shortUrl?.[1] || 
                     matches.standardUrl?.[1] || 
                     matches.embedUrl?.[1] || 
                     (input.length === 11 ? input : null)
  
  if (extractedId) {
    // Update the node with the new video ID
    props.updateAttributes({
      videoId: extractedId,
      src: `https://www.youtube.com/embed/${extractedId}?enablejsapi=1&controls=${props.node.attrs.controls ? '1' : '0'}`
    })
  } else {
    alert('Invalid YouTube URL or video ID')
  }
}
</script>

<style lang="scss" scoped>
.youtube-wrapper {
  @apply relative mb-4;
  
  &.responsive {
    @apply w-full;
    
    .youtube-container {
      @apply relative w-full pb-[56.25%];
      
      .youtube-iframe {
        @apply absolute top-0 left-0 w-full h-full;
      }
    }
  }
}

.youtube-controls {
  @apply flex justify-center mt-2;

  .youtube-controls-group {
    @apply flex space-x-2;
  }
  
  .youtube-control-button {
    @apply flex items-center px-2 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition-colors;
    
    .icon {
      @apply mr-1;
    }
  }
}
</style>