<template>
    <div v-if="isDocument">
        {{ content.text }}
        <slot />
    </div>
    <div v-else>
        {{ content.text }}
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isDocument = computed(() => props.content.type === "doc");
</script>
