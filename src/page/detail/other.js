import React from 'react'
import connect from '@lib/connect'
@connect
export default class Detail extends React.Component {
  render () {
    return (
      <a href="/">
        <div className="test">
          商品详情
          {JSON.stringify(this.props)}
        </div>
      </a>
    )
  }
}
