import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignUpPage from '../views/SignUpPage.vue';
import AlbumDetailsPage from '../views/AlbumDetailsPage.vue';
import AlbumsPage from '../views/AlbumsPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/signup',
    name: 'SignUpPage',
    component: SignUpPage
  },
  {
    path: '/album/:id',
    name: 'AlbumDetailsPage',
    component: AlbumDetailsPage,
    meta: {requiresAuth: true}
  },
  {
    path: '/albums',
    name: 'AlbumsPage',
    component: AlbumsPage,
    meta: {requiresAuth: true}
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
