import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入reset
import '@/assets/reset/reset.css'


// 引入iconfont
import '@/assets/fonts/iconfont.css'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
