import React from "react";
const InitModelContext = React.createContext();
export class Provider extends React.Component {
  render() {
    return (
      <InitModelContext.Provider value={this.props.initModel || {}}>
        {this.props.children}
      </InitModelContext.Provider>
    );
  }
}

export const connect = Component =>
  class extends React.Component {
    static contextType = InitModelContext;

    render() {
      return <Component {...this.context.initModel} />;
    }
  };
