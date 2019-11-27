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

function load(loader) {
  let promise = loader();
  let state = {
    loaded: null
  };
  state.promise = promise
    .then(loaded => {
      state.loaded = loaded;
      return loaded;
    })
    .catch(err => {
      throw err;
    });
  return state;
}

function resolve(obj) {
  return obj && obj.__esModule ? obj.default : obj;
}

function createLoadableComponent(loadFn, options) {
  let opts = options;

  let res = null;
  function init() {
    if (!res) {
      res = loadFn(opts.loader);
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
  return createLoadableComponent(load, opts);
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

Loadable.preloadAll = () => {
  return new Promise((resolve, reject) => {
    flushInitializers(ALL_INITIALIZERS).then(resolve, reject);
  });
};

Loadable.preloadReady = () => {
  return new Promise((resolve, reject) => {
    flushInitializers(READY_INITIALIZERS).then(resolve, resolve);
  });
};
module.exports = Loadable;
