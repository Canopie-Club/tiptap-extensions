<template>
    <blockquote v-if="isBlockquote">
        {{ content.text }}
        <slot />
    </blockquote>
    <div v-else>
        {{ content.text }}
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isBlockquote = computed(() => props.content.type === "blockquote");
</script>
