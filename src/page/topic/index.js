import React from "react";
import { setInitModel } from "@lib/inject";
@setInitModel
export default class User extends React.Component {
  render() {
    return <div className="test">{JSON.stringify(this.props)}</div>;
  }
}
