"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binder = exports.Binder = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * A utility class to automatically bind all methods of a class instance to itself.
 * This ensures that methods retain the correct `this` context when used as callbacks or in other scenarios.
 * 
 * Features:
 * - Allows specifying methods to exclude from binding.
 * - Provides functionality to modify the exclusion list dynamically.
 */
var Binder = exports.Binder = /*#__PURE__*/function () {
  function Binder() {
    _classCallCheck(this, Binder);
    _defineProperty(this, "doNotInclude", ["render", "forceUpdate", "setState"]);
  }
  return _createClass(Binder, [{
    key: "bind",
    value:
    // Default list of methods to exclude from binding.

    /**
     * Binds all methods of a given class instance to itself, except those in the exclusion list.
     * @param {object} comp - The class instance whose methods will be bound.
     */
    function bind(comp) {
      var proto = Object.getPrototypeOf(comp); // Get the prototype of the instance.

      while (proto && proto !== Object.prototype) {
        // Get all method names of the current prototype.
        var methodNames = Object.getOwnPropertyNames(proto).filter(function (prop) {
          // Filter to include only functions and exclude constructors.
          return typeof proto[prop] === "function" && prop !== "constructor";
        });

        // Bind each method to the class instance, unless it's in the exclusion list.
        var _iterator = _createForOfIteratorHelper(methodNames),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var methodName = _step.value;
            if (!this.doNotInclude.includes(methodName)) {
              var _comp$methodName;
              comp[methodName] = (_comp$methodName = comp[methodName]) === null || _comp$methodName === void 0 ? void 0 : _comp$methodName.bind(comp);
            }
          }

          // Move up the prototype chain.
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        proto = Object.getPrototypeOf(proto);
      }
    }

    /**
     * Sets a new list of methods to exclude from binding.
     * @param {Array<string>} list - Array of method names to exclude.
     */
  }, {
    key: "setDoNotIncludeList",
    value: function setDoNotIncludeList(list) {
      this.doNotInclude = list; // Replace the existing exclusion list with the provided list.
    }

    /**
     * Adds a method name to the exclusion list.
     * @param {string} str - Method name to add to the exclusion list.
     */
  }, {
    key: "leaveOut",
    value: function leaveOut(str) {
      this.doNotInclude.push(str); // Append the method name to the exclusion list.
    }

    /**
     * Removes a method name from the exclusion list.
     * @param {string} str - Method name to remove from the exclusion list.
     */
  }, {
    key: "include",
    value: function include(str) {
      // Filter out the method name from the exclusion list.
      this.doNotInclude = this.doNotInclude.filter(function (s) {
        return s !== str;
      });
    }
  }]);
}();
var binder = exports.binder = new Binder();