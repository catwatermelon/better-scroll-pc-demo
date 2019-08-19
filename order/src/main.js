import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import { router } from './router'

Vue.config.productionTip = false
Vue.use(iView);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
