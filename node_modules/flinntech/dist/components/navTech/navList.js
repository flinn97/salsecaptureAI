"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _binder = require("../serviceTech/Util/binder");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// NavList class manages a list of navigation items.
var NavList = /*#__PURE__*/function () {
  /**
   * Constructor initializes the nav list with default items and binds methods.
   */
  function NavList() {
    _classCallCheck(this, NavList);
    _binder.binder.bind(this); // Binds this context to methods (presumably from binder utility)
    // Initial default list with predefined items
    this.list = [{
      type: "logo",
      picURL: undefined,
      label: undefined,
      "default": true
    }, {
      type: "links",
      linkJson: undefined,
      "default": true
    }, {
      type: "logout",
      logoutFunc: undefined,
      auth: undefined,
      "default": true
    }];
  }

  /**
   * Sets the navigation list to the provided list.
   * @param {Array} list - The new list to set.
   */
  return _createClass(NavList, [{
    key: "setList",
    value: function setList(list) {
      this.list = list; // Replaces the current list with the provided list
    }

    /**
     * Retrieves the current navigation list.
     * @returns {Array} - The current list of navigation items.
     */
  }, {
    key: "getList",
    value: function getList() {
      return this.list; // Returns the current navigation list
    }

    /**
     * Inserts an item into the list at the specified index.
     * @param {number} index - The index at which to insert the item.
     * @param {Object} item - The item to insert into the list.
     */
  }, {
    key: "insert",
    value: function insert(index, item) {
      if (index < 0 || index >= this.list.length) {
        console.error("Index out of bounds"); // Error handling if the index is invalid
        return;
      }
      this.list.splice(index, 0, item); // Inserts the item at the specified index
    }

    /**
     * Adds an item to the list either at the start or the end based on the `atStart` flag.
     * @param {Object} item - The item to add to the list.
     * @param {boolean} atStart - If true, item is added at the start, otherwise at the end.
     */
  }, {
    key: "add",
    value: function add(item, atStart) {
      if (atStart) {
        this.list.unshift(item); // Adds item at the start of the list
      } else {
        this.list.push(item); // Adds item at the end of the list
      }
    }

    /**
     * Adds custom JSX to the navigation list.
     * @param {JSX.Element} jsx - The JSX element to add.
     * @param {number} index - The index where to insert the JSX element.
     * @param {boolean} start - If true, adds at the start, otherwise at the end.
     */
  }, {
    key: "addCustomJSX",
    value: function addCustomJSX(jsx, index, start) {
      var obj = {
        type: "custom",
        custom: jsx
      }; // Creates an object with custom JSX
      if (index) {
        this.insert(index, obj); // Inserts custom JSX at the specified index
      } else {
        this.add(obj, start); // Adds custom JSX either at the start or the end
      }
    }

    /**
     * Updates an item in the list at the specified index with new properties.
     * @param {number} index - The index of the item to update.
     * @param {Object} obj - The new properties to merge into the item.
     */
  }, {
    key: "update",
    value: function update(index, obj) {
      if (index < 0 || index >= this.list.length) {
        console.error("Index out of bounds"); // Error handling if the index is invalid
        return;
      }
      this.list[index] = _objectSpread(_objectSpread({}, this.list[index]), obj); // Merges the new properties with the item
    }

    /**
     * Removes an item from the list at the specified index.
     * @param {number} index - The index of the item to remove.
     */
  }, {
    key: "remove",
    value: function remove(index) {
      if (index < 0 || index >= this.list.length) {
        console.error("Index out of bounds"); // Error handling if the index is invalid
        return;
      }
      this.list.splice(index, 1); // Removes the item at the specified index
    }
  }]);
}();
var _default = exports["default"] = NavList;