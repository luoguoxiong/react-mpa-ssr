import React, { Fragment } from 'react'
import Route from '@lib/route'
import Loadable from 'react-loadable'

const Cwdetail = Loadable({
  loader: () => import(/* webpackChunkName: 'Cwdetail' */ '../page/detail'),
  loading: () => {
    return null
  }
})

const Cwgoods = Loadable({
  loader: () => import(/* webpackChunkName: 'Cwgoods' */ '../page/goods'),
  loading: () => {
    return null
  }
})

const Cw = Loadable({
  loader: () => import(/* webpackChunkName: 'Cw' */ '../page/'),
  loading: () => {
    return null
  }
})

const Cwuser = Loadable({
  loader: () => import(/* webpackChunkName: 'Cwuser' */ '../page/user'),
  loading: () => {
    return null
  }
})

const routes = [{
  path: '/detail',
  component: <Cwdetail/>
},{
  path: '/goods',
  component: <Cwgoods/>
},{
  path: '/',
  component: <Cw/>
},{
  path: '/user',
  component: <Cwuser/>
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