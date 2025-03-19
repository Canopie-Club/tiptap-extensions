// Export all extensions and their components
export { default as FancyBorder } from "./extensions/fancyBorder/extension";
export { default as StarterExtension } from "./extensions/starter/extension";

// Export the menus
export { default as borderMenu } from "./extensions/fancyBorder/menu";
export { default as starterMenu } from "./extensions/starter/menu";

// Export types
export * from "./types/menu";
export * from "./types/renderer";

// Export from fancyBorder
export * from "./extensions/fancyBorder/extension";

// Export renderers
export { renderComponent } from "./extensions/starter/renderer";
