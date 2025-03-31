"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _BaseComponent2 = _interopRequireDefault(require("../templateTech/baseClasses/BaseComponent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
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
var InputBaseClass = exports["default"] = /*#__PURE__*/function (_BaseComponent) {
  function InputBaseClass(props) {
    var _this;
    _classCallCheck(this, InputBaseClass);
    _this = _callSuper(this, InputBaseClass, [props]);

    //some day this stuff in the constructor should be refactored but its not a big deal right now.
    _this.domList = ["a", "button", "div", "h1", "h2", "h3", "h4", "h5", "h6", "img", "input", "p", "span", "table", "tr", "td", "th", "ul", "li", "ol", "form", "textarea", "select", "option", "label", "nav", "footer", "header", "article", "section", "aside", "main", "video", "audio", "iframe", "canvas"];
    _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
      wrapperClass: "FCWrapper",
      formClass: "FCInputForm",
      labelClass: "defaultLabel",
      errorClass: "defaultErrorMessage",
      "interface": "form"
    });
    return _this;
  }

  /**
   * set the obj so that there can be multiple objects that get updated per form
   */
  _inherits(InputBaseClass, _BaseComponent);
  return _createClass(InputBaseClass, [{
    key: "setObj",
    value: function setObj() {
      if (!this.props.prepareOnClick) {
        var _this$propsState, _this$propsState2;
        var obj = this.props.obj || (this.props.inPopup ? (_this$propsState = this.propsState) === null || _this$propsState === void 0 ? void 0 : _this$propsState.currentPopupComponent : (_this$propsState2 = this.propsState) === null || _this$propsState2 === void 0 ? void 0 : _this$propsState2.currentComponent);
        this.obj = this.isArray(obj);
      }
    }

    /**
     * setup ui compoents for the form
     */
  }, {
    key: "preSetup",
    value: function preSetup() {
      this.setComponents(["wrapper", "form", "label", "error"]);
    }

    /**
     * 
     * @returns gets the full form html
     */
  }, {
    key: "getInnerContent",
    value: function getInnerContent() {
      this.innerContent = [this.props.label && this.label.getHtml(), this.getFormHtml(), this.props.errorText && this.error.getHtml()];
      return this.innerContent;
    }

    /**
     * 
     * @returns the full html
     */
  }, {
    key: "getHtml",
    value: function getHtml() {
      this.mapInnerContent();
      var html = this.wrapper.getHtml({
        type: "div",
        content: this.innerContent
      });
      this.html = /*#__PURE__*/React.createElement(React.Fragment, null, html);
      return this.html;
    }

    /**
     * 
     * @returns the actual form part of the html
     */
  }, {
    key: "getFormHtml",
    value: function getFormHtml() {
      this.getInputProps(this.props.type || "input");
      this.additionalPropsSetup();
      return this.form.getHtml({
        type: this.props.type ? this.props.type : "input",
        content: this.content,
        props: this.inputProps
      });
    }
  }, {
    key: "additionalPropsSetup",
    value: function additionalPropsSetup() {}

    /**
     * Directly updates the object(s)
     * @param {*} event 
     */
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;
      var _iterator = _createForOfIteratorHelper(this.obj),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var obj = _step.value;
          if (this.props.isPropArray) {
            var currentVal = obj.getJson()[this.props.name] || [];
            if (!Array.isArray(currentVal)) {
              currentVal = [currentVal];
            }
            if (!Array.isArray(currentVal[0])) {
              currentVal[0] = [currentVal[0]];
            }
            currentVal[0] = value;
            value = currentVal;
          }
          obj.setCompState(_defineProperty({}, this.props.name, value));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.afterChange(event);
    }
  }, {
    key: "afterChange",
    value:
    /**
     * allow for callbacks for when the even is done
     * @param {*} event 
     */
    function afterChange(event) {
      if (this.props.update) {
        var _iterator2 = _createForOfIteratorHelper(this.obj),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var obj = _step2.value;
            var update = this.props.update === true ? undefined : _objectSpread({}, this.props.update);
            obj === null || obj === void 0 || obj.update(update);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      if (this.props.sendUpdate && this.props.app) {
        this.app.dispatch({
          formUpdate: this.props.type
        });
      }
      if (this.props.callbackFunc) {
        this.props.callbackFunc(this.obj);
      }
      this.additionalChanges(event);
      this.setState({});
    }
  }, {
    key: "additionalChanges",
    value: function additionalChanges(event) {}

    /**
    * Prepare on click with a json object
    * prepareOnClick={operation:"exe cleanPrepare", operate:"exe addpost", }
    * Will not prepare on click multiple json objs instead you must specify a number and multiple will only work with adding an obj
    */
  }, {
    key: "prepareOnClick",
    value: (function () {
      var _prepareOnClick = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this$props$app, obj;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(this.props.prepareOnClick && this.props.app)) {
                _context.next = 8;
                break;
              }
              obj = this.props.obj;
              if (obj) {
                obj = this.isArray(obj);
              }
              _context.next = 5;
              return (_this$props$app = this.props.app) === null || _this$props$app === void 0 ? void 0 : _this$props$app.state.componentList.getOperationsFactory().prepare(_objectSpread({}, obj));
            case 5:
              obj = _context.sent;
              //obj should return a class object for 
              if (obj) {
                obj = this.isArray(obj);
              }
              this.obj = obj;
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function prepareOnClick() {
        return _prepareOnClick.apply(this, arguments);
      }
      return prepareOnClick;
    }()
    /**
     * update a value all at once. Same as handleHTMLChange but made to me more generic in clase the html change needs to be more complicated.
     * @param {} value 
     */
    )
  }, {
    key: "objDispatch",
    value: function objDispatch(value) {
      var _iterator3 = _createForOfIteratorHelper(this.obj),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var obj = _step3.value;
          obj.setCompState(_defineProperty({}, this.props.name, value));
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      this.afterChange();
    }

    /**
    * @param {} value 
    */
  }, {
    key: "handleChangeWithoutEvent",
    value: function handleChangeWithoutEvent(obj) {
      for (var o in this.obj) {
        o.setCompState(_defineProperty({}, obj.name, obj.value));
      }
      this.afterChange();
    }

    /**
     * TODO looks like there might be a better way for this.
     * @param {*} type 
     * @returns props for the input
     */
  }, {
    key: "getInputProps",
    value: function getInputProps(type) {
      var _this2 = this,
        _this$obj$;
      this.inputProps = {
        onChange: this.props.handleChange ? function (e) {
          _this2.props.handleChange(e, _this2.obj);
        } : this.handleChange,
        value: this.obj[0] ? (_this$obj$ = this.obj[0]) === null || _this$obj$ === void 0 ? void 0 : _this$obj$.getJson()[this.props.name] : this.props.value,
        type: this.props.inputType || this.props.type,
        onFocus: this.props.onFocus || this.onFocus,
        placeholder: this.props.placeholder,
        name: this.props.name,
        min: this.props.min,
        max: this.props.max,
        cols: this.props.cols || "",
        rows: this.props.rows || 5,
        resize: this.props.resize || "true",
        autoComplete: this.props.autoComplete ? this.props.autoComplete : "off",
        id: this.props.id,
        checked: this.props.checked,
        spellCheck: this.props.type === "password" || this.props.spellCheck === undefined ? false : this.props.spellCheck,
        minLength: this.props.minLength,
        maxLength: this.props.maxLength
      };
      if (!this.domList.includes(type)) {
        this.inputProps.handleChangeWithoutEvent = !this.props.update ? this.props.handleChangeWithoutEvent ? this.props.handleChangeWithoutEvent : this.handleChangeWithoutEvent : function () {
          console.log("");
        };
        this.inputProps.selectOptions = this.props.selectOptions;
        this.inputProps.textOptions = this.props.textOptions;
        this.inputProps.unit = this.props.unit ? this.props.unit : "$";
        this.inputProps.tickClass = this.props.tickClass;
        this.inputProps.handleHTMLChange = this.props.handleHTMLChange || this.objDispatch;
        this.inputProps.doesMath = this.props.doesMath;
        this.inputProps.objDispatch = this.objDispatch;
        this.inputProps.emitClickedOutside = this.props.emitClickedOutside;
        this.inputProps.updateOnClickOutside = this.props.updateOnClickOutside;
      }
      if (this.props.required) {
        this.inputProps.required = true;
      }
      if (this.props.disabled) {
        this.inputProps.disabled = true;
      }
      return this.inputProps;
    }
  }]);
}(_BaseComponent2["default"]);
/**
 * click outsides
 * Change themes for individual pieces.
 */