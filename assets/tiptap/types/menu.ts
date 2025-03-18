import { Editor } from "@tiptap/vue-3";
import { type Extension, type Range } from "@tiptap/core";

export interface SlashMenuItem {
  title: string;
  slashTag: string;
  description: string;
  icon: string;
  command: ({ editor, range }: { editor: Editor; range: Range }) => void;
}

export function createEditorType<T extends Extension[]>(...extensions: T) {
  return new Editor({
    extensions: [...extensions],
  });
}
