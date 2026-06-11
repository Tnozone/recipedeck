import { createRouter, createWebHistory } from 'vue-router'
import { computed } from 'vue'

import Home from '../pages/Home.vue'
import Signup from '../pages/Signup.vue'
import Login from '../pages/Login.vue'
import Uploadrecipe from '../pages/Uploadrecipe.vue'
import Myrecipes from '../pages/Myrecipes.vue'
import Favrecipes from '../pages/Favrecipes.vue'
import Pagemissing from '../pages/Pagemissing.vue'
import UserRecipes from '../pages/UserRecipes.vue'
import RecipeDetails from '../pages/RecipeDetails.vue'

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
      component: Uploadrecipe,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/recipes',
      component: Myrecipes,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/fav',
      component: Favrecipes,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/:username',
      name: 'UserRecipes',
      component: UserRecipes
    },
    {
      path: '/recipe/:id',
      name: 'RecipeDetails',
      component: RecipeDetails
    },
    {
      path: '/:pathMatch(.*)*',
      component: Pagemissing
    }
  ],
})

// if page requires logged in user, redirect to login page.
router.beforeEach((to, from, next) => {
  const currentUser = computed(() => {
    const user = localStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
  })

  if (to.meta.requiresAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
