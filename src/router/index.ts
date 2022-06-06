import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/query'
    },
    {
      path: '/query',
      name: 'query',
      component: () => import('@/views/query.vue')
    },
    {
      path: '/update',
      name: 'update',
      component: () => import('@/views/update.vue')
    }
  ]
})