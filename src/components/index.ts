import SlashMenuComponent from "./SlashMenu.vue";
import RendererComponent from "./Renderer.vue";

// Export the raw component
export const SlashMenu: typeof SlashMenuComponent = SlashMenuComponent;
export const Renderer: typeof RendererComponent = RendererComponent;

// Also re-export as default if needed
export default { SlashMenu: SlashMenuComponent, Renderer: RendererComponent };
