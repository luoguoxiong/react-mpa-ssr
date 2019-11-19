import React, { Fragment } from 'react'
import Route from '@lib/route'
import Loadable from 'nodejsplgx'

const Nsp_detail = Loadable({
  loader: () => import(/* webpackChunkName: 'Nsp_detail' */ '../page/detail'),
  loading: () => {
    return null
  }
})

const Nsp_detail_other = Loadable({
  loader: () => import(/* webpackChunkName: 'Nsp_detail_other' */ '../page/detail/other'),
  loading: () => {
    return null
  }
})

const Nsp_goods = Loadable({
  loader: () => import(/* webpackChunkName: 'Nsp_goods' */ '../page/goods'),
  loading: () => {
    return null
  }
})

const Nsp_ = Loadable({
  loader: () => import(/* webpackChunkName: 'Nsp_' */ '../page/'),
  loading: () => {
    return null
  }
})

const Nsp_user = Loadable({
  loader: () => import(/* webpackChunkName: 'Nsp_user' */ '../page/user'),
  loading: () => {
    return null
  }
})

const routes = [{
  path: '/detail',
  component: <Nsp_detail/>
},{
  path: '/detail/other',
  component: <Nsp_detail_other/>
},{
  path: '/goods',
  component: <Nsp_goods/>
},{
  path: '/',
  component: <Nsp_/>
},{
  path: '/user',
  component: <Nsp_user/>
},]

class App extends React.Component {
  render () {
    return (
      <Fragment>
        {routes.map(item => (
          <Route path={item.path} exact key={item.path}>
            {item.component}
          </Route>
        ))}
      </Fragment>
    )
  }
}
export default App