// Export the extension
export { default as StarterExtension } from './extension';

// Export the menu
export { default as starterMenu } from './menu';

// Export the renderer
export * from './renderer';

// Export types (re-exported from main types)
export * from '../../types/menu';
export * from '../../types/renderer';