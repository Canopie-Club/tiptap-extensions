<template>
    <ol v-if="isOrderedList">
        <slot />
    </ol>
    <div v-else>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isOrderedList = computed(() => props.content.type === "orderedList");
</script>
