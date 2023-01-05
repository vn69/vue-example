import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
