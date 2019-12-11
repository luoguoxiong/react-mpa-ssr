import React from "react";
import { setInitModel } from "@lib/inject";
import { Tab } from "@src/components";

@setInitModel
class Mine extends React.Component {
  render() {
    return (
      <div id="content">
        我的页
        <Tab active={4}></Tab>
      </div>
    );
  }
}
export default Mine;
