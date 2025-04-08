<template>
    <div class="rendered">
        <component :is="renderedData" />
    </div>
</template>

<script lang="ts" setup>
import { starterData } from "~/assets/demo/starter";
import { buildRenderer } from "~/src";
import { renderComponents } from "~/src/extensions/starter/renderer";
import { youtubeRenderers } from "~/src/extensions/youtube/renderer";

const renderer = buildRenderer([renderComponents, youtubeRenderers]);

const renderedData = ref(renderer(starterData));
</script>

<style lang="scss">
.rendered {
    max-width: 800px;
    margin: 2rem auto;

    h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
        margin-top: 1.5rem;
    }

    h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
        margin-top: 1.25rem;
    }

    h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        margin-top: 1rem;
    }

    p {
        margin-bottom: 1rem;
        line-height: 1.6;
    }

    ul,
    ol {
        margin-bottom: 1rem;
        padding-left: 1.5rem;
    }

    ul {
        list-style-type: disc;
    }

    ol {
        list-style-type: decimal;
    }

    li {
        margin-bottom: 0.5rem;
    }

    blockquote {
        border-left: 4px solid #e2e8f0;
        padding-left: 1rem;
        font-style: italic;
        margin: 1rem 0;
        color: #4a5568;
    }

    code {
        font-family: monospace;
        background-color: #f7fafc;
        padding: 0.2rem 0.4rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
    }

    pre {
        background-color: #f7fafc;
        padding: 1rem;
        border-radius: 0.375rem;
        overflow-x: auto;
        margin: 1rem 0;
    }

    pre code {
        background-color: transparent;
        padding: 0;
    }

    a {
        color: #3182ce;
        text-decoration: underline;
    }

    hr {
        margin: 1.5rem 0;
        border: 0;
        border-top: 1px solid #e2e8f0;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1rem;
    }

    table th,
    table td {
        border: 1px solid #e2e8f0;
        padding: 0.5rem;
    }

    table th {
        background-color: #f7fafc;
        font-weight: 600;
    }
}
</style>
