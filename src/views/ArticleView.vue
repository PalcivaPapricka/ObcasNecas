<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { articles, kategorieOf, articleImage } from '../data/articles'
import ArticleCard from '../components/ArticleCard.vue'
import ArticleMeta from '../components/ArticleMeta.vue'
import SectionHeader from '../components/SectionHeader.vue'
const route = useRoute()
const a = computed(() => articles.find(x => x.slug === route.params.slug))
const kats = computed(() => a.value ? kategorieOf(a.value) : [])
const chips = computed(() => kats.value.map(k => ({ to: `/kategorie/${k.slug}`, name: k.name })))
const related = computed(() => articles.filter(x => x.catSlug === a.value?.catSlug && x !== a.value).concat(articles).filter((x, i, arr) => x !== a.value && arr.indexOf(x) === i).slice(0, 3))
</script>
<template>
  <div v-if="a" class="page-pad">
    <header class="article" style="padding-top:12px">
      <div class="topcats">
        <RouterLink v-for="c in chips" :key="c.to" :to="c.to" class="kchip">{{ c.name }}</RouterLink>
      </div>
      <h1 class="h-display">{{ a.title }}</h1>
      <p class="dek">{{ a.description }}</p>
      <ArticleMeta :a="a" links />
    </header>
    <figure class="container hero" v-if="articleImage(a)">
      <img class="ph pic wide" :src="articleImage(a)" :alt="a.imageAlt || a.title">
      <figcaption v-if="a.imageCaption" class="caption">{{ a.imageCaption }}</figcaption>
    </figure>
    <div v-else class="container" style="margin:28px auto"><div class="ph wide"><span>Fotografia článku</span></div></div>
    <article class="article">
      <template v-for="(b,i) in a.content" :key="i">
        <p v-if="b.type==='p'">{{ b.text }}</p>
        <h2 v-else-if="b.type==='h'">{{ b.text }}</h2>
        <ul v-else-if="b.type==='ul'"><li v-for="t in b.items" :key="t">{{ t }}</li></ul>
        <blockquote v-else-if="b.type==='quote'">{{ b.text }}<cite>— {{ b.cite }}</cite></blockquote>
        <p v-else-if="b.type==='caption'" class="caption">{{ b.text }}</p>
      </template>
    </article>
    <div class="kats"><span class="meta">Kategórie:</span>
      <RouterLink v-for="c in chips" :key="c.to" :to="c.to" class="kchip">{{ c.name }}</RouterLink></div>
    <div class="container"><SectionHeader title="Súvisiace články" />
      <div class="grid3"><ArticleCard v-for="r in related" :key="r.id" :a="r" /></div></div>
  </div>
  <div v-else class="container page-pad"><h1 class="cat-title">Článok sa nenašiel</h1><RouterLink to="/" class="kicker">← Späť domov</RouterLink></div>
</template>
<style scoped>
.topcats{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:14px}
.hero{margin:28px auto}.hero .caption{margin-top:8px}
.kats{width:min(100% - 32px,740px);margin:8px auto 0;padding-top:20px;border-top:1px solid var(--color-border);display:flex;flex-wrap:wrap;align-items:center;gap:8px}
.kchip{display:inline-flex;align-items:center;min-height:36px;padding:0 15px;border-radius:999px;background:var(--color-alt);color:var(--color-text);text-decoration:none;font:600 .85rem var(--font-sans);transition:background .15s,color .15s}
.kchip:hover{background:var(--color-accent);color:#fff}
.src{margin-top:28px}.src a{font:700 .95rem var(--font-sans);color:var(--color-accent);text-decoration:underline;text-underline-offset:4px}
</style>
