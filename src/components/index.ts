import SlashMenuComponent from "./SlashMenu.vue";
import RendererComponent from "./Renderer.vue";

// Export the raw component
export const SlashMenu = SlashMenuComponent;
export const Renderer = RendererComponent;

// Also re-export as default if needed
export default { SlashMenu: SlashMenuComponent, Renderer: RendererComponent };
