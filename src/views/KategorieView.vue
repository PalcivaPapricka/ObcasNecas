<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { kategorie, articles, byKategoria } from '../data/articles'
import ArticleCard from '../components/ArticleCard.vue'

const route = useRoute()
const active = computed(() => kategorie.find(k => k.slug === route.params.slug))
const unknown = computed(() => !!route.params.slug && !active.value)
const items = computed(() => active.value ? byKategoria(active.value.slug) : articles)
const plural = (n) => n === 1 ? 'článok' : n >= 2 && n <= 4 ? 'články' : 'článkov'
</script>

<template>
  <div class="container page-pad">
    <h1 class="cat-title">Kategórie</h1>
    <p class="dek">Články podľa tém. Jeden článok môže patriť do viacerých kategórií naraz.</p>

    <nav class="picker" aria-label="Výber kategórie">
      <RouterLink to="/kategorie" class="chip" :class="{ on: !active }" :aria-current="!active ? 'page' : undefined">
        Všetky <span>{{ articles.length }}</span>
      </RouterLink>
      <RouterLink v-for="k in kategorie" :key="k.slug" :to="`/kategorie/${k.slug}`" class="chip"
                  :class="{ on: active?.slug === k.slug }" :aria-current="active?.slug === k.slug ? 'page' : undefined">
        {{ k.name }} <span>{{ byKategoria(k.slug).length }}</span>
      </RouterLink>
    </nav>

    <p v-if="unknown" class="dek">Takú kategóriu sme nenašli. Vyberte jednu z ponuky vyššie.</p>

    <div class="sec-head">
      <h2>{{ active ? active.name : 'Všetky články' }}</h2>
      <span class="meta">{{ items.length }} {{ plural(items.length) }}</span>
    </div>
    <p v-if="!items.length" class="dek">V tejto kategórii zatiaľ nie sú žiadne články.</p>
    <div v-else class="list"><ArticleCard v-for="a in items" :key="a.id" :a="a" /></div>
  </div>
</template>

<style scoped>
.picker{display:flex;flex-wrap:wrap;gap:10px;padding:18px 0;border-top:1px solid var(--color-border);border-bottom:1px solid var(--color-border)}
.chip{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 18px;border:1.5px solid var(--color-text);border-radius:999px;background:#fff;font:600 .88rem var(--font-sans);transition:background .15s,color .15s}
.chip span{font:500 .75rem var(--font-sans);color:var(--color-muted)}
.chip:hover{background:var(--color-mark)}
.chip.on{background:var(--color-text);color:#fff}
.chip.on span{color:#cfd2ff}
.sec-head{margin-top:36px}
.list{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:40px 32px}
</style>
