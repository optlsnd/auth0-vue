import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Public from '@/components/PublicPage'
import Private from '@/components/PrivatePage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/public',
      name: 'PublicPage',
      component: Public
    },
    {
      path: '/private',
      name: 'PrivatePage',
      component: Private
    }
  ]
})
