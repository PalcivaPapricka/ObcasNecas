<script setup>
import { articles, mainKategorie, byKategoria, kategorieOf } from '../data/articles'
import ArticleCard from '../components/ArticleCard.vue'
import SectionHeader from '../components/SectionHeader.vue'
import TopicsCarousel from '../components/TopicsCarousel.vue'
const lead = articles.find(a => a.featured)
const rest = articles.filter(a => a !== lead)
const secondary = rest.slice(0, 3)
const feed = rest.slice(3, 9)
const MIN_ARTICLES = 3, MAX_SECTIONS = 6
const sections = mainKategorie.map(k => ({ ...k, items: byKategoria(k.slug) })).filter(s => s.items.length >= MIN_ARTICLES).slice(0, MAX_SECTIONS)
const series = [articles[4], articles[2], articles[0]]
</script>
<template>
  <div class="container page-pad">
    <ArticleCard :a="lead" big />
    <hr class="rule" />
    <div class="grid3"><ArticleCard v-for="a in secondary" :key="a.id" :a="a" /></div>

    <TopicsCarousel />

    <div id="najnovsie"><SectionHeader title="Najnovšie články" /></div>
    <div><ArticleCard v-for="(a,i) in feed" :key="a.id" :a="a" class="feed-row" /></div>
  </div>

  <section class="series"><div class="container series-grid">
    <div><span class="kicker">Naše témy</span>
      <RouterLink :to="`/clanok/${series[0].slug}`" class="art"><h2 class="h-display">{{ series[0].title }}</h2></RouterLink>
      <p class="dek" style="color:#ccc">{{ series[0].description }}</p>
      <div class="ktags"><RouterLink v-for="k in kategorieOf(series[0])" :key="k.slug" :to="`/kategorie/${k.slug}`">{{ k.name }}</RouterLink></div></div>
    <ul><li v-for="a in series.slice(1)" :key="a.id" class="art sli"><h3 class="h-art"><RouterLink :to="`/clanok/${a.slug}`" class="stretch">{{ a.title }}</RouterLink></h3><span class="meta">{{ a.author }}</span>
      <div class="ktags"><RouterLink v-for="k in kategorieOf(a)" :key="k.slug" :to="`/kategorie/${k.slug}`">{{ k.name }}</RouterLink></div></li></ul>
  </div></section>

  <div class="container">
    <template v-for="s in sections" :key="s.slug">
      <SectionHeader :title="s.name" :to="`/kategorie/${s.slug}`" />
      <div class="sec">
        <ArticleCard :a="s.items[0]" big />
        <div class="side"><ArticleCard v-for="a in s.items.slice(1,4)" :key="a.id" :a="a" :image="false" /></div>
      </div>
    </template>
  </div>
</template>
<style scoped>
.sli{position:relative}.stretch::after{content:'';position:absolute;inset:0;z-index:1}.sli .ktags{position:relative;z-index:2}
.sec{display:grid;grid-template-columns:2fr 1fr;gap:40px}
.side{display:flex;flex-direction:column;gap:24px;border-left:1px solid var(--color-border);padding-left:32px}
.side>*+*{border-top:1px solid var(--color-border);padding-top:24px}
.sec :deep(.h-display){font-size:clamp(1.6rem,3vw,2.4rem)}
@media(max-width:800px){.sec{grid-template-columns:1fr}.side{border-left:0;padding-left:0}}
</style>
