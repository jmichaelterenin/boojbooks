// MyBookList.test.js

import { mount } from '@vue/test-utils'
import MyBookList from '../MyBookList.vue'

import 'vue-awesome/icons/eye'
import 'vue-awesome/icons/trash'
import 'vue-awesome/icons/arrow-down'
import 'vue-awesome/icons/arrow-up'
import 'vue-awesome/icons/caret-down'
import 'vue-awesome/icons/caret-up'

const factory = (values = {}) => {
  return mount(MyBookList, {
    data () {
      return {
        ...values
      }
    },
    mocks: {
      $store: {
        state: {
          books: [ { id: 1, volumeInfo : { title: 'Cat in the Hat', publishedDate: '2013-09-24' } }, 
                   { id: 2, volumeInfo: { title: 'The Peanut Butter Falcon', publishedDate: '2019' } } ],
          curr: 0,
          sortCol: -1,
          sortDir: 1
        }
      }
    }, 
    stubs: ['vue-confirm-dialog']
  })
}

describe('MyBookList', () => {
  it('renders a welcome message', () => {
    const wrapper = factory()

    expect(wrapper.find('h1').text()).toEqual("My Book List")
  })

  it('renders the table header', () => {
    const wrapper = factory()

    let $rows = wrapper.findAll('thead > tr').wrappers    
    expect($rows.length).toBe(1)
  })

  it('renders the table body with 2 rows', () => {
    const wrapper = factory()

    let $rows = wrapper.findAll('tbody > tr').wrappers    
    expect($rows.length).toBe(2)
  })

})  