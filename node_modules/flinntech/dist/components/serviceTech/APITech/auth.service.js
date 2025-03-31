"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _storage = require("firebase/storage");
var _firestore = require("firebase/firestore");
var _auth = require("firebase/auth");
var _queryGenerator = require("./queryGenerator.js");
var _binder = require("../Util/binder.js");
var _baseObserver = _interopRequireDefault(require("../../templateTech/observers/baseObserver.jsx"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Importing Firebase modules for storage and authentication
// Custom query generator utility
// Utility for binding 'this' context
// Base class for observer pattern
/**
 * Auth class handles user authentication, Firestore database interactions, 
 * Firebase storage operations, and observer subscriptions.
 */
var Auth = /*#__PURE__*/function () {
  // Observer for read operations

  /**
   * Constructor initializes the Auth class with necessary services.
   * @param {string} endpoint - API endpoint base URL.
   * @param {object} db - Firestore database instance.
   * @param {object} storage - Firebase storage instance.
   * @param {object} auth - Firebase authentication instance.
   * @param {function} dispatch - State dispatch function.
   */
  function Auth(endpoint, db, storage, auth, dispatch) {
    _classCallCheck(this, Auth);
    // Class variables
    _defineProperty(this, "urlEndpoint", "");
    // Base URL for API endpoints
    _defineProperty(this, "dispatch", void 0);
    // Dispatch function for state management
    _defineProperty(this, "componentList", void 0);
    // List of components related to the app
    _defineProperty(this, "userStr", "flinnappsUser");
    // Key for storing user info in localStorage
    _defineProperty(this, "QuearyGenerator", void 0);
    // Instance of the QueryGenerator class
    _defineProperty(this, "DB", void 0);
    // Firestore database instance
    _defineProperty(this, "storage", void 0);
    // Firebase storage instance
    _defineProperty(this, "auth", void 0);
    // Firebase auth instance
    _defineProperty(this, "userEmail", void 0);
    // Logged-in user's email
    _defineProperty(this, "path", []);
    // Default path for database operations
    _defineProperty(this, "postObserver", new _baseObserver["default"]());
    // Observer for post operations
    _defineProperty(this, "dispatchObserver", new _baseObserver["default"]());
    // Observer for dispatch events
    _defineProperty(this, "readObserver", new _baseObserver["default"]());
    _binder.binder.bind(this); // Binds methods to the current class instance
    this.urlEndpoint = endpoint;
    this.DB = db;
    this.storage = storage;
    this.auth = auth;
    this.dispatch = dispatch;
    // Default path for database operations
    this.path = [this.DB, "".concat(this.urlEndpoint, "users"), "".concat(this.urlEndpoint, "APP"), "components"];
    // Initializing the QueryGenerator with the database and URL endpoint
    this.QuearyGenerator = new _queryGenerator.QuearyGenerator(this.DB, this.urlEndpoint);
  }

  // --- Setters for various services and configurations ---
  return _createClass(Auth, [{
    key: "setAuth",
    value: function setAuth(a) {
      this.auth = a;
    }

    /**
     * set the storage for uploading pictures
     * @param {*} s 
     */
  }, {
    key: "setStorage",
    value: function setStorage(s) {
      this.storage = s;
    }

    /**
     * set the path for which the query uses to grab the data
     * @param {*} p 
     */
  }, {
    key: "setPath",
    value: function setPath(p) {
      this.path = p;
    }

    /**
     * set the database and let the query generator know about it.
     * Mostly firebase but can be other db
     * @param {*} db 
     */
  }, {
    key: "setDB",
    value: function setDB(db) {
      this.DB = db;
      this.QuearyGenerator.setDB(db); // Update the QueryGenerator with the new DB
    }

    /**
     * allow auth to send ui callbacks
     * @param {*} d 
     */
  }, {
    key: "setDispatch",
    value: function setDispatch(d) {
      this.dispatch = d;
    }

    /**
     * Allow auth to make changes to front end model
     * @param {*} l 
     */
  }, {
    key: "setComponentList",
    value: function setComponentList(l) {
      this.componentList = l;
    }

    /**
     * set up the user
     * @param {} s 
     */
  }, {
    key: "setUserStr",
    value: function setUserStr(s) {
      this.userStr = s;
      this.QuearyGenerator.setUrl(s); // Update the QueryGenerator with the new URL
    }

    // --- Observer methods for managing subscriptions ---
    /**
     * 
     * @returns the observer to make observations on post req
     */
  }, {
    key: "getPostObserver",
    value: function getPostObserver() {
      return this.postObserver;
    }

    /**
     * set the observer to be able to subscribe to posts
     * @param {*} o 
     */
  }, {
    key: "setPostObserver",
    value: function setPostObserver(o) {
      this.postObserver = o;
    }

    /**
     * Subscribe to the post res
     * @param {*} f 
     */
  }, {
    key: "subscribeToPostObserver",
    value: function subscribeToPostObserver(f) {
      this.postObserver.subscribe(f); // Subscribe to post observer
    }

    /**
     * 
     * @returns observer for all get
     */
  }, {
    key: "getReadObserver",
    value: function getReadObserver() {
      return this.readObserver;
    }

    /**
     * set an observer for observations on getting data
     * @param {*} o 
     */
  }, {
    key: "setReadObserver",
    value: function setReadObserver(o) {
      this.readObserver = o;
    }

    /**
     * Subscribe to updates on getting data
     * @param {} f 
     */
  }, {
    key: "subscribeToReadObserver",
    value: function subscribeToReadObserver(f) {
      this.readObserver.subscribe(f); // Subscribe to read observer
    }
    /**
     * 
     * @returns the path the a given database 
     */
  }, {
    key: "getPath",
    value: function getPath() {
      return this.path;
    }

    /**
     * 
     * @returns observer for observations on backend -> ui changes
     */
  }, {
    key: "getDispatchObserver",
    value: function getDispatchObserver() {
      return this.dispatchObserver;
    }

    /**
     * Create the observer for observations on backend ui
     * @param { } o 
     */
  }, {
    key: "setDispatchObserver",
    value: function setDispatchObserver(o) {
      this.dispatchObserver = o;
    }

    /**
     * subscribe to ui changes from the backend
     * @param {*} f 
     */
  }, {
    key: "subscribeToDispatchObserver",
    value: function subscribeToDispatchObserver(f) {
      this.dispatchObserver.subscribe(f); // Subscribe to dispatch observer
    }

    // --- Getter for the QueryGenerator ---
  }, {
    key: "getQueryGenerator",
    value: function getQueryGenerator() {
      return this.QuearyGenerator;
    }

    /**
     * Seet the query generator to generate queries
     * @param {*} qg 
     */
  }, {
    key: "setQueryGenerator",
    value: function setQueryGenerator(qg) {
      this.QuearyGenerator = qg;
    }

    // --- Authentication Methods ---
    /**
     * Login method authenticates a user with email and password.
     * @param {string} email - User's email.
     * @param {string} password - User's password.
     * @returns {object} - Authenticated user object or error object.
     */
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(email, password) {
        var user, e, saveUser;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _auth.signInWithEmailAndPassword)(this.auth, email, password).then(function (userCredential) {
                user = userCredential.user; // User successfully signed in
              })["catch"](function (error) {
                // Handle login errors
                var errorMessage = error.message;
                var newString = errorMessage.slice(9, errorMessage.length - 1); // Strip extraneous text
                e = {
                  error: newString
                };
                console.log(e);
              });
            case 2:
              if (!user) {
                _context.next = 13;
                break;
              }
              saveUser = user;
              this.dispatch({
                login: true
              }); // Dispatch login event
              _context.next = 7;
              return localStorage.setItem(this.userStr, JSON.stringify(saveUser));
            case 7:
              if (!(this.componentList !== undefined && this.dispatch !== undefined)) {
                _context.next = 11;
                break;
              }
              _context.next = 10;
              return this.getuser(email);
            case 10:
              user = _context.sent;
            case 11:
              _context.next = 14;
              break;
            case 13:
              user = e; // Return error if login failed
            case 14:
              return _context.abrupt("return", user);
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
    /**
    * Registers a new user with email and password and optionally caches user data.
    * @param {string} email - User's email address.
    * @param {string} password - User's password.
    * @param {boolean} addToCache - Whether to add the user data to cache.
    * @returns {object} - The created user object or an error object.
    */
  }, {
    key: "register",
    value: (function () {
      var _register = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(email, password, addToCache) {
        var user;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _auth.createUserWithEmailAndPassword)(this.auth, email, password).then(function (userCredential) {
                user = userCredential.user;
              })["catch"](function (error) {
                // Extracts and formats the error message
                var errorCode = error.code;
                var errorMessage = error.message;
                var eL = errorMessage.length - 1;
                var newString = errorMessage.slice(9, eL);
                user = {
                  error: newString
                };
              });
            case 2:
              if (!user.error) {
                this.userEmail = user.email; // Store user email in the instance
                localStorage.setItem(this.userStr, JSON.stringify(user)); // Cache user data
              }
              return _context2.abrupt("return", user);
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function register(_x3, _x4, _x5) {
        return _register.apply(this, arguments);
      }
      return register;
    }()
    /**
     * Logs out the current user and clears all local storage data.
     */
    )
  }, {
    key: "logout",
    value: (function () {
      var _logout = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var logouser;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return localStorage.clear();
            case 2:
              // Clear all local storage
              localStorage.setItem(this.userStr, undefined); // Set user key to undefined
              _context3.next = 5;
              return (0, _auth.onAuthStateChanged)(this.auth, function (user) {
                if (user) {
                  logouser = user.uid; // Capture user ID if still signed in
                }
              });
            case 5:
              if (!logouser) {
                _context3.next = 8;
                break;
              }
              _context3.next = 8;
              return (0, _auth.signOut)(this.auth);
            case 8:
              _context3.next = 10;
              return localStorage.setItem(this.userStr, null);
            case 10:
              // Ensure user key is null
              window.location.href = "/"; // Redirect to homepage
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function logout() {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
    /**
     * Sends a password reset email to the provided email address.
     * @param {string} email - User's email address.
     */
    )
  }, {
    key: "sendForgotPasswordChange",
    value: function sendForgotPasswordChange(email) {
      var auth = (0, _auth.getAuth)();
      (0, _auth.sendPasswordResetEmail)(auth, email).then(function () {
        // Password reset email sent
      })["catch"](function (error) {
        // Log any errors that occur during the process
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    }

    /**
     * Checks if a user is logged in and clears data if not.
     * @returns {Promise<object>} - A promise resolving to the logged-in user or rejecting if not.
     */
  }, {
    key: "checkIfLoggedIn",
    value: (function () {
      var _checkIfLoggedIn = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", new Promise(function (resolve, reject) {
                (0, _auth.onAuthStateChanged)(_this.auth, /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(user) {
                    var logotUser;
                    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                      while (1) switch (_context4.prev = _context4.next) {
                        case 0:
                          if (!user) {
                            _context4.next = 4;
                            break;
                          }
                          resolve(user); // Resolve with the logged-in user
                          _context4.next = 16;
                          break;
                        case 4:
                          _context4.next = 6;
                          return localStorage.setItem(_this.userStr, null);
                        case 6:
                          _context4.next = 8;
                          return localStorage.clear();
                        case 8:
                          localStorage.setItem(_this.userStr, undefined);
                          _context4.next = 11;
                          return (0, _auth.onAuthStateChanged)(_this.auth, function (user) {
                            if (user) {
                              logotUser = user.uid;
                            }
                          });
                        case 11:
                          if (!logotUser) {
                            _context4.next = 14;
                            break;
                          }
                          _context4.next = 14;
                          return (0, _auth.signOut)(_this.auth);
                        case 14:
                          _context4.next = 16;
                          return window.location.reload();
                        case 16:
                        case "end":
                          return _context4.stop();
                      }
                    }, _callee4);
                  }));
                  return function (_x6) {
                    return _ref.apply(this, arguments);
                  };
                }());
              }));
            case 1:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function checkIfLoggedIn() {
        return _checkIfLoggedIn.apply(this, arguments);
      }
      return checkIfLoggedIn;
    }()
    /**
     * Retrieves the current user from local storage.
     * @returns {object} - The current user object from local storage.
     */
    )
  }, {
    key: "getCurrentUser",
    value: (function () {
      var _getCurrentUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var item;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return localStorage.getItem(this.userStr);
            case 2:
              item = _context6.sent;
              _context6.next = 5;
              return JSON.parse(item);
            case 5:
              item = _context6.sent;
              return _context6.abrupt("return", item);
            case 7:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function getCurrentUser() {
        return _getCurrentUser.apply(this, arguments);
      }
      return getCurrentUser;
    }()
    /**
     * Sets the current user in local storage.
     * @param {object} student - The user object to store.
     */
    )
  }, {
    key: "setCurrentUser",
    value: (function () {
      var _setCurrentUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(student) {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return localStorage.setItem(this.userStr, JSON.stringify(student));
            case 2:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function setCurrentUser(_x7) {
        return _setCurrentUser.apply(this, arguments);
      }
      return setCurrentUser;
    }()
    /**
     * Logs in a user using their email and password.
     * @param {string} email - User's email address.
     * @param {string} password - User's password.
     */
    )
  }, {
    key: "loginToDel",
    value: (function () {
      var _loginToDel = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(email, password) {
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return (0, _auth.signInWithEmailAndPassword)(this.auth, email, password).then(function (userCredential) {
                // Successfully signed in
              })["catch"](function (error) {
                // Handle any errors during login
                var errorCode = error.code;
                var errorMessage = error.message;
              });
            case 2:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function loginToDel(_x8, _x9) {
        return _loginToDel.apply(this, arguments);
      }
      return loginToDel;
    }()
    /**
     * Deletes the currently authenticated user account.
     */
    )
  }, {
    key: "delAccount",
    value: (function () {
      var _delAccount = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var auth, user;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              auth = (0, _auth.getAuth)();
              user = auth.currentUser;
              _context9.next = 4;
              return (0, _auth.deleteUser)(user).then(function () {
                // User deleted successfully
              })["catch"](function (error) {
                // Handle errors during deletion
              });
            case 4:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }));
      function delAccount() {
        return _delAccount.apply(this, arguments);
      }
      return delAccount;
    }()
    /**
     * Sends a notification using the given body and URL.
     * @param {object} body - The notification payload.
     * @param {string} url - The API endpoint to send the notification to.
     */
    )
  }, {
    key: "notify",
    value: (function () {
      var _notify = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(body, url) {
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(body),
                headers: {
                  'Conent-Type': 'application/json' // Note: Typo in 'Content-Type'
                }
              });
            case 1:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }));
      function notify(_x10, _x11) {
        return _notify.apply(this, arguments);
      }
      return notify;
    }()
    /**
     * Updates the password of the currently authenticated user.
     * @param {string} password - The new password to set.
     * @returns {boolean} - Returns true on successful update.
     */
    )
  }, {
    key: "changePassword",
    value: (function () {
      var _changePassword = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(password) {
        var auth, user, newPassword;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              auth = (0, _auth.getAuth)();
              user = auth.currentUser;
              newPassword = password;
              _context11.next = 5;
              return (0, _auth.updatePassword)(user, newPassword).then(function () {
                // Password updated successfully
              })["catch"](function (error) {
                // Handle errors during password update
              });
            case 5:
              return _context11.abrupt("return", true);
            case 6:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      function changePassword(_x12) {
        return _changePassword.apply(this, arguments);
      }
      return changePassword;
    }()
    /**
     * Fetches a snapshot of data from Firebase Firestore.
     * @param {object} queryJson - The query parameters.
     * @param {string} path - The Firestore path.
     * @param {boolean} owner - Whether to include owner filtering.
     * @returns {array} - The raw data from the query snapshot.
     */
    )
  }, {
    key: "firebaseGetterSnapshot",
    value: (function () {
      var _firebaseGetterSnapshot = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(queryJson, path, owner) {
        var _this2 = this;
        var components, rawData, comps1;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              owner = owner === true ? this.userEmail : undefined;
              _context13.next = 3;
              return this.QuearyGenerator.generateQueary(queryJson, path, owner);
            case 3:
              components = _context13.sent;
              rawData = [];
              _context13.next = 7;
              return (0, _firestore.onSnapshot)(components, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(querySnapshot) {
                  return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                    while (1) switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.next = 2;
                        return _this2.getRawData(querySnapshot);
                      case 2:
                        rawData = _context12.sent;
                      case 3:
                      case "end":
                        return _context12.stop();
                    }
                  }, _callee12);
                }));
                return function (_x16) {
                  return _ref2.apply(this, arguments);
                };
              }());
            case 7:
              comps1 = _context13.sent;
              return _context13.abrupt("return", rawData);
            case 9:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function firebaseGetterSnapshot(_x13, _x14, _x15) {
        return _firebaseGetterSnapshot.apply(this, arguments);
      }
      return firebaseGetterSnapshot;
    }() //Value = value pair (key value) example: string such as "1231454891"
    //ComponentList = adding to the componentList
    //Attribute = attribute pair always a string "campaignID" or "_id"
    //Type = OPTIONAL this RETURNS the getList, string "monster",
    )
  }, {
    key: "firebaseGetter",
    value: function () {
      var _firebaseGetter = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(queryJson, path, owner) {
        var components, comps;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              owner = owner === true ? this.userEmail : undefined;
              _context14.next = 3;
              return this.QuearyGenerator.generateQueary(queryJson, path, owner);
            case 3:
              components = _context14.sent;
              _context14.next = 6;
              return (0, _firestore.getDocs)(components);
            case 6:
              comps = _context14.sent;
              _context14.next = 9;
              return this.getRawData(comps);
            case 9:
              return _context14.abrupt("return", _context14.sent);
            case 10:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function firebaseGetter(_x17, _x18, _x19) {
        return _firebaseGetter.apply(this, arguments);
      }
      return firebaseGetter;
    }()
    /**
    * Processes raw data from a snapshot, adds components, and triggers observers.
    * @param {object} dataSnapShot - Firestore data snapshot.
    * @returns {array} - Array of processed components.
    */
  }, {
    key: "getRawData",
    value: (function () {
      var _getRawData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(dataSnapShot) {
        var rawData1, key, data, componentsAdded;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              rawData1 = [];
              for (key in dataSnapShot.docs) {
                // Extracts data from each document in the snapshot
                data = dataSnapShot.docs[key].data();
                rawData1.push(data);
              }
              // Adds components to the component list
              _context15.next = 4;
              return this.componentList.addComponents(rawData1, true);
            case 4:
              componentsAdded = _context15.sent;
              if (!this.dispatch) {
                _context15.next = 8;
                break;
              }
              _context15.next = 8;
              return this.dispatch({
                snapShot: {
                  dataRetrieved: componentsAdded
                }
              });
            case 8:
              // Runs read observer on the added components
              this.readObserver.run(componentsAdded);
              return _context15.abrupt("return", componentsAdded);
            case 10:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function getRawData(_x20) {
        return _getRawData.apply(this, arguments);
      }
      return getRawData;
    }()
    /**
     * Retrieves a count of documents from a Firestore query.
     * @param {object} queryJson - Query parameters.
     * @param {string} path - Firestore path.
     * @param {boolean} owner - Whether to include owner filtering.
     * @returns {number} - The count of documents.
     */
    )
  }, {
    key: "getCount",
    value: (function () {
      var _getCount = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(queryJson, path, owner) {
        var countQuery, count;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              owner = owner === true ? this.userEmail : undefined;
              _context16.next = 3;
              return this.QuearyGenerator.generateQueary(queryJson, path, owner);
            case 3:
              countQuery = _context16.sent;
              _context16.next = 6;
              return (0, _firestore.getCountFromServer)(countQuery);
            case 6:
              count = _context16.sent;
              return _context16.abrupt("return", count.data().count);
            case 8:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function getCount(_x21, _x22, _x23) {
        return _getCount.apply(this, arguments);
      }
      return getCount;
    }()
    /**
     * Retrieves user data by email and sets it in the state.
     * @param {string} email - User's email address.
     * @returns {object} - The user object.
     */
    )
  }, {
    key: "getuser",
    value: (function () {
      var _getuser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(email) {
        var user;
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              this.userEmail = email; // Sets the user email
              _context17.next = 3;
              return this.componentList.getComponentFromBackend({
                type: "user",
                ids: email
              });
            case 3:
              user = _context17.sent;
              if (user) {
                // Dispatches the current user state
                this.dispatch({
                  currentUser: user,
                  email: email,
                  gotUser: true
                });
              }
              return _context17.abrupt("return", user);
            case 6:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this);
      }));
      function getuser(_x24) {
        return _getuser.apply(this, arguments);
      }
      return getuser;
    }()
    /**
     * Retrieves all data based on a query and path.
     * @param {object} queryJson - Query parameters.
     * @param {string} path - Firestore path (default to "users").
     */
    )
  }, {
    key: "GetAllData",
    value: (function () {
      var _GetAllData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(queryJson, path) {
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              path = path || [this.db, this.urlEndpoint + "users"];
              this.firebaseGetter(queryJson, path);
            case 2:
            case "end":
              return _context18.stop();
          }
        }, _callee18, this);
      }));
      function GetAllData(_x25, _x26) {
        return _GetAllData.apply(this, arguments);
      }
      return GetAllData;
    }()
    /**
     * Uploads a file to Firebase Storage.
     * @param {File} file - File object to upload.
     * @param {string} name - File name in storage.
     */
    )
  }, {
    key: "uploadPics",
    value: (function () {
      var _uploadPics = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(file, name) {
        var storageRef;
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              storageRef = (0, _storage.ref)(this.storage, name);
              _context19.next = 3;
              return (0, _storage.uploadBytes)(storageRef, file).then(function (snapshot) {
                console.log('Uploaded a file!');
              });
            case 3:
            case "end":
              return _context19.stop();
          }
        }, _callee19, this);
      }));
      function uploadPics(_x27, _x28) {
        return _uploadPics.apply(this, arguments);
      }
      return uploadPics;
    }()
    /**
     * Downloads a file from Firebase Storage and returns its URL.
     * @param {string} newName - File name in storage.
     * @returns {string} - Download URL of the file.
     */
    )
  }, {
    key: "downloadPics",
    value: (function () {
      var _downloadPics = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(newName) {
        var src;
        return _regeneratorRuntime().wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return (0, _storage.getDownloadURL)((0, _storage.ref)(this.storage, newName)).then(function (url) {
                src = url; // Sets the file URL
              });
            case 2:
              return _context20.abrupt("return", src);
            case 3:
            case "end":
              return _context20.stop();
          }
        }, _callee20, this);
      }));
      function downloadPics(_x29) {
        return _downloadPics.apply(this, arguments);
      }
      return downloadPics;
    }()
    /**
     * Deletes a file from Firebase Storage.
     * @param {string} newName - File name in storage.
     */
    )
  }, {
    key: "deletePics",
    value: function deletePics(newName) {
      var delRef = (0, _storage.ref)(this.storage, newName); // Creates a reference to the file
      (0, _storage.deleteObject)(delRef).then(function () {
        // File deleted successfully
      })["catch"](function (error) {
        // Logs any errors that occur during deletion
      });
    }

    /**
     * Prepares an array of objects for operations by converting them to JSON.
     * @param {array|object} arr - Array or single object to prepare.
     * @returns {array} - Prepared array of JSON objects.
     */
  }, {
    key: "prep",
    value: function prep(arr) {
      arr = Array.isArray(arr) ? arr : [arr]; // Ensures input is an array
      arr = arr.map(function (obj) {
        var json = obj;
        if (obj.getJson) {
          json = obj.getJson(); // Converts object to JSON
        }
        return json;
      });
      // Filters out undefined objects
      arr = arr.filter(function (obj) {
        return obj !== undefined;
      });
      return arr;
    }

    /**
     * Adds an array of components to Firestore and updates state.
     * @param {array} arr - Array of components to add.
     * @param {string} path - Firestore path.
     * @param {string} dispatchKey - Key for dispatch action.
     * @param {string} timeKey - Key for timestamp.
     * @returns {array} - Array of added components.
     */
  }, {
    key: "add",
    value: (function () {
      var _add = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(arr, path, dispatchKey, timeKey) {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee21$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return arr.map(function (obj) {
                if (obj.getJson().owner === "" || obj.getJson().owner === undefined) {
                  obj.setCompState({
                    owner: _this3.userEmail
                  }); // Sets owner if not defined
                }
                return obj;
              });
            case 2:
              arr = _context21.sent;
              _context21.next = 5;
              return this.operate(arr, _firestore.setDoc, path, dispatchKey || "added", timeKey || "date");
            case 5:
              return _context21.abrupt("return", _context21.sent);
            case 6:
            case "end":
              return _context21.stop();
          }
        }, _callee21, this);
      }));
      function add(_x30, _x31, _x32, _x33) {
        return _add.apply(this, arguments);
      }
      return add;
    }()
    /**
     * Updates an array of components in Firestore.
     * @param {array} arr - Array of components to update.
     * @param {string} path - Firestore path.
     * @param {string} timeKey - Key for timestamp.
     * @param {string} dispatchKey - Key for dispatch action.
     * @returns {array} - Array of updated components.
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(arr, path, timeKey, dispatchKey) {
        return _regeneratorRuntime().wrap(function _callee22$(_context22) {
          while (1) switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return this.operate(arr, _firestore.updateDoc, path, dispatchKey || "updated", timeKey || "lastUpdated");
            case 2:
              return _context22.abrupt("return", _context22.sent);
            case 3:
            case "end":
              return _context22.stop();
          }
        }, _callee22, this);
      }));
      function update(_x34, _x35, _x36, _x37) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Deletes an array of components from Firestore.
     * @param {array} arr - Array of components to delete.
     * @param {string} path - Firestore path.
     * @param {string} dispatchKey - Key for dispatch action.
     * @returns {array} - Array of deleted components.
     */
    )
  }, {
    key: "del",
    value: (function () {
      var _del = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(arr, path, dispatchKey) {
        return _regeneratorRuntime().wrap(function _callee23$(_context23) {
          while (1) switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return this.operate(arr, _firestore.deleteDoc, path, dispatchKey || "deleted");
            case 2:
              return _context23.abrupt("return", _context23.sent);
            case 3:
            case "end":
              return _context23.stop();
          }
        }, _callee23, this);
      }));
      function del(_x38, _x39, _x40) {
        return _del.apply(this, arguments);
      }
      return del;
    }()
    /**
     * Executes Firestore operations (add, update, delete) on an array of components.
     * @param {array} arr - Array of components to operate on.
     * @param {function} operation - Firestore operation (setDoc, updateDoc, deleteDoc).
     * @param {string} path - Firestore path.
     * @param {string} dispatchKey - Key for dispatch action.
     * @param {string} timeKey - Key for timestamp.
     * @returns {array} - Array of components after operation.
     */
    )
  }, {
    key: "operate",
    value: (function () {
      var _operate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24(arr, operation, path, dispatchKey, timeKey) {
        var _iterator, _step, component, params;
        return _regeneratorRuntime().wrap(function _callee24$(_context24) {
          while (1) switch (_context24.prev = _context24.next) {
            case 0:
              _context24.prev = 0;
              _context24.next = 3;
              return this.prep(arr);
            case 3:
              arr = _context24.sent;
              // Prepares the components
              path = path || this.path; // Sets default path if not provided
              _iterator = _createForOfIteratorHelper(arr);
              _context24.prev = 6;
              _iterator.s();
            case 8:
              if ((_step = _iterator.n()).done) {
                _context24.next = 22;
                break;
              }
              component = _step.value;
              if (!timeKey) {
                _context24.next = 14;
                break;
              }
              _context24.next = 13;
              return (0, _firestore.serverTimestamp)();
            case 13:
              component[timeKey] = _context24.sent;
            case 14:
              _context24.next = 16;
              return this.postObserver.run([component]);
            case 16:
              // Runs post-operation observer
              params = [_firestore.doc.apply(void 0, _toConsumableArray(path).concat([component._id]))];
              if (operation !== _firestore.deleteDoc) {
                params.push(component); // Includes component data if not deleting
              }
              _context24.next = 20;
              return operation.apply(void 0, params);
            case 20:
              _context24.next = 8;
              break;
            case 22:
              _context24.next = 27;
              break;
            case 24:
              _context24.prev = 24;
              _context24.t0 = _context24["catch"](6);
              _iterator.e(_context24.t0);
            case 27:
              _context24.prev = 27;
              _iterator.f();
              return _context24.finish(27);
            case 30:
              if (this.dispatch) {
                this.dispatch(_defineProperty(_defineProperty({}, dispatchKey, arr), "dispatchComplete", true)); // Dispatches action
              }
              this.dispatchObserver.run([_defineProperty({}, dispatchKey, arr)]); // Runs dispatch observer
              return _context24.abrupt("return", arr);
            case 35:
              _context24.prev = 35;
              _context24.t1 = _context24["catch"](0);
              console.log(_context24.t1); // Logs error
              console.error(arr, "something went wrong with this operation");
            case 39:
            case "end":
              return _context24.stop();
          }
        }, _callee24, this, [[0, 35], [6, 24, 27, 30]]);
      }));
      function operate(_x41, _x42, _x43, _x44, _x45) {
        return _operate.apply(this, arguments);
      }
      return operate;
    }())
  }]);
}();
var _default = exports["default"] = Auth;
/**
 * TODO: setup login and reg with google
 */