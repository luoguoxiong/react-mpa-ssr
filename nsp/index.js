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

var ALL_INITIALIZERS = [];
var READY_INITIALIZERS = [];
var LoadableContext = React.createContext();

function isWebpackReady(getModuleIds) {
  if ((typeof __webpack_modules__ === "undefined" ? "undefined" : (0, _typeof2.default)(__webpack_modules__)) !== "object") {
    return false;
  }

  return getModuleIds().every(function (moduleId) {
    return typeof moduleId !== "undefined" && typeof __webpack_modules__[moduleId] !== "undefined";
  });
}

function resolve(obj) {
  return obj && obj.__esModule ? obj.default : obj;
}

function createLoadableComponent(options) {
  var _class, _temp;

  var opts = options;
  var res = null;

  function init() {
    if (!res) {
      var state = {
        loaded: null
      };
      state.promise = opts.loader().then(function (loaded) {
        state.loaded = loaded;
        return loaded;
      }).catch(function (err) {
        throw err;
      });
      res = state;
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

    function LoadableComponent(props, context) {
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

        if (this.context && Array.isArray(opts.modules)) {
          opts.modules.forEach(function (moduleName) {
            _this2.context(moduleName);
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
    }]);
    return LoadableComponent;
  }(React.Component), (0, _defineProperty2.default)(_class, "contextType", LoadableContext), _temp;
}

function Loadable(opts) {
  return createLoadableComponent(opts);
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
    key: "render",
    value: function render() {
      return React.createElement(LoadableContext.Provider, {
        value: this.props.report
      }, React.Children.only(this.props.children));
    }
  }]);
  return Capture;
}(React.Component);

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
} // 服务端


Loadable.preloadAll = function () {
  return new Promise(function (resolve, reject) {
    flushInitializers(ALL_INITIALIZERS).then(resolve, reject);
  });
}; // 客户端


Loadable.preloadReady = function () {
  return new Promise(function (resolve, reject) {
    flushInitializers(READY_INITIALIZERS).then(resolve, reject);
  });
};

module.exports = Loadable;