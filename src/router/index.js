import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/home.vue'
import Scroll from '../views/sticky-scroll-demo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/scroll',
      component: Scroll
    }
  ]
})
