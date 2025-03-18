<template>
    <ul v-if="isBulletList">
        {{ content.text }}
        <slot />
    </ul>
    <div v-else>
        {{ content.text }}
        <slot />
    </div>
</template>

<script setup lang="ts">
import { JSONContent } from "@tiptap/core";
import { computed } from "vue";

const props = defineProps<{ content: JSONContent }>();

const isBulletList = computed(() => props.content.type === "bulletList");
</script>
