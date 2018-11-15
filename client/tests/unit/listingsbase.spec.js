import { shallowMount } from '@vue/test-utils'
import mockAxios from 'axios'
import ListingsBase from '@/components/ListingsBase.vue'

import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

Vue.use(Vuex)
Vue.use(Vuetify)

describe('ListingsBase.vue', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: {}
    })
  })

  it('tests get request when not passed in search results as props', () => {    
    // work
    const wrapper = shallowMount(ListingsBase, { store, Vue })
    
    // expect
    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1)
  })

  it('tests no get request when passed in search results as props', (done) => {
    // setup
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {}
      })
    );

    // work
    const wrapper = shallowMount(ListingsBase, { store, Vue, propsData: {
      searched: true,
      dishesProp: [{}]
    }})

    // expect
    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1)
    Vue.config.errorHandler = done
    Vue.nextTick(() => {
      expect(wrapper.contains('listingsdishitem-stub')).toBe(true)
      done()
    })
  })
})
