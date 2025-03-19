<template>
    <li v-if="isListItem">
        {{ content.text }}
        <slot />
    </li>
    <div v-else>
        {{ content.text }}
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isListItem = computed(() => props.content.type === "listItem");
</script>
