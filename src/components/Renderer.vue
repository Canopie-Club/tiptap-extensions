<template>
    <component :is="renderedContent"></component>
</template>

<script lang="ts" setup>
import type { RenderMap } from "../types/renderer";
import { buildRenderer } from "../utils/renderer";
import type { JSONContent } from "@tiptap/core";

const props = defineProps<{
    content: JSONContent;
    renderMaps: RenderMap[];
}>();

const renderer = buildRenderer(props.renderMaps);

const renderedContent = ref(renderer(props.content));
</script>
