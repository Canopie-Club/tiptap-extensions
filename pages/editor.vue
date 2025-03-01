<template>
  <div class="editor-page">
    <h1 class="page-title">TipTap Rich Text Editor</h1>
    <p class="page-description">A modern, clean WYSIWYG editor with slash commands and drag-to-reorder functionality.</p>
    <Editor class="main-editor" />
    <div class="editor-instructions">
      <h2>Instructions:</h2>
      <ul>
        <li>Type <code>/</code> on a new line to open the slash menu</li>
        <li>Use the drag handle (appears on hover) to reorder content blocks</li>
        <li>Select text to format it with the floating toolbar</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Editor from '~/components/Editor/Editor.vue'

// Add your custom logic here
</script>

<style>
.editor-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1a202c;
}

.page-description {
  font-size: 1.125rem;
  color: #4a5568;
  margin-bottom: 2rem;
}

.main-editor {
  margin-bottom: 2rem;
}

.editor-instructions {
  background: #f7fafc;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-top: 2rem;
}

.editor-instructions h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.editor-instructions ul {
  padding-left: 1.5rem;
}

.editor-instructions li {
  margin-bottom: 0.5rem;
}

.editor-instructions code {
  background: #edf2f7;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: monospace;
}
</style>