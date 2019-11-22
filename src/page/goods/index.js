import React from "react";
import { connect } from "@lib/redux";
@connect
export default class Detail extends React.Component {
  state = {
    list: [1, 2, 3, 4, 5, 6]
  };
  render() {
    return (
      <a href="/">
        {this.state.list.map(item => {
          return <div key={item}>{item}</div>;
        })}
      </a>
    );
  }
}
