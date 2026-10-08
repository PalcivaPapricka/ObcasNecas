<script setup>
import ArticleMeta from './ArticleMeta.vue'
import { computed } from 'vue'
import { articleImage, kategorieOf } from '../data/articles'
const props = defineProps({ a: Object, image: { type: Boolean, default: true }, big: Boolean })
const kats = computed(() => props.a ? kategorieOf(props.a) : [])
</script>
<template>
  <div class="art card">
    <div v-if="image" class="imgwrap"><img v-if="articleImage(a)" class="ph pic" :class="{wide:big}" :src="articleImage(a)" :alt="a.imageAlt || a.title" loading="lazy">
      <div v-else class="ph" :class="{wide:big}"><span>Občas nečas</span></div></div>
    <div style="margin-top:14px"><h3 :class="big?'h-display':'h-art'"><RouterLink :to="`/clanok/${a.slug}`" class="stretch">{{ a.title }}</RouterLink></h3>
      <p v-if="big" class="dek">{{ a.description }}</p>
      <ArticleMeta :a="a" />
      <div v-if="kats.length" class="ktags"><RouterLink v-for="k in kats" :key="k.slug" :to="`/kategorie/${k.slug}`">{{ k.name }}</RouterLink></div></div>
  </div>
</template>
<style scoped>
.card{position:relative}
.stretch::after{content:'';position:absolute;inset:0;z-index:1}
.ktags{position:relative;z-index:2}
</style>
