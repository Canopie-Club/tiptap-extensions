<template>
  <div v-if="show" class="slash-menu" ref="menuRef">
    <div
      v-for="item in items"
      :key="item.title"
      @click="executeCommand(item)"
      class="slash-menu-item"
    >
      <div class="slash-menu-item-icon">{{ item.icon }}</div>
      <div class="slash-menu-item-content">
        <div class="slash-menu-item-title">{{ item.title }}</div>
        <div class="slash-menu-item-description">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { type Editor } from '@tiptap/vue-3'
import { type Range } from '@tiptap/core'

export interface SlashMenuItem {
  title: string
  description: string
  icon: string
  command: ({ editor, range }: { editor: Editor; range: Range }) => void
}

interface Position {
  left: number
  top: number
}

const props = defineProps<{
  show: boolean
  editor: Editor
  position: Position
  items: SlashMenuItem[]
}>()

const emit = defineEmits<{
  'command-executed': []
}>()

const menuRef = ref<HTMLDivElement | null>(null)

watch(
  () => props.position,
  (newPosition) => {
    if (menuRef.value && newPosition) {
      menuRef.value.style.left = `${newPosition.left}px`
      menuRef.value.style.top = `${newPosition.top}px`
    }
  },
  { immediate: true }
)

const executeCommand = (item: SlashMenuItem) => {
  const { state } = props.editor
  const { from, to } = state.selection
  
  // Delete the '/' character
  const range = { from: from - 1, to }
  
  // Execute the command
  item.command({ editor: props.editor, range })
  
  // Emit event to parent
  emit('command-executed')
}
</script>

<style lang="scss">
.slash-menu {
  @apply absolute z-10 min-w-[280px] overflow-hidden rounded-md bg-white shadow-lg;

  .slash-menu-item {
    @apply flex cursor-pointer items-center p-3 transition-colors duration-200;

    &:hover {
      @apply bg-gray-50;
    }

    .slash-menu-item-icon {
      @apply mr-3 flex h-8 w-8 items-center justify-center rounded bg-gray-100 font-bold;
    }

    .slash-menu-item-content {
      @apply flex-1;

      .slash-menu-item-title {
        @apply font-semibold;
      }

      .slash-menu-item-description {
        @apply text-sm text-gray-500;
      }
    }
  }
}
</style>