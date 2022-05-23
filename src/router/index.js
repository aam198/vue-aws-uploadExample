import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignUpPage from '../views/SignUpPage.vue';
import AlbumDetailsPage from '../views/AlbumDetailsPage.vue';
import AlbumsPage from '../views/AlbumsPage.vue';
import { Auth } from 'aws-amplify';

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

// Router guard, so that no one can go to pages unless they are logged in.
// beforeEach router you can do many things in there.

router.beforeEach(async (to, from, next) => {
  // requiresAuth is looking for the meta information that was declared within the path above. It is looking to have a match of true  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = await Auth.currentUserInfo();
  // If one is not true out of both then it will take you back to signup
  if(requiresAuth && !isAuthenticated){
    // next() is middleware to go home
    next("/")
  } 
  // If requiresAuth and isAuthenticated is true then go to the 'albums'
  else {
    next()
  }
})

export default router
