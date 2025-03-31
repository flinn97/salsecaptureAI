"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _baseClass = _interopRequireDefault(require("../baseClass"));
var _mapComponentInterface = require("../mapComponentInterface");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
 * The InnerMap class is a component that handles the display of a map interface,
 * including an option to expand or collapse the map display.
 * It extends from BaseClass and manages the display state and layout of the map.
 */
var InnerMap = exports["default"] = /*#__PURE__*/function (_BaseClass) {
  /**
   * Initializes the InnerMap component with default state values.
   * @param {Object} props - The properties passed to the component.
   */
  function InnerMap(props) {
    var _this;
    _classCallCheck(this, InnerMap);
    _this = _callSuper(this, InnerMap, [props]);
    _this.state.displayState = false; // State that controls whether the map is displayed or not
    _this.state.itemType = "div"; // Default item type (used for the container element)
    return _this;
  }

  /**
   * Renders an option to display or collapse the map.
   * This is represented as an arrow that toggles the display state.
   * @returns {JSX.Element} The rendered display option (an arrow).
   */
  _inherits(InnerMap, _BaseClass);
  return _createClass(InnerMap, [{
    key: "displayOption",
    value: function displayOption() {
      var _this2 = this;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          position: 'absolute',
          left: "0px",
          top: "0px"
        },
        className: this.state.displayState ? "downward-arrow" : "right-arrow",
        onClick: function onClick() {
          // Toggle the map display and adjust the wrapper's height
          _this2.wrapper.setStyle(_objectSpread(_objectSpread({}, _this2.wrapper.getStyle()), {}, {
            height: "200px"
          }));
          _this2.setState({
            displayState: !_this2.state.displayState
          }); // Toggle display state
        }
      });
    }

    /**
     * Renders the map component, passing necessary properties for its display.
     * The map is filtered based on the attribute and the current object ID.
     * @returns {JSX.Element} The rendered MapComponent.
     */
  }, {
    key: "mapOption",
    value: function mapOption() {
      var map = /*#__PURE__*/React.createElement(_mapComponentInterface.MapComponent, {
        name: this.props.name,
        filter: {
          attribute: this.props.filter.attribute,
          search: this.obj.getJson()._id
        },
        cells: _toConsumableArray(this.props.cells)
      });
      return map;
    }

    /**
     * Performs additional setup after the component is initialized.
     * In this case, it adjusts the position style of the item container.
     */
  }, {
    key: "additionalPostSetup",
    value: function additionalPostSetup() {
      this.item.setStyle(_objectSpread(_objectSpread({}, this.item.getStyle()), {}, {
        position: "relative"
      }));
    }

    /**
     * Renders the final map option container, including the display option and the map itself if visible.
     * The map is only displayed when the displayState is true.
     * @returns {JSX.Element} The rendered container for the map and its display option.
     */
  }, {
    key: "getOption",
    value: function getOption() {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          position: 'absolute',
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: 'column'
        }
      }, this.displayOption(), "  ", this.state.displayState && this.mapOption(), "  ");
    }
  }]);
}(_baseClass["default"]);