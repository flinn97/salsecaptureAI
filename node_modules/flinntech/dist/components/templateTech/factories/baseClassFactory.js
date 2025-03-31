"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _binder = require("../../serviceTech/Util/binder");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * factory for getting different themes for the map component
 */
var BaseClassFactory = exports["default"] = /*#__PURE__*/function () {
  function BaseClassFactory(registry) {
    _classCallCheck(this, BaseClassFactory);
    _defineProperty(this, "factory", {});
    _binder.binder.bind(this);
    if (registry) {
      this.registry = registry;
      this.registerListWithFactory();
    }
  }
  return _createClass(BaseClassFactory, [{
    key: "registerListWithFactory",
    value: function registerListWithFactory() {
      for (var key in this.registry) {
        if (Object.prototype.hasOwnProperty.call(this.registry, key)) {
          var lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
          this.factory[lowerCaseKey] = this.registry[key];
        }
      }
    }

    /**
     * get a map item
     * @param {*} type 
     * @param {*} obj 
     * @returns a react item for the map
     */
  }, {
    key: "getComponent",
    value: function getComponent(type) {
      var comp = undefined;
      if (this.factory[type]) {
        comp = new this.factory[type]();
      }
      return comp;
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
}();