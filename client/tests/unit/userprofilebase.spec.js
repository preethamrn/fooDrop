import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import mockAxios from 'axios'
import UserProfileBase from '@/components/UserProfileBase.vue'

import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

Vue.use(Vuex)
Vue.use(Vuetify)

describe('UserProfileBase.vue', () => {
  let store

  beforeEach(() => {
    Vue.config.silent = true
    store = new Vuex.Store({
      state: {
        defaultDietaryRestrictions: [],
        defaultPriceRange: [0, 10],
        defaultRadius: 7,
        paypalId: 'user@email.com',
        transactions: [{ location: {} }],
        chats: [{}, {}]
      }
    })

    mockAxios.put.mockImplementationOnce(() => 
      Promise.resolve({
        data: {status: "pass", user: { }}
      })
    );
  })

  it('tests rendering transaction and chats', (done) => {
    // setup
    // work
    const wrapper = shallowMount(UserProfileBase, { store, Vue })

    // expect
    expect(wrapper.contains('transactionsdishitem-stub')).toBe(true)
    expect(wrapper.contains('userprofilechatitem-stub')).toBe(true)
    done()
  })

  it('tests update profile details', (done) => {
    // setup
    // work
    const wrapper = mount(UserProfileBase, { store, Vue })
    wrapper.find('.updatebtn').trigger('click')

    // expect
    expect(mockAxios.put).toHaveBeenCalledTimes(1)
    done()
  })
})
