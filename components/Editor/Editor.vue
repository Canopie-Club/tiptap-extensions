<template>
    <div class="editor-wrapper" ref="editorWrapper">
        <editor-content :editor="editor ?? undefined" class="editor-content" />

        <!-- Floating bubble menu for text formatting -->
        <bubble-menu
            v-if="editor"
            :editor="editor"
            :tippy-options="{ duration: 100 }"
        >
            <div class="bubble-menu-container">
                <button
                    @click="editor.chain().focus().toggleBold().run()"
                    :class="{ 'is-active': editor.isActive('bold') }"
                    class="bubble-menu-button"
                >
                    <span class="bubble-icon">B</span>
                </button>
                <button
                    @click="editor.chain().focus().toggleItalic().run()"
                    :class="{ 'is-active': editor.isActive('italic') }"
                    class="bubble-menu-button"
                >
                    <span class="bubble-icon"><i>I</i></span>
                </button>
                <button
                    @click="editor.chain().focus().toggleCode().run()"
                    :class="{ 'is-active': editor.isActive('code') }"
                    class="bubble-menu-button"
                >
                    <span class="bubble-icon">&lt;/&gt;</span>
                </button>
                <button
                    @click="editor.chain().focus().toggleStrike().run()"
                    :class="{ 'is-active': editor.isActive('strike') }"
                    class="bubble-menu-button"
                >
                    <span class="bubble-icon"><s>S</s></span>
                </button>
            </div>
        </bubble-menu>

        <!-- Slash menu -->
        <div v-if="showSlashMenu" class="slash-menu" ref="slashMenuRef">
            <div
                v-for="item in slashMenuItems"
                :key="item.title"
                @click="executeSlashCommand(item)"
                class="slash-menu-item"
            >
                <div class="slash-menu-item-icon">{{ item.icon }}</div>
                <div class="slash-menu-item-content">
                    <div class="slash-menu-item-title">{{ item.title }}</div>
                    <div class="slash-menu-item-description">
                        {{ item.description }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { Editor, EditorContent, Extension } from "@tiptap/vue-3";
import { type Range } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import DragHandle from "@tiptap-pro/extension-drag-handle";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

// State for slash command menu
const showSlashMenu = ref(false);
const editorWrapper: Ref<HTMLDivElement | null> = ref(null);
const slashMenuRef: Ref<HTMLDivElement | null> = ref(null);
const slashCommand = ref("");
const editor: Ref<Editor | null> = ref(null);

const { top, left, width, height } = useElementBounding(editorWrapper);

interface SlashMenuItem {
    title: string;
    description: string;
    icon: string;
    command: ({ editor, range }: { editor: Editor; range: Range }) => void;
}

// Slash menu items with their actions
const slashMenuItems: SlashMenuItem[] = [
    {
        title: "Heading 1",
        description: "Large section heading",
        icon: "H1",
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 1 })
                .run();
        },
    },
    {
        title: "Heading 2",
        description: "Medium section heading",
        icon: "H2",
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 2 })
                .run();
        },
    },
    {
        title: "Bullet List",
        description: "Create a simple bullet list",
        icon: "•",
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
    },
    {
        title: "Numbered List",
        description: "Create a numbered list",
        icon: "1.",
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
    },
    {
        title: "Blockquote",
        description: "Capture a quote",
        icon: '"',
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBlockquote().run();
        },
    },
];

// We're using a manual approach for slash commands instead of an extension

function openSlashMenu(editor: Editor) {
    const { selection } = editor.state;
    const { empty, anchor } = selection;

    // Show slash menu
    showSlashMenu.value = true;

    nextTick(() => {
        // Position the menu
        if (slashMenuRef.value) {
            const coords = editor.view.coordsAtPos(anchor);
            slashMenuRef.value.style.left = `${coords.left - (left.value ?? 0)}px`;
            slashMenuRef.value.style.top = `${coords.bottom - (top.value ?? 0)}px`;
        }
    });
}

onMounted(() => {
    editor.value = new Editor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Type / to open menu…",
            }),
            DragHandle.configure({
                // dragHandleWidth: 24,
            }),
        ],
        content: "<p>Welcome to your new editor!</p>",
        onTransaction: ({ editor }) => {
            // Check for '/' at the beginning of a paragraph
            const { selection } = editor.state;
            const { empty, anchor } = selection;

            if (!empty) {
                showSlashMenu.value = false;
                return;
            }

            const currentNode = editor.state.doc.nodeAt(anchor);
            const textBeforeCursor = editor.state.doc.textBetween(
                Math.max(0, anchor - 1),
                anchor,
                "",
            );

            if (textBeforeCursor === "/") {
                openSlashMenu(editor as Editor);
            } else {
                showSlashMenu.value = false;
            }
        },
    });
});

// Execute a slash command and hide the menu
const executeSlashCommand = (item: SlashMenuItem) => {
    if (!editor.value) return;

    const { state } = editor.value;
    const { from, to } = state.selection;

    // Delete the '/' character
    const range = { from: from - 1, to };

    // Execute the command
    item.command({ editor: editor.value, range });

    // Hide slash menu
    showSlashMenu.value = false;
};

// Clean up on component unmount
onBeforeUnmount(() => {
    if (editor.value) {
        editor.value.destroy();
    }
});
</script>

<style lang="scss">
.editor-wrapper {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    overflow: hidden;
    background: white;
}

.editor-content {
    padding: 1.5rem;
    min-height: 400px;
    color: #1a202c;
}

.editor-content p {
    margin: 1em 0;
    line-height: 1.5;
}

.editor-content h1 {
    font-size: 1.875rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
}

.editor-content h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
}

.editor-content ul,
.editor-content ol {
    padding-left: 1.5rem;
    margin: 1rem 0;
}

.editor-content ul li,
.editor-content ol li {
    margin-bottom: 0.5rem;
}

.editor-content blockquote {
    border-left: 3px solid #e2e8f0;
    padding-left: 1rem;
    margin-left: 0;
    margin-right: 0;
    color: #4a5568;
}

/* Drag handle styling */
.tiptap-drag-handle {
    position: absolute;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7fafc;
    border-radius: 4px;
    border: 1px solid #e2e8f0;
    cursor: move;
    opacity: 0;
    transition: opacity 0.2s ease;
}

.tiptap-drag-handle:hover {
    opacity: 1;
    background: #edf2f7;
}

p:hover .tiptap-drag-handle,
h1:hover .tiptap-drag-handle,
h2:hover .tiptap-drag-handle,
li:hover .tiptap-drag-handle,
blockquote:hover .tiptap-drag-handle {
    opacity: 0.5;
}

/* Bubble menu styling */
.bubble-menu-container {
    display: flex;
    background-color: white;
    border-radius: 0.375rem;
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    padding: 0.25rem;
}

.bubble-menu-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: none;
    background: transparent;
    border-radius: 0.25rem;
    margin: 0 0.125rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.bubble-menu-button:hover {
    background-color: #f7fafc;
}

.bubble-menu-button.is-active {
    background-color: #edf2f7;
    color: var(--primary-color, #4f46e5);
}

.bubble-icon {
    font-size: 0.875rem;
    font-weight: bold;
}

/* Slash menu styling */
.slash-menu {
    position: absolute;
    background: white;
    border-radius: 0.375rem;
    box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    z-index: 10;
    min-width: 280px;
}

.slash-menu-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.slash-menu-item:hover {
    background-color: #f7fafc;
}

.slash-menu-item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background: #edf2f7;
    border-radius: 0.25rem;
    margin-right: 0.75rem;
    font-weight: bold;
}

.slash-menu-item-content {
    flex: 1;
}

.slash-menu-item-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.slash-menu-item-description {
    font-size: 0.875rem;
    color: #718096;
}
</style>
