"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var React = require("react");

var PropTypes = require("prop-types");

var ALL_INITIALIZERS = [];
var READY_INITIALIZERS = [];

function isWebpackReady(getModuleIds) {
  if ((typeof __webpack_modules__ === "undefined" ? "undefined" : (0, _typeof2.default)(__webpack_modules__)) !== "object") {
    return false;
  }

  return getModuleIds().every(function (moduleId) {
    return typeof moduleId !== "undefined" && typeof __webpack_modules__[moduleId] !== "undefined";
  });
}

function load(loader) {
  var promise = loader();
  var state = {
    loaded: null
  };
  state.promise = promise.then(function (loaded) {
    state.loaded = loaded;
    return loaded;
  }).catch(function (err) {
    throw err;
  });
  return state;
}

function resolve(obj) {
  return obj && obj.__esModule ? obj.default : obj;
}

function render(loaded, props) {
  return React.createElement(resolve(loaded), props);
}

function createLoadableComponent(loadFn, options) {
  var _class, _temp;

  var opts = Object.assign({
    loader: null,
    webpack: null,
    modules: null
  }, options);
  var res = null;

  function init() {
    if (!res) {
      res = loadFn(opts.loader);
    }

    return res.promise;
  }

  ALL_INITIALIZERS.push(init);

  if (typeof opts.webpack === "function") {
    READY_INITIALIZERS.push(function () {
      if (isWebpackReady(opts.webpack)) {
        return init();
      }
    });
  }

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2.default)(LoadableComponent, _React$Component);

    function LoadableComponent(props) {
      var _this;

      (0, _classCallCheck2.default)(this, LoadableComponent);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LoadableComponent).call(this, props));
      init();
      _this.state = {
        loaded: res.loaded
      };
      return _this;
    }

    (0, _createClass2.default)(LoadableComponent, [{
      key: "UNSAFE_componentWillMount",
      value: function UNSAFE_componentWillMount() {
        this._loadModule();
      }
    }, {
      key: "_loadModule",
      value: function _loadModule() {
        var _this2 = this;

        if (this.context.loadable && Array.isArray(opts.modules)) {
          opts.modules.forEach(function (moduleName) {
            _this2.context.loadable.report(moduleName);
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        if (this.state.loaded) {
          return React.createElement(resolve(this.state.loaded), this.props);
        } else {
          return null;
        }
      }
    }], [{
      key: "preload",
      value: function preload() {
        return init();
      }
    }]);
    return LoadableComponent;
  }(React.Component), (0, _defineProperty2.default)(_class, "contextTypes", {
    loadable: PropTypes.shape({
      report: PropTypes.func.isRequired
    })
  }), _temp;
}

function Loadable(opts) {
  return createLoadableComponent(load, opts);
}

var Capture =
/*#__PURE__*/
function (_React$Component2) {
  (0, _inherits2.default)(Capture, _React$Component2);

  function Capture() {
    (0, _classCallCheck2.default)(this, Capture);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Capture).apply(this, arguments));
  }

  (0, _createClass2.default)(Capture, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        loadable: {
          report: this.props.report
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      return React.Children.only(this.props.children);
    }
  }]);
  return Capture;
}(React.Component);

(0, _defineProperty2.default)(Capture, "propTypes", {
  report: PropTypes.func.isRequired
});
(0, _defineProperty2.default)(Capture, "childContextTypes", {
  loadable: PropTypes.shape({
    report: PropTypes.func.isRequired
  }).isRequired
});
Loadable.Capture = Capture;

function flushInitializers(initializers) {
  var promises = [];

  while (initializers.length) {
    var init = initializers.pop();
    promises.push(init());
  }

  return Promise.all(promises).then(function () {
    if (initializers.length) {
      return flushInitializers(initializers);
    }
  });
}

Loadable.preloadAll = function () {
  return new Promise(function (resolve, reject) {
    flushInitializers(ALL_INITIALIZERS).then(resolve, reject);
  });
};

Loadable.preloadReady = function () {
  return new Promise(function (resolve, reject) {
    flushInitializers(READY_INITIALIZERS).then(resolve, resolve);
  });
};

module.exports = Loadable;