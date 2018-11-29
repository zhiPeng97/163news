import Vue from 'vue'
import Router from 'vue-router'
import pagesView from '../components/pages'
import homeView from '../components/home/homeView'
import videoView from '../components/video/videoView'
import talkView from '../components/talk/talkView'
import Details from '../components/talk/details'
import mainView from '../components/mine/mainView'
import login from '../components/login/login'
import search from '../widget/search'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/pages', name: 'pagesView', component: pagesView},
    {path: '/', name: 'homeView', component: homeView},
    {path: '/video', name: 'videoView', component: videoView},
    {path: '/talk', name: 'talkView', component: talkView},
    {path: '/details', name: 'detailsView', component: Details},
    {path: '/main', name: 'mainView', component: mainView},
    {path: '/login', name: 'login', component: login},
    {path: '/search', name: 'search', component: search}
  ],
  // linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active' // 严格模式下的组件高亮
})
