export interface EditorDefaults {
  content: string;
  placeholder: string;
  dragHandleWidth: number;
}

/**
 * Editor default options
 */
export const editorDefaults: EditorDefaults = {
  content:
    "<p>Welcome to your new editor! Type / on a new line to add content blocks.</p>",
  placeholder: "Type / to open menu…",
  dragHandleWidth: 24,
};
