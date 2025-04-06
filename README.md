# TipTap Extensions

A collection of custom TipTap extensions for rich text editing.

## Development

This library is built using Vite and Vue 3. To develop locally:

```bash
# Install dependencies
bun install

# Development commands
bun run dev       # Run Nuxt development server for testing
bun run dev:lib   # Watch and build library in development mode

# Build commands
bun run build     # Build Nuxt app for testing
bun run build:lib # Build the library for distribution
```

The project uses separate configurations for the library build (Vite) and the demo app (Nuxt):

- Library build: Uses `vite.lib.config.ts` and `postcss.lib.config.js`
- Demo app: Uses Nuxt's built-in configuration system

This separation ensures that the library can be built independently from the demo application.

## Features

- **FancyBorder Extension**: Adds a configurable border around content blocks with the ability to adjust color, width, and style directly in the editor
- **Starter Kit Integration**: Ready-to-use starter kit with basic formatting controls
- **Vue Component Renderers**: Components for rendering TipTap content
- **Slash Menu Commands**: Command palette support for inserting content blocks

## Installation

```bash
npm install @canopie-club/tiptap-extensions
# or
yarn add @canopie-club/tiptap-extensions
# or
bun add @canopie-club/tiptap-extensions
```

## Usage

```vue
<template>
  <editor-content :editor="editor" />
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { StarterExtension, FancyBorder, starterMenu, borderMenu } from '@canopie-club/tiptap-extensions'

const editor = ref(null)

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterExtension,
      FancyBorder,
    ],
    content: '<p>Hello World!</p>',
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
```

## Extensions

### FancyBorder

Adds a customizable border around content with interactive controls for styling.

```js
import { FancyBorder } from '@canopie-club/tiptap-extensions'

// Use in editor
new Editor({
  extensions: [
    // ...other extensions
    FancyBorder.configure({
      borderColor: '#000000',
      borderWidth: 1,
      borderStyle: 'solid',
    }),
  ],
})
```

### Slash Menu Commands

Use the included menu commands to add slash command functionality.

```vue
<template>
  <editor-content :editor="editor" />
  <slash-menu
    v-if="editor"
    :editor="editor"
    :items="[...starterMenu, ...borderMenu]"
  />
</template>

<script setup>
import { starterMenu, borderMenu } from '@canopie-club/tiptap-extensions'
// ...other imports
</script>
```

## License

MIT
