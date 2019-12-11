import React from "react";
import { setInitModel } from "@lib/inject";
import { Tab } from "@src/components";

@setInitModel
class Cart extends React.Component {
  render() {
    return (
      <div id="content">
        购物车页
        <Tab active={3}></Tab>
      </div>
    );
  }
}
export default Cart;
