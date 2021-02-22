// Details.test.js

import { shallowMount } from '@vue/test-utils'
import Details from '../Details.vue'

const factory = (values = {}) => {
  return shallowMount(Details, {
    data () {
      return {
        ...values
      }
    },
    mocks: {
      $store: {
        state: {
          books: [],
          curr: 0,
          sortCol: -1,
          sortDir: 1
        }
      }
    }, 
    stubs: ['router-link']
  })
}

describe('Details', () => {
  it('renders a welcome message', () => {
    const wrapper = factory()

    expect(wrapper.find('h2').text()).toEqual("My Book List / Book Details")
  })

})  