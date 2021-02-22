// Home.test.js
import axios from 'axios'
import 'regenerator-runtime'
import { mount } from '@vue/test-utils'
import Home from '../Home.vue'

jest.mock('axios');

const factory = (values = {}) => {
  return mount(Home, {
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
    stubs: ['vue-confirm-dialog']        
  })
}

describe('Home', () => {

    it('renders a welcome message', () => {
      const wrapper = factory()

      expect(wrapper.find('h1').text()).toEqual("Welcome to Your Booj Book App")
    })

    test('displays initial api message', () => {      
      const wrapper = factory()
          
      expect(wrapper.text()).toContain('top 3 relevant results')
    })

    test('setValue demo', async () => {
      const wrapper = factory()
    
      const textInput = wrapper.find('input[type="text"]')
      await textInput.setValue('dr seuss')
    
      axios.get.mockResolvedValue({
        data: {
          items: [
            {            
              id: 1,
              volumeInfo : {
                title: 'Cat in the Hat'
              }
            },  
            {
              id: 2,
              volumeInfo : {
                title: 'Dr Seuss 1 2 3'
              },
            },
            {
              id: 3,
              volumeInfo : {
                title: 'Green Eggs and Ham',
              }
            }
          ],
          totalItems: 3
        }
      });

      expect(wrapper.find('input[type="text"]').element.value).toBe('dr seuss')

      // wrapper.find("[type='submit']").trigger('click')
      // Why does the above action not work??

      // Below works
      await wrapper.find('form').trigger('submit.prevent')
      wrapper.vm.$nextTick(() => {
          expect(wrapper.find('.content').text()).toContain('Cat in the Hat')          
      })

    })    

})  
