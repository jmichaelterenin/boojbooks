import Vue from 'vue'
import App from './App.vue'
import Router  from  'vue-router'
import store from './store'
import 'vue-awesome/icons'
import VueConfirmDialog from 'vue-confirm-dialog'


import  Home  from  './components/Home.vue'
import  Details from './components/Details'

Vue.use(Router);
Vue.use(VueConfirmDialog)
Vue.config.productionTip = false

const  router  =  new  Router({
  routes: [
    {
      path:  '/',
      name:  'Home',
      component:  Home
    },
    {
      path:  '/bookdetails',
      name:  'Details',
      component:  Details
    }
  ]
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
