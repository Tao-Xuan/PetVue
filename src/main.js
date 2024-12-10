import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/gloable.css'
import request from "@/utils/request";
// import moment from 'moment';


Vue.config.productionTip = false

Vue.use(ElementUI, { size: "mini" });

Vue.prototype.request=request

// Vue.filter('dateFormat', function (dateStr,pattern = "YYYY-MM-DD HH:mm:ss") {
//   return moment(dateStr).format(pattern);
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
