# TipTap Two

A rich text editor built with TipTap and Vue 3.

## Features

- Rich text editing with TipTap
- Custom extensions for advanced formatting
- Slash commands for content insertion
- Node views for interactive components

## Project Structure

This project is organized as a monorepo with:

1. **Main Nuxt Application**: A Nuxt 3 app for development and testing
2. **TipTap Extensions Package**: A separate package in the `packages` directory for reuse in other projects

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# bun
bun install
```

## Development

```bash
# Start development server for the Nuxt app
bun run dev

# In a separate terminal, start the watch mode for the packages
bun run dev:packages
```

## Building

```bash
# Build the extension package first
bun run build:packages

# Build the Nuxt app
bun run build
```

## Using the TipTap Extensions package

The `@canopie/tiptap-extensions` package can be used independently in other Vue projects. See the package README for detailed usage instructions.

```js
import { FancyBorder, starterMenu } from '@canopie/tiptap-extensions'
```

## Production

Locally preview production build:

```bash
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## License

MIT
