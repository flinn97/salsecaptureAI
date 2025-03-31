"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _binder = require("../../serviceTech/Util/binder");
var _baseObserver = _interopRequireDefault(require("../observers/baseObserver"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * BaseInterface is a foundational class that provides an interface for managing application components, themes, and observers.
 * It acts as a central hub for managing the application's main functionality, component list, and dynamic updates.
 */
var BaseInterface = /*#__PURE__*/function () {
  /**
   * Constructor to initialize the BaseInterface instance.
   * It binds the class context and initializes factories and the observer.
   */
  function BaseInterface() {
    _classCallCheck(this, BaseInterface);
    _defineProperty(this, "factory", void 0);
    _defineProperty(this, "componentList", void 0);
    _defineProperty(this, "themeFactory", void 0);
    _defineProperty(this, "appComponent", void 0);
    _defineProperty(this, "mainFunc", void 0);
    _defineProperty(this, "appObserver", new _baseObserver["default"]());
    _binder.binder.bind(this);
    this.getFactory();
    this.getThemeFactory();
  }

  /**
   * Subscribes a function to the app observer.
   * @param {Function} func - The function to subscribe.
   */
  return _createClass(BaseInterface, [{
    key: "subscribeToAppObserver",
    value: function subscribeToAppObserver(func) {
      this.appObserver.subscribe(func);
    }

    /**
     * Retrieves the main function of the application.
     * @returns {Function} - The main function.
     */
  }, {
    key: "getMainFunc",
    value: function getMainFunc() {
      return this.mainFunc;
    }

    /**
     * Retrieves the factory for managing components or functionality.
     * To be implemented by subclasses.
     */
  }, {
    key: "getFactory",
    value: function getFactory() {}

    /**
     * Retrieves the theme factory for managing application themes.
     * To be implemented by subclasses.
     */
  }, {
    key: "getThemeFactory",
    value: function getThemeFactory() {}

    /**
     * Retrieves the main application component.
     * @returns {Object} - The main application component.
     */
  }, {
    key: "getAppComponent",
    value: function getAppComponent() {
      return this.appComponent;
    }

    /**
     * Sets the main application component and notifies observers of the update.
     * @param {Object} APP - The main application component.
     */
  }, {
    key: "setAppComponent",
    value: function setAppComponent(APP) {
      this.appComponent = APP;
      this.appObserver.run(APP);
    }

    /**
     * Retrieves the list of components from the application state.
     * If the list is not already available, it attempts to extract it from the app component's state.
     * @returns {Array|undefined} - The list of components.
     */
  }, {
    key: "getComponentList",
    value: function getComponentList() {
      if (!this.componentList) {
        var _this$appComponent;
        this.componentList = (_this$appComponent = this.appComponent) === null || _this$appComponent === void 0 || (_this$appComponent = _this$appComponent.state) === null || _this$appComponent === void 0 ? void 0 : _this$appComponent.componentList;
      }
      return this.componentList;
    }
  }]);
}();
var _default = exports["default"] = BaseInterface;