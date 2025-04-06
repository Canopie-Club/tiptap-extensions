# KODING Guidelines

## Commands
- **Build App**: `nuxt build`
- **Development App Server**: `nuxt dev`
- **Generate Static App**: `nuxt generate`
- **Preview Production App**: `nuxt preview`
- **Build Library**: `bun run build:lib` (Uses `vite build --config vite.lib.config.ts`)
- **Watch Library**: `bun run dev:lib` (Uses `vite build --watch --config vite.lib.config.ts`)
- **Type Check**: `bun run typecheck` (Uses `tsc --project tsconfig.lib.json --noEmit`)
- **Lint**: *No specific lint command found in package.json.*

## Project Structure
- Nuxt 3 project (for demo app) with Vue 3 and TypeScript
- Vite build process for the distributable library (`@canopie-club/tiptap-extensions`)
- Uses Tailwind CSS for styling
- TipTap Pro integration for rich text editing

## Code Style Guidelines
- **TypeScript**: Use strict type checking; avoid `any` types (`bun run typecheck`).
- **Component Structure**: Vue 3 Composition API with `<script setup>` syntax.
- **Naming**: PascalCase for components, camelCase for variables/functions.
- **CSS**: Use Tailwind utility classes; custom styles in component-scoped CSS.
- **Imports**: Group imports logically (e.g., Vue, TipTap, components, utilities).
- **Error Handling**: Use try/catch with appropriate error logging or feedback.
- **Formatting**: Use 2-space indentation, single quotes for strings (Follow Prettier/ESLint defaults if configured, though none explicitly found).
- **Documentation**: Add JSDoc comments for complex component props and functions.

## Testing
- Currently no specific commands or guidelines for testing found. Implement tests as needed.
