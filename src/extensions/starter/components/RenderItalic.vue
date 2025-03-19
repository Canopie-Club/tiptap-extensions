<template>
    <em v-if="isItalic">
        {{ content.text }}
        <slot />
    </em>
    <div v-else>
        {{ content.text }}
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isItalic = computed(() => props.content.type === "italic");
</script>
