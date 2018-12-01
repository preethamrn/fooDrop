import { shallowMount, createLocalVue } from '@vue/test-utils'
import mockAxios from 'axios'
import ChatBase from '@/components/ChatBase.vue'

import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Vuetify from 'vuetify'

Vue.use(Vuex)
Vue.use(Vuetify)

describe('ChatBase.vue', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: {}
    })
  })

  it('tests getting chat messages', (done) => {
    // setup
    mockAxios.get.mockImplementationOnce(() => 
      Promise.resolve({
        data: {success: true, result: {
          buyer: 'buyer',
          seller: 'seller',
          messages: [{}, {}, {}, {}, {}]
        }}
      })
    );
    
    // mocking router
    let id = '1234'
    let $route = {
      params: { id }
    }

    // work
    const wrapper = shallowMount(ChatBase, { Vue, store,
      mocks: { $route }
    })

    //expect
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    Vue.config.errorHandler = done
    Vue.nextTick(() => {
      expect(wrapper.contains('vcardtext-stub')).toBe(true)
      done()
    })
  })

  it('tests sending chat messages', () => {
    // setup
    mockAxios.get.mockImplementationOnce(() => 
      Promise.resolve({
        data: {success: true, result: {
          buyer: 'buyer',
          seller: 'seller',
          messages: [{}, {}, {}, {}, {}]
        }}
      })
    );
    mockAxios.post.mockImplementationOnce(() => 
      Promise.resolve({
        data: {success: true}
      })
    );

    // mocking router
    let id = '1234'
    let $route = {
      params: { id }
    }

    // work
    const wrapper = shallowMount(ChatBase, { Vue, store,
      mocks: { $route }
    })
    wrapper.find('.chatbox').trigger('keydown.enter')

    //expect
    expect(mockAxios.get).toHaveBeenCalledTimes(2)
  })
})