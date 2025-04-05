import SlashMenuComponent from "./SlashMenu.vue";
import RendererComponent from "./Renderer.vue";
import type { JSONContent } from "@tiptap/core";
import type { SlashMenuItem } from "../types/menu";
import type { RenderMap } from "../types/renderer";
import type { Editor } from "@tiptap/vue-3";

// Define explicit type interfaces for your components
export interface SlashMenuProps {
  editor: Editor;
  positionOffset: { left: number; top: number };
  items: SlashMenuItem[];
}

export interface RendererProps {
  content: JSONContent;
  renderMaps: RenderMap[];
}

// Export the components with their proper types
export const SlashMenu = SlashMenuComponent as unknown as {
  new (): {
    $props: SlashMenuProps;
    $emit: {
      (e: "command-executed"): void;
    };
  };
};

export const Renderer = RendererComponent as unknown as {
  new (): {
    $props: RendererProps;
  };
};

// Also re-export as default if needed
export default { SlashMenu, Renderer };
