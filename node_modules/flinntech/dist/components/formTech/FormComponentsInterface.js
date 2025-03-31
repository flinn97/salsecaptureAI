"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formInterface = exports.UploadButton = exports.UpdateButton = exports.RunButton = exports.PopupButton = exports.ParentFormComponent = exports.FormComponentInterface = exports.DelButton = exports.Button = exports.AddButton = void 0;
var _themeFactory = _interopRequireDefault(require("./themes/themeFactory"));
var _formTypeFactory = _interopRequireDefault(require("./formTypeFactory"));
var _BaseComponent = _interopRequireDefault(require("../templateTech/baseClasses/BaseComponent"));
var _interfaceBaseClass = _interopRequireDefault(require("../templateTech/baseClasses/interfaceBaseClass"));
var _interfaceComponentBaseClass = _interopRequireDefault(require("../templateTech/baseClasses/interfaceComponentBaseClass"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var FormComponentInterface = exports.FormComponentInterface = /*#__PURE__*/function (_BaseInterface) {
  function FormComponentInterface() {
    var _this;
    _classCallCheck(this, FormComponentInterface);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, FormComponentInterface, [].concat(args));
    _defineProperty(_this, "mainFunc", _this.getFormComponent);
    return _this;
  }
  _inherits(FormComponentInterface, _BaseInterface);
  return _createClass(FormComponentInterface, [{
    key: "getFactory",
    value:
    /**
     
     * @returns factory for map items
     */
    function getFactory() {
      if (this.factory === undefined) {
        this.factory = new _formTypeFactory["default"]();
      }
      return this.factory;
    }

    /**
     * 
     * @returns theme factory for map items
     */
  }, {
    key: "getThemeFactory",
    value: function getThemeFactory() {
      if (this.themeFactory === undefined) {
        this.themeFactory = new _themeFactory["default"]();
      }
      return this.themeFactory;
    }

    /**
     * Interface to get forms
     * @param {*} props 
     * @param {*} type 
     * @returns a form by type from the factory
     */
  }, {
    key: "getFormComponent",
    value: function getFormComponent(props, type) {
      type = type || "input";
      var form = this.factory.getComponent(type, props);
      return form;
    }
  }]);
}(_interfaceBaseClass["default"]);
var formInterface = exports.formInterface = new FormComponentInterface();

//model
// Base class for form components
var ParentFormComponent = exports.ParentFormComponent = /*#__PURE__*/function (_InterfaceComponentBa) {
  /**
   * Initializes the ParentFormComponent.
   * This serves as the base class for various button components.
   * @param {Object} props - The properties passed to the component.
   */
  function ParentFormComponent(props) {
    var _this2;
    _classCallCheck(this, ParentFormComponent);
    _this2 = _callSuper(this, ParentFormComponent, [props]);
    _this2.state = {
      type: "input" // Default type for a parent form component
    };
    _this2["interface"] = formInterface; // Assigning the form interface
    return _this2;
  }
  _inherits(ParentFormComponent, _InterfaceComponentBa);
  return _createClass(ParentFormComponent);
}(_interfaceComponentBaseClass["default"]);
/**
 * Represents a button for adding functionality.
 * Extends ParentFormComponent to inherit shared behavior.
 */
var AddButton = exports.AddButton = /*#__PURE__*/function (_ParentFormComponent) {
  function AddButton(props) {
    var _this3;
    _classCallCheck(this, AddButton);
    _this3 = _callSuper(this, AddButton, [props]);
    _this3.state = {
      type: "addButton" // Specific type for AddButton
    };
    return _this3;
  }
  _inherits(AddButton, _ParentFormComponent);
  return _createClass(AddButton);
}(ParentFormComponent);
/**
 * Represents a generic button with a customizable type.
 * Extends ParentFormComponent to inherit shared behavior.
 */
var Button = exports.Button = /*#__PURE__*/function (_ParentFormComponent2) {
  function Button(props) {
    var _this4;
    _classCallCheck(this, Button);
    _this4 = _callSuper(this, Button, [props]);
    _this4.state = {
      type: props.buttonType || "baseButton" // Default type is "baseButton" unless specified
    };
    return _this4;
  }
  _inherits(Button, _ParentFormComponent2);
  return _createClass(Button);
}(ParentFormComponent);
/**
 * Represents a popup button.
 * Extends ParentFormComponent to inherit shared behavior.
 */
var PopupButton = exports.PopupButton = /*#__PURE__*/function (_ParentFormComponent3) {
  function PopupButton(props) {
    var _this5;
    _classCallCheck(this, PopupButton);
    _this5 = _callSuper(this, PopupButton, [props]);
    _this5.state = {
      type: "popupButton" // Specific type for PopupButton
    };
    return _this5;
  }
  _inherits(PopupButton, _ParentFormComponent3);
  return _createClass(PopupButton);
}(ParentFormComponent);
/**
 * Represents a button for updating functionality.
 * Extends ParentFormComponent to inherit shared behavior.
 */
var UpdateButton = exports.UpdateButton = /*#__PURE__*/function (_ParentFormComponent4) {
  function UpdateButton(props) {
    var _this6;
    _classCallCheck(this, UpdateButton);
    _this6 = _callSuper(this, UpdateButton, [props]);
    _this6.state = {
      type: "updateButton" // Specific type for UpdateButton
    };
    return _this6;
  }
  _inherits(UpdateButton, _ParentFormComponent4);
  return _createClass(UpdateButton);
}(ParentFormComponent);
/**
 * Represents a button for running operations.
 * Extends ParentFormComponent to inherit shared behavior.
 */
var RunButton = exports.RunButton = /*#__PURE__*/function (_ParentFormComponent5) {
  function RunButton(props) {
    var _this7;
    _classCallCheck(this, RunButton);
    _this7 = _callSuper(this, RunButton, [props]);
    _this7.state = {
      type: "runButton" // Specific type for RunButton
    };
    return _this7;
  }
  _inherits(RunButton, _ParentFormComponent5);
  return _createClass(RunButton);
}(ParentFormComponent);
/**
 * Represents an upload button.
 * Extends ParentFormComponent to inherit shared behavior.
 * Allows customization of the upload type.
 */
var UploadButton = exports.UploadButton = /*#__PURE__*/function (_ParentFormComponent6) {
  function UploadButton(props) {
    var _this8;
    _classCallCheck(this, UploadButton);
    _this8 = _callSuper(this, UploadButton, [props]);
    _this8.state = {
      type: props.uploadType || "upload" // Default type is "upload" unless specified
    };
    return _this8;
  }
  _inherits(UploadButton, _ParentFormComponent6);
  return _createClass(UploadButton);
}(ParentFormComponent);
/**
 * Represents a button for deletion functionality.
 * Extends ParentFormComponent to inherit shared behavior.
 * Allows customization of the deletion type.
 */
var DelButton = exports.DelButton = /*#__PURE__*/function (_ParentFormComponent7) {
  function DelButton(props) {
    var _this9;
    _classCallCheck(this, DelButton);
    _this9 = _callSuper(this, DelButton, [props]);
    _this9.state = {
      type: props.uploadType || "del" // Default type is "del" unless specified
    };
    return _this9;
  }
  _inherits(DelButton, _ParentFormComponent7);
  return _createClass(DelButton);
}(ParentFormComponent);