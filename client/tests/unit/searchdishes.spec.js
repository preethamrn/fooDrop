import { mount, shallowMount } from '@vue/test-utils'
import mockAxios from 'axios'
import SearchDishBase from '@/components/SearchDishBase.vue'

import Vue from 'vue'
import Vuex from 'vuex'
import Router, { VueRouter } from 'vue-router'
import Vuetify from 'vuetify'

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(Router)

describe('SearchDishBase.vue', () => {
  let store
  let router

  beforeEach(() => {
    Vue.config.silent = true
    store = new Vuex.Store({
      state: {
        defaultDietaryRestrictions: [],
        defaultPriceRange: [0, 10],
        defaultRadius: 7,
      }
    }),
    router = new Router({
      routes: []
    })
  })

  it('tests clearing search parameters', () => {
    Vue.config.silent = true
    // setup
    // work
    const wrapper = mount(SearchDishBase, { store, router, Vue })
    wrapper.setData({searchDishRadius: 10})
    wrapper.find('button.clear').trigger('click')

    // expect
    expect(wrapper.vm.searchDishRadius).toBe(7)
  })
/*
  it('tests get search results', (done) => {
    // setup
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {}
      })
    );

    // work
    const wrapper = shallowMount(SearchDishBase, { store, Vue })

    // expect
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    Vue.config.errorHandler = done
    Vue.nextTick(() => {
      console.log(wrapper.html())
      expect(wrapper.contains('listingsdishitem-stub')).toBe(true)
      done()
    })
  })
  
  it('tests invalid search parameters', (done) => {
    // setup
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {}
      })
    );

    // work
    const wrapper = shallowMount(SearchDishBase, { store, Vue })

    // expect
    expect(mockAxios.get).toHaveBeenCalledTimes(0)
    Vue.config.errorHandler = done
    Vue.nextTick(() => {
      console.log(wrapper.html())
      expect(wrapper.contains('listingsdishitem-stub')).toBe(true)
      done()
    })
  })*/
})
