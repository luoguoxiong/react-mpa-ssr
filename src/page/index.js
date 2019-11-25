import React from "react";
import { setInitModel } from "@lib/inject";
import "./index.less";
@setInitModel
export default class Home extends React.Component {
  render() {
    return (
      <a href="/user">
        {this.props.goods.map(item => {
          return (
            <div key={item} className="test">
              good_{item}
            </div>
          );
        })}
      </a>
    );
  }
}
