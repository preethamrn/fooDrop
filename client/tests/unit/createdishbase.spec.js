import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import mockAxios from 'axios'
import CreateDishBase from '@/components/CreateDishBase.vue'

import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

Vue.use(Vuex)
Vue.use(Vuetify)

describe('CreateDishBase.vue', () => {
  let store

  beforeEach(() => {
    Vue.config.silent = true
    store = new Vuex.Store({
      state: {
        paypalId: 'user@email.com'
      }
    })

    mockAxios.post.mockImplementationOnce(() => 
      Promise.resolve({
        data: {success: true, result: { }}
      })
    );
  })

  it('tests invalid create parameters', (done) => {
    // setup
    // work
    const wrapper = mount(CreateDishBase, { store, Vue })
    wrapper.setData({newDishQuantity: -1})
    wrapper.find('button.createbtn').trigger('click')

    // expect
    expect(mockAxios.post).toHaveBeenCalledTimes(0)
    done()
  })

  it('tests new dish creation', (done) => {
    // setup
    // work
    const wrapper = mount(CreateDishBase, { store, Vue })
    const spy = jest.spyOn(wrapper.vm.$refs.form, 'validate')
    wrapper.setData({newDishName: 'TestDish', newDishPrice: 5, newDishQuantity: 5})
    wrapper.find('button.createbtn').trigger('click')

    // expect
    expect(spy).toHaveBeenCalledTimes(1)
    done()
  })

  it('tests clearing parameters list', (done) => {
    // setup

    // work
    const wrapper = mount(CreateDishBase, { store, Vue })
    wrapper.setData({newDishName: 'TestDish'})
    wrapper.find('button.clearbtn').trigger('click')

    // expect
    expect(wrapper.vm.newDishName).toEqual('')
    done()
  })
})
