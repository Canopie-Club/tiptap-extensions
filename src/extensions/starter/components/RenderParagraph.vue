<template>
    <p v-if="isParagraph">
        {{ content.text }}
        <slot />
    </p>
    <div v-else>
        {{ content.text }}
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isParagraph = computed(() => props.content.type === "paragraph");
</script>
