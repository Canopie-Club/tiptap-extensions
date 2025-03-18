import DragHandle from "@tiptap-pro/extension-drag-handle";
import { types } from "sass";
import tippy from "tippy.js";

/**
 * Custom configuration for the DragHandle extension
 * This creates a reusable, configured extension that can be added to the editor
 */
export const createDragHandleExtension = () => {
  console.log(`Document exists? ${typeof document !== "undefined"}`);
  return DragHandle.configure({
    render() {
      const element = document.createElement("div");
      element.classList.add("custom-drag-handle");
      return element;
    },
    tippyOptions: {
      placement: "left",
      touch: "hold",
      interactive: true,
      appendTo: document.body,

      onDestroy(instance) {
        console.log(instance.reference);
        console.log("Destroyed instance:", instance);

        // tippy(instance.reference, {
        //   ...instance,
        // }).show();
      },
    },
  }).extend({
    priority: 200,
  });
};
