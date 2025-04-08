import { ImageSelector } from "./extension";
import type { createEditorType, SlashMenuItem } from "../../types/menu";

export type ImageSelectorEditor = ReturnType<
  typeof createEditorType<[typeof ImageSelector]>
>;

export const imageSelector: SlashMenuItem = {
  title: "Image",
  slashTag: "/image",
  description: "Insert an image",
  icon: "radix-icons:image",
  command: ({ editor, range }) => {
    (editor as ImageSelectorEditor)
      .chain()
      .focus()
      .deleteRange(range)
      .setImageSelector()
      .run();
  },
};

/**
 * Slash menu command items for ImageSelector
 */
const imageSelectorMenu: SlashMenuItem[] = [imageSelector];

export default imageSelectorMenu;