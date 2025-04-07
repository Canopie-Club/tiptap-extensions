<template>
    <div class="tippy-bubble">
        <!-- <bubble-menu
            v-if="editor"
            :editor="editor"
            :tippy-options="{
                duration: 100,
                appendTo: append,
                onCreate: (instance) => {
                    console.log('Bubble menu created', instance);
                },
            }"
            plugin-key="bubbleMenuPlugin"
        > -->
        <div v-if="editor" class="bubble-menu-container">
            <button
                @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }"
                class="bubble-menu-button"
            >
                <span class="bubble-icon">B</span>
            </button>
            <button
                @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }"
                class="bubble-menu-button"
            >
                <span class="bubble-icon"><i>I</i></span>
            </button>
            <button
                @click="editor.chain().focus().toggleCode().run()"
                :class="{ 'is-active': editor.isActive('code') }"
                class="bubble-menu-button"
            >
                <span class="bubble-icon">&lt;/&gt;</span>
            </button>
            <button
                @click="editor.chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }"
                class="bubble-menu-button"
            >
                <span class="bubble-icon"><s>S</s></span>
            </button>
        </div>
        <!-- </bubble-menu> -->
    </div>
</template>

<script lang="ts" setup>
import { type Editor } from "@tiptap/vue-3";
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
            @apply bg-gray-50;
        }

        &.is-active {
            @apply bg-gray-100 text-gray-500;
        }

        .bubble-icon {
            @apply text-sm font-bold;
        }
    }
}
</style>
