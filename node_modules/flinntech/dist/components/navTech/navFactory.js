"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _navMapContainer = _interopRequireDefault(require("./navMapContainer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * factory for getting different items for the map component
 */
var NavFactory = exports["default"] = /*#__PURE__*/function () {
  function NavFactory() {
    _classCallCheck(this, NavFactory);
    _defineProperty(this, "factory", {
      "default": _navMapContainer["default"]
    });
  }
  return _createClass(NavFactory, [{
    key: "getComponent",
    value:
    /**
     * get a map item
     * @param {*} type 
     * @param {*} obj 
     * @returns a react item for the map
     */
    function getComponent(type, props) {
      var Comp = undefined;
      if (this.factory[type]) {
        Comp = this.factory[type];
      }
      return /*#__PURE__*/_react["default"].createElement(Comp, props);
    }
    /**
     * register a new map component.
     * @param {*} type 
     * @param {*} comp 
     */
  }, {
    key: "registerComponent",
    value: function registerComponent(type, comp) {
      this.factory[type] = comp;
    }
  }]);
}(); //refactor this into a base factory