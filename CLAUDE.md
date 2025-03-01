# CLAUDE.md - Project Guidelines

## Build Commands
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run generate` - Generate static site

## Project Structure
- Nuxt 3 project with Vue 3 and TypeScript
- Uses Tailwind CSS for styling
- TipTap Pro integration for rich text editing

## Code Style Guidelines
- **TypeScript**: Use strict type checking; avoid `any` types
- **Component Structure**: Vue 3 Composition API with `<script setup>` syntax
- **Naming**: PascalCase for components, camelCase for variables/functions
- **CSS**: Use Tailwind utility classes; custom styles in component-scoped CSS
- **Imports**: Group imports by type (Vue, components, utilities)
- **Error Handling**: Use try/catch with appropriate error logging
- **Formatting**: Use 2-space indentation, single quotes for strings
- **Documentation**: Document complex component props and functions

## Git Workflow
- Descriptive commit messages in present tense
- Create feature branches from main for new development
- Submit PRs with clear descriptions of changes