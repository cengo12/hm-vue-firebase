import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipesView from '../views/RecipesView.vue'
import ProductsView from '../views/ProductsView.vue'
import AuthView from '../views/AuthView.vue'

const routes = [
  {
    path: '/',
    name: 'Ana Menü',
    component: HomeView
  },
  {
    path: '/urunler',
    name: 'Ürünler',
    component: ProductsView
  },
  {
    path: '/receteler',
    name: 'Reçeteler',
    component: RecipesView
  },
  {
    path: '/giris',
    name: 'Giriş',
    component: AuthView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
