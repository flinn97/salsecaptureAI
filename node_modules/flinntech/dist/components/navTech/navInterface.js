"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navInterface = exports.Navbar = exports.NavInterface = void 0;
var _navFactory = _interopRequireDefault(require("./navFactory"));
var _nav = _interopRequireDefault(require("./nav"));
var _navList = _interopRequireDefault(require("./navList"));
var _binder = require("../serviceTech/Util/binder");
var _interfaceBaseClass = _interopRequireDefault(require("../templateTech/baseClasses/interfaceBaseClass"));
var _interfaceComponentBaseClass = _interopRequireDefault(require("../templateTech/baseClasses/interfaceComponentBaseClass"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// NavInterface class handles the factory, navigation list, and main navigation functions.
var NavInterface = exports.NavInterface = /*#__PURE__*/function (_BaseInterface) {
  // List of navigation items

  /**
   * Constructor initializes the interface and binds necessary methods.
   * Sets the main function to getNav.
   */
  function NavInterface() {
    var _this;
    _classCallCheck(this, NavInterface);
    _this = _callSuper(this, NavInterface); // Calls the parent class constructor (BaseInterface)
    _defineProperty(_this, "factory", void 0);
    // The factory that creates navigation components
    _defineProperty(_this, "navList", void 0);
    _binder.binder.bind(_this); // Binds this context to methods (presumably from binder utility)
    _this.getFactory(); // Initializes the factory
    _this.getNavList(); // Initializes the navigation list
    _this.mainFunc = _this.getNav; // Sets the main function for navigation
    return _this;
  }

  /**
   * Retrieves the factory for creating navigation components.
   * If it doesn't exist, creates a new instance of NavFactory.
   * @returns {NavFactory} - The NavFactory instance.
   */
  _inherits(NavInterface, _BaseInterface);
  return _createClass(NavInterface, [{
    key: "getFactory",
    value: function getFactory() {
      if (!this.factory) {
        this.factory = new _navFactory["default"](); // Creates a new NavFactory if not present
      }
      return this.factory;
    }

    /**
     * Creates a new Nav component with the given props.
     * @param {Object} props - The props to pass to the Nav component.
     * @returns {JSX.Element} - A Nav component.
     */
  }, {
    key: "getNav",
    value: function getNav(props) {
      return /*#__PURE__*/React.createElement(_nav["default"], _extends({
        factory: this.factory,
        navInterface: this,
        navList: this.navList
      }, props));
    }

    /**
     * Creates a new instance of NavList.
     * @returns {NavList} - A new NavList instance.
     */
  }, {
    key: "getNewNavList",
    value: function getNewNavList() {
      var navList = new _navList["default"](); // Creates a new NavList
      return navList;
    }

    /**
     * Forcefully sets the navigation list.
     * @param {NavList} navList - The navigation list to set.
     */
  }, {
    key: "setNavListForce",
    value: function setNavListForce(navList) {
      this.navList = navList; // Sets the navList to the provided value
    }

    /**
     * Retrieves the navigation list. If it doesn't exist, a new NavList is created.
     * @returns {NavList} - The current NavList.
     */
  }, {
    key: "getNavList",
    value: function getNavList() {
      if (!this.navList) {
        this.navList = this.getNewNavList(); // Creates a new NavList if not present
      }
      return this.navList;
    }
  }]);
}(_interfaceBaseClass["default"]); // Create an instance of NavInterface for use
var navInterface = exports.navInterface = new NavInterface();

// Navbar class is the interface component for the navigation interface.
var Navbar = exports.Navbar = /*#__PURE__*/function (_InterfaceComponentBa) {
  /**
   * Constructor initializes the Navbar with the provided props and binds to the navInterface.
   * @param {Object} props - The props passed to the Navbar component.
   */
  function Navbar(props) {
    var _this2;
    _classCallCheck(this, Navbar);
    _this2 = _callSuper(this, Navbar, [props]); // Calls the parent constructor (InterfaceComponentBaseClass)
    _this2["interface"] = navInterface; // Associates the navbar with the navInterface instance
    return _this2;
  }
  _inherits(Navbar, _InterfaceComponentBa);
  return _createClass(Navbar);
}(_interfaceComponentBaseClass["default"]); // Exports the navInterface, NavInterface, and Navbar classes for use in other parts of the app