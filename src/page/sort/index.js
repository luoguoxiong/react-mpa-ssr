import React from "react";
import { setInitModel } from "@lib/inject";

@setInitModel
class Sort extends React.Component {
  render() {
    return <div id="sort">{JSON.stringify({ a: 2 })}</div>;
  }
}
export default Sort;
