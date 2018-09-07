import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import show from '@/components/show'
import details from '@/components/details'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: show,
       meta: {
        title:"标签页面"
      }
    },
    {
      path: '/index',
      component: index,
      meta: {
        title:"微博主页面"
      }
    },
    {
      path: '/show',
      component: show,
      meta: {
        title:"标签页面"
      }
    },
    {
      path: '/details',
      name:"details",
      component: details,
      meta: {
        title:"微博详情"
      }
    },

  ]
})
