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
// import tippy from "tippy.js";
// import "tippy.js/dist/tippy.css";

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
                render() {
                    const element = document.createElement("div");

                    element.classList.add("custom-drag-handle");

                    return element;
                },
                tippyOptions: {
                    placement: "left",
                    touch: "hold",
                },
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
    @apply relative mx-auto overflow-hidden rounded-lg border border-gray-200 bg-white;
    max-width: 800px;

    .editor-content {
        @apply min-h-[400px] p-6 text-gray-900;

        .tiptap {
            @apply focus-visible:outline-none focus-within:outline-none;
            /* @apply outline-none; */
        }

        p {
            @apply my-4 leading-relaxed;
            @apply focus-visible:outline-none;
        }

        h1 {
            @apply mb-4 mt-6 text-2xl font-bold;
        }

        h2 {
            @apply mb-3 mt-6 text-xl font-semibold;
        }

        ul,
        ol {
            @apply my-4 pl-6;

            li {
                @apply mb-2;
            }
        }

        blockquote {
            @apply mx-0 my-4 border-l-4 border-gray-200 pl-4 text-gray-600;
        }
    }

    /* .tiptap-drag-handle {
        @apply absolute flex h-6 w-6 cursor-move items-center justify-center rounded border border-gray-200 bg-gray-50 opacity-0 transition-opacity duration-200;

        &:hover {
            @apply bg-gray-100 opacity-100;
        }
    } */

    p,
    h1,
    h2,
    li,
    blockquote {
        &:hover .tiptap-drag-handle {
            @apply opacity-50;
        }
    }

    .bubble-menu-container {
        @apply flex rounded-md bg-white p-1 shadow-lg;

        .bubble-menu-button {
            @apply flex h-8 w-8 cursor-pointer items-center justify-center rounded border-none bg-transparent transition-colors duration-200 mx-0.5;

            &:hover {
                @apply bg-gray-50;
            }

            &.is-active {
                @apply bg-gray-100 text-gray-500;
                /* @apply bg-gray-100 text-primary-500; */
            }

            .bubble-icon {
                @apply text-sm font-bold;
            }
        }
    }

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
                .slash-menu-item-title {
                    @apply font-semibold;
                }

                .slash-menu-item-description {
                    @apply text-sm text-gray-500;
                }
            }
        }
    }

    ::selection {
        background-color: #70cff850;
    }

    .ProseMirror {
        padding: 1rem 1rem 1rem 0;

        * {
            margin-top: 0.75em;
        }

        > * {
            margin-left: 3rem;
        }

        .ProseMirror-widget * {
            margin-top: auto;
        }

        ul,
        ol {
            padding: 0 1rem;
        }
    }

    .ProseMirror-noderangeselection {
        *::selection {
            background: transparent;
        }

        * {
            caret-color: transparent;
        }
    }

    .ProseMirror-selectednode,
    .ProseMirror-selectednoderange {
        position: relative;

        &::before {
            position: absolute;
            pointer-events: none;
            z-index: -1;
            content: "";
            top: -0.25rem;
            left: -0.25rem;
            right: -0.25rem;
            bottom: -0.25rem;
            background-color: #70cff850;
            border-radius: 0.2rem;
        }
    }

    .custom-drag-handle {
        /* &::after {
            @apply flex items-center justify-center w-4 h-5 content-['⠿'] font-bold cursor-grab bg-black bg-opacity-5 text-black text-opacity-30 rounded;
        } */

        &::after {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1rem;
            height: 1.25rem;
            content: "⠿";
            font-weight: 700;
            cursor: grab;
            background: #0d0d0d10;
            color: #0d0d0d50;
            border-radius: 0.25rem;
        }
    }
}
</style>
