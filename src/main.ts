import Vue from "vue";
import App from "./App.vue";
import router from '@/router'
import '@/mock/index.ts'
import '@/element/index.ts'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");