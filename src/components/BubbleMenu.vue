<template>
  <div class="tippy-bubble">
    <div v-if="editor" class="bubble-menu-container">
      <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
          class="bubble-menu-button"
      >
        <span class="bubble-icon"><Icon icon="radix-icons:font-bold"/></span>
      </button>
      <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
          class="bubble-menu-button"
      >
        <span class="bubble-icon"><Icon icon="radix-icons:font-italic"/></span>
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({level: 1}).run()"
          :class="{ 'is-active': editor.isActive('heading', {level: 1}) }"
          class="bubble-menu-button"
      >
        <span class="bubble-icon"><Icon icon="radix-icons:heading"/></span>
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({level:2}).run()"
          :class="{ 'is-active': editor.isActive('heading', {level: 2}) }"
          class="bubble-menu-button"
      >
        <span class="bubble-icon"><Icon icon="radix-icons:heading" class="w-2 h-2"/></span>
      </button>
      <button
          @click="editor.chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
          class="bubble-menu-button"
      >
        <span class="bubble-icon"><Icon icon="radix-icons:code"/></span>
      </button>
      <button
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
          class="bubble-menu-button"
      >
        <span class="bubble-icon"><Icon icon="radix-icons:strikethrough"/></span>
      </button>
    </div>
    <!-- </bubble-menu> -->
  </div>
</template>

<script lang="ts" setup>
import {type Editor} from "@tiptap/vue-3";
import {Icon} from "@iconify/vue";
// import { BubbleMenu } from "@tiptap/vue-3";

defineProps<{
  editor?: Editor;
}>();
</script>

<style lang="scss">
.bubble-menu-container {
  @apply flex rounded-md bg-white p-1 shadow-lg;

  .bubble-menu-button {
    @apply flex h-8 w-8 cursor-pointer items-center justify-center rounded border-none bg-transparent transition-colors duration-200 mx-0.5;

    &:hover {
      @apply bg-gray-200;
    }

    &.is-active {
      @apply bg-gray-200 text-gray-500;
      &:hover {
        @apply bg-gray-300;
      }
    }

    .bubble-icon {
      @apply text-sm font-bold;
    }
  }
}
</style>
