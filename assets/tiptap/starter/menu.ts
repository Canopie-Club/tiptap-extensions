import StarterKit from "@tiptap/starter-kit";
import type { createEditorType, SlashMenuItem } from "../types/menu";

export type StarterKitEditor = ReturnType<
  typeof createEditorType<[typeof StarterKit]>
>;

export const h1: SlashMenuItem = {
  title: "Heading 1",
  slashTag: "/h1",
  description: "Large section heading",
  icon: "H1",
  command: ({ editor, range }) => {
    (editor as StarterKitEditor)
      .chain()
      .focus()
      .deleteRange(range)
      .setNode("heading", { level: 1 })
      .run();
  },
};

export const h2: SlashMenuItem = {
  title: "Heading 2",
  slashTag: "/h2",
  description: "Medium section heading",
  icon: "H2",
  command: ({ editor, range }) => {
    (editor as StarterKitEditor)
      .chain()
      .focus()
      .deleteRange(range)
      .setNode("heading", { level: 2 })
      .run();
  },
};

export const h3: SlashMenuItem = {
  title: "Heading 3",
  slashTag: "/h3",
  description: "Small section heading",
  icon: "H3",
  command: ({ editor, range }) => {
    (editor as StarterKitEditor)
      .chain()
      .focus()
      .deleteRange(range)
      .setNode("heading", { level: 3 })
      .run();
  },
};

export const h4: SlashMenuItem = {
  title: "Heading 4",
  slashTag: "/h4",
  description: "Small section heading",
  icon: "H4",
  command: ({ editor, range }) => {
    (editor as StarterKitEditor)
      .chain()
      .focus()
      .deleteRange(range)
      .setNode("heading", { level: 4 })
      .run();
  },
};

export const h5: SlashMenuItem = {
  title: "Heading 5",
  slashTag: "/h5",
  description: "Small section heading",
  icon: "H5",
  command: ({ editor, range }) => {
    (editor as StarterKitEditor)
      .chain()
      .focus()
      .deleteRange(range)
      .setNode("heading", { level: 5 })
      .run();
  },
};

export const h6: SlashMenuItem = {
  title: "Heading 6",
  slashTag: "/h6",
  description: "Small section heading",
  icon: "H6",
  command: ({ editor, range }) => {
    (editor as StarterKitEditor)
      .chain()
      .focus()
      .deleteRange(range)
      .setNode("heading", { level: 6 })
      .run();
  },
};

export const bulletList: SlashMenuItem = {
  title: "Bullet List",
  slashTag: "/ul",
  description: "Create a simple bullet list",
  icon: "•",
  command: ({ editor, range }) => {
    (editor as StarterKitEditor)
      .chain()
      .focus()
      .deleteRange(range)
      .setNode("bulletList")
      .run();
  },
};

export const orderedList: SlashMenuItem = {
  title: "Ordered List",
  slashTag: "/ol",
  description: "Create a numbered list",
  icon: "1.",
  command: ({ editor, range }) => {
    (editor as StarterKitEditor)
      .chain()
      .focus()
      .deleteRange(range)
      .setNode("orderedList")
      .run();
  },
};

export const blockquote: SlashMenuItem = {
  title: "Blockquote",
  slashTag: "/blockquote",
  description: "Create a blockquote",
  icon: "»",
  command: ({ editor, range }) => {
    (editor as StarterKitEditor)
      .chain()
      .focus()
      .deleteRange(range)
      .setNode("blockquote")
      .run();
  },
};

export const codeBlock: SlashMenuItem = {
  title: "Code Block",
  slashTag: "/code",
  description: "Create a code block",
  icon: "<>",
  command: ({ editor, range }) => {
    (editor as StarterKitEditor)
      .chain()
      .focus()
      .deleteRange(range)
      .setNode("codeBlock")
      .run();
  },
};

export const horizontalRule: SlashMenuItem = {
  title: "Horizontal Rule",
  slashTag: "/hr",
  description: "Create a horizontal rule",
  icon: "—",
  command: ({ editor, range }) => {
    (editor as StarterKitEditor)
      .chain()
      .focus()
      .deleteRange(range)
      .setNode("horizontalRule")
      .run();
  },
};

/**
 * Slash menu command items
 * Each item defines a content block that can be inserted via the slash menu
 */
const defaultMenu: SlashMenuItem[] = [
  h1,
  h2,
  h3,
  h4,
  bulletList,
  orderedList,
  blockquote,
  codeBlock,
  horizontalRule,
];

export default defaultMenu;
