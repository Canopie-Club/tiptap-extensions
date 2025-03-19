<template>
    <code v-if="isCode">
        {{ content.text }}
        <slot />
    </code>
    <div v-else>
        {{ content.text }}
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isCode = computed(() => props.content.type === "code");
</script>
