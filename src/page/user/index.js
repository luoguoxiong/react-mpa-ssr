import React from 'react'
import connect from '@lib/connect'
@connect
export default class User extends React.Component {
  render () {
    return (
      <a href="/goods">
        <div className="test">
          User
          {JSON.stringify(this.props)}
        </div>
      </a>
    )
  }
}
