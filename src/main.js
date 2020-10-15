import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/base.less'
import './style/global.less'
import VueDraggableResizable from 'vue-draggable-resizable'
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'


Vue.component('vue-draggable-resizable', VueDraggableResizable)

import 'element-ui/lib/theme-chalk/index.css';
import './core/lazy_lib/components_use'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
