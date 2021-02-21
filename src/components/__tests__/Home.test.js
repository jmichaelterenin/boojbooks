// Home.test.js

import { shallowMount } from '@vue/test-utils'
import Home from '../Home.vue'

const factory = (values = {}) => {
  return shallowMount(Home, {
    data () {
      return {
        ...values
      }
    }
  })
}

describe('Home', () => {
  it('renders a welcome message', () => {
    const wrapper = factory()

    expect(wrapper.find('h1').text()).toEqual("Welcome to Your Booj Book App")
  })

})  