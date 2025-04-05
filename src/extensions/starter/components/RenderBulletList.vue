<template>
    <ul v-if="isBulletList">
        <slot />
    </ul>
    <div v-else>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { type JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isBulletList = computed(() => props.content.type === "bulletList");
</script>
