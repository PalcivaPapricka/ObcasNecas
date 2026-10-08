export const mainCount = 12
export const kategorie = [
  { slug: 'ukf-life', name: 'UKF Life' },
  { slug: 'zo-skolstva', name: 'Zo školstva' },
  { slug: 'sport', name: 'Šport' },
  { slug: 'medzi-riadkami', name: 'Medzi riadkami' },
  { slug: 'on-predstavuje', name: 'ON predstavuje' },
  { slug: 'rande-s-nitrou', name: 'Rande s Nitrou' },
  { slug: 'kultura-a-umenie', name: 'Kultúra a umenie' },
  { slug: 'eko', name: 'EKO' },
  { slug: 'aby-duse-rozkvitli', name: 'Aby duše rozkvitli' },
  { slug: 'komentare-a-nazory', name: 'Komentáre a názory' },
  { slug: 'rozhovory', name: 'Rozhovory' },
  { slug: 'tipy', name: 'Tipy redakcie' },
  { slug: 'politika', name: 'Politika' },
  { slug: 'socialne-siete', name: 'Sociálne siete' },
  { slug: 'auto-zurnalistika', name: 'Auto žurnalistika' },
  { slug: 'dab', name: 'DAB' },
  { slug: 'recenzie', name: 'Recenzie' },
  { slug: 'film', name: 'Film' },
  { slug: 'divadlo', name: 'Divadlo' },
  { slug: 'horor', name: 'Horor' },
  { slug: 'hudba', name: 'Hudba' },
  { slug: 'popkultura', name: 'Popkultúra' },
  { slug: 'slovenske-balady', name: 'Slovenské balady' },
  { slug: 'umela-inteligencia', name: 'Umelá inteligencia' },
  { slug: 'zurnalistika-media', name: 'Žurnalistika a médiá' },
  { slug: 'televizia', name: 'Televízia' },
  { slug: 'festival-bez-komentara', name: 'Festival Bez komentára' },
  { slug: 'vysoke-skolstvo', name: 'Vysoké školstvo' },
  { slug: 'studentsky-zivot', name: 'Študentský život' },
  { slug: 'mladez', name: 'Mládež' },
  { slug: 'nitra', name: 'Nitra' },
  { slug: 'podujatia', name: 'Podujatia a festivaly' },
  { slug: 'volny-cas', name: 'Voľný čas' },
  { slug: 'tipy-a-odporucania', name: 'Tipy a odporúčania' },
  { slug: 'nazory-a-fejtony', name: 'Názory a fejtóny' }
]
export const kategorieOf = (art) => (art.kategorie || []).map(s => kategorie.find(k => k.slug === s)).filter(Boolean)
export const catSlug = (name) => kategorie.find(c => c.name === name)?.slug || 'ukf-life'
export const mainKategorie = kategorie.slice(0, mainCount)

const body = (t) => [
  { type: 'p', text: t },
  { type: 'p', text: 'Redakcia Občas Nečas sa téme venovala niekoľko týždňov. Hovorili sme so študentmi, vyučujúcimi aj ľuďmi z mesta, aby sme zachytili viac než jeden uhol pohľadu.' },
  { type: 'h', text: 'Čo sme zistili' },
  { type: 'ul', items: ['Zmeny sa dotýkajú študentov všetkých stupňov štúdia.', 'Názory odborníkov a študentov sa v mnohom líšia.', 'Najviac otázok vzbudzuje praktické zavedenie do života.'] },
  { type: 'quote', text: 'Ide o tému, ktorá sa nás dotýka každý deň, len o nej zvyčajne nehovoríme nahlas.', cite: 'oslovený študent UKF' },
  { type: 'p', text: 'Text je ukážkový a slúži na demonštráciu čitateľského rozhrania.' },
  { type: 'caption', text: 'Foto: archív redakcie' }
]
const a = (id, slug, title, description, category, author, date, readingTime, extra = {}) =>
    ({ id, slug, title, description, category, author, date, readingTime, content: body(description), kategorie: [], ...extra })

const paras = (t) => t.split(/\n\s*\n/).map(x => ({ type: 'p', text: x.trim() })).filter(x => x.text)
const real = (id, slug, title, description, category, author, date, readingTime, kat, extra = {}) =>
    a(id, slug, title, description, category, author, date, readingTime, { kategorie: Array.isArray(kat) ? kat : (kat?.kategorie ?? []), content: [{ type: 'p', text: description }], ...extra })

export const articles = [
  real(1,'od-rozhlasu-k-podcastu','Od rozhlasu k podcastu, od televízie k streamingu. Žurnalistika mení svoju tvár aj na magisterskom stupni štúdia','Digitálne médiá, sociálne siete, podcasty, umelá inteligencia či nové formy audiovizuálneho obsahu. Svet médií sa mení rýchlejšie ako kedykoľvek predtým.','UKF Life','Radka Benčová','2026-09-21','6 min',['zurnalistika-media','umela-inteligencia','vysoke-skolstvo','televizia','socialne-siete'],{ featured: true, imageAlt: 'Študenti v prednáškovej miestnosti počas stretnutia o žurnalistike', imageCaption: 'Foto: archív redakcie' }),
  real(2,'kino-laka-na-pestru-filmovu-nadielku','Kino láka na pestrú filmovú nádielku: August plný dobrodružstva, napätia, humoru','Od výpravy medzi dinosaury cez športovú drámu a rodinné sci-fi dobrodružstvo až po komédiu.','Kultúra a umenie','Agnesa Kaľavská','2026-08-05','4 min',['film','tipy-a-odporucania','volny-cas']),
  real(3,'socialne-siete-bez-jasnych-hranic','Veronika Cifrová Ostrihoňová: Sociálne siete bez jasných hraníc vystavujú deti tlakom a rizikám','Sociálne siete sú prirodzenou súčasťou života mladých ľudí, no zároveň prinášajú riziká, na ktoré nie sú pripravení.','Rozhovory','Juraj Pagáč','2026-08-05','8 min',['politika','rozhovory','socialne-siete','mladez']),
  real(4,'slovenske-balady','Kristína Spáčová: Slovenské balady hovoria o strachoch, ktoré prežívame dodnes','Herečka Kristína Spáčová rozpráva o tom, ako ju formovalo poľsko-slovenské prostredie.','Kultúra a umenie','Anastasiia Bazarova','2026-08-03','7 min',['dab','divadlo','rozhovory','slovenske-balady']),
  real(5,'nahradit-diplomovky-praxou','Nahradiť diplomovky praxou? Reforma reaguje na AI aj realitu škôl, no prináša nové riziká','Slovenské vysoké školy čaká zásadná zmena: diplomové práce má nahradiť povinná odborná prax.','Zo školstva','Juraj Pagáč','2026-07-21','9 min',['politika','rozhovory','vysoke-skolstvo','umela-inteligencia']),
  real(6,'svetovy-sampionat','Svetový šampionát po štyroch rokoch opäť na scéne: Súhrn informácií o najväčšom turnaji','Priaznivci reprezentačného futbalu sa po dňoch odpočítavania konečne dočkali.','Šport','Redakcia','2026-06-19','5 min',['sport','podujatia']),
  real(7,'zima-za-rohom-auto','Zima za rohom: Ako pripraviť auto, aby neskončilo v servise ešte pred sviatkami','Praktické rady, ktoré vám ušetria čas aj peniaze pred prvými mrazmi.','Tipy redakcie','Martin Galanda','2025-12-16','3 min',['auto-zurnalistika','tipy-a-odporucania']),
  real(8,'zimne-citanie','Zimné čítanie, ktoré zohreje dušu: Knihy, do ktorých sa chceš ponoriť pod dekou','Redakčný výber kníh na dlhé zimné večery.','Tipy redakcie','Redakcia','2025-12-11','4 min',['tipy-a-odporucania','volny-cas']),
  real(9,'nitra-na-prechadzke','Rande s Nitrou: Päť miest pod hradom, ktoré by ste mali poznať','Nitra má viac tajných zákutí, než si väčšina študentov myslí.','Rande s Nitrou','Redakcia','2025-11-20','5 min',{ kategorie: ['nitra','volny-cas','studentsky-zivot'] }),
  real(10,'zelenie-kampus','EKO: Ako sa kampus UKF učí triediť a šetriť','Študentské iniciatívy menia každodenné návyky na univerzite.','EKO','Redakcia','2025-11-02','4 min',{ kategorie: ['studentsky-zivot','vysoke-skolstvo'] }),
  real(11,'komentar-o-pozornosti','Komentár: Prečo nám dochádza pozornosť a čo s tým','Úvaha o tom, ako sa učiť a čítať vo svete notifikácií.','Komentáre a názory','Redakcia','2025-10-14','5 min',{ kategorie: ['nazory-a-fejtony','socialne-siete'] }),
  real(12,'on-predstavuje-redakcia','ON predstavuje: Nový ročník redakcie a jej plány','Zoznámte sa s ľuďmi, ktorí tvoria časopis študentov UKF.','ON predstavuje','Redakcia','2025-10-01','3 min',{ kategorie: ['zurnalistika-media','studentsky-zivot'] }),
  real(13,'strmy-pad-talianskej-dynastie','Strmý pád talianskej dynastie: trojnásobné zlyhanie alebo náhoda?','Komentár sa pýta, či za opakovaným zlyhaním stojí systémová chyba, alebo len nešťastná zhoda okolností, a pripomína, koľko záleží na koncentrácii v rozhodujúcich chvíľach.','Komentáre a názory','Leonard Ďurický','2026-05-21','4 min',['sport','nazory-a-fejtony']),
  real(14,'plutvovi-plavci-sala','Mladí plutvoví plavci zo Šale zažiarili na majstrovstvách Slovenska','Správa o tom, ako sa mladí plavci z klubu vodných športov BARAKUDA Šaľa presadili na majstrovstvách Slovenska v plutvovom plávaní.','Šport','Andrea Novotná','2026-05-17','3 min',['sport','mladez','podujatia']),
  real(15,'majales-nitra-2026','Majáles Nitra 2026 odštartoval leto vo veľkom štýle','Reportáž z nitrianskeho Majálesu, ktorý sa konal 8. a 9. mája a opäť pritiahol množstvo návštevníkov.','Rande s Nitrou','Barbora Hanová a Natália Kováčová','2026-05-14','4 min',['nitra','podujatia','studentsky-zivot']),
  real(16,'v-mene-ballu','Generačné traumy, konflikty vo vzťahoch či odcudzenie postáv: aj o tom je nová divadelná inscenácia V mene Ballu','Recenzia novej inscenácie zo štúdia Divadla Andreja Bagara v Nitre, ktorej premiéra bola 27. marca.','Kultúra a umenie','Alexandra Petrovová','2026-05-12','5 min',['dab','recenzie','divadlo']),
  real(17,'marek-vagovic-v-nitre','Marek Vagovič v Nitre otvorene o investigatíve, politikoch a pripravovanom filme','Záznam z besedy s Marekom Vagovičom, ktorá sa 22. apríla konala v Krajskej knižnici Karola Kmeťka v Nitre.','Medzi riadkami','Alexandra Petrovová','2026-05-08','5 min',['politika','zurnalistika-media','nitra']),
  real(18,'plautus-oziva','Plautus ožíva: antické komédie v novom šate','Text o inscenácii Play Plautus, ktorá približuje antické komédie súčasným jazykom a humorom.','Kultúra a umenie','Anastasiia Bazarova a Radka Benčová','2026-05-07','4 min',['dab','divadlo']),
  real(19,'maj-v-kinach','Máj prináša nový boj o budúcnosť galaxie Star Wars, návrat videohry Mortal Kombat či príbehy plné tajomstiev, záhad a dobrodružstva','Prehľad májových filmových noviniek v kinách Cinemax, od sci-fi sérií cez filmové spracovanie videohry až po dobrodružné príbehy.','Kultúra a umenie','Agnesa Kaľavská','2026-05-06','4 min',['film','popkultura','tipy-a-odporucania','volny-cas']),
  real(20,'spukfest-nitra','Nitra žila ŠPUKFESTOM: Pil C a Ego roztancovali amfiteáter','Reportáž zo ŠPUKFESTU v nitrianskom amfiteátri s hudbou, súťažami a vystúpeniami Pil C a Ega.','Rande s Nitrou','Barbora Hanová','2026-05-04','4 min',['nitra','podujatia','hudba','studentsky-zivot']),
  real(21,'april-v-kinach','Smrteľné hry čí návraty ikon? Apríl ovládne kinové plátna so skvelými filmovými novinkami','Prehľad aprílových filmových noviniek: pokračovanie kultového hororu, napätie aj film zasadený do sveta módy.','Kultúra a umenie','Agnesa Kaľavská','2026-04-08','4 min',['film','horor','tipy-a-odporucania','volny-cas']),
  real(22,'rev-vresk-a-brud','Rev, vresk a brud: keď sa slovenské balady menia na divadelný horor','Text o sugestívnej inscenácii, v ktorej temnota slovenských balád ožíva na javisku.','Kultúra a umenie','Anastasiia Bazarova a Radka Benčová','2026-04-07','5 min',['dab','divadlo','horor','slovenske-balady']),
  real(23,'studenti-v-ceskej-televizii','Študenti „na skok“ v zákulisí Českej televízie na Kavčích horách','Študenti Univerzity Konštantína Filozofa nazreli do zákulisia Českej televízie na Kavčích horách.','UKF Life','Alexandra Petrovová','2026-04-07','4 min',['televizia','zurnalistika-media','vysoke-skolstvo']),
  real(24,'divadelna-talent-show','Karaoke, Just Dance a improvizácia: Divadelná talent show na UKF','Vysokoškolské divadlo UKF usporiadalo talentovú show, v ktorej sa miešal spev, tanec a improvizácia.','Kultúra a umenie','Anastasiia Bazarova','2026-04-01','3 min',['divadlo','hudba','studentsky-zivot','volny-cas']),
  real(25,'sportove-gymnazium-nitra','Študenti Športového gymnázia v Nitre zbierajú tituly: majstri Slovenska aj medaily z Európy','Prehľad úspechov študentov Športového gymnázia v Nitre z uplynulej sezóny, od titulov majstrov Slovenska po medaily z Európy.','Šport','Andrea Novotná','2026-03-31','4 min',['sport','mladez','nitra']),
  real(26,'bez-komentara-zahranicne-dianie','Bez komentára: Keď zahraničné dianie ovplyvňuje aj náš každodenný život','Zo diskusie s vedúcim zahraničného oddelenia denníka SME Lukášom Onderčaninom o tom, prečo sledovať dianie vo svete.','UKF Life','Radka Benčová','2026-03-19','4 min',['zurnalistika-media','festival-bez-komentara']),
  real(27,'mensiny-v-mediach','Panelová diskusia na Katedre žurnalistiky a nových médií : Menšiny v médiách ako subjekty, nie objekty','Správa z panelovej diskusie, ktorá sa 10. marca konala na Katedre žurnalistiky a nových médií.','UKF Life','Anastasiia Bazarová','2026-03-19','4 min',['zurnalistika-media','vysoke-skolstvo']),
  real(28,'finito','Finito: Smiech na strane života a smrti','Text o inscenácii Finito na javisku Divadla Andreja Bagara v Nitre, ktorá sa smeje na hranici života a smrti.','Kultúra a umenie','Barbora Hanová, Natália Kováčová a Andrea Strompová','2026-03-19','4 min',['dab','divadlo','nitra']),
  real(29,'umelecky-vecer-v-synagoge','Umelecký večer v nitrianskej synagóge','Reportáž z vernisáže výstavy umelcov Tomáša Turzáka a Vlada Leštacha v nitrianskej synagóge.','Kultúra a umenie','Barbora Hanová','2026-03-16','3 min',['nitra','podujatia']),
  real(30,'festival-bez-komentara','Festival Bez komentára búra ticho: Študentky žurnalistiky otvárajú tému slobody v médiách','Dve študentky žurnalistiky pripravili festival, ktorý spolužiakom približuje svet médií a tému slobody v nich.','Rozhovory','Agnesa Kaľavská','2026-03-08','5 min',['rozhovory','zurnalistika-media','festival-bez-komentara','studentsky-zivot']),
  real(31,'autoshow-nitra-2025','Autosalón Autoshow Nitra 2025: Tridsiatka plná dymu, koní a konceptov','Report z jubilejného 30. ročníka Autosalónu Autoshow Nitra 2025 na výstavisku Agrokomplex.','Medzi riadkami','Martin Galanda','2025-10-17','4 min',['auto-zurnalistika','nitra','podujatia']),
  real(32,'ojazdene-auto-7-pasci','Na čo si dať pozor pri kúpe ojazdeného auta: 7 pascí, ktorým sa môžete vyhnúť','Praktický zoznam siedmich pascí, ktorým sa pri kúpe jazdeného auta oplatí vyhnúť.','Medzi riadkami','Martin Galanda','2025-07-03','5 min',['auto-zurnalistika','tipy-a-odporucania']),
  real(33,'duchon-sklamanie','Duchoň: sklamanie v réžii Petra Bebjaka','Recenzia filmu o Karolovi Duchoňovi v réžii Petra Bebjaka, ktorý autor vníma ako sklamanie.','Kultúra a umenie','Martin Galanda','2025-09-02','4 min',['recenzie','film','hudba']),
  real(34,'superman-jamesa-gunna','Superman Jamesa Gunna: návrat kladného mužského hrdinu v ére antihrdinov a záporákov?','Recenzia Supermana Jamesa Gunna a otázka, či ide o návrat kladného hrdinu v dobe antihrdinov.','Kultúra a umenie','Michaela Donthová','2025-07-26','4 min',['recenzie','film','popkultura']),
  real(35,'f1-filmova-novinka','Za zvukom zohriatych pneumatík: Filmová novinka F1 úspešne dorazila do svojho cieľa','Recenzia filmovej novinky F1, ktorá poteší najmä nadšencov motoršportu.','Kultúra a umenie','Leonard Ďurický','2025-07-09','4 min',['recenzie','film','sport']),
  real(36,'reziser-usmevu','Režisér Úsmevu si pod sebou podpílil konár. Dvojka nanáša novú fasádu na starý konštrukt','Recenzia hororového pokračovania Úsmev, ktoré podľa autora nanáša novú fasádu na starý konštrukt.','Kultúra a umenie','Kristián Vrábel','2024-10-18','5 min',['recenzie','film','horor']),
  real(37,'longlegs','Dlhé nohy sú super, ale LONGLEGS vám nedovolí nad nimi rozmýšľať','Recenzia filmu Longlegs a jeho zvláštnej atmosféry aj marketingu.','Kultúra a umenie','Kristián Vrábel','2024-09-01','5 min',['recenzie','film','horor']),
  real(38,'ai-na-tiktoku','Umelá inteligencia aj na TikToku: AI ťa pobaví a algoritmus pochopí','Text o tom, ako sa na TikToku mieša umelá inteligencia s rýchlo sa meniacimi trendmi a algoritmom.','Medzi riadkami','Alina-Ianka Rapcian','2025-10-25','4 min',['socialne-siete','umela-inteligencia']),
  real(39,'introvert-na-instagrame','Som introvert, ale na Instagrame extrovert (Fejtón)','Fejtón o tom, aké je byť v bežnom živote introvertom, no na Instagrame extrovertom.','Medzi riadkami','Michaela Študencová','2025-08-22','3 min',['socialne-siete','nazory-a-fejtony'])
]
articles.sort((x, y) => y.date.localeCompare(x.date))
articles.forEach(x => { x.catSlug = catSlug(x.category); x.kategorie = [...new Set([x.catSlug, ...(x.kategorie || [])])] })

export const authorInfo = {
  'Redakcia': { role: 'Redakcia', bio: 'Články, ktoré pripravila redakcia časopisu Občas nečas.' }
}
const authorAlias = { 'Anastasiia Bazarová': 'Anastasiia Bazarova' }
const slugify = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
export const splitAuthors = (str) => (str || '').split(/\s*,\s*|\s+a\s+/).map(n => n.trim()).filter(Boolean)
  .map(n => authorAlias[n] || n).map(name => ({ name, slug: slugify(name) }))
articles.forEach(x => x.authors = splitAuthors(x.author))
export const byAuthor = (slug) => articles.filter(x => x.authors.some(u => u.slug === slug))
export const allAuthors = (() => {
  const m = new Map()
  articles.forEach(x => x.authors.forEach(u => { if (!m.has(u.slug)) m.set(u.slug, { ...u, ...(authorInfo[u.name] || {}) }) }))
  return [...m.values()]
})()
export const authorBySlug = (slug) => allAuthors.find(u => u.slug === slug)
export const byKategoria = (slug) => articles.filter(x => (x.kategorie || []).includes(slug))
export const fmtDate = (d) => new Date(d).toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' })

const imageFiles = import.meta.glob('../assets/articles/*.{jpg,jpeg,png,webp,avif,gif}', { eager: true, import: 'default' })
const bySlug = {}
for (const [path, url] of Object.entries(imageFiles)) {
  const file = path.split('/').pop()
  bySlug[file] = url
  bySlug[file.replace(/\.[^.]+$/, '')] = url
}
export const articleImage = (art) => {
  if (art.image) return /^(https?:)?\/\/|^\//.test(art.image) ? art.image : (bySlug[art.image] || null)
  return bySlug[art.slug] || null
}