import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleView from '../views/ArticleView.vue'
import KategorieView from '../views/KategorieView.vue'
import AboutView from '../views/AboutView.vue'
import AuthorView from '../views/AuthorView.vue'
import AutoriView from '../views/AutoriView.vue'
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/clanok/:slug', component: ArticleView },
    { path: '/kategoria/:slug', redirect: to => `/kategorie/${to.params.slug}` },
    { path: '/kategorie/:slug?', component: KategorieView },
    { path: '/autori', component: AutoriView },
    { path: '/autor/:slug', component: AuthorView },
    { path: '/o-nas', component: AboutView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior: () => ({ top: 0 })
})
