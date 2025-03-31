"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _binder = require("../serviceTech/Util/binder");
var _baseObserver = _interopRequireDefault(require("../templateTech/observers/baseObserver"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ComponentList = exports["default"] = /*#__PURE__*/function () {
  function ComponentList(componentListInterface) {
    _classCallCheck(this, ComponentList);
    /**
     * Set components 
     * Add an easy way to access lists of components
     */
    _defineProperty(this, "components", []);
    _defineProperty(this, "dispatch", void 0);
    _defineProperty(this, "backArray", {});
    _defineProperty(this, "operationsFactory", void 0);
    _defineProperty(this, "componentListInterface", void 0);
    _defineProperty(this, "componentsList", {});
    _defineProperty(this, "completionObserver", new _baseObserver["default"]());
    _defineProperty(this, "factory", void 0);
    _defineProperty(this, "APIService", void 0);
    _binder.binder.bind(this);
    this.operationsFactory = componentListInterface.getOperationsFactory();
    this.operationsFactory.setRegister(this.add);
    this.componentListInterface = componentListInterface;
    this.factory = componentListInterface.getFactory();
    this.dispatch = componentListInterface.dispatch;
    this.APIService = componentListInterface.getAPIService();
    this.APIService.setComponentList(this);
    this.completionObserver.subscribe(this.setComponentsList);
    this.completionObserver.subscribe(this.setOrderAfterAddorDel);
  }
  return _createClass(ComponentList, [{
    key: "getFactory",
    value: function getFactory() {
      return this.factory;
    }
  }, {
    key: "getDispatch",
    value: function getDispatch() {
      return this.dispatch;
    }
  }, {
    key: "setDispatch",
    value: function setDispatch(d) {
      this.dispatch = d;
    }
  }, {
    key: "getCompletionObserver",
    value: function getCompletionObserver() {
      return this.completionObserver;
    }
  }, {
    key: "setCompoletionObserver",
    value: function setCompoletionObserver(o) {
      this.completionObserver = o;
    }
  }, {
    key: "subscribeToOperationCompletion",
    value: function subscribeToOperationCompletion(f) {
      this.completionObserver.subscribe(f);
    }
  }, {
    key: "getAPIService",
    value: function getAPIService() {
      return this.APIService;
    }
  }, {
    key: "setAPIService",
    value: function setAPIService(service) {
      this.APIService = service;
    }

    /**
    * 
    * @returns all the components inside the tech
    */
  }, {
    key: "getComponents",
    value: function getComponents() {
      return this.components;
    }

    /**
     * 
     * @param {*} arr 
     * @returns a filtered array of all the errors flushed out
     */
  }, {
    key: "filterOutErrors",
    value: function filterOutErrors(arr) {
      var _this = this;
      var ids = this.components.map(function (obj) {
        return obj.getJson()._id;
      });
      // Remove undefined objects
      arr = arr.filter(function (obj) {
        return obj !== undefined;
      });
      // Iterate over the array and update the JSON of matching components
      arr = arr.map(function (obj) {
        if (obj !== undefined) {
          if (ids.includes(obj.getJson()._id)) {
            var savedComponent = _this.components.find(function (comp) {
              return comp.getJson()._id === obj.getJson()._id;
            });
            obj.setJson(_objectSpread(_objectSpread({}, savedComponent.getJson()), obj.getJson()));
          }
        }
        return obj;
      });
      arr = arr.filter(function (obj) {
        return !ids.includes(obj.getJson()._id);
      });
      var registry = this.factory.getRegistry();
      arr = arr.filter(function (obj) {
        return registry.includes(obj.getJson().type);
      });
      return arr;
    }

    /**
     * 
     * @param arr of components to add
     * add one to many components into the list
     * 
     */
  }, {
    key: "add",
    value: function add(arr, obj) {
      var _this2 = this;
      arr = Array.isArray(arr) ? arr : [arr];
      arr = this.filterOutErrors(arr);
      arr.forEach(function (comp) {
        comp.setComponentList(_this2);
      });
      this.components = [].concat(_toConsumableArray(this.components), _toConsumableArray(arr));
      return this.operationComplete(arr, "add", obj);
    }
    /**
         * if this is a new type of component that has never been added before add a new array.
         * Otherwise add it to the current array
         */
  }, {
    key: "setComponentsList",
    value: function setComponentsList() {
      var tempcomps = {};
      var registry = this.componentListInterface.getFactory().getRegistry();
      registry.forEach(function (str) {
        tempcomps[str] = [];
      });
      var _iterator = _createForOfIteratorHelper(this.components),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var obj = _step.value;
          var type = obj.getJson().type;
          tempcomps[type].push(obj);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.componentsList = tempcomps;
    }

    /**
     * the way this works from the backend we may have a problem with the async stuff on this side.
     * @param {*} obj 
     */
  }, {
    key: "addComponents",
    value: (function () {
      var _addComponents = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(obj, skipBackendUpdate) {
        var _obj;
        var arr, checkIds, comps;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!obj.prepare) {
                arr = Array.isArray(obj) ? obj : [obj];
                obj = {
                  prepare: arr
                };
              }
              _context.next = 3;
              return this.operationsFactory.prepare(_objectSpread({}, obj));
            case 3:
              this.operationsFactory.addToComponentList(skipBackendUpdate);
              checkIds = (_obj = obj) === null || _obj === void 0 ? void 0 : _obj.prepare.map(function (o) {
                return o._id;
              });
              _context.next = 7;
              return this.components.filter(function (comp) {
                return checkIds.includes(comp.getJson()._id);
              });
            case 7:
              comps = _context.sent;
              return _context.abrupt("return", comps);
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function addComponents(_x, _x2) {
        return _addComponents.apply(this, arguments);
      }
      return addComponents;
    }()
    /**
     * 
     * @param arr of components to add
     * delete one to many components into the list
     * 
     */
    )
  }, {
    key: "del",
    value: function del(arr, obj) {
      arr = Array.isArray(arr) ? arr : [arr];
      this.components = this.components.filter(function (obj) {
        return !arr.includes(obj);
      });
      return this.operationComplete(arr, "del", obj);
    }

    /**
     * need to have some way to set order on an ordered list after adding or deleting an item.
     * @param {*} arr 
     */
  }, {
    key: "setOrderAfterAddorDel",
    value: function setOrderAfterAddorDel(arr) {
      var _this3 = this;
      var _iterator2 = _createForOfIteratorHelper(arr),
        _step2;
      try {
        var _loop = function _loop() {
          var obj = _step2.value;
          var json = obj.getJson();
          if (json.orderMatters) {
            var list = _this3.getList(json.type, json[json.orderFilterKey], json.orderFilterKey);
            var key = json.orderKey ? json[json.orderKey] : "order";
            var val = obj.getJson()[key];
            var oFilter = list.filter(function (comp) {
              var val1 = parseInt(comp.getJson()[key]);
              val = parseInt(val);
              return val1 === val;
            });
            var o = oFilter.find(function (comp) {
              return !arr.includes(comp);
            });
            var objIndex = list.indexOf(obj);
            if (o && o !== obj) {
              obj.setCompState(_defineProperty({}, key, objIndex));
            }
            _this3.sortSelectedList(json.type, json.orderKey || "order");
            _this3.resetOrder(obj, key);
          }
        };
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    /**
     * Be able to move things around in an ordered list
     * @param {*} obj 
     * @param {*} key 
     */
  }, {
    key: "shiftOrderedList",
    value: function shiftOrderedList(obj, key) {
      var json = obj.getJson();
      this.sortSelectedList(json.type, json.orderKey || "order");
      var list = this.getList(json.type, json[json.orderFilterKey], json.orderFilterKey);
      key = key || (json.orderKey ? json[json.orderKey] : "order");
      list = list.filter(function (o) {
        return o !== obj;
      });
      for (var i = 1; i < list.length; i++) {
        var o = list[i - 1];
        o.setCompState(_defineProperty({}, key, i), {
          run: true,
          clean: true
        });
      }
    }

    /**
     * Reset the order in case it got out of order.
     * @param {*} obj 
     * @param {*} key 
     */
  }, {
    key: "resetOrder",
    value: function resetOrder(obj, key) {
      var json = obj.getJson();
      key = key || (json.orderKey ? json[json.orderKey] : json.order);
      var list = this.getList(json.type, json[json.orderFilterKey], json.orderFilterKey);
      for (var i = 0; i < list.length; i++) {
        if (list[i][key] !== i) {
          list[i].setCompState(_defineProperty({}, key, i));
          if (list[i] !== obj) {
            list[i].update();
          }
        }
      }
    }

    /**
     * When add update or delete is comeplete
     * @param {*} arr 
     * @param {*} type 
     * @param {*} obj 
     * @returns arr of the operation
     */
  }, {
    key: "operationComplete",
    value: function operationComplete(arr, type, obj) {
      this.completionObserver.run(arr, type, obj);
      this.backArray = _defineProperty({}, type, arr);
      if (!obj.skipBackendUpdate) {
        this.updateBackend(arr, type, obj);
      }
      return arr;
    }

    /**
     * Send update imediately to the backend.
     * @param {*} arr 
     * @param {*} type 
     * @param {*} obj 
     */
  }, {
    key: "updateBackend",
    value: function updateBackend(arr, type, obj) {
      var _this$APIService;
      this.dispatch({
        backend: true,
        backendUpdate: _objectSpread({}, this.backArray)
      });
      var params = [obj.path, obj.dispatchKey];
      if (type === "add") {
        params.push(obj.timeKey);
      }
      (_this$APIService = this.APIService)[type].apply(_this$APIService, [arr].concat(params));
      this.backArray = {};
    }

    /**
     * 
     * @returns operation factor for preparing items to be operated on
     */
  }, {
    key: "getOperationsFactory",
    value: function getOperationsFactory() {
      return this.operationsFactory;
    }

    /**
     * Json is created to provide the backend firebase with needed query params to get things from the backend
     * @param {*} typeValue 
     * @param {*} ids 
     * @param {*} filterKeys 
     * @param {*} obj 
     * @param {*} typeAttribute 
     * @returns 
     */
  }, {
    key: "createQueryJson",
    value: function createQueryJson(typeValue, ids, filterKeys, obj) {
      var typeAttribute = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "type";
      obj = obj || {};
      if (filterKeys === undefined && ids) {
        filterKeys = "_id";
      }
      ids = Array.isArray(ids) ? ids : [ids];
      filterKeys = Array.isArray(filterKeys) ? filterKeys : [filterKeys];
      var json = _objectSpread({
        where: [{
          attribute: typeAttribute,
          val: typeValue
        }]
      }, obj);
      if (ids.length > 0 && ids[0] !== undefined) {
        json.where = [].concat(_toConsumableArray(json.where), _toConsumableArray(ids.map(function (id, index) {
          return {
            attribute: filterKeys[index] || filterKeys[0],
            val: id
          };
        })));
      }
      return json;
    }

    /**
     * type, ids = [], filterKeys = [], obj = {}, path = '', snapshot = false, owner
     * @param {*} listReq 
     * @returns 
     */
  }, {
    key: "getComponentsFromBackend",
    value: (function () {
      var _getComponentsFromBackend = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(listReq, owner) {
        var json, backendList;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (typeof listReq === "string") {
                listReq = {
                  type: listReq,
                  owner: owner === false ? owner : true
                };
              }
              _context2.next = 3;
              return this.createQueryJson(listReq.type, listReq.ids, listReq.filterKeys, listReq.obj, listReq.typeAttribute);
            case 3:
              json = _context2.sent;
              _context2.next = 6;
              return this.APIService[listReq.snapshot ? "firebaseGetterSnapshot" : "firebaseGetter"](json, listReq.path, listReq.owner);
            case 6:
              backendList = _context2.sent;
              return _context2.abrupt("return", backendList);
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function getComponentsFromBackend(_x3, _x4) {
        return _getComponentsFromBackend.apply(this, arguments);
      }
      return getComponentsFromBackend;
    }()
    /**
     * type, ids = [], filterKeys = [], obj = {}, path = '', snapshot = false, owner
     * @param {*} compReq 
     * @returns 
     */
    )
  }, {
    key: "getComponentFromBackend",
    value: (function () {
      var _getComponentFromBackend = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(compReq) {
        var comp;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.getComponentsFromBackend(compReq);
            case 2:
              comp = _context3.sent;
              return _context3.abrupt("return", comp[0]);
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getComponentFromBackend(_x5) {
        return _getComponentFromBackend.apply(this, arguments);
      }
      return getComponentFromBackend;
    }()
    /**
    * Filters a list based on the given ids and filterKeys.
    * 
    * @param {string} type - The name of the list to filter.
    * @param {string|string[]} [ids] - The id or ids to filter by.
    * @param {string|string[]} [filterKeys="owner"] - The key or keys to filter on.
    * @returns {Array} - The filtered list or the full list if no ids are provided.
    */
    )
  }, {
    key: "getList",
    value: function getList(type, ids, filterKeys) {
      filterKeys = filterKeys || "owner";
      type = Array.isArray(type) ? type : [type];
      var items = [];
      var _iterator3 = _createForOfIteratorHelper(type),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var t = _step3.value;
          var list = this.componentsList[t] || [];
          items = [].concat(_toConsumableArray(items), _toConsumableArray(list));
        }

        // Convert ids and filterKeys to arrays if they are not already
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      if (!Array.isArray(ids)) {
        ids = ids ? [ids] : [];
      }
      if (!Array.isArray(filterKeys)) {
        filterKeys = [filterKeys];
      }
      if (ids.length > 0) {
        items = items.filter(function (item) {
          return filterKeys.some(function (filterKey, index) {
            var _item$getJson;
            var data = (_item$getJson = item.getJson()) === null || _item$getJson === void 0 ? void 0 : _item$getJson[filterKey];
            var id = ids[index] || ids[0]; // Use the corresponding id or fallback to the first id
            return _typeof(data) === 'object' ? Object.keys(data).includes(id) : data === id;
          });
        });
      }
      return items;
    }

    /**
     * 
     * @param type 
     * @param id 
     * @param filterKey 
     * @returns a component of what was asked for with the default being the the first component in the list.
     */
    //     type   id  filter
    //     User, ownerid 
  }, {
    key: "getComponent",
    value: function getComponent(type, id, filterKey) {
      var list = this.getList(type, id, filterKey || "_id");
      return list[0];
    }

    /**
     * clear the lists
     */
  }, {
    key: "clearList",
    value: function clearList() {
      this.components = [];
      this.componentsList = {};
    }
    /**
     * clears a list by filter key and id
     * @param {*} id 
     * @param {*} filterKey 
     */
  }, {
    key: "clearSelectedList",
    value: function clearSelectedList(id, filterKey) {
      var temp = _toConsumableArray(this.components);
      var arr = [];
      for (var key in temp) {
        if (temp[key].getJson()[filterKey] !== id) {
          arr.push(temp[key]);
        }
      }
      this.components = [].concat(arr);
      this.setComponentsList();
    }

    /**
     * set component list for the app
     * @param {*} list 
     */
  }, {
    key: "setComponentList",
    value: function setComponentList(list) {
      this.componentsList = list;
    }

    /**
     * sets a list by type in the componentsList var
     * @param {*} type 
     * @param {*} list 
     */
  }, {
    key: "setSelectedList",
    value: function setSelectedList(type, list) {
      this.componentsList[type] = list;
    }

    /**
     * Provide sort functionality for types of lists
     * @param {*} type 
     * @param {*} filterKey 
     * @param {*} reverse 
     * @returns 
     */
  }, {
    key: "sortSelectedList",
    value: function sortSelectedList(type, filterKey, reverse) {
      if (!filterKey) {
        return;
      }
      if (this.componentsList[type]) {
        var list = _toConsumableArray(this.componentsList[type]);
        list = list.sort(function (a, b) {
          // Attempt to convert string values to numbers for comparison
          var aValueRaw = a.getJson()[filterKey];
          var bValueRaw = b.getJson()[filterKey];
          var aValue = isNaN(Number(aValueRaw)) ? aValueRaw : Number(aValueRaw);
          var bValue = isNaN(Number(bValueRaw)) ? bValueRaw : Number(bValueRaw);
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            // Compare as numbers
            return reverse ? bValue - aValue : aValue - bValue;
          } else {
            // Fallback to string comparison
            if (reverse) {
              return ('' + bValue).localeCompare('' + aValue);
            } else {
              return ('' + aValue).localeCompare('' + bValue);
            }
          }
        });
        this.setSelectedList(type, list);
      }
    }

    /**
     * sort the list by the timestamp
     * @param {*} type 
     * @param {*} reverse 
     */
  }, {
    key: "sortSelectedListbyFirebaseDate",
    value: function sortSelectedListbyFirebaseDate(type, reverse) {
      if (this.componentsList[type]) {
        var list = _toConsumableArray(this.componentsList[type]);
        list = list.sort(function (a, b) {
          var _a$getJson$date, _b$getJson$date;
          //
          //THIS MIGHT MAKE ORDER SWITCHING WEIRD
          var aD = a.getJson().date || a.getJson().date !== "" ? (_a$getJson$date = a.getJson().date) === null || _a$getJson$date === void 0 ? void 0 : _a$getJson$date.seconds : new Date(0);
          var bD = b.getJson().date || b.getJson().date !== "" ? (_b$getJson$date = b.getJson().date) === null || _b$getJson$date === void 0 ? void 0 : _b$getJson$date.seconds : new Date(0);
          return reverse ? bD - aD : aD - bD;
        });
        this.setSelectedList(type, list);
      }
    }
  }]);
}();
/**
 * potential Refactors:
 * 1. consider connecting a different listener to the backend strategy.
 * 2. consider not a singleton operations factory.
 */