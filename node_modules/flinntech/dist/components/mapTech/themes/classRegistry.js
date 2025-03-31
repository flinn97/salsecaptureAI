"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopBar = exports.SideBar = exports.Links = exports.InteractiveMap = exports.DefaultWrapRow = exports.DefaultRow = exports.DefaultRegistry = exports.DefaultColumn = void 0;
require("./css/default.scss");
require("./css/defaultColumn.scss");
require("./css/defaultRow.scss");
require("./css/defaultRowWrap.scss");
require("./css/interactiveMapTheme.scss");
require("./css/sideBar.scss");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Several different types and themes so provide a base class
 */
var DefaultRegistry = exports.DefaultRegistry = /*#__PURE__*/_createClass(function DefaultRegistry() {
  _classCallCheck(this, DefaultRegistry);
  _defineProperty(this, "MCMapContainer", "Map-Container");
  _defineProperty(this, "MCMapSection", "Map-Section");
  _defineProperty(this, "MCLink", "Map-Link");
  _defineProperty(this, "MCCell", "Map-Cell");
  _defineProperty(this, "MCCustomDelItem", "Map-Custom-Del-Item");
  _defineProperty(this, "MCDelItem", "Map-Del-Item");
  _defineProperty(this, "MCDelImgItem", "Map-Del-imgItem");
  _defineProperty(this, "MCCustomEditItem", "Map-Custom-Edit-Item");
  _defineProperty(this, "MCEditImgItem", "Map-Edit-imgItem");
  _defineProperty(this, "MCEditItem", "Map-Edit-Item");
  _defineProperty(this, "MCAttributeItem", "Map-Attribute-Item");
  _defineProperty(this, "MCImgItem", "Map-imgItem");
  _defineProperty(this, "MCTextItem", "Map-Text-Item");
  _defineProperty(this, "MCActiveItem", "Map-Active-Item");
  _defineProperty(this, "MCCustom", "");
  _defineProperty(this, "MCBackgroundItem", "background-item");
  _defineProperty(this, "MCCellBackground", "cell-background");
  _defineProperty(this, "MCBackgroundLink", "cell-background");
  _defineProperty(this, "MCLogoItem", "navLogo");
});
/**
 * column ui for maps
 */
var DefaultColumn = exports.DefaultColumn = /*#__PURE__*/function (_DefaultRegistry2) {
  function DefaultColumn() {
    var _this;
    _classCallCheck(this, DefaultColumn);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, DefaultColumn, [].concat(args));
    _defineProperty(_this, "MCSectionHover", "DC-Map-Section:hover");
    _defineProperty(_this, "MCCustomDelItem", "DC-Custom-Del-Item");
    _defineProperty(_this, "MCDelItem", "DC-Del-Item");
    _defineProperty(_this, "MCDelImgItem", "DC-Del-imgItem");
    _defineProperty(_this, "MCCustomEditItem", "Map-Custom-Edit-Item");
    _defineProperty(_this, "MCEditImgItem", "DC-Edit-imgItem");
    _defineProperty(_this, "MCEditItem", "DC-Edit-Item");
    return _this;
  }
  _inherits(DefaultColumn, _DefaultRegistry2);
  return _createClass(DefaultColumn);
}(DefaultRegistry);
/**
 * row ui for maps
 */
var DefaultRow = exports.DefaultRow = /*#__PURE__*/function (_DefaultColumn2) {
  function DefaultRow() {
    var _this2;
    _classCallCheck(this, DefaultRow);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this2 = _callSuper(this, DefaultRow, [].concat(args));
    _defineProperty(_this2, "MCMapContainer", "DR-Map-Container");
    _defineProperty(_this2, "MCMapSection", "DR-Map-Section");
    return _this2;
  }
  _inherits(DefaultRow, _DefaultColumn2);
  return _createClass(DefaultRow);
}(DefaultColumn);
/**
 * wrap row for maps
 */
var DefaultWrapRow = exports.DefaultWrapRow = /*#__PURE__*/function (_DefaultRow2) {
  function DefaultWrapRow() {
    var _this3;
    _classCallCheck(this, DefaultWrapRow);
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    _this3 = _callSuper(this, DefaultWrapRow, [].concat(args));
    _defineProperty(_this3, "MCMapContainer", "DRW-Map-Container");
    return _this3;
  }
  _inherits(DefaultWrapRow, _DefaultRow2);
  return _createClass(DefaultWrapRow);
}(DefaultRow);
/**
 * for the interactive map
 */
var InteractiveMap = exports.InteractiveMap = /*#__PURE__*/function (_DefaultRow3) {
  function InteractiveMap() {
    var _this4;
    _classCallCheck(this, InteractiveMap);
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    _this4 = _callSuper(this, InteractiveMap, [].concat(args));
    _defineProperty(_this4, "MCMapContainer", "IM-Map-Container");
    _defineProperty(_this4, "MCMapSection", "IM-Map-Section");
    _defineProperty(_this4, "MCMap", "IM-Map");
    _defineProperty(_this4, "MCAddButton", "IM-addButton");
    _defineProperty(_this4, "MCActiveItem", "IM-Active-Item");
    _defineProperty(_this4, "MCCell", "IM-Cell");
    return _this4;
  }
  _inherits(InteractiveMap, _DefaultRow3);
  return _createClass(InteractiveMap);
}(DefaultRow);
/**
 * for the side bar nav which uses the map component
 */
var SideBar = exports.SideBar = /*#__PURE__*/function (_DefaultRow4) {
  function SideBar() {
    var _this5;
    _classCallCheck(this, SideBar);
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    _this5 = _callSuper(this, SideBar, [].concat(args));
    _defineProperty(_this5, "MCActiveLink", _this5.MCActiveItem);
    _defineProperty(_this5, "MCLinkItem", _this5.MCLink);
    _defineProperty(_this5, "MCMapSection", "SB-Map-Section");
    return _this5;
  }
  _inherits(SideBar, _DefaultRow4);
  return _createClass(SideBar);
}(DefaultRow);
/**
 * for the links in the nav
 */
var Links = exports.Links = /*#__PURE__*/function (_DefaultColumn3) {
  function Links() {
    var _this6;
    _classCallCheck(this, Links);
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }
    _this6 = _callSuper(this, Links, [].concat(args));
    _defineProperty(_this6, "MCActiveLink", _this6.MCActiveItem);
    _defineProperty(_this6, "MCLinkItem", _this6.MCLink);
    _defineProperty(_this6, "MCMapSection", "SB-link");
    _defineProperty(_this6, "MCCell", "SB-Cell-Link");
    _defineProperty(_this6, "MCLink", "SB-Map-Link");
    _defineProperty(_this6, "MCLinkItem", "SB-Map-Link");
    return _this6;
  }
  _inherits(Links, _DefaultColumn3);
  return _createClass(Links);
}(DefaultColumn);
/**
 * for the top nav
 */
var TopBar = exports.TopBar = /*#__PURE__*/function (_DefaultColumn4) {
  function TopBar() {
    var _this7;
    _classCallCheck(this, TopBar);
    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }
    _this7 = _callSuper(this, TopBar, [].concat(args));
    _defineProperty(_this7, "MCActiveLink", _this7.MCActiveItem);
    _defineProperty(_this7, "MCLinkItem", _this7.MCLink);
    return _this7;
  }
  _inherits(TopBar, _DefaultColumn4);
  return _createClass(TopBar);
}(DefaultColumn);