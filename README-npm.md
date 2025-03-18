# TipTap Extensions

A collection of custom TipTap extensions for rich text editing.

## Features

- **FancyBorder Extension**: Adds a configurable border around content blocks with the ability to adjust color, width, and style directly in the editor
- **Starter Kit Integration**: Ready-to-use starter kit with basic formatting controls
- **Vue Component Renderers**: Components for rendering TipTap content
- **Slash Menu Commands**: Command palette support for inserting content blocks

## Installation

```bash
npm install @canopie/tiptap-extensions
# or
yarn add @canopie/tiptap-extensions
# or
bun add @canopie/tiptap-extensions
```

## Usage

```vue
<template>
  <editor-content :editor="editor" />
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { StarterExtension, FancyBorder, starterMenu, borderMenu } from '@canopie/tiptap-extensions'

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
import { FancyBorder } from '@canopie/tiptap-extensions'

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
import { starterMenu, borderMenu } from '@canopie/tiptap-extensions'
// ...other imports
</script>
```

## License

MIT