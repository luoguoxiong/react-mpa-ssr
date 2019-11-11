import React from 'react'
import Loadable from 'react-loadable'
const Detail = Loadable({
    loader: () => import(/* webpackChunkName: 'Detail' */ './page/detail'),
    loading: () => {
      return null
    }
})
 const Goods = Loadable({
    loader: () => import(/* webpackChunkName: 'Goods' */ './page/goods'),
    loading: () => {
      return null
    }
})
 const Home = Loadable({
    loader: () => import(/* webpackChunkName: 'Home' */ './page'),
    loading: () => {
      return null
    }
})
 const User = Loadable({
    loader: () => import(/* webpackChunkName: 'User' */ './page/user'),
    loading: () => {
      return null
    }
})
const routes = [
{
    path: '/detail',
    component: <Detail></Detail>
  },
 {
    path: '/goods',
    component: <Goods></Goods>
  },
 {
    path: '/',
    component: <Home></Home>
  },
 {
    path: '/user',
    component: <User></User>
  },
]
export default routes