"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _inputBaseClass = _interopRequireDefault(require("../inputBaseClass"));
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
 * BaseButton class extends InputBaseClass to provide foundational functionality for button components.
 * This class handles button-specific interactions, such as click handling, additional setup, and rendering.
 */
var BaseButton = exports["default"] = /*#__PURE__*/function (_InputBaseClass) {
  /**
   * Initializes the BaseButton instance with default state and props.
   * @param {Object} props - Properties passed to the button component.
   */
  function BaseButton(props) {
    var _this;
    _classCallCheck(this, BaseButton);
    _this = _callSuper(this, BaseButton, [props]);
    _this.state.formClass = "FCDefaultButton"; // Sets the default form class for the button.
    return _this;
  }

  /**
   * Handles the button click event.
   * Invokes a buttonClick handler if provided in props or falls back to the default buttonClickFunc.
   * Executes a callback function if provided in props.
   */
  _inherits(BaseButton, _InputBaseClass);
  return _createClass(BaseButton, [{
    key: "buttonClick",
    value: function buttonClick() {
      if (this.props.buttonClick) {
        // Call the buttonClick function from props, passing the button's object.
        this.props.buttonClick(this.obj);
      } else {
        // Fallback to the default buttonClickFunc implementation.
        this.buttonClickFunc();
      }

      // Call the callback function from props if it exists.
      if (this.props.callbackFunc) {
        this.props.callbackFunc(this.obj);
      }
    }

    /**
     * Default button click handler.
     * Can be overridden by subclasses to provide specific behavior.
     */
  }, {
    key: "buttonClickFunc",
    value: function buttonClickFunc() {
      // No default behavior; meant to be implemented by subclasses if needed.
    }

    /**
     * Sets up additional configurations for the button, such as attaching click events.
     */
  }, {
    key: "additionalSetup",
    value: function additionalSetup() {
      this.form.setOnClick(this.buttonClick); // Set the button's click event handler.
    }

    /**
     * Generates and returns the HTML for the button.
     * Sets styles, defines the button content, and specifies the structure.
     * @returns {Object} HTML structure for the button.
     */
  }, {
    key: "getFormHtml",
    value: function getFormHtml() {
      this.form.setStyle({
        cursor: "pointer"
      }); // Set the button's cursor style.
      this.content = this.props.content || this.content || /*#__PURE__*/React.createElement(React.Fragment, null, "button"); // Define the button's content.
      return this.form.getHtml({
        type: "div",
        content: this.content
      }); // Return the HTML representation.
    }
  }]);
}(_inputBaseClass["default"]);