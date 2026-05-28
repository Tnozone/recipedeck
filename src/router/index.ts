import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Signup from '../pages/Signup.vue'
import Login from '../pages/Login.vue'
import Uploadrecipe from '../pages/Uploadrecipe.vue'
import Myrecipes from '../pages/Myrecipes.vue'
import Favrecipes from '../pages/Favrecipes.vue'
import Pagemissing from '../pages/Pagemissing.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/upload',
      component: Uploadrecipe
    },
    {
      path: '/recipes',
      component: Myrecipes
    },
    {
      path: '/fav',
      component: Favrecipes
    },
    {
      path: '/404',
      component: Pagemissing
    }
  ],
})

export default router
