// Simple test script to check for plugin instances

import { FancyBorder, ImageSelector, StarterExtension, SlashMenu, borderMenu, imageSelectorMenu, starterMenu } from './dist/index.es.js';

console.log('Loaded extensions and components from consolidated build:');
console.log('- FancyBorder:', typeof FancyBorder);
console.log('- ImageSelector:', typeof ImageSelector);
console.log('- StarterExtension:', typeof StarterExtension);
console.log('- SlashMenu:', typeof SlashMenu);
console.log('- borderMenu:', Array.isArray(borderMenu));
console.log('- imageSelectorMenu:', Array.isArray(imageSelectorMenu));
console.log('- starterMenu:', Array.isArray(starterMenu));

console.log('\nTest completed successfully');