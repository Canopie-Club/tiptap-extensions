<template>
    <code v-if="isCode">
        <slot />
    </code>
    <div v-else>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isCode = computed(() => props.content.type === "code");
</script>
