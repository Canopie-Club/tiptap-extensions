<template>
    <div class="editor-wrapper" ref="editorWrapper">
        <editor-content
            :editor="(editor as Editor) ?? undefined"
            class="editor-content"
        />

        <!-- Floating bubble menu for text formatting -->

        <EditorBubbleMenu :editor="editor as Editor | undefined" />

        <!-- Slash menu -->
        <SlashMenu
            v-if="editor"
            :editor="editor as Editor"
            :show="showSlashMenu"
            :position-offset="{ top, left }"
            :items="[...starterMenu, ...borderMenu]"
            @command-executed="hideSlashMenu"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import Placeholder from "@tiptap/extension-placeholder";
import BubbleMenu from "@tiptap/extension-bubble-menu";
// For development, we're importing directly from the src directory
// In production, this would be from '@canopie-club/tiptap-extensions'
import {
    FancyBorder as BorderExtension,
    borderMenu,
} from "../../dist/extensions/fancyBorder";
import { StarterExtension, starterMenu } from "../../dist/extensions/starter";
import { SlashMenu } from "../../dist";
import "../../dist/index.css";

// Import custom extensions
import { createDragHandleExtension } from "./extensions/DragHandleConfig";

// Import modular components
import EditorBubbleMenu from "./menus/BubbleMenu.vue";
import EditorSlashMenu from "./menus/SlashMenu.vue";

// State for editor
const editor = ref<Editor | null>(null);
const showSlashMenu = ref(false);
const editorWrapper = ref<HTMLDivElement | null>(null);
const slashMenuPosition = ref({ left: 0, top: 0 });

const { top, left } = useElementBounding(editorWrapper);

// Open the slash menu and position it correctly
function openSlashMenu(editor: Editor) {
    const { selection } = editor.state;
    const { anchor } = selection;

    // Show slash menu
    showSlashMenu.value = true;

    nextTick(() => {
        // Position the menu
        const coords = editor.view.coordsAtPos(anchor);
        slashMenuPosition.value = {
            left: coords.left - (left.value ?? 0),
            top: coords.bottom - (top.value ?? 0),
        };
    });
}

// Hide slash menu - called when a command is executed
const hideSlashMenu = () => {
    showSlashMenu.value = false;
};

onMounted(() => {
    editor.value = new Editor({
        extensions: [
            StarterExtension,
            BorderExtension,
            Placeholder.configure({
                placeholder: "Type / to open menu…",
            }),
            BubbleMenu.configure({
                element: document.querySelector(".tippy-bubble") as HTMLElement,
            }),
            createDragHandleExtension(),
        ],
        content:
            "<p>Welcome to your new editor! Type / on a new line to add content blocks.</p>",

        onUpdate: (e) => {
            // Update the model with the new content
            console.log(e.editor.getJSON());
        },
    });
});

// Clean up on component unmount
onBeforeUnmount(() => {
    if (editor.value) {
        editor.value.destroy();
    }
});
</script>

<style lang="scss">
@import "./extensions/DragHandle.scss";

.editor-wrapper {
    @apply relative mx-auto overflow-hidden rounded-lg border border-gray-200 bg-white;
    max-width: 800px;

    .editor-content {
        @apply min-h-[400px] p-6 text-gray-900;

        .tiptap {
            @apply focus-visible:outline-none focus-within:outline-none;
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

    /* Drag handle styles are imported from DragHandleConfig */

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
}
</style>
