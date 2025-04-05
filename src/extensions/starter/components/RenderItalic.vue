<template>
    <em v-if="isItalic">
        <slot />
    </em>
    <div v-else>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isItalic = computed(() => props.content.type === "italic");
</script>
