"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactRouterDom = require("react-router-dom");
var _Card = _interopRequireDefault(require("../../cardTech/Card"));
var _BaseComponent2 = _interopRequireDefault(require("../baseClasses/BaseComponent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
 * Login Component
 * A React component for rendering a login form.
 * This component extends the `BaseComponent` class and uses pre-defined sub-components
 * (e.g., `container`, `header`, `form`, and `submitButton`) for building the UI.
 */
var Login = exports["default"] = /*#__PURE__*/function (_BaseComponent) {
  function Login(props) {
    var _this;
    _classCallCheck(this, Login);
    _this = _callSuper(this, Login, [props]);
    // Initialize state with email and password fields.
    _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
      email: "",
      password: ""
    });
    return _this;
  }

  /**
   * Validates the login form.
   * This placeholder always returns true but can be extended to include validation logic.
   * @returns {boolean} - Validation result.
   */
  _inherits(Login, _BaseComponent);
  return _createClass(Login, [{
    key: "validate",
    value: function validate() {
      return true;
    }

    /**
     * Handles input changes and updates the state.
     * @param {Event} e - The input change event.
     */
  }, {
    key: "onChange",
    value: function onChange(e) {
      var _e$target = e.target,
        name = _e$target.name,
        value = _e$target.value;
      this.setState(_defineProperty({}, name, value)); // Dynamically update the state based on input name.
    }

    /**
     * Handles the form submission.
     * If validation passes, it calls the `login` method of the `APIService` with the entered email and password.
     */
  }, {
    key: "onSub",
    value: function onSub() {
      if (this.validate()) {
        this.APIService.login(this.state.email, this.state.password); // Calls API login with current state.
      }
    }

    /**
     * Returns the JSX for the link to switch to the registration page.
     * @returns {JSX.Element} - Link to the "Sign Up" page.
     */
  }, {
    key: "getSwitchLink",
    value: function getSwitchLink() {
      return /*#__PURE__*/React.createElement("div", null, "Don't have an Account? ", /*#__PURE__*/React.createElement(_reactRouterDom.Link, {
        to: "/register"
      }, "Sign Up"));
    }

    /**
     * Sets up the required sub-components before rendering.
     */
  }, {
    key: "preSetup",
    value: function preSetup() {
      this.setComponents(["container", "header", "form", "submitButton"]);
    }

    /**
     * Returns the JSX for the header element.
     * @returns {JSX.Element} - Header HTML.
     */
  }, {
    key: "getHeaderHtml",
    value: function getHeaderHtml() {
      var headerHtml = this.header.getHtml({
        type: "h1",
        content: "Login"
      });
      return headerHtml;
    }

    /**
     * Returns the JSX for the form element containing email and password inputs.
     * @returns {JSX.Element} - Form HTML.
     */
  }, {
    key: "getFormHtml",
    value: function getFormHtml() {
      var content = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, "Email"), /*#__PURE__*/React.createElement("input", {
        className: "defaultInputFormAuth",
        name: "email",
        onChange: this.onChange,
        value: this.state.email // Corrected the value binding.
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: "10px"
        }
      }, "Password"), /*#__PURE__*/React.createElement("input", {
        className: "defaultInputFormAuth",
        name: "password",
        type: "password",
        onChange: this.onChange,
        value: this.state.password // Corrected the value binding.
      }));
      this.form.setClass("defaultLoginForm"); // Apply a default form class.
      var formHtml = this.form.getHtml({
        type: "div",
        content: content
      });
      return formHtml;
    }

    /**
     * Returns the JSX for the submit button element.
     * @returns {JSX.Element} - Submit button HTML.
     */
  }, {
    key: "getSubmitHtml",
    value: function getSubmitHtml() {
      this.submitButton.setClass("defaultLoginButton"); // Apply a default button class.
      this.submitButton.setOnClick(this.onSub); // Attach the `onSub` handler to the button.
      var submitHtml = this.submitButton.getHtml({
        type: "div",
        content: "Submit"
      });
      return submitHtml;
    }

    /**
     * Returns the JSX for the container element, combining header, form, submit button, and switch link.
     * @returns {JSX.Element} - Container HTML.
     */
  }, {
    key: "getContainerHtml",
    value: function getContainerHtml() {
      this.container.setClass(this.props.loginContainer || "fitCC"); // Apply a class to the container.
      var html = /*#__PURE__*/React.createElement(React.Fragment, null, this.getHeaderHtml(), this.getFormHtml(), this.getSubmitHtml(), this.getSwitchLink());
      var containerHtml = this.container.getHtml({
        type: "div",
        content: html
      });
      return containerHtml;
    }

    /**
     * Returns the full JSX for the login component wrapped in a card layout.
     * @returns {JSX.Element} - Full component HTML.
     */
  }, {
    key: "getHtml",
    value: function getHtml() {
      var html = this.getContainerHtml();

      // Wrap the container HTML inside a card component with layout settings.
      var full = /*#__PURE__*/React.createElement("div", {
        className: "fullCCLayoutRow"
      }, /*#__PURE__*/React.createElement(_Card["default"], {
        type: this.props.loginCardType || "biggerCard",
        content: html
      }));
      return full;
    }
  }]);
}(_BaseComponent2["default"]);