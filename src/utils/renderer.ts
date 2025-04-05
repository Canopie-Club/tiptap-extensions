import type { JSONContent } from "@tiptap/core";
import type { RenderFunction, RenderMap, VueNode } from "../types/renderer";
import { h } from "vue";

export const buildRenderer: (maps: RenderMap[]) => RenderFunction = (maps) => {
  const map = Object.fromEntries(
    maps.reverse().flatMap((map) => Object.entries(map)),
  ) as RenderMap;

  return function renderer(content: JSONContent): VueNode {
    const component = map[content.type || ""];

    const children: (string | VueNode)[] = content.content
      ? content.content.map(renderer)
      : [];

    if (content.text) children.unshift(content.text);

    if (component) {
      return h(component, { content }, children);
    } else {
      return h("div", {}, [content.text, children]);
    }
  };
};
