import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/base.less'
import './style/global.less'
import 'element-ui/lib/theme-chalk/index.css';
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css' // optionally import default styles
import './core/lazy_lib/components_use'  // element组件按需引入
import CustomEventPlugin from './utils/event' // 事务中心


Vue.component('vue-draggable-resizable', VueDraggableResizable)




Vue.config.productionTip = false
Vue.use(CustomEventPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
