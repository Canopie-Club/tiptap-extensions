import { Editor } from "@tiptap/vue-3";
import { type Range } from "@tiptap/core";

export interface SlashMenuItem {
  title: string;
  description: string;
  icon: string;
  command: ({ editor, range }: { editor: Editor; range: Range }) => void;
}

export interface EditorDefaults {
  content: string;
  placeholder: string;
  dragHandleWidth: number;
}

/**
 * Slash menu command items
 * Each item defines a content block that can be inserted via the slash menu
 */
export const slashMenuItems: SlashMenuItem[] = [
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
  {
    title: "Code Block",
    description: "Display code with syntax highlighting",
    icon: "</>",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    title: "Horizontal Rule",
    description: "Insert a horizontal divider",
    icon: "—",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
];

/**
 * Editor default options
 */
export const editorDefaults: EditorDefaults = {
  content:
    "<p>Welcome to your new editor! Type / on a new line to add content blocks.</p>",
  placeholder: "Type / to open menu…",
  dragHandleWidth: 24,
};
