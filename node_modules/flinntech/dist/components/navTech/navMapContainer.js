"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mapComponentInterface = require("../mapTech/mapComponentInterface");
var _BaseComponent2 = _interopRequireDefault(require("../templateTech/baseClasses/BaseComponent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var NavMapContainer = /*#__PURE__*/function (_BaseComponent) {
  /**
   * Constructor initializes state and sets up the props setup functions.
   * It also binds the `getNavLists` method to the list of initial props setup functions.
   * @param {Object} props - The properties passed to the component.
   */
  function NavMapContainer(props) {
    var _this;
    _classCallCheck(this, NavMapContainer);
    _this = _callSuper(this, NavMapContainer, [props]); // Call the base class constructor to set up the component
    // Adding the `getNavLists` function to the initial setup functions list
    _this.initialPropsSetupFunctions = [].concat(_toConsumableArray(_this.initialPropsSetupFunctions), [_this.getNavLists]);
    _this.state = {}; // Initialize state (no specific state properties in the constructor)
    return _this;
  }

  /**
   * Retrieves the links from either props or the app's state.
   * @returns {Array} - The links to be used by the navigation component.
   */
  _inherits(NavMapContainer, _BaseComponent);
  return _createClass(NavMapContainer, [{
    key: "getLinks",
    value: function getLinks() {
      var _this$props$app;
      // Check if links are provided through props; otherwise, get them from the app's state
      return this.props.links ? this.props.links : (_this$props$app = this.props.app) === null || _this$props$app === void 0 || (_this$props$app = _this$props$app.state) === null || _this$props$app === void 0 ? void 0 : _this$props$app.routes;
    }

    /**
     * Returns the default navigation item object for a given type.
     * @param {string} type - The type of navigation item (e.g., "logo", "links", "logout").
     * @returns {Object} - The object containing properties for the navigation item.
     */
  }, {
    key: "getDefaultNavItem",
    value: function getDefaultNavItem(type) {
      // Creates an object with default properties based on the type of navigation item
      var typeObs = {
        logo: _objectSpread({
          imgSrc: this.props.logoURL,
          label: this.props.logoLabel
        }, this.props),
        links: _objectSpread(_objectSpread({
          links: this.getLinks()
        }, this.props), {}, {
          "class": "fit"
        }),
        logout: _objectSpread({
          logoutFunc: this.props.logoutFunc,
          auth: this.props.auth,
          wrapperClass: "SB-logout"
        }, this.props)
      };
      return typeObs[type]; // Return the corresponding item based on the type
    }

    /**
     * Builds the navigation list, updating it with default items if necessary.
     * Filters out the "links" item if the `type` is "topBar".
     * @returns {Array} - The list of navigation items.
     */
  }, {
    key: "getList",
    value: function getList() {
      // Retrieves the navigation list from props or defaults to the navList prop
      var navList = this.props.navList;
      var list = navList.getList(); // Get the list of navigation items

      // Loop through the list and set default items for each navigation item type
      for (var i = 0; i < list.length; i++) {
        if (list[i]["default"]) {
          var obj = this.getDefaultNavItem(list[i].type); // Get the default properties for the item
          obj.type = list[i].type; // Ensure the type matches the item type
          navList.update(i, obj); // Update the item in the list with default properties
        }
      }

      // If the type is "topBar", remove the "links" item from the list
      if (this.props.type === "topBar") {
        list = list.filter(function (obj) {
          return obj.type !== "links";
        });
      }
      return list; // Return the final navigation list
    }

    /**
     * Generates the HTML for the component using the `MapComponent` with the required properties.
     * @returns {JSX.Element} - The rendered MapComponent with appropriate props.
     */
  }, {
    key: "getHtml",
    value: function getHtml() {
      // Return the MapComponent with the necessary props such as `theme`, `list`, `cells`, etc.
      return /*#__PURE__*/React.createElement(_mapComponentInterface.MapComponent, _extends({
        theme: this.props.mapTheme,
        list: this.mapList,
        cells: this.list
      }, this.props.navMapProps));
    }

    /**
     * Retrieves the navigation lists either from props or by generating them using `getList`.
     * Also sets the map list, either from props or defaults to an empty object.
     */
  }, {
    key: "getNavLists",
    value: function getNavLists() {
      // Get the list from props or build it using the `getList` function
      this.list = this.props.list ? this.props.list : this.getList();
      // Set the map list from props or default to an empty object
      this.mapList = this.props.mapList ? this.props.mapList : [{}];
    }
  }]);
}(_BaseComponent2["default"]);
var _default = exports["default"] = NavMapContainer;