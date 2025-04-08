<template>
  <div class="youtube-render" :class="{ 'responsive': attributes.responsive }">
    <div class="youtube-container">
      <iframe
        class="youtube-iframe"
        :src="youtubeUrl"
        :width="!attributes.responsive ? attributes.width : undefined"
        :height="!attributes.responsive ? attributes.height : undefined"
        frameborder="0"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  node: any;
  attributes: {
    videoId: string;
    src?: string;
    width: number;
    height: number;
    responsive: boolean;
    controls: boolean;
  };
}>()

// Compute YouTube URL from attributes, fallback to src if provided
const youtubeUrl = computed(() => {
  if (props.attributes.src) {
    return props.attributes.src
  }
  
  const controlsParam = props.attributes.controls ? '1' : '0'
  return `https://www.youtube.com/embed/${props.attributes.videoId}?enablejsapi=1&controls=${controlsParam}`
})
</script>

<style lang="scss" scoped>
.youtube-render {
  @apply mb-4;
  
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
</style>