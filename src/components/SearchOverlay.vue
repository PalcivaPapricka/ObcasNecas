<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { articles, kategorieOf } from '../data/articles'
import { useRouter } from 'vue-router'
const emit = defineEmits(['close']); const q = ref(''); const input = ref(null); const router = useRouter()
const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
const results = computed(() => { const t = norm(q.value.trim()); if (!t) return []
  return articles.filter(a => norm([a.title, a.description, a.category, a.author, ...kategorieOf(a).map(k => k.name)].join(' ')).includes(t)) })
const go = (s) => { emit('close'); router.push(`/clanok/${s}`) }
const esc = (e) => e.key === 'Escape' && emit('close')
onMounted(() => { input.value.focus(); addEventListener('keydown', esc); document.body.style.overflow = 'hidden' })
onUnmounted(() => { removeEventListener('keydown', esc); document.body.style.overflow = '' })
</script>
<template>
  <div class="ov"><div class="container in">
    <div class="top"><span class="kicker">Hľadať</span><button @click="$emit('close')" aria-label="Zavrieť">✕</button></div>
    <input ref="input" v-model="q" placeholder="Hľadať články, autorov, kategórie…" />
    <p v-if="q.trim()" class="meta">{{ results.length }} {{ results.length === 1 ? 'výsledok' : 'výsledkov' }}</p>
    <p v-if="q.trim() && !results.length" class="dek">Nič sme nenašli. Skúste iné slovo.</p>
    <a v-for="a in results" :key="a.id" class="r" href="#" @click.prevent="go(a.slug)">
      <span class="kicker">{{ a.category }}</span><h3 class="h-art">{{ a.title }}</h3><span class="meta">{{ a.author }}</span></a>
  </div></div>
</template>
<style scoped>
.ov{position:fixed;inset:0;background:#fff;z-index:100;overflow:auto;padding:24px 0}
.top{display:flex;justify-content:space-between;align-items:center}.top button{background:none;border:0;font-size:1.5rem;min-width:44px;min-height:44px}
input{width:100%;border:0;border-bottom:3px solid var(--color-accent);font:700 clamp(1.5rem,5vw,3rem) var(--font-display);padding:12px 0;outline:0;margin-bottom:16px;border-radius:0}
.r{display:block;padding:18px 0;border-top:1px solid var(--color-border)}.r:hover .h-art{text-decoration:underline}
</style>
