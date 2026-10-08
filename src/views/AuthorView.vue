<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { authorBySlug, byAuthor } from '../data/articles'
import ArticleCard from '../components/ArticleCard.vue'
const route = useRoute()
const author = computed(() => authorBySlug(route.params.slug))
const items = computed(() => byAuthor(route.params.slug))
const initials = computed(() => (author.value?.name || '').split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase())
const plural = (n) => n === 1 ? 'článok' : n >= 2 && n <= 4 ? 'články' : 'článkov'
</script>
<template>
  <div v-if="author" class="container page-pad">
    <h1 class="cat-title">{{ author.name }}</h1>
    <section class="profile">
      <img v-if="author.photo" class="avatar" :src="author.photo" :alt="author.name">
      <div v-else class="avatar" aria-hidden="true">{{ initials }}</div>
      <div>
        <span v-if="author.role" class="kicker">{{ author.role }}</span>
        <p class="dek">{{ author.bio || 'Autor článkov v časopise Občas nečas.' }}</p>
        <a v-if="author.email" :href="`mailto:${author.email}`" class="mail">{{ author.email }}</a>
        <div class="meta">{{ items.length }} {{ plural(items.length) }}</div>
      </div>
    </section>
    <div class="sec-head"><h2>Články autora</h2><RouterLink to="/autori">Všetci autori →</RouterLink></div>
    <div class="list"><ArticleCard v-for="a in items" :key="a.id" :a="a" /></div>
  </div>
  <div v-else class="container page-pad">
    <h1 class="cat-title">Autor sa nenašiel</h1>
    <RouterLink to="/" class="kicker">← Späť domov</RouterLink>
  </div>
</template>
<style scoped>
.profile{display:flex;gap:24px;align-items:flex-start}
.avatar{flex:0 0 auto;width:96px;height:96px;border-radius:50%;object-fit:cover;background:var(--color-alt);border:1px solid var(--color-border);display:flex;align-items:center;justify-content:center;font:700 1.8rem var(--font-display);color:var(--color-muted)}
.dek{margin-top:.4rem}
.mail{display:inline-block;margin-bottom:10px;font:600 .85rem var(--font-sans);color:var(--color-accent);text-decoration:underline;text-underline-offset:3px}
.list{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:40px 32px}
@media(max-width:600px){.profile{flex-direction:column}}
</style>
