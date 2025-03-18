import {
  Node,
  type CommandProps,
  type RawCommands,
} from "@tiptap/core";
import { Editor, VueNodeViewRenderer } from "@tiptap/vue-3";
import NodeViewFancyBorder from "./components/NodeViewFancyBorder.vue";

export interface FancyBorderOptions {
  borderColor: string;
  borderWidth: number;
  borderStyle: string;
}

export interface FancyBorderAttributes {
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: string;
}

// Extend the CommandsChain type to include our custom command
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fancyBorder: {
      /**
       * Set a fancy border node
       */
      setFancyBorder: (attributes?: FancyBorderAttributes) => ReturnType;
    };
  }
}

export const FancyBorder = Node.create<FancyBorderOptions>({
  name: "fancyBorder",

  group: "block",
  content: "block+", // Allow it to contain block content

  addOptions() {
    return {
      borderColor: "#000000",
      borderWidth: 1,
      borderStyle: "solid",
    };
  },

  addAttributes() {
    return {
      borderColor: {
        default: this.options.borderColor,
        parseHTML: (element) => element.getAttribute("data-border-color"),
        renderHTML: (attributes) => ({
          "data-border-color": attributes.borderColor,
        }),
      },
      borderWidth: {
        default: this.options.borderWidth,
        parseHTML: (element) => element.getAttribute("data-border-width"),
        renderHTML: (attributes) => ({
          "data-border-width": attributes.borderWidth,
        }),
      },
      borderStyle: {
        default: this.options.borderStyle,
        parseHTML: (element) => element.getAttribute("data-border-style"),
        renderHTML: (attributes) => ({
          "data-border-style": attributes.borderStyle,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-fancy-border]",
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    const { borderColor, borderWidth, borderStyle } = node.attrs;
    return [
      "div",
      {
        ...HTMLAttributes,
        "data-fancy-border": "",
        style: `border: ${borderWidth}px ${borderStyle} ${borderColor};`,
      },
      0,
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(NodeViewFancyBorder);
  },

  addCommands() {
    return {
      setFancyBorder:
        (attributes: FancyBorderAttributes = {}) =>
        ({ commands }: CommandProps) => {
          return commands.wrapIn(this.name, attributes);
        },
    } as Partial<RawCommands>;
  },

  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.setFancyBorder(),
    };
  },
});

export default FancyBorder;