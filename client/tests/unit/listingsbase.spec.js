import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import mockAxios from 'axios'
import ListingsBase from '@/components/ListingsBase.vue'

import Vuex from 'vuex'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

describe('ListingsBase.vue', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: {}
    })
  })

  it('tests get request when not passed in search results as props', () => {    
    // work
    const wrapper = shallowMount(ListingsBase, { store, localVue })
    
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
    const wrapper = shallowMount(ListingsBase, { store, localVue, propsData: {
      searched: true,
      dishesProp: [{}]
    }})

    // expect
    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(1)
    localVue.config.errorHandler = done
    localVue.nextTick(() => {
      console.log(wrapper.html())
      expect(wrapper.contains('listingsdishitem-stub')).toBe(true)
      done()
    })
  })
})
