import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/todo-list',
    name: 'todo list',
    component: () => import('../views/TodoList.vue')
  },
  {
    path: '/todo-list-1',
    name: 'todo list 1',
    component: () => import('../views/TodoList1.vue')
  },
  {
    path: '/todo-list-2',
    name: 'todo list 2',
    component: () => import('../views/TodoList2.vue')
  },
  {
    path: '/fetch-data',
    name: 'fetch data',
    component: () => import('../views/FetchApi.vue')
  },
  {
    path: '/fetch-data-search',
    name: 'fetch data search',
    component: () => import('../views/FetchApiSearch.vue')
  },
  {
    path: '/demo-form',
    name: 'demo form',
    component: () => import('../views/DemoForm.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
