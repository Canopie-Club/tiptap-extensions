<template>
    <p v-if="isParagraph">
        <slot />
    </p>
    <div v-else>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isParagraph = computed(() => props.content.type === "paragraph");
</script>
