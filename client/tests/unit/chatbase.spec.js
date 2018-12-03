import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
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
    
    mockAxios.get.mockImplementationOnce(() => 
      Promise.resolve({
        data: {success: true, result: {
          buyer: 'buyer',
          seller: 'seller',
          messages: [{}, {}, {}, {}, {}]
        }}
      })
    );
  })

  it('tests getting chat messages', (done) => {
    // setup
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

    setTimeout(() => {
    		Vue.nextTick(() => {
      		expect(wrapper.contains('vcardtext-stub')).toBe(true)
      		done()
    	})
	}, 0);
    
    //old one but it doesnt work properly on my machine, so i used set timeout above
    // Vue.nextTick(() => {
    //   expect(wrapper.contains('vcardtext-stub')).toBe(true)
    //   done()

  })

  it('tests sending chat messages', () => {
    // setup
    // mocking router
    let id = '1234'
    let $route = {
      params: { id }
    }

    // work
    const wrapper = mount(ChatBase, { Vue, store,
      mocks: { $route }
    })
    wrapper.find('div.chatbox').trigger('keydown.enter')

    //expect
    expect(mockAxios.get).toHaveBeenCalledTimes(2)
  })
})
