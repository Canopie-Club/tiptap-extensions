import SlashMenuComponent from "./SlashMenu.vue";
import RendererComponent from "./Renderer.vue";
import BubbleMenuComponent from "./BubbleMenu.vue";
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

export interface BubbleMenuProps {
  editor?: Editor;
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

export const BubbleMenu = BubbleMenuComponent as unknown as {
  new (): {
    $props: BubbleMenuProps;
  };
};

// Also re-export as default if needed
export default { SlashMenu, Renderer, BubbleMenu };
