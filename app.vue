<template>
  <div class="app">
    <header class="app-header">
      <div class="container">
        <h1 class="app-title">TipTap Editor Demo</h1>
        <nav class="app-nav">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <NuxtLink to="/editor" class="nav-link">Editor</NuxtLink>
        </nav>
      </div>
    </header>
    <main class="app-main">
      <NuxtPage />
    </main>
    <footer class="app-footer">
      <div class="container">
        <p>Built with <a href="https://tiptap.dev/" target="_blank" rel="noopener">TipTap</a> and <a href="https://nuxt.com/" target="_blank" rel="noopener">Nuxt</a></p>
      </div>
    </footer>
  </div>
</template>

<style>
/* Base styles */
:root {
  --primary-color: #4f46e5;
  --primary-hover: #4338ca;
  --text-color: #1a202c;
  --text-light: #4a5568;
  --bg-color: #f8fafc;
  --bg-light: #ffffff;
  --border-color: #e2e8f0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
  color: var(--text-color);
  background-color: var(--bg-color);
  line-height: 1.5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* App layout */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: var(--bg-light);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
}

.app-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--primary-color);
}

.app-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text-light);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary-color);
}

.app-main {
  flex: 1;
}

.app-footer {
  background-color: var(--bg-light);
  border-top: 1px solid var(--border-color);
  padding: 2rem 0;
  text-align: center;
  color: var(--text-light);
  font-size: 0.875rem;
}

.app-footer a {
  color: var(--primary-color);
  text-decoration: none;
}

.app-footer a:hover {
  text-decoration: underline;
}
</style>
