import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Axios from 'axios'

// Vue.config.productionTip = false
// Vue.prototype.$http = Axios;
// const token = localStorage.getItem('token')
// if(token){
//   this.$router.push({path: "/couduit/user"})
// }
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')

if (token) {
  Vue.prototype.$http.defaults.headers.common['authorization'] = `Token ${token}`
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
