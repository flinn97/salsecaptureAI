"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _factory = _interopRequireDefault(require("./factory"));
var _operationsFactory = _interopRequireDefault(require("./operationsFactory"));
var _componentsList = _interopRequireDefault(require("./componentsList"));
var _binder = require("../serviceTech/Util/binder");
var _auth = _interopRequireDefault(require("../serviceTech/APITech/auth.service"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Import the Factory class for creating and managing components.
// Import the OperationsFactory class for handling operations logic.
// Import the ComponentList class for managing lists of components.
// Import the binder utility for binding methods to the current class context.
// Import the Auth class for managing API service authentication.
var ComponentListInterface = exports["default"] = /*#__PURE__*/function () {
  // API service instance for managing API interactions.

  /**
   * Constructor to initialize the ComponentListInterface.
   * @param {Function} dispatch - Dispatch function for state management.
   * @param {string} endpoint - API endpoint.
   * @param {Object} db - Database instance.
   * @param {Object} storage - Storage instance.
   * @param {Object} auth - Authentication instance.
   */
  function ComponentListInterface(dispatch, endpoint, db, storage, auth) {
    _classCallCheck(this, ComponentListInterface);
    _defineProperty(this, "factory", void 0);
    // Factory instance for managing components.
    _defineProperty(this, "updater", void 0);
    // Placeholder for any updater logic (not yet implemented in this class).
    _defineProperty(this, "operationsFactory", void 0);
    // OperationsFactory instance for managing operations logic.
    _defineProperty(this, "dispatch", void 0);
    // Dispatch function for handling state updates.
    _defineProperty(this, "APIService", void 0);
    _binder.binder.bind(this); // Bind all methods of this class to the current instance.
    this.dispatch = dispatch; // Assign the dispatch function.
    this.getFactory(); // Initialize the factory instance.
    this.getAPIService(endpoint, db, storage, auth, dispatch); // Initialize the API service.
  }

  /**
   * Gets or creates a Factory instance for managing components.
   * @returns {Factory} The Factory instance.
   */
  return _createClass(ComponentListInterface, [{
    key: "getFactory",
    value: function getFactory() {
      if (this.factory === undefined) {
        this.factory = new _factory["default"](this); // Create a new Factory instance if not already initialized.
      }
      return this.factory;
    }

    /**
     * Gets or creates an API service instance for managing API interactions.
     * @param {string} endpoint - API endpoint.
     * @param {Object} db - Database instance.
     * @param {Object} storage - Storage instance.
     * @param {Object} auth - Authentication instance.
     * @param {Function} dispatch - Dispatch function for state management.
     * @returns {Auth} The API service instance.
     */
  }, {
    key: "getAPIService",
    value: function getAPIService(endpoint, db, storage, auth, dispatch) {
      if (this.APIService === undefined) {
        this.APIService = new _auth["default"](endpoint, db, storage, auth, dispatch); // Create a new Auth instance if not already initialized.
      }
      return this.APIService;
    }

    /**
     * Creates a new ComponentList instance.
     * @returns {ComponentList} A new ComponentList instance.
     */
  }, {
    key: "createComponentList",
    value: function createComponentList() {
      return new _componentsList["default"](this); // Create and return a new ComponentList instance.
    }

    /**
     * Gets or creates an OperationsFactory instance for managing operations logic.
     * @returns {OperationsFactory} The OperationsFactory instance.
     */
  }, {
    key: "getOperationsFactory",
    value: function getOperationsFactory() {
      if (this.operationsFactory === undefined) {
        this.operationsFactory = new _operationsFactory["default"](this); // Create a new OperationsFactory instance if not already initialized.
        this.factory.setOperationsFactory(this.operationsFactory); // Link the OperationsFactory to the Factory instance.
      }
      return this.operationsFactory;
    }

    /**
     * Creates and returns a new OperationsFactory instance.
     * @returns {OperationsFactory} A new OperationsFactory instance.
     */
  }, {
    key: "getNewOperationsFactory",
    value: function getNewOperationsFactory() {
      var opps = new _operationsFactory["default"](this); // Create a new OperationsFactory instance.
      return opps;
    }
  }]);
}();