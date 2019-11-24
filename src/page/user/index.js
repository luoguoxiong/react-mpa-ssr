import React from "react";
import { setInitModel } from "@lib/inject";
@setInitModel
export default class User extends React.Component {
  render() {
    return (
      <a href="/goods">
        <div className="test">
          User
          {JSON.stringify(this.props)}
        </div>
      </a>
    );
  }
}
