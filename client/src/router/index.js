import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ListingsBase from '@/components/ListingsBase'
import FacebookLogin from '@/components/FacebookLogin'

Vue.use(Vuetify)
Vue.use(Router)

// TODO: use router.beforeEach for auth? if auth fails then redirect them to correct route
var router = new Router({
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
      path: '/login',
      name: 'FacebookLogin',
      component: FacebookLogin,
      meta: {
        title: 'Log In'
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
