"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Card2 = _interopRequireDefault(require("../cardTech/Card"));
var _menu = _interopRequireDefault(require("./menu"));
var _mapComponentInterface = require("../mapTech/mapComponentInterface");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var Nav = /*#__PURE__*/function (_Card) {
  /**
   * Constructor initializes the state of the Nav component with default values.
   * @param {Object} props - The props passed to the component.
   */
  function Nav(props) {
    var _this;
    _classCallCheck(this, Nav);
    _this = _callSuper(this, Nav, [props]); // Calls the parent constructor (Card)
    _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
      defaultType: _this.props.type ? _this.props.type : "sideBar",
      // Default navigation type is "sideBar"
      typeKey: "layout",
      // Layout type key
      defaultNavType: "default",
      // Default navigation type
      phoneSize: 850,
      // Default threshold for phone layout
      left: -400 // Default left offset for positioning
    });
    return _this;
  }

  /**
   * Returns props to be passed to the navigation component, including map theme and routes.
   * @returns {Object} - Props to be passed to the navigation component.
   */
  _inherits(Nav, _Card);
  return _createClass(Nav, [{
    key: "getProps",
    value: function getProps() {
      var _this$props$app;
      return _objectSpread({
        mapTheme: this.props.mapTheme || this.state.defaultType,
        // Sets the map theme
        links: this.props.links || ((_this$props$app = this.props.app) === null || _this$props$app === void 0 || (_this$props$app = _this$props$app.state) === null || _this$props$app === void 0 ? void 0 : _this$props$app.routes)
      }, this.props);
    }

    /**
     * Retrieves the navigation component based on the type.
     * @param {Object} props - The props to be passed to the component.
     * @returns {JSX.Element} - The rendered navigation component.
     */
  }, {
    key: "getFactoryComponent",
    value: function getFactoryComponent(props) {
      var type = this.props.mapType ? this.props.mapType : this.state.defaultNavType; // Default map type if not provided
      var factory = this.props.factory; // Retrieves the factory passed in props
      var navComponent = factory.getComponent(type, props); // Fetches the component based on type
      return navComponent;
    }

    /**
     * Component lifecycle method that runs after the component mounts.
     * Listens for window resize events and adjusts layout accordingly.
     */
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.resize !== undefined) {
        window.addEventListener("resize", this.resize); // Adds event listener for resize
        this.resize(); // Calls resize method to adjust layout
      }
    }

    /**
     * Component lifecycle method that runs just before the component unmounts.
     * Removes window resize event listener.
     */
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.resize !== undefined) {
        window.removeEventListener("resize", this.resize); // Removes resize event listener
      }
    }

    /**
     * Resizes the layout based on the window's width.
     * Adjusts the state to switch between phone, tablet, and default layouts.
     */
  }, {
    key: "resize",
    value: function resize() {
      if (window.innerWidth < 850) {
        this.setState({
          phone: true,
          tablet: false,
          defaultType: this.props.phoneLayout ? this.props.phoneLayout : this.state.ogType ? this.state.ogType : this.state.defaultType,
          ogType: this.state.ogType ? this.state.ogType : this.state.defaultType
        });
        return;
      }
      if (window.innerWidth < 1224) {
        this.setState({
          phone: false,
          tablet: true,
          defaultType: this.props.tabletLayout ? this.props.tabletLayout : this.state.ogType ? this.state.ogType : this.state.defaultType,
          ogType: this.state.ogType ? this.state.ogType : this.state.defaultType
        });
        return;
      }
      if (window.innerWidth > 1224) {
        if (this.state.phone) {
          this.setState({
            phone: false,
            defaultType: this.state.ogType
          });
        }
        if (this.state.tablet) {
          this.setState({
            tablet: false,
            defaultType: this.state.ogType
          });
        }
      }
    }

    /**
     * Sets the style for the menu on click by updating the 'left' position.
     * @param {number} i - The position to set for the menu.
     */
  }, {
    key: "setStyleOnMenuClick",
    value: (function () {
      var _setStyleOnMenuClick = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(i) {
        var delay;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              delay = function delay(ms) {
                return new Promise(function (res) {
                  return setTimeout(res, ms);
                });
              }; // Helper function for delay
              this.card.setStyle(_objectSpread(_objectSpread({}, this.card.getStyle()), {}, {
                left: i.toString() + "px"
              })); // Updates the card style
              _context.next = 4;
              return this.setState({
                left: i
              });
            case 4:
              _context.next = 6;
              return delay(10);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function setStyleOnMenuClick(_x) {
        return _setStyleOnMenuClick.apply(this, arguments);
      }
      return setStyleOnMenuClick;
    }()
    /**
     * Opens or closes the navigation based on the current state.
     * Animates the transition of the navigation sliding in and out.
     */
    )
  }, {
    key: "setNavOpenClose",
    value: (function () {
      var _setNavOpenClose = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var i, _i;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(this.state.left === -400)) {
                _context2.next = 13;
                break;
              }
              i = -400;
            case 2:
              if (!(i < 600)) {
                _context2.next = 11;
                break;
              }
              if (!(i > 0)) {
                _context2.next = 6;
                break;
              }
              this.setState({
                left: 0
              }); // Ensures the final state is 0
              return _context2.abrupt("break", 11);
            case 6:
              _context2.next = 8;
              return this.setStyleOnMenuClick(i);
            case 8:
              i = i + 15;
              _context2.next = 2;
              break;
            case 11:
              _context2.next = 23;
              break;
            case 13:
              _i = 0;
            case 14:
              if (!(_i > -450)) {
                _context2.next = 23;
                break;
              }
              if (!(_i < -400)) {
                _context2.next = 18;
                break;
              }
              this.setState({
                left: -400
              }); // Ensures the final state is -400
              return _context2.abrupt("break", 23);
            case 18:
              _context2.next = 20;
              return this.setStyleOnMenuClick(_i);
            case 20:
              _i = _i - 15;
              _context2.next = 14;
              break;
            case 23:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function setNavOpenClose() {
        return _setNavOpenClose.apply(this, arguments);
      }
      return setNavOpenClose;
    }()
    /**
     * Opens or closes the links section of the navigation.
     * @returns {JSX.Element} - A card containing the map component with links.
     */
    )
  }, {
    key: "openCloseLinks",
    value: (function () {
      var _openCloseLinks = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _this$props$app2;
        var linkContainer, card;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              linkContainer = /*#__PURE__*/React.createElement(_mapComponentInterface.MapComponent, {
                list: this.props.links || ((_this$props$app2 = this.props.app) === null || _this$props$app2 === void 0 || (_this$props$app2 = _this$props$app2.state) === null || _this$props$app2 === void 0 ? void 0 : _this$props$app2.routes),
                cells: [{
                  type: "link"
                }]
              });
              card = /*#__PURE__*/React.createElement(_Card2["default"], {
                content: linkContainer
              }); // Wraps the link container in a card
              return _context3.abrupt("return", card);
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function openCloseLinks() {
        return _openCloseLinks.apply(this, arguments);
      }
      return openCloseLinks;
    }()
    /**
     * Opens or closes the navigation based on the current navigation type (topBar or sideBar).
     * @returns {JSX.Element} - The opened or closed navigation.
     */
    )
  }, {
    key: "openCloseNavFun",
    value: (function () {
      var _openCloseNavFun = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var funcs, openOrClose;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              funcs = {
                topBar: this.openCloseLinks,
                // Open or close links for topBar
                sideBar: this.setNavOpenClose // Open or close sideBar
              };
              _context4.next = 3;
              return funcs[this.state.defaultType]();
            case 3:
              openOrClose = _context4.sent;
              return _context4.abrupt("return", openOrClose);
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function openCloseNavFun() {
        return _openCloseNavFun.apply(this, arguments);
      }
      return openCloseNavFun;
    }()
    /**
     * Gets the menu component based on the provided or default menu type.
     * @returns {JSX.Element} - The rendered menu component.
     */
    )
  }, {
    key: "getMenu",
    value: function getMenu() {
      var menu = this.props.menuComponent ? /*#__PURE__*/React.createElement(this.props.menuComponent, _extends({}, this.props.menuComponentProps, {
        open: this.openCloseNavFun,
        type: this.state.defaultType
      })) : /*#__PURE__*/React.createElement(_menu["default"], _extends({
        open: this.openCloseNavFun,
        type: this.state.defaultType
      }, this.props.menuComponentProps));
      return menu;
    }

    /**
     * Gets the content for the navigation, including the navigation component and the menu.
     * @returns {JSX.Element} - The rendered content for the Nav component.
     */
  }, {
    key: "getContent",
    value: function getContent() {
      var props = this.getProps(); // Gets the props for the nav component
      var navComponent = this.getFactoryComponent(props); // Gets the nav component based on type

      // Conditionally renders the menu if phone layout is active
      this.content = /*#__PURE__*/React.createElement(React.Fragment, null, navComponent, this.props.type !== "type" && (this.state.phone || window.innerWidth < this.state.phoneSize) && /*#__PURE__*/React.createElement(React.Fragment, null, this.getMenu()));
      return this.content;
    }
  }]);
}(_Card2["default"]);
var _default = exports["default"] = Nav;