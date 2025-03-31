"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _binder = require("../serviceTech/Util/binder");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * BaseClass provides foundational functionality and structure for derived classes,
 * including operations, API service integration, state management, and component interaction.
 */
var BaseClass = exports["default"] = /*#__PURE__*/function () {
  /**
   * Constructor initializes the BaseClass with an operations factory and binds methods.
   * @param {Object} oppsFactory - The operations factory used for managing operations.
   */
  function BaseClass(oppsFactory) {
    _classCallCheck(this, BaseClass);
    // Class properties
    _defineProperty(this, "operationsFactory", void 0);
    _defineProperty(this, "dispatch", void 0);
    _defineProperty(this, "json", {
      _id: "",
      backendKeys: [],
      backendAttributes: [],
      backendFilterKeys: [],
      orderMatters: false,
      orderFilterKey: "",
      filterKey: "",
      removeOwnerQuery: []
    });
    _defineProperty(this, "componentList", void 0);
    _defineProperty(this, "APIService", void 0);
    _binder.binder.bind(this); // Binds all class methods to ensure proper `this` context.
    this.operationsFactory = oppsFactory;
    this.json._id = this.createId(); // Generates a unique ID for the instance.
  }

  /**
   * Helper function to determine the attribute and filter key for associated items.
   * @param {number} index - The index for backend attributes and filter keys.
   * @returns {Object} Object containing `attribute` and `filterKey`.
   */
  return _createClass(BaseClass, [{
    key: "getAssociatedItemsHelper",
    value: function getAssociatedItemsHelper(index) {
      var attribute = this.json._id;
      var filterKey = this.json.type + "Id";
      if (this.json.backendAttributes.length > 0) {
        attribute = this.json[this.json.backendAttributes[index]];
      }
      if (this.json.backendFilterKeys.length > 0) {
        filterKey = this.json.backendFilterKeys[index];
      }
      return {
        attribute: attribute,
        filterKey: filterKey
      };
    }

    /**
     * Fetches associated items for the provided item types using the component list.
     * If no item types are provided, it uses `backendKeys`.
     * @param {Array} itemTypes - The item types to fetch.
     * @returns {Promise<Array>} A promise resolving to the associated items.
     */
  }, {
    key: "getAssociatedItems",
    value: (function () {
      var _getAssociatedItems = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(itemTypes) {
        var _itemTypes,
          _this = this;
        var promises;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              itemTypes = itemTypes || this.json.backendKeys;
              promises = (_itemTypes = itemTypes) === null || _itemTypes === void 0 ? void 0 : _itemTypes.map(function (item, index) {
                var _this$getAssociatedIt = _this.getAssociatedItemsHelper(index),
                  attribute = _this$getAssociatedIt.attribute,
                  filterKey = _this$getAssociatedIt.filterKey;
                return _this.componentList.getList(item, attribute, filterKey);
              });
              _context.next = 4;
              return Promise.all(promises);
            case 4:
              return _context.abrupt("return", _context.sent);
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getAssociatedItems(_x) {
        return _getAssociatedItems.apply(this, arguments);
      }
      return getAssociatedItems;
    }()
    /**
     * Fetches associated items directly from the backend for the provided item types.
     * @param {Array} itemTypes - The item types to fetch.
     * @param {Object} listReq - Additional request parameters.
     * @returns {Promise<Array>} A promise resolving to the associated backend items.
     */
    )
  }, {
    key: "getAssociatedItemsFromBackend",
    value: (function () {
      var _getAssociatedItemsFromBackend = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(itemTypes, listReq) {
        var _itemTypes2,
          _this2 = this;
        var owner, promises;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              itemTypes = itemTypes || this.json.backendKeys;
              owner = true;
              promises = (_itemTypes2 = itemTypes) === null || _itemTypes2 === void 0 ? void 0 : _itemTypes2.map(function (item, index) {
                if (_this2.json.removeOwnerQuery.includes(item)) {
                  owner = false;
                }
                var _this2$getAssociatedI = _this2.getAssociatedItemsHelper(index),
                  attribute = _this2$getAssociatedI.attribute,
                  filterKey = _this2$getAssociatedI.filterKey;
                return _this2.componentList.getComponentsFromBackend(_objectSpread({
                  type: item,
                  ids: attribute,
                  filterKeys: filterKey,
                  owner: owner
                }, listReq));
              });
              _context2.next = 5;
              return Promise.all(promises);
            case 5:
              return _context2.abrupt("return", _context2.sent);
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function getAssociatedItemsFromBackend(_x2, _x3) {
        return _getAssociatedItemsFromBackend.apply(this, arguments);
      }
      return getAssociatedItemsFromBackend;
    }()
    /**
     * Sets the component list for the instance and initializes API and dispatch services.
     * @param {Object} l - The component list to set.
     */
    )
  }, {
    key: "setComponentList",
    value: function setComponentList(l) {
      this.componentList = l;
      if (this.componentList.getAPIService) {
        this.setAPIService(this.componentList.getAPIService());
      }
      if (this.componentList.getDispatch) {
        this.setDispatch(this.componentList.getDispatch());
      }
    }

    /**
     * Sets the dispatch function.
     * @param {Function} d - The dispatch function.
     */
  }, {
    key: "setDispatch",
    value: function setDispatch(d) {
      this.dispatch = d;
    }

    /**
     * Retrieves the dispatch function.
     * @returns {Function} The dispatch function.
     */
  }, {
    key: "getDispatch",
    value: function getDispatch() {
      return this.dispatch;
    }

    /**
     * Retrieves the component list.
     * @returns {Object} The component list.
     */
  }, {
    key: "getComponentList",
    value: function getComponentList() {
      return this.componentList;
    }

    /**
     * Sets the API service for the instance.
     * @param {Object} service - The API service to set.
     */
  }, {
    key: "setAPIService",
    value: function setAPIService(service) {
      this.APIService = service;
    }

    /**
     * Retrieves the API service.
     * @returns {Object} The API service.
     */
  }, {
    key: "getAPIService",
    value: function getAPIService() {
      return this.APIService;
    }

    /**
     * Updates the current instance using the API service.
     * @param {...any} args - Additional arguments for the update operation.
     */
  }, {
    key: "update",
    value: function update() {
      if (this.APIService) {
        var _this$APIService;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        (_this$APIService = this.APIService).update.apply(_this$APIService, [[this]].concat(args));
      }
    }

    /**
     * Deletes the current instance using the component list.
     * @param {...any} args - Additional arguments for the delete operation.
     */
  }, {
    key: "del",
    value: function del() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      this.componentList.del(this, _objectSpread({}, args));
    }

    /**
     * Adjusts the order of the current instance within a list.
     * @param {number|boolean} increment - The direction or step to move in the list.
     * @param {string} key - The key used for ordering.
     */
  }, {
    key: "updateOrder",
    value: function updateOrder(increment, key) {
      increment = increment || -1;
      if (increment === true) {
        increment = 1;
      }
      var list = this.componentList.getList(this.json.type, this.json[this.json.orderFilterKey], this.json.orderFilterKey);
      key = key || (this.json.orderKey ? this.json[this.json.orderKey] : "order");
      var thisCompIndex = list.indexOf(this);
      var nextComp;

      // Handle boundary cases and list shifting.
      if (increment < 0 && thisCompIndex === 0) {
        this.json[key] = list.length;
      } else if (increment > 0 && thisCompIndex === list.length - 1) {
        this.json[key] = 0;
        this.componentList.shiftOrderedList(this, key);
      } else {
        nextComp = list[thisCompIndex + increment];
        nextComp.setCompState(_defineProperty({}, key, thisCompIndex), {
          run: true,
          clean: true
        });
        this.json[key] = thisCompIndex + increment;
      }
      this.componentList.sortSelectedList(this.json.type, this.json.orderKey || "order");
      this.componentList.resetOrder(this, key);
      this.update();
    }
    /**
    * Prepares the instance by invoking the operations factory's prepare method.
    */
  }, {
    key: "prepare",
    value: function prepare() {
      this.operationsFactory.prepare({
        prepare: this
      });
    }

    /**
     * Sets a single attribute on the instance.
     * @param {string} key - The key of the attribute to set.
     * @param {*} val - The value to set for the attribute.
     */
  }, {
    key: "setAttribute",
    value: function setAttribute(key, val) {
      this[key] = val;
    }

    /**
     * Sets multiple attributes on the instance.
     * @param {Object} obj - An object containing key-value pairs to set as attributes.
     */
  }, {
    key: "setAttributes",
    value: function setAttributes(obj) {
      for (var key in obj) {
        this[key] = obj[key];
      }
    }

    /**
     * Retrieves the value of a specific attribute from the instance.
     * @param {string} type - The key of the attribute to retrieve.
     * @returns {*} The value of the requested attribute.
     */
  }, {
    key: "getAttribute",
    value: function getAttribute(type) {
      return this[type];
    }

    /**
     * Retrieves a specific attribute from the `json` object.
     * @param {string} key - The key of the attribute to retrieve.
     * @returns {*} The value of the requested attribute from `json`.
     */
  }, {
    key: "getJsonAttribute",
    value: function getJsonAttribute(key) {
      return this.json[key];
    }

    /**
     * Updates the `json` object and optionally performs additional actions like dispatching updates, calling callbacks, or running operations.
     *        
     * * Works exactly like setState in react only I include a function for a callback if needed
     * @param {Object} obj - Key-value pairs to update in the `json` object.
     * @param {Object} subscribe - Options for subscribing to operations.
     * @param {boolean} dispatch - Whether to dispatch updates.
     * @param {Function} callBack - Callback to execute after updating the state.
     */
  }, {
    key: "setCompState",
    value: function setCompState(obj, subscribe, dispatch, callBack) {
      this.subscribeToOperations(subscribe);
      this.json = _objectSpread(_objectSpread({}, this.json), obj);
      if (dispatch) {
        this.dispatch({
          updated: this
        });
      }
      if (callBack) {
        callBack(obj);
      }
      if (subscribe !== null && subscribe !== void 0 && subscribe.run) {
        this.operationsFactory.runOperations();
      }
    }

    /**
     * Retrieves the operations factory associated with the instance.
     * @returns {Object} The operations factory.
     */
  }, {
    key: "getOperationsFactory",
    value: function getOperationsFactory() {
      return this.operationsFactory;
    }

    /**
     * Sets the `json` object directly and optionally performs actions like dispatching updates, calling callbacks, or running operations.
     * @param {Object} json - The new `json` object to set.
     * @param {Object} subscribe - Options for subscribing to operations.
     * @param {boolean} dispatch - Whether to dispatch updates.
     * @param {Function} callBack - Callback to execute after setting the `json`.
     */
  }, {
    key: "setJson",
    value: function setJson(json, subscribe, dispatch, callBack) {
      this.subscribeToOperations(subscribe);
      this.json = json;
      if (dispatch) {
        this.dispatch({
          updated: this
        });
      }
      if (callBack) {
        callBack(this);
      }
      if (subscribe !== null && subscribe !== void 0 && subscribe.run) {
        this.operationsFactory.runOperations();
      }
    }

    /**
     * Retrieves the entire `json` object.
     * @returns {Object} The `json` object.
     */
  }, {
    key: "getJson",
    value: function getJson() {
      return this.json;
    }

    /**
     * Subscribes to operations in the operations factory.
     * @param {Object} subscribe - Options for subscribing, including the operation and whether to clean previous subscriptions.
     */
  }, {
    key: "subscribeToOperations",
    value: function subscribeToOperations(subscribe) {
      if (subscribe) {
        this.operationsFactory.subscribeToOperations(subscribe.operation || this.update, subscribe.clean);
      }
    }

    /**
     * Creates a copy of the `json` object, with optional modifications, for creating a new instance.
     * @param {Object} obj - Optional modifications to apply to the copied `json`.
     * @returns {Object} A new `json` object with the specified modifications.
     */
  }, {
    key: "copyJson",
    value: function copyJson(obj) {
      var newJson = _objectSpread(_objectSpread({}, this.json), {}, {
        _id: ""
      }, obj);
      return newJson;
    }

    /**
     * Copies the current instance's `json` and adds it to the component list as a new instance.
     * @param {Object} obj - Optional modifications to apply to the new instance.
     */
  }, {
    key: "copy",
    value: function copy(obj) {
      var newJson = this.copyJson(obj);
      this.componentList.addComponents(newJson);
    }

    /**
     * Updates a nested object inside the `json` by merging it with the provided object.
     * @param {string} key - The key of the nested object to update.
     * @param {Object} obj - The object containing key-value pairs to merge into the nested object.
     */
  }, {
    key: "updateObjInsideJson",
    value: function updateObjInsideJson(key, obj) {
      this.json[key] = _objectSpread(_objectSpread({}, this.json[key]), obj);
    }

    /**
     * Removes specific keys from a nested object inside the `json`.
     * @param {string} key - The key of the nested object to modify.
     * @param {Array<string>} keys - The keys to remove from the nested object.
     */
  }, {
    key: "removeObjInsideJson",
    value: function removeObjInsideJson(key, keys) {
      var ob = {};
      for (var k in this.json[key]) {
        if (!keys.includes(k)) {
          ob[k] = this.json[key][k];
        }
      }
      this.json[key] = ob;
    }

    /**
     * Generates a random five-character alphanumeric string with at least one random letter.
     * @returns {string} A random alphanumeric string.
     */
  }, {
    key: "randomFiveDigitNumber",
    value: function randomFiveDigitNumber() {
      var num = Math.floor(Math.random() * 90000) + 10000;
      num = num.toString();
      var randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
      var randomPosition = Math.floor(Math.random() * 5);
      num = num.substring(0, randomPosition) + randomLetter + num.substring(randomPosition + 1);
      var randomagain = Math.floor(Math.random() * 2);
      if (randomagain === 1) {
        var randomLetter2 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        var randomPosition2;
        do {
          randomPosition2 = Math.floor(Math.random() * 5);
        } while (randomPosition2 === randomPosition);
        num = num.substring(0, randomPosition2) + randomLetter2 + num.substring(randomPosition2 + 1);
      }
      return num;
    }

    /**
     * Creates a unique identifier (ID) based on the current date and a random number.
     * @returns {string} The generated ID.
     */
  }, {
    key: "createId",
    value: function createId() {
      var currentDate = new Date();
      var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      var day = currentDate.getDate().toString().padStart(2, '0');
      var year = currentDate.getFullYear().toString().slice(-2);
      var num = this.randomFiveDigitNumber().toString() + month + day + year;
      return num;
    }

    /**
     * Creates a unique string of the specified length using alphanumeric characters.
     * @param {number} length - The length of the string to generate.
     * @returns {string} The generated string.
     */
  }, {
    key: "createUUID",
    value: function createUUID(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
  }]);
}();