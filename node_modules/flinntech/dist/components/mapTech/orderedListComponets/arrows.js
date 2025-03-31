"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _baseClass = _interopRequireDefault(require("../baseClass"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/**
 * OrderedArrowsBaseClass manages the order of items with increase and decrease buttons.
 * It provides functionality for altering the order of items via arrows.
 */
var OrderedArrowsBaseClass = exports["default"] = /*#__PURE__*/function (_BaseClass) {
  /**
   * Constructor to initialize the base class and set default states.
   * Sets up the class key for styling and increments/decrements for order manipulation.
   * @param {Object} props - The props passed to the component.
   */
  function OrderedArrowsBaseClass(props) {
    var _this;
    _classCallCheck(this, OrderedArrowsBaseClass);
    _this = _callSuper(this, OrderedArrowsBaseClass, [props]); // Calls the parent class constructor
    _this.state.classKey = "MCOrderedArrows"; // Sets the CSS class key for styling
    _this.state.increment = 1; // Sets the value to increase the order by
    _this.state.decrement = -1; // Sets the value to decrease the order by
    return _this;
  }

  /**
   * Increases the position/order of the object by the increment value.
   * This method updates the order of the object.
   */
  _inherits(OrderedArrowsBaseClass, _BaseClass);
  return _createClass(OrderedArrowsBaseClass, [{
    key: "increasePosition",
    value: function increasePosition() {
      this.obj.updateOrder(this.state.increment); // Calls updateOrder method on the object to increase its position
    }

    /**
     * Decreases the position/order of the object by the decrement value.
     * This method updates the order of the object.
     */
  }, {
    key: "decreasePosition",
    value: function decreasePosition() {
      this.obj.updateOrder(this.state.decrement); // Calls updateOrder method on the object to decrease its position
    }

    /**
     * Creates the UI for the increase arrow.
     * The arrow triggers the decreasePosition method when clicked.
     * @returns {JSX.Element} The JSX element representing the increase arrow.
     */
  }, {
    key: "increaseArrowUI",
    value: function increaseArrowUI() {
      this.increaseArrow = /*#__PURE__*/React.createElement("div", {
        className: "upward-arrow",
        onClick: this.decreasePosition
      }); // Defines the increase arrow with an onClick event that calls decreasePosition
      return this.increaseArrow; // Returns the JSX element for the increase arrow
    }

    /**
     * Creates the UI for the decrease arrow.
     * The arrow triggers the increasePosition method when clicked.
     * @returns {JSX.Element} The JSX element representing the decrease arrow.
     */
  }, {
    key: "decreaseArrowUI",
    value: function decreaseArrowUI() {
      this.decreaseArrow = /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: "5px"
        },
        className: "downward-arrow",
        onClick: this.increasePosition
      }); // Defines the decrease arrow with an onClick event that calls increasePosition
      return this.decreaseArrow; // Returns the JSX element for the decrease arrow
    }

    /**
     * Combines both increase and decrease arrows into a single div container.
     * Returns a JSX element that contains both arrows for UI rendering.
     * @returns {JSX.Element} The JSX element that combines both arrows.
     */
  }, {
    key: "getOption",
    value: function getOption() {
      this.increaseArrowUI(); // Calls method to create the increase arrow
      this.decreaseArrowUI(); // Calls method to create the decrease arrow
      var div = /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: "-4px"
        },
        className: "fitCC"
      }, this.increaseArrow, this.decreaseArrow); // Combines the increase and decrease arrows into a container div
      return div; // Returns the JSX element containing both arrows
    }
  }]);
}(_baseClass["default"]);