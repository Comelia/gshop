/**
 * 入口js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* eslint-disabled */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')