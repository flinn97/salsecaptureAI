"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interfaceSingletonFactory = exports.interfaceCreationFactory = exports.InterfaceSingletonFactory = exports.InterfaceCreationFactory = void 0;
var _baseFactory = _interopRequireDefault(require("./baseFactory"));
var _FormComponentsInterface = require("../../formTech/FormComponentsInterface");
var _mapComponentInterface = require("../../mapTech/mapComponentInterface");
var _navInterface = require("../../navTech/navInterface");
var _baseClassFactory = _interopRequireDefault(require("./baseClassFactory"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
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
 * interface for putting all created interfaces on one interface
 */
var InterfaceSingletonFactory = exports.InterfaceSingletonFactory = /*#__PURE__*/function (_BaseFactory) {
  function InterfaceSingletonFactory() {
    var _this;
    _classCallCheck(this, InterfaceSingletonFactory);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, InterfaceSingletonFactory, [].concat(args));
    _defineProperty(_this, "factory", {
      form: _FormComponentsInterface.formInterface,
      map: _mapComponentInterface.mapInterface,
      nav: _navInterface.navInterface
    });
    return _this;
  }
  _inherits(InterfaceSingletonFactory, _BaseFactory);
  return _createClass(InterfaceSingletonFactory);
}(_baseFactory["default"]);
/**
 * Interface for when you want to create new interfaces
 */
var InterfaceCreationFactory = exports.InterfaceCreationFactory = /*#__PURE__*/function (_BaseClassFactory) {
  function InterfaceCreationFactory() {
    var _this2;
    _classCallCheck(this, InterfaceCreationFactory);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this2 = _callSuper(this, InterfaceCreationFactory, [].concat(args));
    _defineProperty(_this2, "factory", {
      form: _FormComponentsInterface.FormComponentInterface,
      map: _mapComponentInterface.MapComponentInterface,
      nav: _navInterface.NavInterface
    });
    return _this2;
  }
  _inherits(InterfaceCreationFactory, _BaseClassFactory);
  return _createClass(InterfaceCreationFactory);
}(_baseClassFactory["default"]);
var interfaceSingletonFactory = exports.interfaceSingletonFactory = new InterfaceCreationFactory();
var interfaceCreationFactory = exports.interfaceCreationFactory = new InterfaceCreationFactory();