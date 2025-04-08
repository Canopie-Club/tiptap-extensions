<template>
    <div
        v-if="show"
        class="slash-menu"
        ref="menuRef"
        @keydown.enter.prevent.stop="handleEnterKey"
        :style="{
            position: 'absolute',
            top: position?.top + 'px',
            left: position?.left + 'px',
            zIndex: 1000,
        }"
    >
        <div
            v-for="(item, index) in filteredItems"
            :key="item.title"
            @click="executeCommand(item)"
            class="slash-menu-item"
            :class="{ active: index === selected, [`index-${index}`]: true }"
        >
            <div class="slash-menu-item-icon">
              <Icon :icon="item.icon" v-if="isIconifyString(item.icon)" />
              <template v-else>{{ item.icon }}</template>
            </div>
            <div class="slash-menu-item-content">
                <div class="flex justify-between">
                    <div class="slash-menu-item-title">{{ item.title }}</div>
                    <div class="slash-menu-item-slash">
                        {{ item.slashTag }}
                    </div>
                </div>
<!--                <div class="slash-menu-item-description">-->
<!--                    {{ item.description }}-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { type Editor, type EditorEvents } from "@tiptap/vue-3";
import type { SlashMenuItem } from "../types/menu";
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { Icon } from "@iconify/vue";

interface Position {
    left: number;
    top: number;
}

const props = defineProps<{
    editor: Editor;
    positionOffset: Position;
    items: SlashMenuItem[];
}>();

const emit = defineEmits<{
    "command-executed": [];
}>();

function isIconifyString(icon: string): boolean {
  return /\w+:\w+/.test(icon);
}

onKeyStroke(["ArrowUp", "ArrowDown", "Enter"], (e) => {
    e.stopPropagation();
    console.log(e.key, show.value);
    if (!show.value) return;

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();

        let selection = selected.value ?? (e.key === "ArrowDown" ? -1 : 0);

        selection =
            e.key === "ArrowDown"
                ? (selection + 1) % filteredItems.value.length
                : (selection - 1 + filteredItems.value.length) %
                  filteredItems.value.length;

        selected.value = selection;

        nextTick(() => {
            const activeItem = menuRef.value?.querySelector(".active");
            if (activeItem) {
                activeItem.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                });
            }
        });

        console.log("Arrow key pressed", e.key, selection);
    }

    if (e.key === "Enter") {
        e.preventDefault();
        const item = filteredItems.value[selected.value ?? 0];
        console.log("Enter key pressed", item);
        if (item) {
            // emit("command-executed");
            // executeCommand(item);
            console.log("Enter key pressed", item);
        }
    }
});

function handleEnterKey(e: KeyboardEvent) {
    console.log("Enter key pressed");
    e.preventDefault();
    const item = filteredItems.value[selected.value ?? 0];
    console.log("Enter key pressed", item);
    if (item) {
        // emit("command-executed");
        // executeCommand(item);
        console.log("Enter key pressed", item);
    }
}

const menuRef = ref<HTMLDivElement | null>(null);
const show = ref(false);
const selected = ref<number | null>(null);
const position = ref<Position | null>(null);

const search = ref<string | null>(null);

const filteredItems = computed(() => {
    return props.items.filter((item) =>
        item.slashTag.startsWith(`/${search.value}` || ""),
    );
});
const editorDOM = props.editor.view.dom;

const executeCommand = (item: SlashMenuItem) => {
    const { state } = props.editor;
    const { from, to } = state.selection;

    // Find the position of the '/' character
    const slashPos = from - (search.value?.length || 0) - 1;

    // Delete the '/' character
    const range = { from: slashPos, to };

    // Execute the command
    item.command({ editor: props.editor, range });

    // Emit event to parent
    emit("command-executed");
};

function handleTransaction({
    editor,
    transaction,
}: EditorEvents["transaction"]) {
    // console.log("Transaction captured", editor, transaction);
    // Check for '/' at the beginning of a paragraph
    const { selection } = editor.state;
    const { empty, anchor } = selection;

    const { $from } = selection;

    // Get the current node at the cursor position
    const currentNode = $from.node();

    // Extract the text content of the current node
    const currentText = currentNode.textContent;

    const pattern = /^\/(\w*)/;

    const match = pattern.exec(currentText);

    if (!match || currentText.includes(" ")) {
        search.value = null;
        show.value = false;
        return;
    }

    const commandName = match[1];

    search.value = commandName;

    // Show slash menu
    show.value = true;

    nextTick(() => {
        // Position the menu
        const { left, top } = props.positionOffset;
        const coords = editor.view.coordsAtPos(anchor - commandName.length);
        const newPosition = {
            left: coords.left - (left ?? 0),
            top: coords.bottom - (top ?? 0),
        };
        position.value = newPosition;
    });
}

const keydownHandler = (e: KeyboardEvent) => {
    if (!show.value) return;

    if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        const item = filteredItems.value[selected.value ?? 0];
        if (item) {
            executeCommand(item);
            emit("command-executed");
        }
    }
};

onMounted(() => {
    props.editor.on("transaction", handleTransaction);
    editorDOM.addEventListener("keydown", keydownHandler, true);
});

onBeforeUnmount(() => {
    props.editor.off("transaction", handleTransaction);
    editorDOM.removeEventListener("keydown", keydownHandler, true);
});
</script>

<style>
.slash-menu {
    position: absolute;
    z-index: 10;
    min-width: 280px;
    overflow: scroll;
    background-color: white;
    box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    max-height: 340px;
    border-radius: 0.35rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
   @apply shadow-sm;
}

.slash-menu .slash-menu-item {
    display: flex;
    cursor: pointer;
    align-items: center;
    transition-property:
        color, background-color, border-color, text-decoration-color, fill,
        stroke;
    transition-duration: 200ms;
    padding: 0.25rem 0.5rem;
}

.slash-menu .slash-menu-item .slash-menu-item-icon {
    margin-right: 0.75rem;
    display: flex;
    height: 2rem;
    width: 2rem;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    background-color: rgb(243, 244, 246);
    font-weight: 700;
}

.slash-menu .slash-menu-item .slash-menu-item-content {
    flex: 1 1 0%;
}

.slash-menu .slash-menu-item .slash-menu-item-content .slash-menu-item-slash {
    font-size: 0.875rem;
    font-weight: 600;
    color: rgb(209, 213, 219);
    opacity: 0.0;
}

.slash-menu
    .slash-menu-item
    .slash-menu-item-content
    .slash-menu-item-description {
    font-size: 0.875rem;
    color: rgb(107, 114, 128);
}


.slash-menu .slash-menu-item:hover {
  background-color: rgb(249, 250, 251);
}

.slash-menu .slash-menu-item:hover .slash-menu-item-icon {
  background-color: rgb(217, 223, 234);
}

.slash-menu .slash-menu-item:hover .slash-menu-item-slash {
  opacity: 1;
}

.slash-menu .slash-menu-item.active {
    background-color: rgb(243, 244, 246);
}

.slash-menu .slash-menu-item.active .slash-menu-item-icon {
    background-color: rgb(217, 223, 234);
}

.slash-menu .slash-menu-item.active .slash-menu-item-slash {
  opacity: 1;
}
</style>
