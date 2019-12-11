import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Loadable from "nsploadable";

const Nsp_ = Loadable({
  loader: () => import(/* webpackChunkName: 'Nsp_' */ '../page/')
});

const Nsp_sort = Loadable({
  loader: () => import(/* webpackChunkName: 'Nsp_sort' */ '../page/sort')
});

const Nsp_topic = Loadable({
  loader: () => import(/* webpackChunkName: 'Nsp_topic' */ '../page/topic')
});

const routes = [
  {
    path: "/",
    component: <Nsp_ />
  },
  {
    path: "/sort",
    component: <Nsp_sort />
  },
  {
    path: "/topic",
    component: <Nsp_topic />
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