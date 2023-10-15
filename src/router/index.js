import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Loginpage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
   
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Loginpage.vue')
  },
  {
    path: '/court',
    name: 'Court',
   
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Courtpage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Registerpage.vue')
  },
  {
    path: '/loginaddmin',
    name: 'LoginAddmin',
    component: () => import('../views/Addmin/LoginAddmin.vue')
  },
  {
    path: '/resultcourt',
    name: 'Resultcourt',
    component: () => import('../views/Reservepage.vue')
  },
  {
    path: '/editcourt',
    name: 'EditCourt',
    component: () => import('./../views/Addmin/EditCourt.vue')
  },
  {
    path: '/resultreserve',
    name: 'ResultReserve',
    component: () => import('./../views/Addmin/ResultReserve.vue')
  },


  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
