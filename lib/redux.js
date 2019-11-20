import React from "react";
import PropTypes from "prop-types";

export class Provider extends React.Component {
  // 设置子组件context的类型，以便子组件的类型检查
  static childContextTypes = {
    store: PropTypes.object
  };
  // 传递到子组件的全局context
  getChildContext() {
    return {
      store: this.store
    };
  }
  // 初始化props和context
  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }
  render() {
    return this.props.children;
  }
}

export const connect = () => Component => {
  return class Compo extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    };
    constructor(props, context) {
      super(props, context);
      this.state = {
        props: { ...context.store.initModel }
      };
    }
    render() {
      return <Component {...this.state.props} />;
    }
  };
};
