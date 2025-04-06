import {
  Node,
  type CommandProps,
  type RawCommands,
} from "@tiptap/core";
import { Editor, VueNodeViewRenderer } from "@tiptap/vue-3";
import NodeViewImageSelector from "./components/NodeViewImageSelector.vue";

export interface ImageSelectorOptions {
  onSelectImage?: (editor: Editor, attrs: ImageSelectorAttributes) => Promise<string | null>;
}

export interface ImageSelectorAttributes {
  src?: string;
  alt?: string;
  title?: string;
}

// Extend the CommandsChain type to include our custom command
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageSelector: {
      /**
       * Insert an image selector node
       */
      setImageSelector: (attributes?: ImageSelectorAttributes) => ReturnType;
    };
  }
}

export const ImageSelector = Node.create<ImageSelectorOptions>({
  name: "imageSelector",

  group: "block",
  selectable: true,
  draggable: true,
  atom: true, // Makes it a self-contained node that's treated as a single unit

  addOptions() {
    return {
      onSelectImage: undefined,
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) => element.getAttribute("src"),
        renderHTML: (attributes) => ({
          src: attributes.src,
        }),
      },
      alt: {
        default: null,
        parseHTML: (element) => element.getAttribute("alt"),
        renderHTML: (attributes) => ({
          alt: attributes.alt,
        }),
      },
      title: {
        default: null,
        parseHTML: (element) => element.getAttribute("title"),
        renderHTML: (attributes) => ({
          title: attributes.title,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-image-selector]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      {
        ...HTMLAttributes,
        "data-image-selector": "",
      },
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(NodeViewImageSelector as any);
  },

  addCommands() {
    return {
      setImageSelector:
        (attributes: ImageSelectorAttributes = {}) =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          });
        },
    } as Partial<RawCommands>;
  },
});

export default ImageSelector;