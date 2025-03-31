"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mathService = exports.MathService = void 0;
var _binder = require("./binder");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MathService = exports.MathService = /*#__PURE__*/function () {
  function MathService() {
    _classCallCheck(this, MathService);
    _binder.binder.bind(this);
  }
  return _createClass(MathService, [{
    key: "doMath",
    value: function doMath(val) {
      // Remove spaces from the input string
      val = val.replace(/\s+/g, '');

      // Regular expression to match the basic mathematical operations
      var operatorPattern = /(\d+)([+\-*/])(\d+)/;
      var match = val.match(operatorPattern);
      if (!match) {
        throw new Error('Invalid input');
      }

      // Extract the operands and operator from the matched pattern
      var num1 = parseFloat(match[1]);
      var operator = match[2];
      var num2 = parseFloat(match[3]);

      // Perform the appropriate mathematical operation
      var mathJson = {
        "+": num1 + num2,
        "-": num1 - num2,
        "*": num1 * num2,
        "/": num1 / num2
      };
      var result = mathJson[operator];
      return result;
    }
  }]);
}();
var mathService = exports.mathService = new MathService();