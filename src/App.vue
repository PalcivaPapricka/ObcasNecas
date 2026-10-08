<script setup>
import { ref } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import SearchOverlay from './components/SearchOverlay.vue'
import { articles } from './data/articles'
const searchOpen = ref(false)
const latest = articles[0]
</script>
<template>
  <div class="bar"><div class="container bar-in"><span>Občas nečas — časopis študentov UKF od roku 1995</span><RouterLink :to="`/clanok/${latest.slug}`">Čítať najnovšie →</RouterLink></div></div>
  <SiteHeader @search="searchOpen = true" />
  <main><RouterView :key="$route.fullPath" /></main>
  <SiteFooter />
  <SearchOverlay v-if="searchOpen" @close="searchOpen = false" />
</template>
<style>
.bar{background:var(--color-mark);color:var(--color-text);font:600 .82rem var(--font-sans)}
.bar-in{display:flex;justify-content:space-between;gap:12px;padding:8px 0}.bar a{text-decoration:underline;text-underline-offset:3px;font-weight:700;white-space:nowrap}
</style>
