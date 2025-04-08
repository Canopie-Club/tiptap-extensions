<template>
    <div class="fancy-border" :style="borderStyle">
        {{ content.text }}
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const borderStyle = computed(() => {
    const { borderColor, borderWidth, borderStyle } = props.content.attrs || {};
    return {
        border: `${borderWidth || 1}px ${borderStyle || "solid"} ${borderColor || "#000000"}`,
        padding: "1rem",
        margin: "1rem 0",
        borderRadius: "0.25rem",
    };
});
</script>

<style lang="scss" scoped>
.fancy-border {
    @apply block bg-blue-500/5;
}
</style>
