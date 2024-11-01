import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Table from '@/views/table/table'
import Calendar from '@/views/calendar/calendar'
import Cooking from '@/views/cooking/cooking'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/cooking', // 将根路径重定向到 /cooking 页面
      componentName: 'Cooking',
      name: '厨房助手',
      icon: 'fire',
      component: Cooking
    },
    {
      path: '/home',
      componentName: 'HelloWorld',
      name: '首页',
      icon: 'home',
      component: HelloWorld
    },
    {
      path: '/table',
      componentName: 'Table',
      name: '表格概览',
      icon: 'table',
      component: Table
    },
    {
      path: '/calendar',
      componentName: 'Calendar',
      name: '日历概览',
      icon: 'calendar',
      component: Calendar
    },
    {
      path: '/cooking',
      componentName: 'Cooking',
      name: '厨房助手',
      icon: 'fire',
      component: Cooking
    },
  ]
})