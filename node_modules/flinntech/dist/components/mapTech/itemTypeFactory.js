"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _textItem = _interopRequireDefault(require("./textItem"));
var _attributeItem = _interopRequireDefault(require("./attributeItem"));
var _customComponentItem = _interopRequireDefault(require("./customComponentItem"));
var _imgItem = _interopRequireDefault(require("./imgItem"));
var _formItem = _interopRequireDefault(require("./formItem"));
var _deleteItem = _interopRequireDefault(require("./del/deleteItem"));
var _editItem = _interopRequireDefault(require("./edit/editItem"));
var _mapComponent = _interopRequireDefault(require("./mapComponent"));
var _react = _interopRequireDefault(require("react"));
var _delCustomItem = _interopRequireDefault(require("./del/delCustomItem"));
var _delTextItem = _interopRequireDefault(require("./del/delTextItem"));
var _editIconItem = _interopRequireDefault(require("./edit/editIconItem"));
var _editCustomItem = _interopRequireDefault(require("./edit/editCustomItem"));
var _interactiveMapComponent = _interopRequireDefault(require("./interactiveMap/interactiveMapComponent"));
var _addButtonComponent = _interopRequireDefault(require("./interactiveMap/addButtonComponent"));
var _plainDisplay = _interopRequireDefault(require("./plainDisplay"));
var _selectorAttributeItem = _interopRequireDefault(require("./selectorAttributeItem"));
var _logoItem = _interopRequireDefault(require("./navMap/logoItem"));
var _linksContainer = _interopRequireDefault(require("./navMap/linksContainer"));
var _linkItem = _interopRequireDefault(require("./navMap/linkItem"));
var _logout = _interopRequireDefault(require("./navMap/logout"));
var _mapComponentInterface = require("./mapComponentInterface");
var _baseReactFactory = _interopRequireDefault(require("../templateTech/factories/baseReactFactory"));
var _arrows = _interopRequireDefault(require("./orderedListComponets/arrows"));
var _innerMap = _interopRequireDefault(require("./fileHierarchyMap/innerMap"));
var _avaBackgroundImage = _interopRequireDefault(require("./coolComponents/avaBackgroundImage"));
var _customBuiltItem = _interopRequireDefault(require("./customBuiltItem"));
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
 * factory for getting different items for the map component
 */
var MapFactory = exports["default"] = /*#__PURE__*/function (_BaseReactFactory) {
  function MapFactory() {
    var _this;
    _classCallCheck(this, MapFactory);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, MapFactory, [].concat(args));
    _defineProperty(_this, "factory", {
      text: _textItem["default"],
      attribute: _attributeItem["default"],
      custom: _customComponentItem["default"],
      customBuilt: _customBuiltItem["default"],
      img: _imgItem["default"],
      form: _formItem["default"],
      del: _deleteItem["default"],
      delIcon: _delCustomItem["default"],
      delCustom: _delCustomItem["default"],
      delText: _delTextItem["default"],
      edit: _editItem["default"],
      editIcon: _editIconItem["default"],
      editCustom: _editCustomItem["default"],
      interactiveMap: _interactiveMapComponent["default"],
      addComponentButton: _addButtonComponent["default"],
      plain: _plainDisplay["default"],
      select: _selectorAttributeItem["default"],
      logo: _logoItem["default"],
      links: _linksContainer["default"],
      linkItem: _linkItem["default"],
      logout: _logout["default"],
      "default": _mapComponentInterface.MapComponent,
      map: _mapComponent["default"],
      order: _arrows["default"],
      innerMap: _innerMap["default"],
      backgroundImage: _avaBackgroundImage["default"]
    });
    return _this;
  }
  _inherits(MapFactory, _BaseReactFactory);
  return _createClass(MapFactory);
}(_baseReactFactory["default"]);