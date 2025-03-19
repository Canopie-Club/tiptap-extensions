import { type JSONContent } from "@tiptap/core";
import { defineComponent, h, defineAsyncComponent } from "vue";

const renderComponents: Record<string, any> = {
  paragraph: defineAsyncComponent(
    () => import("./components/RenderParagraph.vue"),
  ),
  heading: defineAsyncComponent(() => import("./components/RenderHeader.vue")),

  blockquote: defineAsyncComponent(
    () => import("./components/RenderBlockquote.vue"),
  ),
  bulletList: defineAsyncComponent(
    () => import("./components/RenderBulletList.vue"),
  ),

  codeBlock: defineAsyncComponent(
    () => import("./components/RenderCodeBlock.vue"),
  ),
  doc: defineAsyncComponent(() => import("./components/RenderDocument.vue")),

  hardBreak: defineAsyncComponent(
    () => import("./components/RenderHardBreak.vue"),
  ),
  horizontalRule: defineAsyncComponent(
    () => import("./components/RenderHorizontalRule.vue"),
  ),
  listItem: defineAsyncComponent(
    () => import("./components/RenderListItem.vue"),
  ),

  orderedList: defineAsyncComponent(
    () => import("./components/RenderOrderedList.vue"),
  ),
  bold: defineAsyncComponent(() => import("./components/RenderBold.vue")),

  code: defineAsyncComponent(() => import("./components/RenderCode.vue")),

  italic: defineAsyncComponent(() => import("./components/RenderItalic.vue")),
  strike: defineAsyncComponent(() => import("./components/RenderStrike.vue")),
};

export function renderComponent(content: JSONContent) {
  const component = renderComponents[content.type || ""];
  if (component) {
    return h(component, { content });
  } else {
    return h("div", {
      innerHTML: content.text,
    });
  }
}
