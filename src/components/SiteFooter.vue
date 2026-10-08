<script setup>import { mainKategorie } from '../data/articles'</script>
<template>
  <footer class="ft"><div class="container">
    <div class="cols">
      <div><div class="brand">OBČAS NEČAS</div><p>Časopis študentov Univerzity Konštantína Filozofa v Nitre. Vychádza od roku 1995.</p></div>
      <div><h4>Navigácia</h4><RouterLink v-for="c in mainKategorie.slice(0,6)" :key="c.slug" :to="`/kategorie/${c.slug}`">{{ c.name }}</RouterLink></div>
      <div><h4>O nás</h4><RouterLink to="/o-nas">O časopise</RouterLink><RouterLink to="/o-nas#redakcia">Redakcia</RouterLink><RouterLink to="/autori">Autori</RouterLink><RouterLink to="/o-nas#kontakt">Kontakt</RouterLink></div>
      <div><h4>Sledujte nás</h4><a href="https://www.facebook.com/ObcasNecas/">Facebook</a><a href="https://www.instagram.com/ObcasNecas/">Instagram</a></div>
    </div>
    <div class="bot"><span>© Občas nečas</span><span><a href="#">Ochrana súkromia</a> · <a href="#">Podmienky používania</a></span></div>
  </div></footer>
</template>
<style scoped>
.ft{background:#111;color:#fff;margin-top:80px;padding:56px 0 24px}
.cols{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:40px}
.brand{font:800 2rem var(--font-display);letter-spacing:-.03em;text-transform:lowercase;color:var(--color-mark);margin-bottom:12px}p{color:#bbb;font:.95rem var(--font-serif);max-width:32ch}
h4{font:800 1rem var(--font-display);color:#fff;margin:0 0 12px}
.cols a{display:block;padding:5px 0;font-size:.92rem;color:#ddd}.cols a:hover{text-decoration:underline}
.bot{display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;border-top:1px solid #444;margin-top:48px;padding-top:20px;font-size:.8rem;color:#aaa}
@media(max-width:800px){.cols{grid-template-columns:1fr 1fr}}@media(max-width:480px){.cols{grid-template-columns:1fr}}
</style>
