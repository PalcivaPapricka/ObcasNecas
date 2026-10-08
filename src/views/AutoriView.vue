<script setup>
import { allAuthors, byAuthor } from '../data/articles'
const key = (n) => n === 'Redakcia' ? '~' : n.split(/\s+/).pop()
const authors = allAuthors
  .map(u => ({ ...u, count: byAuthor(u.slug).length }))
  .sort((x, y) => key(x.name).localeCompare(key(y.name), 'sk') || x.name.localeCompare(y.name, 'sk'))
const initials = (n) => n.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase()
const plural = (n) => n === 1 ? 'článok' : n >= 2 && n <= 4 ? 'články' : 'článkov'
</script>
<template>
  <div class="container page-pad">
    <h1 class="cat-title">Autori</h1>
    <p class="dek">Všetci, ktorí píšu do Občas nečas. Kliknutím zobrazíš ich profil a články.</p>
    <div class="sec-head"><h2>Zoznam autorov</h2><span class="meta">{{ authors.length }} autorov</span></div>
    <div class="list">
      <RouterLink v-for="u in authors" :key="u.slug" :to="`/autor/${u.slug}`" class="au">
        <img v-if="u.photo" class="avatar" :src="u.photo" :alt="u.name">
        <span v-else class="avatar" aria-hidden="true">{{ initials(u.name) }}</span>
        <span><strong>{{ u.name }}</strong><span class="meta">{{ u.count }} {{ plural(u.count) }}</span></span>
      </RouterLink>
    </div>
  </div>
</template>
<style scoped>
.list{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px 32px}
.au{display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid var(--color-border)}
.au strong{display:block;font:700 1.1rem/1.2 var(--font-display)}
.au:hover strong{text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px}
.avatar{flex:0 0 auto;width:52px;height:52px;border-radius:50%;object-fit:cover;background:var(--color-alt);border:1px solid var(--color-border);display:flex;align-items:center;justify-content:center;font:700 1rem var(--font-display);color:var(--color-muted)}
</style>
