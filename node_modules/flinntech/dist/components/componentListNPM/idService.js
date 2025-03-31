"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var IdService = /*#__PURE__*/function () {
  function IdService() {
    _classCallCheck(this, IdService);
  }
  return _createClass(IdService, [{
    key: "randomFiveDigitNumber",
    value:
    /**
     * get a random 5 digit number
     * 
     */
    function randomFiveDigitNumber() {
      var num = Math.floor(Math.random() * 90000) + 10000;
      num = num.toString();
      var randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
      var randomPosition = Math.floor(Math.random() * 5);
      num = num.substring(0, randomPosition) + randomLetter + num.substring(randomPosition + 1);
      var randomagain = Math.floor(Math.random() * 2);
      if (randomagain === 1) {
        var randomLetter2 = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Added let
        var randomPosition2;
        do {
          randomPosition2 = Math.floor(Math.random() * 5);
        } while (randomPosition2 === randomPosition); // Ensure different position for the second letter
        num = num.substring(0, randomPosition2) + randomLetter2 + num.substring(randomPosition2 + 1);
      }
      return num;
    }

    /**
     * 
     * @returns an unique identifier
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
  }]);
}();
;
var _default = exports["default"] = new IdService();