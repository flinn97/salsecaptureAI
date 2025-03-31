"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactRouterDom = require("react-router-dom");
require("./App.scss");
require("../../cardTech/layouts.scss");
require("../../cardTech/page.scss");
require("../../cardTech/card.scss");
require("../../cardTech//colors.scss");
var _router = _interopRequireDefault(require("../../linkTech/router.jsx"));
var _navInterface = require("../../navTech/navInterface.jsx");
var _BaseComponent2 = _interopRequireDefault(require("./BaseComponent.jsx"));
var _componentListInterface = _interopRequireDefault(require("../../componentListNPM/componentListInterface.js"));
var _mapComponentInterface = require("../../mapTech/mapComponentInterface.jsx");
var _popupCreationInterface = require("../../popupTech/popupCreationInterface.jsx");
var _FormComponentsInterface = require("../../formTech/FormComponentsInterface.jsx");
var _cardInteface = require("../../cardTech/cardInteface.js");
var _appInterface = require("../appInterface.jsx");
var _baseRegistry = _interopRequireDefault(require("./baseRegistry.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
* AppBaseClass
* 
* This class serves as the foundational base for the application, managing the core application logic, 
* including routing, user authentication checks, popups, and dynamic component registration. 
* It integrates various interfaces and utilities to facilitate a modular and scalable app structure.
* 
* Key Features:
* - Dynamic component registration with a factory pattern.
* - Popup creation and configuration.
* - User authentication checks during mounting.
* - Router integration for application navigation.
* - Global theme and style management.
*/
var AppBaseClass = /*#__PURE__*/function (_BaseComponent) {
  // Additional properties for popup components.

  /**
   * Constructor
   * 
   * Initializes the app's core state, component list, and factories. Also processes configuration 
   * and popup components passed via props or other parameters.
   * 
   * @param {Object} props - The props passed to the app component.
   * @param {Object} obj - Configuration object containing app dependencies like endpoint, db, etc.
   * @param {Array} components - List of components to register with the factory.
   */
  function AppBaseClass(props, obj, components) {
    var _this;
    _classCallCheck(this, AppBaseClass);
    _this = _callSuper(this, AppBaseClass, [props]);
    _defineProperty(_this, "endpoint", void 0);
    // Endpoint for API communication.
    _defineProperty(_this, "db", void 0);
    // Database instance.
    _defineProperty(_this, "storage", void 0);
    // Storage instance for file handling.
    _defineProperty(_this, "auth", void 0);
    // Authentication instance.
    _defineProperty(_this, "popupComponents", void 0);
    // Predefined popup components.
    _defineProperty(_this, "popupComponentsProps", void 0);
    obj = _this.props.config || obj;
    _this.popupComponents = _this.props.popupComponents;
    _this.componentListInterface = new _componentListInterface["default"](_this.dispatch, obj.endpoint, obj.db, obj.storage, obj.auth);
    _this.componentList = _this.componentListInterface.createComponentList();
    _this.factory = _this.componentListInterface.getFactory();
    _this.operationsFactory = _this.componentList.getOperationsFactory();
    _this.interfaceRegistry = new _baseRegistry["default"]();
    _this.initialPropsSetupFunctions = [_this.propogateApp].concat(_toConsumableArray(_this.initialPropsSetupFunctions));
    _this.state = {
      componentList: _this.componentList,
      componentListInterface: _this.componentListInterface,
      operationsFactory: _this.operationsFactory,
      factory: _this.factory,
      theme: _this.props.theme || "default",
      pageClass: _this.props.pageClass || "fullScreen",
      pageStyle: _this.props.pageStyle,
      extraRouteKey: _this.props.extraRouteKey || "extraRoutes",
      navBarProps: _this.props.NavBarProps || {},
      popupFactory: _popupCreationInterface.popupCreater.getFactory(),
      popups: _this.props.popups || [],
      global: _this.props.global || {},
      routes: _this.props.routes || []
    };
    if (components) {
      _this.registerListWithFactory(components);
    }
    return _this;
  }

  /**
   * checkForUser
   * 
   * Checks if a user is currently logged in and retrieves their details if they are authenticated.
   */
  _inherits(AppBaseClass, _BaseComponent);
  return _createClass(AppBaseClass, [{
    key: "checkForUser",
    value: (function () {
      var _checkForUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var user, loggedIn;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.APIService.getCurrentUser();
            case 2:
              user = _context.sent;
              if (!user) {
                _context.next = 8;
                break;
              }
              _context.next = 6;
              return this.APIService.checkIfLoggedIn();
            case 6:
              loggedIn = _context.sent;
              if (loggedIn) {
                this.APIService.getuser(user.email);
              }
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function checkForUser() {
        return _checkForUser.apply(this, arguments);
      }
      return checkForUser;
    }()
    /**
     * componentDidMount
     * 
     * Lifecycle method triggered after the component is mounted. Initiates user authentication checks.
     */
    )
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.checkForUser();
    }

    /**
     * registerListWithFactory
     * 
     * Registers a list of components with the factory, enabling dynamic component creation.
     * 
     * @param {Array} list - List of components to register.
     */
  }, {
    key: "registerListWithFactory",
    value: function registerListWithFactory(list) {
      var _iterator = _createForOfIteratorHelper(list),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var c = _step.value;
          var obj = new c();
          var type = obj.getJson().type;
          this.factory.registerComponents({
            name: type,
            component: c
          });
          this.createPopupDefaultsByType(type);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    /**
     * createPopupDefaultsByType
     * 
     * Creates default popup configurations for a given component type.
     * 
     * @param {String} type - The type of the component for which popups are to be created.
     */
  }, {
    key: "createPopupDefaultsByType",
    value: function createPopupDefaultsByType(type) {
      var _this$popupComponents;
      if ((_this$popupComponents = this.popupComponents) !== null && _this$popupComponents !== void 0 && _this$popupComponents[type]) {
        var str = this.getCapitalFirstLetter(type);
        var add = {
          content: this.popupComponents[type],
          popupSwitch: "add" + str,
          componentType: type
        };
        var update = _objectSpread(_objectSpread({}, add), {}, {
          popupSwitch: "update" + str
        });
        this.state.popups = [].concat(_toConsumableArray(this.state.popups), [add, update]);
      }
    }

    /**
     * dispatch
     * 
     * Updates the component's state with the provided object.
     * 
     * @param {Object} obj - The object containing state updates.
     */
  }, {
    key: "dispatch",
    value: function dispatch(obj) {
      obj = obj || {};
      this.setState(_objectSpread({}, obj));
    }

    /**
     * setPopups
     * 
     * Registers all configured popups with the popup factory.
     */
  }, {
    key: "setPopups",
    value: function setPopups() {
      var _iterator2 = _createForOfIteratorHelper(this.state.popups),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var obj = _step2.value;
          var t = obj.componentType;
          if (t) {
            obj = _objectSpread(_objectSpread({}, obj), this.popupComponentsProps[t]);
          }
          if (!obj.popupSwitch) {
            obj.popupSwitch = this.classNameToString(obj.content);
          }
          this.state.popupFactory.registerComponent(obj.popupSwitch, obj);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    /**
     * propogateApp
     * 
     * Propagates the app's state and dispatch method to various interfaces, ensuring global availability.
     */
  }, {
    key: "propogateApp",
    value: function propogateApp() {
      this.app = _objectSpread({
        state: this.state,
        dispatch: this.dispatch.bind(this)
      }, this.state.global);
      _mapComponentInterface.mapInterface.setAppComponent(this.app);
      _FormComponentsInterface.formInterface.setAppComponent(this.app);
      _cardInteface.cardInterface.setAppComponent(this.app);
      _navInterface.navInterface.setAppComponent(this.app);
      _appInterface.appInterface.setAppComponent(this.app);
    }

    /**
     * getHtml
     * 
     * Generates the HTML structure for the application, including the router, navbar, and popups.
     * 
     * @param {Object} Content - Optional content component to render within the app structure.
     * @returns {JSX.Element} The full HTML structure for the app.
     */
  }, {
    key: "getHtml",
    value: function getHtml(Content) {
      this.setPopups();
      var routes = _toConsumableArray(this.state.routes);
      if (this.state[this.state.extraRouteKey]) {
        routes = [].concat(_toConsumableArray(routes), _toConsumableArray(this.state[this.state.extraRouteKey]));
      }
      return /*#__PURE__*/React.createElement("div", {
        className: this.state.pageClass,
        style: this.state.pageStyle
      }, /*#__PURE__*/React.createElement(_reactRouterDom.BrowserRouter, null, _popupCreationInterface.popupCreater.createPopupMachine({
        app: this.app
      }), this.state.currentUser && /*#__PURE__*/React.createElement(_navInterface.Navbar, this.state.navBarProps), Content ? /*#__PURE__*/React.createElement(Content.content, {
        props: _objectSpread({}, Content.props)
      }) : /*#__PURE__*/React.createElement(React.Fragment, null), /*#__PURE__*/React.createElement(_router["default"], {
        routes: routes
      })));
    }
  }]);
}(_BaseComponent2["default"]); //template tech: global themes that effect everything.
//We should make it so that people can just import a css and it changes all the classes for everything globally.
var _default = exports["default"] = AppBaseClass;