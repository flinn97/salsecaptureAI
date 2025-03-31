"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _baseClass = _interopRequireDefault(require("../baseClass"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
 * The LinkItem class represents a clickable item that can link to another object or path.
 * It extends from BaseClass and is used to manage the linking behavior and appearance of the item.
 */
var LinkItem = exports["default"] = /*#__PURE__*/function (_BaseClass) {
  /**
   * Initializes the LinkItem with the provided props and sets up the initial properties.
   * It also configures the class and item type.
   * @param {Object} props - The properties passed to the component.
   */
  function LinkItem(props) {
    var _this;
    _classCallCheck(this, LinkItem);
    _this = _callSuper(this, LinkItem, [props]); // Calls the parent class constructor

    // Adds the setUpLinks method to the initial properties setup functions array
    _this.initialPropsSetupFunctions = [].concat(_toConsumableArray(_this.initialPropsSetupFunctions), [_this.setUpLinks]);
    _this.state.classKey = "MCLinkItem"; // Defines the class key for styling
    _this.state.itemType = "div"; // Defines the item type as "div" by default
    return _this;
  }

  /**
   * Sets up the links for the LinkItem by defining the path and link-related properties.
   */
  _inherits(LinkItem, _BaseClass);
  return _createClass(LinkItem, [{
    key: "setUpLinks",
    value: function setUpLinks() {
      this.cell.to = this.obj.path; // Assigns the path for the link
      this.useId = ""; // Resets the ID used for linking (if applicable)
      this.cell.hasLink = true; // Marks the item as having a link
    }

    /**
     * Retrieves the active class to be applied to the link when it's in an active state.
     * The active class is either taken from the object or the theme.
     * @returns {string} The active class name to be used.
     */
  }, {
    key: "getActiveClass",
    value: function getActiveClass() {
      this.activeClass = this.cell.activeClass || this.theme.MCActiveLink; // Determines the active class
      return this.activeClass;
    }

    /**
    * Sets the active class for the item if its name matches the object's active state
    * or if the current URL matches the object's path. This ensures the link item appears
    * visually active when appropriate.
    */
  }, {
    key: "setActiveClass",
    value: function setActiveClass() {
      var _this$obj, _this$obj2, _this$obj3, _this$obj4, _this$obj5;
      var isHome = ((_this$obj = this.obj) === null || _this$obj === void 0 ? void 0 : _this$obj.path) === "/" || ((_this$obj2 = this.obj) === null || _this$obj2 === void 0 ? void 0 : _this$obj2.path) === "/home"; // Define what qualifies as "home"

      var currentUrl = window.location.pathname; // Get the current URL path
      // Check if the home tab should be active
      if (isHome) {
        // Home should only be active if there's no additional path segment (or it's explicitly "/home")
        var pathSegments = currentUrl.split("/").filter(Boolean); // Remove empty segments
        if (pathSegments.length > 0 && pathSegments[0] !== "home") {
          return; // Do not apply the active class if another section is active
        }
      }
      if (((_this$obj3 = this.obj) === null || _this$obj3 === void 0 ? void 0 : _this$obj3.active) === ((_this$obj4 = this.obj) === null || _this$obj4 === void 0 ? void 0 : _this$obj4.name) || currentUrl.includes((_this$obj5 = this.obj) === null || _this$obj5 === void 0 ? void 0 : _this$obj5.path)) {
        // Checks if the object is active or the URL matches
        var activeClass = this.getActiveClass(); // Retrieves the active class
        activeClass = activeClass || ""; // Defaults to an empty string if no class is found
        this.item.setClass(this.item.getClass() + " " + activeClass); // Adds the active class to the item
      }
    }

    /**
     * Performs additional setup tasks for the LinkItem.
     * This includes setting the active class if needed.
     */
  }, {
    key: "additionalSetup",
    value: function additionalSetup() {
      this.setActiveClass(); // Calls setActiveClass to apply the active class if appropriate
    }

    /**
     * Retrieves the option text for the link item, which is typically its name.
     * @returns {string} The name of the object (or the link text).
     */
  }, {
    key: "getOption",
    value: function getOption() {
      var _this$props$obj;
      return (_this$props$obj = this.props.obj) === null || _this$props$obj === void 0 ? void 0 : _this$props$obj.name; // Returns the name of the object as the link text
    }
  }]);
}(_baseClass["default"]);
/**
 * TODO: Expand functionality to handle more complex linking scenarios (e.g., external links, conditional rendering).
 */