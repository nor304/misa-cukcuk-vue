import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import CustomerList from './views/customer/CustomerList.vue'
import EmployeeList from './views/employee/EmployeeList.vue'

import './style/main.css';
Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  {path: '/customer',name:'customer', component: CustomerList },
  {path: '/employee',name:'employee', component: EmployeeList }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
