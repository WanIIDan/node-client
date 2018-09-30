import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const components = {
  layout: ()=>import('@/views/layout'),
  index: ()=>import('@/views/index/index'),
  register: ()=>import('@/views/register/index'),
  writeNote: ()=>import('@/views/writeNote/index'),
  article: ()=>import('@/views/article/index')
}

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/index',
      component: components.layout,
      children: [
        {
          path: 'index',
          meta: {
            title: '云笔记首页'
          },
          component: components.index
        },
        {
          path: 'register',
          meta: {
            title: '新用户注册'
          },
          component: components.register
        },
        {
          path: 'writeNote',
          meta: {
            title: '写笔记'
          },
          component: components.writeNote
        },
        {
          path: 'article/:id',
          name: 'article',
          meta: {
            title: '文章详情'
          },
          component: components.article
        }
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  Nprogress.start()
  next()
})

router.afterEach((to,from)=>{
  Nprogress.done()
})

export default router