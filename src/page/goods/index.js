import React from 'react'
import connect from '@lib/connect'
@connect
export default class Detail extends React.Component {
  state = {
    list: [1, 2, 3, 4]
  }
  render() {
    return (
      <a href="/">
        {this.state.list.map(item => {
          return <div key={item}>{item}</div>
        })}
      </a>
    )
  }
}
