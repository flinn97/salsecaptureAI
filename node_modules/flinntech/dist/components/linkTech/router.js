"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactRouterDom = require("react-router-dom");
var _BaseComponent2 = _interopRequireDefault(require("../templateTech/baseClasses/BaseComponent"));
var _login = _interopRequireDefault(require("../templateTech/APITemplates/login"));
var _register = _interopRequireDefault(require("../templateTech/APITemplates/register"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/**
 * The Router class is responsible for rendering and managing application routes.
 * It extends the BaseComponent class and provides functionality to dynamically add routes,
 * render user authentication routes, and handle route mapping.
 */
var Router = /*#__PURE__*/function (_BaseComponent) {
  /**
   * Initializes the Router component with default state values.
   * @param {Object} props - Properties passed to the Router component.
   */
  function Router(props) {
    var _this;
    _classCallCheck(this, Router);
    _this = _callSuper(this, Router, [props]);
    _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
      routes: [],
      // Stores the list of application routes
      loginComp: _login["default"],
      // Default login component
      registerComp: _register["default"] // Default register component
    });
    return _this;
  }

  /**
   * Adds a new route to the router.
   * @param {Object} route - The route object to add.
   */
  _inherits(Router, _BaseComponent);
  return _createClass(Router, [{
    key: "addToRouter",
    value: function addToRouter(route) {
      var routes = [].concat(_toConsumableArray(this.state.routes), [route]);
      this.setState({
        routes: routes
      });
    }

    /**
     * Maps a list of route objects to Route components for rendering.
     * @param {Array} routes - The list of route objects.
     * @param {Object} props - Additional props to pass to each route's component.
     * @returns {JSX.Element[]} A list of Route components.
     */
  }, {
    key: "getRouteMap",
    value: function getRouteMap(routes, props) {
      var _this2 = this;
      var mapp = /*#__PURE__*/React.createElement(React.Fragment, null);
      if (routes) {
        var _routes;
        routes = _toConsumableArray(routes);

        // Map each route object to Route elements
        mapp = (_routes = routes) === null || _routes === void 0 ? void 0 : _routes.map(function (obj, index) {
          if (!obj.path) {
            // Set default path based on the component's class name if no path is provided
            obj.path = _this2.classNameToString(obj.comp);
            if (index === 0) {
              obj.path = "/"; // Set the first route as the root path
            }
          }
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
            path: obj.path,
            element: /*#__PURE__*/React.createElement(obj.comp, {
              props: _objectSpread(_objectSpread({}, props), obj.props)
            })
          }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
            path: obj.path + "/:id",
            element: /*#__PURE__*/React.createElement(obj.comp, {
              props: _objectSpread(_objectSpread({}, props), obj.props)
            })
          }));
        });
      }
      return mapp;
    }

    /**
     * Generates the routes to render within the application.
     * If no user is logged in, renders the user authentication routes.
     * @param {Array} routes - The list of route objects.
     * @param {Object} props - Additional props to pass to each route's component.
     * @returns {JSX.Element} A Routes component containing the mapped routes.
     */
  }, {
    key: "getRoutes",
    value: function getRoutes(routes, props) {
      var _this$app;
      var renderRoutes = /*#__PURE__*/React.createElement(_reactRouterDom.Routes, null, this.getRouteMap(routes, props), this.state.routes.map(function (r, index) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, r);
      }));

      // If no user is logged in, render user authentication routes
      if (!((_this$app = this.app) !== null && _this$app !== void 0 && _this$app.state.currentUser)) {
        renderRoutes = this.getUserAuthRoutes(props);
      }
      return renderRoutes;
    }

    /**
     * Renders the user authentication routes (login and register).
     * @param {Object} props - Additional props to pass to each route's component.
     * @returns {JSX.Element} A Routes component containing login and register routes.
     */
  }, {
    key: "getUserAuthRoutes",
    value: function getUserAuthRoutes(props) {
      var LoginComp = props.loginComp || this.state.loginComp; // Use custom or default login component
      var RegisterComp = props.registerComp || this.state.registerComp; // Use custom or default register component
      var routes = /*#__PURE__*/React.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
        path: "/",
        element: /*#__PURE__*/React.createElement(LoginComp, {
          props: _objectSpread({}, props)
        })
      }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
        path: "/login",
        element: /*#__PURE__*/React.createElement(LoginComp, {
          props: _objectSpread({}, props)
        })
      }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
        path: "/register",
        element: /*#__PURE__*/React.createElement(RegisterComp, {
          props: _objectSpread({}, props)
        })
      }));
      return routes;
    }

    /**
     * Renders the Router component's HTML structure.
     * Dynamically determines the routes to render based on the application state and props.
     * @returns {JSX.Element} The rendered Router component.
     */
  }, {
    key: "getHtml",
    value: function getHtml() {
      var _this$app2;
      var props = _objectSpread({}, this.props);
      props.app = this.app;
      var state = (_this$app2 = this.app) === null || _this$app2 === void 0 ? void 0 : _this$app2.state;
      var routes = this.props.routes || (state === null || state === void 0 ? void 0 : state.routes);
      var renderRoutes = this.getRoutes(routes, props);
      return /*#__PURE__*/React.createElement(React.Fragment, null, renderRoutes);
    }
  }]);
}(_BaseComponent2["default"]);
var _default = exports["default"] = Router;