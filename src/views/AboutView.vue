<template>
  <div class="container page-pad">
    <h1 class="cat-title">O nás</h1>
    <div class="ab">
      <div class="article" style="margin:0;width:100%">
        <p>Občas nečas je časopis študentov Univerzity Konštantína Filozofa v Nitre. Vychádza od roku 1995 a prináša správy, rozhovory, komentáre a reportáže z univerzity aj mesta.</p>
        <h2>Naše poslanie</h2>
        <p>Chceme byť nezávislým hlasom študentov: písať o tom, čo sa deje na škole, a dať priestor názorom, ktoré inde nezaznejú.</p>
        <h2 id="redakcia">Redakcia</h2>
        <ul><li>Radka Benčová</li><li>Agnesa Kaľavská</li><li>Anastasiia Bazarova</li><li>Juraj Pagáč</li></ul>
      </div>
      <aside id="kontakt" class="side">
        <span class="kicker">Kontakt</span>
        <p>Univerzita Konštantína Filozofa v Nitre<br>Trieda A. Hlinku 1, 949 74 Nitra</p>
        <p><a href="https://www.facebook.com/ObcasNecas/">Facebook</a><br><a href="https://www.instagram.com/ObcasNecas/">Instagram</a></p>
      </aside>
    </div>
  </div>
</template>
<style scoped>
.ab{display:grid;grid-template-columns:2fr 1fr;gap:56px}.side{border-top:1px solid var(--color-border);padding-top:16px;font:.95rem/1.6 var(--font-serif);align-self:start}
.side a{color:var(--color-accent)}@media(max-width:800px){.ab{grid-template-columns:1fr;gap:24px}}
</style>
