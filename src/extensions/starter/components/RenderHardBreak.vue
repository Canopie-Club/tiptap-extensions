<template>
    <br v-if="isHardBreak" />
    <div v-else>
        {{ content.text }}
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isHardBreak = computed(() => props.content.type === "hardBreak");
</script>
