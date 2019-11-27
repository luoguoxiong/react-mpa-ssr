const React = require("react");

const ALL_INITIALIZERS = [];
const READY_INITIALIZERS = [];
const LoadableContext = React.createContext();
function isWebpackReady(getModuleIds) {
  if (typeof __webpack_modules__ !== "object") {
    return false;
  }
  return getModuleIds().every(moduleId => {
    return (
      typeof moduleId !== "undefined" &&
      typeof __webpack_modules__[moduleId] !== "undefined"
    );
  });
}

function resolve(obj) {
  return obj && obj.__esModule ? obj.default : obj;
}

function createLoadableComponent(options) {
  let opts = options;

  let res = null;
  function init() {
    if (!res) {
      let state = {
        loaded: null
      };
      state.promise = opts
        .loader()
        .then(loaded => {
          state.loaded = loaded;
          return loaded;
        })
        .catch(err => {
          throw err;
        });
      res = state;
    }
    return res.promise;
  }

  ALL_INITIALIZERS.push(init);
  if (typeof opts.webpack === "function") {
    READY_INITIALIZERS.push(() => {
      if (isWebpackReady(opts.webpack)) {
        return init();
      }
    });
  }
  return class LoadableComponent extends React.Component {
    constructor(props, context) {
      super(props);
      init();
      this.state = {
        loaded: res.loaded
      };
    }
    static contextType = LoadableContext;

    UNSAFE_componentWillMount() {
      this._loadModule();
    }

    _loadModule() {
      if (this.context && Array.isArray(opts.modules)) {
        opts.modules.forEach(moduleName => {
          this.context(moduleName);
        });
      }
    }

    render() {
      if (this.state.loaded) {
        return React.createElement(resolve(this.state.loaded), this.props);
      } else {
        return null;
      }
    }
  };
}

function Loadable(opts) {
  return createLoadableComponent(opts);
}

class Capture extends React.Component {
  render() {
    return (
      <LoadableContext.Provider value={this.props.report}>
        {React.Children.only(this.props.children)}
      </LoadableContext.Provider>
    );
  }
}

Loadable.Capture = Capture;

function flushInitializers(initializers) {
  let promises = [];

  while (initializers.length) {
    let init = initializers.pop();
    promises.push(init());
  }

  return Promise.all(promises).then(() => {
    if (initializers.length) {
      return flushInitializers(initializers);
    }
  });
}
// 服务端
Loadable.preloadAll = () => {
  return new Promise((resolve, reject) => {
    flushInitializers(ALL_INITIALIZERS).then(resolve, reject);
  });
};

// 客户端
Loadable.preloadReady = () => {
  return new Promise((resolve, reject) => {
    flushInitializers(READY_INITIALIZERS).then(resolve, reject);
  });
};
module.exports = Loadable;
