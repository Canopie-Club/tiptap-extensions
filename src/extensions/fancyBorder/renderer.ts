import { defineAsyncComponent } from "vue";
import type { RenderMap } from "../starter";

export const renderComponents: RenderMap = {
  fancyBorder: defineAsyncComponent(
    () => import("./components/RenderFancyBorder.vue"),
  ),
};
