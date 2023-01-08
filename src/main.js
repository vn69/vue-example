import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// element
import ElementUI from 'element-ui';
import './assets/style/index.scss'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// toast
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// number format money
import number from '@coders-tm/vue-number-format'
Vue.use(number, { precision: 4 })


const options = {
  position: "bottom-right",
  timeout: 3000,
};
Vue.use(Toast, options);

Vue.config.productionTip = false

import global from './utils/mixin/global';
Vue.mixin(global)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
