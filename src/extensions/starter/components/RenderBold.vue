<template>
    <strong v-if="isBold">
        {{ content.text }}
        <slot />
    </strong>
    <div v-else>
        {{ content.text }}
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isBold = computed(() => props.content.type === "bold");
</script>
