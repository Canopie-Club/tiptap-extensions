import { FancyBorder } from "./extension";
import type { createEditorType, SlashMenuItem } from "../types/menu";

export type FancyBorderEditor = ReturnType<
  typeof createEditorType<[typeof FancyBorder]>
>;
export const fancyBorder: SlashMenuItem = {
  title: "Fancy Border",
  slashTag: "/fancyborder",
  description: "Add a block with fancy border",
  icon: "▢",
  command: ({ editor, range }) => {
    (editor as FancyBorderEditor)
      .chain()
      .focus()
      .deleteRange(range)
      .setFancyBorder({
        borderColor: "#3b82f6",
        borderWidth: 2,
        borderStyle: "solid",
      })
      .run();
  },
};

/**
 * Slash menu command items for FancyBorder
 */
const fancyBorderMenu: SlashMenuItem[] = [fancyBorder];

export default fancyBorderMenu;
