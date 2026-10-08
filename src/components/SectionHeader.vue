<script setup>defineProps({ title: String, to: String })</script>
<template><div class="sec-head"><h2>{{ title }}</h2><RouterLink v-if="to" :to="to">Všetky články →</RouterLink></div></template>
