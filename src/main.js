// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from './App'
import router from './router'
import 'ant-design-vue/dist/antd.css';

import dayjs from 'dayjs' // ES 2015
import './registerServiceWorker'
Vue.config.productionTip = false
Vue.prototype.dayjs = dayjs;//可以全局使用dayjs

Vue.use(Antd);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
