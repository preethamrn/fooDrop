import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Router from 'vue-router'
import ListingsBase from '@/components/ListingsBase'
import CreateDishBase from '@/components/CreateDishBase'
import SearchDishBase from '@/components/SearchDishBase'
import FacebookLogin from '@/components/FacebookLogin'

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
      }
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
      path: '/login',
      name: 'Login',
      component: FacebookLogin,
      meta: {
        title: 'Login'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
