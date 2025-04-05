<template>
    <blockquote v-if="isBlockquote">
        <slot />
    </blockquote>
    <div v-else>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isBlockquote = computed(() => props.content.type === "blockquote");
</script>
