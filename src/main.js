import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import './assets/style/bootstrap.min.css'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
    // You can set your default options here
  position: "bottom-right",
  timeout: 3000,
};
Vue.use(Toast, options);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
