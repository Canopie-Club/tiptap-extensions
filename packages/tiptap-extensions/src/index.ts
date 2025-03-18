// Export all extensions and their components
export { default as FancyBorder } from './fancyBorder/extension'
export { default as StarterExtension } from './starter/extension'

// Export the menus
export { default as borderMenu } from './fancyBorder/menu'
export { default as starterMenu } from './starter/menu'

// Export types
export * from './types/menu'
export * from './types/renderer'

// Export from fancyBorder
export * from './fancyBorder/extension'

// Export renderers
export { renderComponent } from './starter/renderer'