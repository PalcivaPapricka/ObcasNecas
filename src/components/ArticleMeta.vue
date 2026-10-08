<script setup>
import { fmtDate } from '../data/articles'
defineProps({ a: Object, links: Boolean })
</script>
<template>
  <div class="meta m">
    <span class="who">
      <template v-if="links && a.authors?.length">
        <template v-for="(u, i) in a.authors" :key="u.slug">
          <template v-if="i > 0">{{ i === a.authors.length - 1 ? ' a ' : ', ' }}</template>
          <RouterLink :to="`/autor/${u.slug}`" class="author">{{ u.name }}</RouterLink>
        </template>
      </template>
      <template v-else>{{ a.author }}</template>
    </span>
    <span>{{ fmtDate(a.date) }}</span>
    <span>{{ a.readingTime }}</span>
  </div>
</template>
<style scoped>
.m{display:flex;flex-wrap:wrap;align-items:center;gap:2px 0}
.m>span+span::before{content:'';display:inline-block;width:1px;height:.9em;background:var(--color-border);margin:0 .7em;vertical-align:-.1em}
.who{color:var(--color-text);font-weight:700}
.author{text-decoration:underline;text-decoration-color:var(--color-mark);text-decoration-thickness:2px;text-underline-offset:3px}
.author:hover{color:var(--color-accent)}
</style>
