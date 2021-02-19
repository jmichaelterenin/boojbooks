import Vue from 'vue'
import App from './App.vue'
import  Router  from  'vue-router'
import 'vue-awesome/icons'

import  Home  from  './components/Home.vue'
import  MyBookList from './components/MyBookList'

Vue.use(Router);
Vue.config.productionTip = false

const  router  =  new  Router({
  routes: [
  {
    path:  '/',
    name:  'Home',
    component:  Home
  },
  {
    path:  '/booklist',
    name:  'MyBookList',
    component:  MyBookList
  }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
