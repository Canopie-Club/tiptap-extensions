<template>
    <pre v-if="isCodeBlock">
        <code>{{ content.text }}</code>
        <slot />
    </pre>
    <div v-else>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isCodeBlock = computed(() => props.content.type === "codeBlock");
</script>
