import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import mockAxios from 'axios'
import DishDetails from '@/components/DishDetails.vue'
import ChatBase from '@/components/ChatBase'

import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Router from 'vue-router'


Vue.use(Vuex)
Vue.use(Vuetify)

describe('DishDetails.vue', () => {

  it('tests for clicking close button', () => {    
    // setup

    var store = new Vuex.Store({
      state: {}})

    const wrapper = shallowMount(DishDetails, { store, Vue , propsData: {
        name: "",
        description: "",
        locationLat: 0,
        locationLong: 0,
        price: 0,
        dietaryRestrictions: [],
        ingredients: [],
        url: "",
        maxQuantity: 0,
        sellerId: "",
        sellerPaypalId: "",
        id: ""
        }})
    //check whole
    console.log(wrapper.html())
    
    //press close button
    wrapper.find('.close').trigger('click')

    //expect this to be false after button click for close
    expect(wrapper.vm.dishDetailsDialog).toBe(false)
    
    //expect this to be 1 after button click for close
    expect(wrapper.vm.quantity).toBe(1)


  })
})


it('tests for clicking contact seller button', () => {    
    // setup
    var tempseller = "5c01b850050211240462943a"

    

    var store = new Vuex.Store({
      state: {}})

    // mocking router
    var routes = [{
        path: '/chat/' + tempseller,
        component: ChatBase
      }
    ]
    const $router = new Router({
      routes
    })

    const localVue = createLocalVue()
    localVue.use($router)

    const wrapper = mount(DishDetails, { store, Vue ,localVue, propsData: {
        name: "",
        description: "",
        locationLat: 0,
        locationLong: 0,
        price: 0,
        dietaryRestrictions: [],
        ingredients: [],
        url: "",
        maxQuantity: 0,
        sellerId: tempseller,
        sellerPaypalId: "",
        id: ""
        }})

    //check whole
    console.log(wrapper.html())
    
    //press close button
    wrapper.find('.contact').trigger('click')

    //expect this to be false after button click for close
    expect(wrapper.vm.dishDetailsDialog).toBe(false)
    
    //expect this to be 1 after button click for close
    expect(wrapper.vm.quantity).toBe(1)


  })