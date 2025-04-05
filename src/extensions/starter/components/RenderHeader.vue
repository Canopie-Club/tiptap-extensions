<template>
    <component :is="headerTag" v-if="isHeading">
        <slot />
    </component>
    <div v-else>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isHeading = computed(() => props.content.type === "heading");
const headerTag = computed(() => `h${props.content.attrs?.level || 6}`);
</script>
