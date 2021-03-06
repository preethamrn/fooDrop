import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Router from 'vue-router'
import ListingsBase from '@/components/ListingsBase'
import TransactionPendingBase from '@/components/TransactionPendingBase'
import CreateDishBase from '@/components/CreateDishBase'
import SearchDishBase from '@/components/SearchDishBase'
import FacebookLogin from '@/components/FacebookLogin'
import UserProfileBase from '@/components/UserProfileBase'
import ChatBase from '@/components/ChatBase'

Vue.use(Vuetify)
Vue.use(Router)

// TODO: use router.beforeEach for auth? if auth fails then redirect them to correct route
var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Listings',
      component: ListingsBase,
      meta: {
        title: 'Listings'
      },
      props: true
    },
    {
      path: '/new',
      name: 'Sell',
      component: CreateDishBase,
      meta: {
        title: 'Sell'
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchDishBase,
      meta: {
        title: 'Search'
      }
    },
    {
      path: '/transaction',
      name: 'Transaction Pending',
      component: TransactionPendingBase,
      meta: {
        title: 'Transaction Pending'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: FacebookLogin,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: UserProfileBase,
      meta: {
        title: 'Profile'
      }
    },
    {
      path: '/chat/:id',
      name: 'Chat',
      component: ChatBase,
      meta: {
        title: 'Chat'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
