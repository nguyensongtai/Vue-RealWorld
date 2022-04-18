import Vue from 'vue'
import VueRouter from 'vue-router'
import Conduit from "../components/Conduit"
import signUp from "../components/signUp"
import signIn from "../components/signIn"
import article from "../components/comment"
import author from "../components/author"
import favoritedArticles from "../components/favoritedArticles"
import user from "../components/user"
import newPost from "../components/newPost"
import settings from '../components/settings'
import profile from '../components/profile'
import yourFeed from '../components/yourFeed'
import commentUser from '../components/commentUser'
import profileFavorited from "../components/profileFavorited"
import profileCMT from "../components/profileCMT"
import newPost2 from "../components/newPost2"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Conduit',
    component: Conduit
  },
  {
    path: '/conduit/signup',
    name: 'signup',
    component: signUp
  },
  {
    path: '/conduit/signin',
    name: 'signin',
    component: signIn
  },
  {
    path: '/conduit/article/:slug',
    name: article,
    component: article
  },
  {
    path: '/conduit/author/:username',
    name: author,
    component: author
  },
  {
    path: '/conduit/author/favorited/:username',
    name: favoritedArticles,
    component: favoritedArticles
  },
  {
    path: '/conduit/user',
    name: user,
    component: user
  },
  {
    path: '/conduit/user/newpost',
    name: newPost,
    component: newPost
  },
  {
    path: '/conduit/user/setting',
    name: settings,
    component: settings
  },
  {
    path: '/conduit/user/profile/:username',
    name: profile,
    component: profile
  },
  {
    path: '/conduit/user/yourfeed',
    name: yourFeed,
    component: yourFeed
  },
  {
    path: '/conduit/user/commentuser/:slug',
    name: commentUser,
    component: commentUser
  },
  {
    path: '/conduit/user/profile/far/:username',
    name: profileFavorited,
    component: profileFavorited
  },
  {
    path: '/conduit/user/profileCMT/:slug',
    name: profileCMT,
    component: profileCMT
  },
  {
    path: '/conduit/user/newpost/:slug',
    name: newPost2,
    component: newPost2
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/conduit/user')
  } else {
    next()
  }
})
export default router
