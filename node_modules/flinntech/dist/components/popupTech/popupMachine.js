"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _BaseComponent2 = _interopRequireDefault(require("../templateTech/baseClasses/BaseComponent"));
var _Card = _interopRequireDefault(require("../cardTech/Card"));
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
var PopupMachine = exports["default"] = /*#__PURE__*/function (_BaseComponent) {
  /**
   * Constructor initializes the component's state.
   * @param {Object} props - The properties passed to the component.
   */
  function PopupMachine(props) {
    var _this;
    _classCallCheck(this, PopupMachine);
    _this = _callSuper(this, PopupMachine, [props]); // Calls the parent class constructor to initialize the component
    _this.state = {}; // Initialize state (no specific state properties in the constructor)
    return _this;
  }

  /**
   * Checks if the popup switch is active based on the props or app state.
   * @param {boolean} bool - The current state of the popup switch.
   * @returns {boolean} - Updated state indicating whether the popup should be displayed.
   */
  _inherits(PopupMachine, _BaseComponent);
  return _createClass(PopupMachine, [{
    key: "checkPopupSwitch",
    value: function checkPopupSwitch(bool) {
      var _this$props$app;
      // Retrieve the popup switch value from props or app state
      this.popupSwitch = this.props.popupSwitch || ((_this$props$app = this.props.app) === null || _this$props$app === void 0 || (_this$props$app = _this$props$app.state) === null || _this$props$app === void 0 ? void 0 : _this$props$app.popupSwitch);

      // If the popup switch is not empty or undefined, set bool to true
      if (this.popupSwitch !== "" && this.popupSwitch !== undefined) {
        bool = true; // Set to true if popupSwitch exists and is not empty
      }
      return bool; // Return the updated boolean value indicating whether to display the popup
    }

    /**
     * Checks if the type of the current popup matches the expected type.
     * @param {boolean} bool - The current state of whether the popup type matches.
     * @returns {boolean} - Updated state indicating if the popup type is correct.
     */
  }, {
    key: "checkType",
    value: function checkType(bool) {
      var _this$props$app2, _this$popupFactory$ge;
      // Retrieve the current popup component from props or app state
      var component = this.props.currentPopupComponent || ((_this$props$app2 = this.props.app) === null || _this$props$app2 === void 0 || (_this$props$app2 = _this$props$app2.state) === null || _this$props$app2 === void 0 ? void 0 : _this$props$app2.currentPopupComponent);

      // Get the expected component type from the popup factory for the current popup switch
      var type = (_this$popupFactory$ge = this.popupFactory.getComponent(this.popupSwitch)) === null || _this$popupFactory$ge === void 0 ? void 0 : _this$popupFactory$ge.componentType;

      // If a valid type is found, check if the component matches the expected type
      if (type) {
        var _component$;
        // Ensure the component is an array, then check the type of the first element
        component = this.isArray(component);
        bool = ((_component$ = component[0]) === null || _component$ === void 0 || (_component$ = _component$.getJson()) === null || _component$ === void 0 ? void 0 : _component$.type) === type && component.length > 0;
      }
      return bool; // Return the updated boolean value indicating if the popup type matches
    }

    /**
     * Renders the popup component if the popup should be displayed.
     * @returns {JSX.Element} - The rendered popup component or null if the popup should not be displayed.
     */
  }, {
    key: "render",
    value: function render() {
      var _this$popupFactory,
        _this2 = this;
      // Initially assume the popup should not be displayed
      var displayPopup = this.checkPopupSwitch(false);

      // If the popup switch is active, check if the type of the popup is correct
      if (displayPopup) {
        displayPopup = this.checkType(displayPopup); // Check type compatibility
      }

      // Retrieve the popup factory from props or app state
      this.popupFactory = this.props.factory || this.props.app.state.popupFactory;

      // Get the component for the current popup based on the popup switch value
      var component = (_this$popupFactory = this.popupFactory) === null || _this$popupFactory === void 0 ? void 0 : _this$popupFactory.getComponent(this.popupSwitch);
      return /*#__PURE__*/React.createElement(React.Fragment, null, displayPopup && (component === null || component === void 0 ? void 0 : component.content) && /*#__PURE__*/React.createElement(_Card["default"], {
        content: /*#__PURE__*/React.createElement(component.content, null) // Render the content of the popup inside the Card component
        ,
        popup: true // Indicate that this is a popup Card
        ,
        type: component.popupType || 'biggerCard' // Set the type of the popup (default to 'biggerCard')
        ,
        theme: component.popupTheme || 'Default' // Set the theme of the popup (default to 'Default')
        ,
        handleClose: function handleClose() {
          // Handle the close action for the popup
          if (component.handleClose) {
            // If the component has a custom close handler, invoke it
            component.handleClose();
          } else {
            // If no custom close handler is provided, perform default close action
            var currentComponent = _this2.props.app.state.currentPopupComponent;

            // Remove the current component from the app state if it exists
            if (currentComponent) {
              _this2.props.app.state.operationsFactory.removeFromList(currentComponent);
            }

            // Dispatch an action to reset the app state (clear currentPopupComponent and popupSwitch)
            _this2.props.app.dispatch({
              currentPopupComponent: undefined,
              popupSwitch: undefined
            });
          }
        }
      }));
    }
  }]);
}(_BaseComponent2["default"]);