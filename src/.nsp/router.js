import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Loadable from "@nsp";

const Nsp_detail = Loadable({
  loader: () => import(/* webpackChunkName: 'Nsp_detail' */ '../page/detail')
});

const Nsp_goods = Loadable({
  loader: () => import(/* webpackChunkName: 'Nsp_goods' */ '../page/goods')
});

const Nsp_ = Loadable({
  loader: () => import(/* webpackChunkName: 'Nsp_' */ '../page/')
});

const Nsp_user = Loadable({
  loader: () => import(/* webpackChunkName: 'Nsp_user' */ '../page/user')
});

const routes = [
  {
    path: "/detail",
    component: <Nsp_detail />
  },
  {
    path: "/goods",
    component: <Nsp_goods />
  },
  {
    path: "/",
    component: <Nsp_ />
  },
  {
    path: "/user",
    component: <Nsp_user />
  },
]

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
    );
  }
}

export default App;