"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _baseObserver = _interopRequireDefault(require("../observers/baseObserver"));
var _builderObserver = _interopRequireDefault(require("../observers/builderObserver"));
var _binder = require("../../serviceTech/Util/binder");
var _appInterface = require("../appInterface");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
/**
 * BaseComponent
 * 
 * This is the base class for React components, providing a foundation for managing component setup, 
 * state, and interactions with the app's global interface. It incorporates observer patterns, 
 * React refs, and initial setup functions to streamline component functionality.
 * 
 * Key Features:
 * - Integration with app-level state and dispatch via the interface.
 * - Observer pattern implementation for dynamic updates.
 * - Automatic React ref creation for component references.
 * - Flexible property and style management for components.
 */
var BaseComponent = exports["default"] = /*#__PURE__*/function (_Component) {
  // Holds the resize functionality if needed.

  /**
   * Constructor
   * 
   * Initializes the base component, setting up observers, interface connections, 
   * and preparation for component-level property management.
   * 
   * @param {Object} props - The props passed to the component.
   */
  function BaseComponent(props) {
    var _this;
    _classCallCheck(this, BaseComponent);
    _this = _callSuper(this, BaseComponent, [props]);
    _defineProperty(_this, "resize", void 0);
    _binder.binder.bind(_this);
    _this.initialBuilderSetupFunctions = [];
    _this.setInterface();
    _this.setInitialApp();
    _this.initialPropsSetupFunctions = [_this.setInterface, _this.setAppOnInterace, _this.setInitialApp, _this.setObj, _this.setThemeFactory, _this.setTheme, _this.createReactRefsForComponents];
    _this.setupObserver = new _baseObserver["default"]();
    _this.builderObserver = new _builderObserver["default"]();
    _this.ObserverForSetupFunction = new _baseObserver["default"]();
    _this.builderObserver.setComponent(_this);
    _this.builderObserver.setObserverFunction(_this.setHtmlBuilderSingleton);
    _this.initialSetupFunctions = [_this.builderObserver.run, _this.additionalSetup];
    _this.components = [];
    return _this;
  }

  /**
   * setInitialApp
   * 
   * Sets up the app-level state and methods by retrieving them from the interface. 
   * Ensures the component is connected to the global app if available.
   */
  _inherits(BaseComponent, _Component);
  return _createClass(BaseComponent, [{
    key: "setInitialApp",
    value: function setInitialApp() {
      if (!this["interface"]) {
        var _this$props;
        this.app = (_this$props = this.props) === null || _this$props === void 0 ? void 0 : _this$props.app;
      }
      var app = this["interface"].getAppComponent();
      if (app) {
        this.app = app;
      }
      if (this.app) {
        var _this$app, _this$app2, _this$propsState, _this$componentList, _this$componentList2;
        this.propsState = (_this$app = this.app) === null || _this$app === void 0 ? void 0 : _this$app.state;
        this.dispatch = (_this$app2 = this.app) === null || _this$app2 === void 0 ? void 0 : _this$app2.dispatch;
        this.componentList = (_this$propsState = this.propsState) === null || _this$propsState === void 0 ? void 0 : _this$propsState.componentList;
        this.APIService = (_this$componentList = this.componentList) === null || _this$componentList === void 0 ? void 0 : _this$componentList.getAPIService();
        this.operationsFactory = (_this$componentList2 = this.componentList) === null || _this$componentList2 === void 0 ? void 0 : _this$componentList2.getOperationsFactory();
      }
    }

    /**
     * setInterface
     * 
     * Initializes the interface for the component, defaulting to the app's interface. 
     * If the interface is of type "appInterface", subscribes to the app observer for updates.
     * 
     * @param {Object} [i] - Optional interface object to use.
     */
  }, {
    key: "setInterface",
    value: function setInterface(i) {
      var _this$props2;
      this["interface"] = i || ((_this$props2 = this.props) === null || _this$props2 === void 0 ? void 0 : _this$props2["interface"]) || this["interface"] || _appInterface.appInterface;
      if (this["interface"].type === "appInterface" && this.subscribeToAppObserverBool === undefined) {
        this.subscribeToAppObserverBool = true;
        this["interface"].subscribeToAppObserver(this.setInitialApp);
      }
    }

    /**
     * setAppOnInterace
     * 
     * Assigns the app instance to the interface for global state and functionality propagation.
     */
  }, {
    key: "setAppOnInterace",
    value: function setAppOnInterace() {
      if (this["interface"]) {
        if (this.props.app) {
          this["interface"].setAppComponent(this.props.app);
        }
        this.app = this["interface"].getAppComponent();
      }
    }

    /**
     * setComponents
     * 
     * Sets the components array for this instance.
     * 
     * @param {Array} c - List of component names.
     */
  }, {
    key: "setComponents",
    value: function setComponents(c) {
      this.components = c;
    }

    /**
     * getComponents
     * 
     * Retrieves the list of components set for this instance.
     * 
     * @returns {Array} - Array of component names.
     */
  }, {
    key: "getComponents",
    value: function getComponents() {
      return this.components;
    }

    /**
     * createReactRefsForComponents
     * 
     * Creates React refs for all components listed in the components array, 
     * enabling easy reference management.
     */
  }, {
    key: "createReactRefsForComponents",
    value: function createReactRefsForComponents() {
      var _iterator = _createForOfIteratorHelper(this.components),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var str = _step.value;
          if (!this[str + "Ref"]) {
            this[str + "Ref"] = /*#__PURE__*/_react["default"].createRef();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    /**
     * createPropObj
     * 
     * Creates a property object for a given component type, including style, class, and event handlers.
     * 
     * @param {String} type - The type of the component (e.g., button, input).
     * @param {String} [objType] - Optional object type to customize the props further.
     * @returns {Object} - The created property object.
     */
  }, {
    key: "createPropObj",
    value: function createPropObj(type, objType) {
      objType = objType || this.state.propType;
      var json;
      var className = this[objType || "props"][type + "Class"];
      if (!className) {
        className = this.theme && typeof this.theme !== "string" ? this.theme[this.state[type + "Class"]] : this["default" + type + "Class"] || "";
      }
      json = {
        name: type,
        ref: this[type + "Ref"],
        style: this[type + "Click"] ? _objectSpread(_objectSpread({}, this[objType || "props"][type + "Style"]), {}, {
          cursor: "pointer"
        }) : this[objType || "props"][type + "Style"],
        className: className,
        content: this[objType || "props"][type],
        onClick: this[objType || "props"][type + "Click"] || this[type + "Click"],
        obj: this.obj
      };
      if (json.onClick) {
        json.onClick = json.onClick.bind(this, this.obj);
      }
      return json;
    }

    /**
     * builderPropsSubscribe
     * 
     * Subscribes the props of a component to the builder observer for updates.
     * 
     * @param {String} str - The component's name.
     */
  }, {
    key: "builderPropsSubscribe",
    value: function builderPropsSubscribe(str) {
      this[str + "Props"] = this.createPropObj(str);
      this.builderObserver.subscribe(this[str + "Props"]);
    }

    /**
     * setInitialBuilderPropFunctions
     * 
     * Creates and registers the initial property setup functions for all components.
     * 
     * @returns {Array} - List of initial builder setup functions.
     */
  }, {
    key: "setInitialBuilderPropFunctions",
    value: function setInitialBuilderPropFunctions() {
      var _iterator2 = _createForOfIteratorHelper(this.components),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var str = _step2.value;
          if (!this["set" + str + "props"]) {
            this["set" + str + "props"] = this.builderPropsSubscribe(str);
          }
          this.initialBuilderSetupFunctions.push(this["set" + str + "props"]);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return this.initialBuilderSetupFunctions;
    }

    /**
     * loadObserver
     * 
     * Configures the setup observer with the initial setup functions.
     */
  }, {
    key: "loadObserver",
    value: function loadObserver() {
      this.setupObserver.setList(this.initialSetupFunctions);
    }

    /**
     * setInitialSetupFunctions
     * 
     * Combines and de-duplicates the initial setup functions from various sources.
     * 
     * @returns {Array} - List of unique initial setup functions.
     */
  }, {
    key: "setInitialSetupFunctions",
    value: function setInitialSetupFunctions() {
      var combinedFunctions = [].concat(_toConsumableArray(this.initialPropsSetupFunctions), _toConsumableArray(this.initialBuilderSetupFunctions), _toConsumableArray(this.initialSetupFunctions), [this.additionalPostSetup]);

      // Use a Set to remove duplicates
      var uniqueFunctions = _toConsumableArray(new Set(combinedFunctions));
      this.initialSetupFunctions = uniqueFunctions;
      return this.initialSetupFunctions;
    }

    /**
     * runInitialPropsSetup
     * 
     * Executes all the initial property setup functions defined in the initialPropsSetupFunctions array.
     */
  }, {
    key: "runInitialPropsSetup",
    value: function runInitialPropsSetup() {
      var _iterator3 = _createForOfIteratorHelper(this.initialPropsSetupFunctions),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var f = _step3.value;
          if (f) {
            f();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }

    /**
       * Allows for updating multiple objects with one form.
       * @param {*} obj 
       * @returns 
       */
  }, {
    key: "isArray",
    value: function isArray(obj) {
      var arr = Array.isArray(obj) ? obj : [obj];
      return arr;
    }

    /**
    * setObj
    * 
    * Assigns the `obj` property from the component's props to the class instance.
    * This is used to make the `obj` accessible throughout the component.
    */
  }, {
    key: "setObj",
    value: function setObj() {
      this.obj = this.props.obj;
    }

    /**
     * setThemeFactory
     * 
     * Retrieves the theme factory from the interface, if available. The theme factory is 
     * responsible for providing the themes used across components.
     */
  }, {
    key: "setThemeFactory",
    value: function setThemeFactory() {
      if (this["interface"] !== undefined) {
        this.themeFactory = this["interface"].getThemeFactory();
      }
    }

    /**
     * setTheme
     * 
     * Sets the theme for the component using the theme factory. If a theme is specified 
     * in the props, it takes precedence. Otherwise, the default theme from the state 
     * or a "default" theme is applied.
     */
  }, {
    key: "setTheme",
    value: function setTheme() {
      if (this.themeFactory) {
        var _this$props3, _this$state;
        this.theme = this.themeFactory.getComponent(((_this$props3 = this.props) === null || _this$props3 === void 0 ? void 0 : _this$props3.theme) || ((_this$state = this.state) === null || _this$state === void 0 ? void 0 : _this$state.defaultTheme) || "default");
      }
    }

    /**
     * clearLists
     * 
     * Clears the lists maintained by the setup observer and the builder observer. 
     * This is useful for resetting or reinitializing the component's setup process.
     */
  }, {
    key: "clearLists",
    value: function clearLists() {
      this.setupObserver.setList([]);
      this.builderObserver.setList([]);
    }

    /**
     * need to setup an observer function for thi ssetupItem sometime.
     * @param  {...any} args 
     */
  }, {
    key: "setupItem",
    value: function setupItem() {
      var _this$setupObserver;
      this.clearLists();
      this.preSetup();
      this.runInitialPropsSetup();
      this.setInitialBuilderPropFunctions();
      this.setInitialSetupFunctions();
      this.loadObserver();
      (_this$setupObserver = this.setupObserver).run.apply(_this$setupObserver, arguments);
    }

    /**
    * preSetup
    * 
    * A placeholder function to be executed before the component setup process begins.
    * This can be overridden in subclasses to include custom pre-setup logic.
    */
  }, {
    key: "preSetup",
    value: function preSetup() {}

    /**
     * setAttribute
     * 
     * Dynamically sets an attribute on the component instance.
     * 
     * @param {string} type - The name of the attribute to set.
     * @param {*} val - The value to assign to the attribute.
     */
  }, {
    key: "setAttribute",
    value: function setAttribute(type, val) {
      this[type] = val;
    }

    /**
     * setHtmlBuilderSingleton
     * 
     * Ensures that a singleton value is assigned to the component instance. 
     * If the attribute already exists, it will not overwrite it.
     * 
     * @param {string} type - The name of the singleton attribute.
     * @param {*} val - The value to assign if it is not already set.
     */
  }, {
    key: "setHtmlBuilderSingleton",
    value: function setHtmlBuilderSingleton(type, val) {
      if (!this[type]) {
        this[type] = val;
      }
    }

    /**
     * getInnerContent
     * 
     * Retrieves the main inner content of the component. This function can 
     * be overridden to provide custom inner content logic.
     * 
     * @returns {*} - The inner content.
     */
  }, {
    key: "getInnerContent",
    value: function getInnerContent() {
      return this.innerContent;
    }

    /**
     * getAdditionalInnerContent
     * 
     * Retrieves additional inner content of the component. Like `getInnerContent`, 
     * this can also be overridden to provide more specific content.
     * 
     * @returns {*} - The additional inner content.
     */
  }, {
    key: "getAdditionalInnerContent",
    value: function getAdditionalInnerContent() {
      return this.innerContent;
    }

    /**
     * mapList
     * 
     * Filters and maps over a list, removing undefined or false elements, 
     * and wraps the result in a React fragment.
     * 
     * @param {Array} list - The list of elements to process.
     * @returns {React.Fragment} - The processed elements wrapped in a fragment.
     */
  }, {
    key: "mapList",
    value: function mapList(list) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, list.filter(function (el) {
        return el !== undefined && el !== false;
      }).map(function (el) {
        return el;
      }));
    }

    /**
     * additionalSetup
     * 
     * A placeholder function for any additional setup logic that should 
     * occur after the initial setup functions.
     */
  }, {
    key: "additionalSetup",
    value: function additionalSetup() {}

    /**
     * additionalPostSetup
     * 
     * A placeholder function for additional setup logic to execute after 
     * the main post-setup process.
     */
  }, {
    key: "additionalPostSetup",
    value: function additionalPostSetup() {}

    /**
     * mapInnerContent
     * 
     * Processes the inner content by retrieving the main and additional content, 
     * mapping them through `mapList`, and assigning the result to `innerContent`.
     * 
     * @returns {*} - The processed inner content.
     */
  }, {
    key: "mapInnerContent",
    value: function mapInnerContent() {
      this.getInnerContent();
      this.getAdditionalInnerContent();
      this.innerContent = this.mapList(this.innerContent);
      return this.innerContent;
    }

    /**
     * getHtml
     * 
     * Retrieves the current HTML content of the component.
     * 
     * @returns {*} - The HTML content.
     */
  }, {
    key: "getHtml",
    value: function getHtml() {
      return this.html;
    }

    /**
     * getFactoryTypeString
     * 
     * Retrieves the factory type string for a given input string by matching 
     * it to the component list registry.
     * 
     * @param {string} str - The input string to match.
     * @returns {string|undefined} - The matched factory type or undefined if no match is found.
     */
  }, {
    key: "getFactoryTypeString",
    value: function getFactoryTypeString(str) {
      var list = this.propsState.componentListInterface.getFactory().getRegistry();
      var type = list.find(function (s) {
        return str.toLowerCase() === s;
      });
      type = type || list.find(function (s) {
        return str.toLowerCase().includes(s);
      });
      return type;
    }

    /**
     * getCapitalFirstLetter
     * 
     * Capitalizes the first letter of a given string.
     * 
     * @param {string} str - The input string.
     * @returns {string} - The string with its first letter capitalized.
     */
  }, {
    key: "getCapitalFirstLetter",
    value: function getCapitalFirstLetter(str) {
      var _str$charAt;
      return (str === null || str === void 0 || (_str$charAt = str.charAt(0)) === null || _str$charAt === void 0 ? void 0 : _str$charAt.toUpperCase()) + (str === null || str === void 0 ? void 0 : str.slice(1));
    }

    /**
     * classNameToString
     * 
     * Converts a class name to a string by lowercasing its first letter.
     * 
     * @param {Function} c - The class whose name is to be converted.
     * @returns {string} - The resulting string.
     */
  }, {
    key: "classNameToString",
    value: function classNameToString(c) {
      var className = c.name;
      var str = className.charAt(0).toLowerCase() + className.slice(1);
      return str;
    }

    /**
     * render
     * 
     * Sets up the component and renders the HTML content.
     * 
     * @returns {*} - The HTML content of the component.
     */
  }, {
    key: "render",
    value: function render() {
      this.setupItem();
      this.html = this.getHtml();
      return this.html;
    }
  }]);
}(_react.Component);