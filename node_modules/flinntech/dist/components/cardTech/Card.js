"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _BaseComponent2 = _interopRequireDefault(require("../templateTech/baseClasses/BaseComponent"));
var _react = _interopRequireDefault(require("react"));
var _cardInteface = require("./cardInteface");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Card component for rendering a customizable card UI with optional popup functionality.
 */
var Card = exports["default"] = /*#__PURE__*/function (_BaseComponent) {
  /**
   * Constructor initializes the Card component.
   * Sets up state, references, and initial properties.
   * @param {Object} props - Properties passed to the component.
   */
  function Card(props) {
    var _this;
    _classCallCheck(this, Card);
    _this = _callSuper(this, Card, [props]);
    // Class properties
    _defineProperty(_this, "type", void 0);
    _defineProperty(_this, "theme", void 0);
    _defineProperty(_this, "interface", void 0);
    _this.wrapperRef = /*#__PURE__*/_react["default"].createRef(); // Reference for detecting clicks outside the popup.
    _this.setWrapperRef = _this.setWrapperRef; // Ensures the wrapper ref is properly assigned.
    _this.initialPropsSetupFunctions = [].concat(_toConsumableArray(_this.initialPropsSetupFunctions), [_this.setApp, _this.setType, _this.setClassStr]); // Adds custom setup functions to the parent class.

    // Initial state for theme and type configuration
    _this.state = {
      defaultType: _this.props.type ? _this.props.type : "fit",
      defaultTheme: _this.props.theme ? _this.props.theme : "Default",
      typeKey: "type",
      themeKey: "theme"
    };
    _this["interface"] = _cardInteface.cardInterface; // Assigns the card interface for additional functionality.
    return _this;
  }

  /**
   * Lifecycle method called after the component is mounted.
   * Adds an event listener to detect clicks outside the popup if `popup` prop is true.
   */
  _inherits(Card, _BaseComponent);
  return _createClass(Card, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.popup) {
        document.addEventListener("mousedown", this.handleClickOutside);
      }
    }

    /**
     * Lifecycle method called before the component is unmounted.
     * Removes the event listener added during `componentDidMount`.
     */
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.popup) {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }
    }

    /**
     * Handles click events outside the popup element and triggers the `handleClose` prop callback.
     * @param {Event} event - The click event object.
     */
  }, {
    key: "handleClickOutside",
    value: function handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        if (this.props.handleClose) {
          this.props.handleClose();
        }
      }
    }

    /**
     * Wraps the provided HTML content inside a popup if the `popup` prop is true.
     * @param {JSX.Element} html - The HTML content to wrap.
     * @returns {JSX.Element} The updated HTML content with popup elements if applicable.
     */
  }, {
    key: "isPopup",
    value: function isPopup(html) {
      var _this2 = this;
      if (this.props.popup) {
        var closePopup = this.closePopup.getHtml({
          content: this.props.closeUI || /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "X"),
          props: {
            onClick: function onClick() {
              if (_this2.props.handleClose) {
                _this2.props.handleClose();
              }
            }
          }
        });
        var popup = this.popupContent.getHtml({
          content: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, closePopup, html),
          props: {
            ref: this.wrapperRef
          }
        });
        var backDrop = this.backDrop.getHtml({
          content: popup
        });
        html = backDrop;
      }
      return html;
    }

    /**
     * Sets the theme of the card based on props or default values.
     */
  }, {
    key: "setTheme",
    value: function setTheme() {
      this.theme = this.props[this.state.themeKey] ? this.props[this.state.themeKey] : this.state.defaultTheme;
    }

    /**
     * Sets the type of the card based on props or default values.
     */
  }, {
    key: "setType",
    value: function setType() {
      this.type = this.props[this.state.typeKey] ? this.props[this.state.typeKey] : this.state.defaultType;
    }

    /**
     * Sets the CSS class strings for various card and popup elements.
     */
  }, {
    key: "setClassStr",
    value: function setClassStr() {
      this.defaultcardClass = this.type + this.theme + " scroller";
      this.defaultcardClass = this.props.popup ? this.defaultcardClass + " cardPopup" : this.defaultcardClass;
      if (this.props.popup) {
        this.defaultbackDropClass = "backDropPopup";
        this.defaultpopupContentClass = "popupContent";
        this.defaultclosePopupClass = "closePopup";
      }
    }

    /**
     * Generates the final HTML content for the card, including any popup elements if applicable.
     * @returns {JSX.Element} The HTML content for the card.
     */
  }, {
    key: "getHtml",
    value: function getHtml() {
      var content = this.getContent();
      this.html = this.card.getHtml({
        content: content
      });
      this.html = this.isPopup(this.html);
      return this.html;
    }

    /**
     * Retrieves the card's content from the `content` prop.
     * @returns {JSX.Element} The card content.
     */
  }, {
    key: "getContent",
    value: function getContent() {
      this.content = this.props.content;
      return this.content;
    }

    /**
     * Prepares the necessary components for rendering the card.
     * Adds specific components if the `popup` prop is true.
     */
  }, {
    key: "preSetup",
    value: function preSetup() {
      var arr = ["card"];
      if (this.props.popup) {
        arr = [].concat(_toConsumableArray(arr), ["backDrop", "popupContent", "closePopup"]);
      }
      this.setComponents(arr);
    }
  }]);
}(_BaseComponent2["default"]); // TODO:
// - Figure out how to provide the mod file to change the color theme from the root to node modules.
// - Add support for more themes.
// - Incorporate technologies like Bootstrap to achieve a professional look.
// - Ensure that components properly update when receiving new props.