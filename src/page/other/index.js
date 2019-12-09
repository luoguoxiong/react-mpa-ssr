import React from "react";
import { setInitModel } from "@lib/inject";
@setInitModel
export default class Helloword extends React.Component {
  render() {
    return <div>{JSON.stringify(this.props)}</div>;
  }
}
