import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipesView from '../views/RecipesView.vue'
import ProductsView from '../views/ProductsView.vue'

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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
