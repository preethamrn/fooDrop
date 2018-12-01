import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import mockAxios from 'axios'
import SearchDishBase from '@/components/SearchDishBase.vue'
import ListingsBase from '@/components/ListingsBase.vue'

import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Vuetify from 'vuetify'

Vue.use(Vuex)
Vue.use(Vuetify)

describe('SearchDishBase.vue', () => {
  let store

  beforeEach(() => {
    Vue.config.silent = true
    store = new Vuex.Store({
      state: {
        defaultDietaryRestrictions: [],
        defaultPriceRange: [0, 10],
        defaultRadius: 7,
      }
    })
  })

  it('tests clearing search parameters', () => {
    // work
    const wrapper = mount(SearchDishBase, { store, Vue })
    wrapper.setData({searchDishRadius: 10})
    wrapper.find('button.clear').trigger('click')

    // expect
    expect(wrapper.vm.searchDishRadius).toBe(7)
  })

  it('tests get search results', (done) => {
    // setup
    mockAxios.get.mockImplementationOnce(() => 
      Promise.resolve({
        data: {success: true, dishes: []}
      })
    );

    // mocking router
    const localVue = createLocalVue()
    localVue.use(Router)
    const routes = [{
        path: '/search',
        component: SearchDishBase
      },
      {
        path: '/',
        component: ListingsBase
      }
    ]
    const router = new Router({
      routes
    })

    // mocking localStorage
    var localStorageMock = (function() {
      var store = {};
      return {
        getItem: function(key) {
          return store[key];
        },
        setItem: function(key, value) {
          store[key] = value.toString();
        },
        clear: function() {
          store = {};
        },
        removeItem: function(key) {
          delete store[key];
        }
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorage.setItem('authToken', '1234')

    // work
    const wrapper = mount(SearchDishBase, { localVue, store, router })
    wrapper.setData({searchDishPrice: [0, 100], searchDishRadius: 5})
    wrapper.find('button.search').trigger('click')

    // expect
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$route.path).toBe('/')
    done()
  })

  it('tests invalid search parameters', (done) => {
    // setup
    // work
    const wrapper = mount(SearchDishBase, { store, Vue })
    wrapper.setData({searchDishPrice: [0, 1000]})
    
    // expect
    expect(wrapper.vm.searchDishPrice).toEqual([0, 100])
    done()
  })
})
