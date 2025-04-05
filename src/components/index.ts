import SlashMenuComponent from "./SlashMenu.vue";
import RendererComponent from "./Renderer.vue";
import { defineComponent } from "vue";

// Export the raw component
export const SlashMenu = SlashMenuComponent as ReturnType<
  typeof defineComponent
>;
export const Renderer = RendererComponent as ReturnType<typeof defineComponent>;

// Also re-export as default if needed
export default { SlashMenu: SlashMenuComponent, Renderer: RendererComponent };
