import React from "react";
import { setInitModel } from "@lib/inject";
@setInitModel
export default class Detail extends React.Component {
  state = {
    list: [1, 2, 3, 4, 5, 6, 7]
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
