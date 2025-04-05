import type { RenderMap } from "../../types/renderer";
import Paragraph from "./components/RenderParagraph.vue";
import Heading from "./components/RenderHeader.vue";
import Blockquote from "./components/RenderBlockquote.vue";
import BulletList from "./components/RenderBulletList.vue";
import CodeBlock from "./components/RenderCodeBlock.vue";
import Document from "./components/RenderDocument.vue";
import HardBreak from "./components/RenderHardBreak.vue";
import HorizontalRule from "./components/RenderHorizontalRule.vue";
import ListItem from "./components/RenderListItem.vue";
import OrderedList from "./components/RenderOrderedList.vue";
import Bold from "./components/RenderBold.vue";
import Code from "./components/RenderCode.vue";
import Italic from "./components/RenderItalic.vue";
import Strike from "./components/RenderStrike.vue";

export const renderComponents: RenderMap = {
  paragraph: Paragraph,
  heading: Heading,
  blockquote: Blockquote,
  bulletList: BulletList,
  codeBlock: CodeBlock,
  doc: Document,
  hardBreak: HardBreak,
  horizontalRule: HorizontalRule,
  listItem: ListItem,
  orderedList: OrderedList,
  bold: Bold,
  code: Code,
  italic: Italic,
  strike: Strike,
};
