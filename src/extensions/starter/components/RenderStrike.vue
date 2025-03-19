<template>
    <del v-if="isStrike">
        {{ content.text }}
        <slot />
    </del>
    <div v-else>
        {{ content.text }}
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isStrike = computed(() => props.content.type === "strike");
</script>
