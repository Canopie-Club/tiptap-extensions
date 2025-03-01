<template>
  <div class="home-page">
    <div class="hero">
      <h1 class="hero-title">Modern WYSIWYG Editor</h1>
      <p class="hero-description">Built with TipTap, Vue 3, and Nuxt</p>
      <NuxtLink to="/editor" class="hero-cta">Try the Editor</NuxtLink>
    </div>
    
    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">🔄</div>
        <h2 class="feature-title">Drag to Reorder</h2>
        <p class="feature-description">Easily reorder content blocks with drag handles</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">⌨️</div>
        <h2 class="feature-title">Slash Commands</h2>
        <p class="feature-description">Type '/' to access a menu of content blocks</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🎨</div>
        <h2 class="feature-title">Clean UI</h2>
        <p class="feature-description">Modern, minimalist design with intuitive controls</p>
      </div>
    </div>
    
    <div class="getting-started">
      <h2 class="section-title">Getting Started</h2>
      <p>The editor supports a variety of content blocks and formatting options:</p>
      <ul class="features-list">
        <li>Headings (H1, H2)</li>
        <li>Bullet and numbered lists</li>
        <li>Blockquotes</li>
        <li>Text formatting (bold, italic, etc.)</li>
        <li>Drag and drop reordering</li>
      </ul>
      <NuxtLink to="/editor" class="link-button">Open Editor</NuxtLink>
    </div>
  </div>
</template>

<style>
.home-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.hero {
  text-align: center;
  padding: 4rem 1rem;
  margin-bottom: 3rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.hero-description {
  font-size: 1.5rem;
  color: var(--text-light);
  margin-bottom: 2rem;
}

.hero-cta {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;
}

.hero-cta:hover {
  background-color: var(--primary-hover);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.feature-card {
  background-color: var(--bg-light);
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.feature-description {
  color: var(--text-light);
}

.getting-started {
  background-color: var(--bg-light);
  border-radius: 0.5rem;
  padding: 2rem;
  margin-top: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.features-list {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

.features-list li {
  margin-bottom: 0.5rem;
}

.link-button {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s;
}

.link-button:hover {
  background-color: var(--primary-hover);
}
</style>