import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ListingsBase from '@/components/ListingsBase'
import CreateDishBase from '@/components/CreateDishBase'

Vue.use(Vuetify)
Vue.use(Router)

// TODO: use router.beforeEach for auth? if auth fails then redirect them to correct route
var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: 'HelloWorld - Test'
      }
    },
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
