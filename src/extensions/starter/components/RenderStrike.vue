<template>
    <del v-if="isStrike">
        <slot />
    </del>
    <div v-else>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isStrike = computed(() => props.content.type === "strike");
</script>
