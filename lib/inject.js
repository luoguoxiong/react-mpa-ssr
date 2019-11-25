import React from "react";
const InjectContext = React.createContext();
export class Inject extends React.Component {
  render() {
    return (
      <InjectContext.Provider value={this.props.initModel || {}}>
        {this.props.children}
      </InjectContext.Provider>
    );
  }
}

export const setInitModel = Component =>
  class extends React.Component {
    static contextType = InjectContext;
    render() {
      return <Component {...this.context.initModel} />;
    }
  };
