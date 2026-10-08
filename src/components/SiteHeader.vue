<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { mainKategorie, articles, kategorieOf } from '../data/articles'
defineEmits(['search'])
const route = useRoute()
const open = ref(false), q = ref(''), input = ref(null), hd = ref(null), megaMax = ref('')
const measure = () => { if (hd.value) megaMax.value = `${Math.max(240, innerHeight - hd.value.getBoundingClientRect().bottom)}px` }
const nav = mainKategorie.slice(0, 7)
const series = [articles[4], articles[2], articles[0]]
const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
const results = computed(() => { const t = norm(q.value.trim()); if (!t) return []
  return articles.filter(a => norm([a.title, a.description, a.category, a.author, ...kategorieOf(a).map(k => k.name)].join(' ')).includes(t)).slice(0, 6) })
const toggle = async () => { open.value = !open.value; if (open.value) { await nextTick(); measure(); input.value?.focus() } }
const close = () => { open.value = false; q.value = '' }
watch(() => route.fullPath, close)
watch(open, v => document.body.style.overflow = v ? 'hidden' : '')
const esc = (e) => e.key === 'Escape' && open.value && close()
onMounted(() => { addEventListener('keydown', esc); addEventListener('resize', measure) }); onUnmounted(() => { removeEventListener('keydown', esc); removeEventListener('resize', measure); document.body.style.overflow = '' })
</script>
<template>
  <header ref="hd" class="hd">
    <div class="container hd-top">
      <button class="btn" :aria-expanded="open" aria-controls="mega" @click="toggle">{{ open ? '✕' : '☰' }} <span class="lbl">{{ open ? 'Zavrieť' : 'Menu' }}</span></button>
      <RouterLink to="/" class="logo">OBČAS NEČAS<small>univerzitný web študentov UKF</small></RouterLink>
      <button class="btn" aria-label="Hľadať" @click="$emit('search')"><span class="lbl">Hľadať</span> ⌕</button>
    </div>
    <nav class="container nav">
      <RouterLink v-for="c in nav" :key="c.slug" :to="`/kategorie/${c.slug}`">{{ c.name }}</RouterLink>
      <RouterLink to="/kategorie" class="k">Všetky kategórie</RouterLink>
      <RouterLink to="/autori">Autori</RouterLink>
      <RouterLink to="/o-nas">O nás</RouterLink></nav>

    <div v-if="open" id="mega" class="mega" role="dialog" aria-label="Menu" :style="{ maxHeight: megaMax }">
      <div class="container">
        <label class="srch"><span class="kicker">Hľadať v Občas nečas</span>
          <input ref="input" v-model="q" placeholder="Zadajte slovo, autora alebo kategóriu…" /></label>
        <div v-if="q.trim()" class="res">
          <p class="meta">{{ results.length }} {{ results.length === 1 ? 'výsledok' : 'výsledkov' }}</p>
          <RouterLink v-for="a in results" :key="a.id" :to="`/clanok/${a.slug}`" class="r"><span class="kicker">{{ a.category }}</span><h3 class="h-art">{{ a.title }}</h3></RouterLink>
          <p v-if="!results.length" class="dek">Nič sme nenašli.</p>
        </div>
        <div v-else class="cols">
          <div><p class="blurb">Časopis študentov Univerzity Konštantína Filozofa v Nitre. Vychádza od roku 1995.</p>
            <RouterLink to="/o-nas">O časopise</RouterLink><RouterLink to="/o-nas#redakcia">Redakcia</RouterLink><RouterLink to="/autori">Autori</RouterLink><RouterLink to="/o-nas#kontakt">Kontakt</RouterLink></div>
          <div><h4>Kategórie</h4><div class="two"><RouterLink v-for="c in mainKategorie" :key="c.slug" :to="`/kategorie/${c.slug}`">{{ c.name }}</RouterLink></div>
            <RouterLink to="/kategorie" class="all">Všetky kategórie →</RouterLink></div>
          <div><h4>Naše najväčšie témy</h4><RouterLink v-for="a in series" :key="a.id" :to="`/clanok/${a.slug}`" class="s"><strong>{{ a.category }}</strong>{{ a.title }}</RouterLink></div>
        </div>
      </div>
    </div>
  </header>
  <div v-if="open" class="scrim" @click="close"></div>
</template>
<style scoped>
.hd{border-bottom:2px solid var(--color-text);background:#fff;position:sticky;top:0;z-index:50}
.hd-top{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px;padding:14px 0}
.logo{font:700 clamp(1.6rem,5vw,3.2rem)/1 var(--font-display);letter-spacing:-.04em;text-transform:lowercase;color:var(--color-accent);text-align:center}
.logo small{display:block;font:500 .8rem var(--font-sans);letter-spacing:0;text-transform:none;color:var(--color-muted);margin-top:6px}
.btn{display:inline-flex;align-items:center;gap:6px;background:none;border:0;color:var(--color-text);font:700 .92rem var(--font-sans);padding:0 4px;min-height:44px;justify-self:start;border-radius:8px;transition:color .15s}
.btn:hover{color:var(--color-accent)}
.hd-top .btn:last-child{justify-self:end}
.nav{display:flex;flex-wrap:nowrap;gap:4px 2px;justify-content:safe center;overflow-x:auto;scrollbar-width:none;border-top:1px solid var(--color-border);padding:10px 0;font:700 .85rem var(--font-sans)}
.nav::-webkit-scrollbar{display:none}
.nav a{flex:none;white-space:nowrap;padding:6px 10px;border-radius:999px;transition:background .15s}
.nav a:hover{background:var(--color-mark)}
.mega{position:absolute;left:0;right:0;top:100%;background:#fff;border-top:4px solid var(--color-accent);border-bottom:1px solid var(--color-text);box-shadow:0 18px 30px rgba(0,0,0,.12);max-height:calc(100dvh - 160px);overflow-y:auto;overscroll-behavior:contain;padding:28px 0 40px;animation:mega-in .18s ease-out}
@keyframes mega-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
.scrim{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:40}
.srch{display:block;margin-bottom:28px}
.srch input{display:block;width:100%;border:0;border-bottom:3px solid var(--color-text);border-radius:0;background:none;font:700 clamp(1.3rem,4vw,2.2rem) var(--font-display);padding:10px 0;outline:0;margin-top:8px}
.srch input::placeholder{color:var(--color-muted);opacity:.6}
.srch input:focus{border-color:var(--color-accent)}
.cols{display:grid;grid-template-columns:1fr 1.4fr 1.2fr;gap:48px}
.cols a{display:block;padding:7px 0;font:600 .95rem var(--font-sans)}.cols a:hover{color:var(--color-accent);text-decoration:underline;text-underline-offset:3px}
.blurb{font:1.05rem/1.5 var(--font-serif);margin:0 0 14px;color:#333}
h4{font:800 1rem var(--font-display);color:var(--color-text);margin:0 0 10px;padding-bottom:8px;border-bottom:1px solid var(--color-border)}
.cols a.all{color:var(--color-accent);margin-top:6px}
.two{columns:2;column-gap:24px}.two a{break-inside:avoid}
.s{font:700 1.05rem/1.3 var(--font-display)!important;border-bottom:1px solid var(--color-border)}.s strong{display:block;font:700 .82rem var(--font-sans);color:var(--color-accent);margin-bottom:4px}
.r{display:block;padding:14px 0;border-top:1px solid var(--color-border)}.r:hover .h-art{text-decoration:underline}
@media(max-width:900px){.nav{display:none}.lbl{display:none}.btn{font-size:1.4rem;min-width:44px;justify-content:center}.cols{grid-template-columns:1fr;gap:28px}.cols a{padding:11px 0}.mega{padding:20px 0 32px}}
@media(max-width:480px){.logo small{font-size:.66rem;margin-top:4px}.hd-top{padding:10px 0}}
@media(prefers-reduced-motion:reduce){.mega{animation:none}}
</style>