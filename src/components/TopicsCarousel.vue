<script setup>
import { ref, computed } from 'vue'
import { kategorie, byKategoria } from '../data/articles'
import CategoryRow from './CategoryRow.vue'

const q = ref('')

const norm = (s) =>
    s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const plural = (n) =>
    n === 1 ? 'článok' : n >= 2 && n <= 4 ? 'články' : 'článkov'

const all = kategorie.map((k) => {
  const count = byKategoria(k.slug).length
  return { ...k, count, label: `${k.name} – ${count} ${plural(count)}` }
})

const items = computed(() => {
  const term = norm(q.value.trim())
  return term ? all.filter((k) => norm(k.name).includes(term)) : all
})

const rows = computed(() => {
  const list = items.value
  if (list.length < 6) return [list]
  const mid = Math.ceil(list.length / 2)
  return [list.slice(0, mid), list.slice(mid)]
})
</script>

<template>
  <section class="tc" aria-label="Prehľadávať kategórie">
    <h2 class="sr-only">Prehľadávať kategórie</h2>

    <form class="search" role="search" @submit.prevent>
      <input
          v-model="q"
          type="search"
          placeholder="Hľadať kategóriu…"
          aria-label="Hľadať kategóriu"
      />
      <button type="submit" aria-label="Hľadať">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      </button>
    </form>

    <p v-show="!items.length" class="dek">
      Žiadna kategória sa nezhoduje s „{{ q }}“.
    </p>

    <div v-show="items.length" class="rows">
      <CategoryRow
          v-for="(row, i) in rows"
          :key="i"
          :items="row"
          :direction="i % 2 === 0 ? 1 : -1"
      />
    </div>
  </section>
</template>

<style scoped>
.tc {
  margin-top: 56px;
  padding: 8px 0 16px;
  background: var(--color-alt);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.search {
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 760px;
  margin: 0 auto 28px;
  padding: 0 16px;
}

.search input {
  flex: 1;
  min-width: 0;
  height: 40px;
  padding: 0 18px;
  border: 0;
  border-radius: 999px;
  background: #fff;
  font: 0.95rem var(--font-sans);
  color: #111;
  outline: 0;
  box-shadow: 0 0 0 2px transparent;
  transition: box-shadow 0.2s ease;
}

.search input:focus {
  box-shadow: 0 0 0 2px var(--color-accent, #111);
}

.search button {
  flex: 0 0 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: #111;
  cursor: pointer;
}

.search button:hover {
  background: var(--color-mark);
}

.rows {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.dek {
  text-align: center;
}
</style>