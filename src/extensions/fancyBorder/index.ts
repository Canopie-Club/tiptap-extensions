// Export the extension
export { default as FancyBorder } from './extension';

// Export the menu
export { default as borderMenu } from './menu';

// Export component renderers
export * from './renderer';

// Export types (re-exported from main types)
export * from '../../types/menu';
export * from '../../types/renderer';