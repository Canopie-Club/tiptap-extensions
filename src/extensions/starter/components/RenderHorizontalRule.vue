<template>
    <hr v-if="isHorizontalRule" />
    <div v-else>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isHorizontalRule = computed(
    () => props.content.type === "horizontalRule",
);
</script>
