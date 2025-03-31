"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlService = exports.UrlService = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * A utility service for handling URL-related operations.
 * This class provides methods for validating URLs, extracting parts of URLs, and manipulating URL strings.
 */
var UrlService = exports.UrlService = /*#__PURE__*/function () {
  function UrlService() {
    _classCallCheck(this, UrlService);
    /**
     * Converts a string into a valid URL by ensuring it starts with "http://" or "https://".
     * @param {string} string - The input string to convert.
     * @returns {string} - A valid URL string starting with "https://", or the original string if undefined.
     */
    _defineProperty(this, "convertStringToLink", function (string) {
      if (string) {
        // Prepend "https://" if the string doesn't already start with "http://" or "https://".
        if (!string.startsWith("http://") && !string.startsWith("https://")) {
          return "https://" + string;
        } else {
          return string; // Return the string as-is if it's already a valid URL.
        }
      }
      return string; // Return the original string if undefined or empty.
    });
  }
  return _createClass(UrlService, [{
    key: "isLikelyUrl",
    value:
    /**
     * Checks if the given string is likely a valid URL.
     * This is based on common domain suffixes or the presence of "http(s)://" or "mailto:".
     * @param {string} url - The string to validate as a URL.
     * @returns {boolean} - True if the string is likely a URL, false otherwise.
     */
    function isLikelyUrl(url) {
      // Check for common domain suffixes or the presence of "http(s)://" or "mailto:" at the start.
      return /\.(com|net|org|io|gov|edu|co)\b/.test(url) || /^(?:f|ht)tps?\:\/\//.test(url) || /^mailto\:/i.test(url);
    }

    /**
     * Checks if the current page's URL contains the specified string.
     * @param {string} s - The string to search for in the current URL.
     * @returns {boolean} - True if the string is found in the URL, false otherwise.
     */
  }, {
    key: "checkURLforString",
    value: function checkURLforString(s) {
      var href = window.location.href; // Get the current page's full URL.
      return href.includes(s); // Check if the URL contains the specified string.
    }

    /**
     * Extracts an ID from the current page's URL based on its position and optional hyphen splitting.
     * @param {boolean} hyphen - Whether to split the ID by hyphens.
     * @param {number} index - The index of the ID in the split array. Defaults to the first element.
     * @returns {string} - The extracted ID from the URL.
     */
  }, {
    key: "getIdFromURL",
    value: function getIdFromURL(hyphen, index) {
      var href = window.location.href; // Get the current page's full URL.
      var splitURL = href.split("/"); // Split the URL by slashes.
      var id = splitURL[splitURL.length - 1]; // Get the last segment of the URL.

      // Split the ID by hyphen if requested, otherwise wrap it in an array.
      var idList = hyphen ? id.split("-") : [id];

      // Return the element at the specified index or the first element by default.
      var campId = index ? idList[index] : idList[0];
      return campId;
    }

    /**
     * Extracts the second-to-last segment (typically the type) from the current page's URL.
     * @returns {string} - The type segment from the URL.
     */
  }, {
    key: "getTypeFromURL",
    value: function getTypeFromURL() {
      var href = window.location.href; // Get the current page's full URL.
      var splitURL = href.split("/"); // Split the URL by slashes.
      var type = splitURL[splitURL.length - 2]; // Get the second-to-last segment of the URL.
      return type;
    }
  }]);
}();
var urlService = exports.urlService = new UrlService();