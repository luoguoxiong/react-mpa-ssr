import React, { Fragment } from 'react'

import Route from '@lib/route'

import routes from './routes'

class App extends React.Component {
  render() {
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
