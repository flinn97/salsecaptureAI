"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _baseClass = _interopRequireDefault(require("../baseClass"));
var _mapComponentInterface = require("../mapComponentInterface");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
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
//model
/**
 * The LinkContainer class represents a container for links.
 * It manages a list of links, sets an active link, and renders the links using the MapComponent.
 */
var LinkContainer = exports["default"] = /*#__PURE__*/function (_BaseClass) {
  /**
   * Initializes the LinkContainer with the provided props.
   * Sets the item type to "div".
   * @param {Object} props - The properties passed to the component.
   */
  function LinkContainer(props) {
    var _this;
    _classCallCheck(this, LinkContainer);
    _this = _callSuper(this, LinkContainer, [props]); // Calls the parent class constructor
    _this.state.itemType = "div"; // Sets the item type to "div"
    return _this;
  }

  /**
   * Filters and returns the list of links from the provided cell's links.
   * Ignores links that do not have a name.
   * @returns {Array} The filtered list of links.
   */
  _inherits(LinkContainer, _BaseClass);
  return _createClass(LinkContainer, [{
    key: "getList",
    value: function getList() {
      this.list = this.props.cell.links.filter(function (obj) {
        return (obj === null || obj === void 0 ? void 0 : obj.name) !== undefined;
      }); // Filters links with a name
      return this.list; // Returns the filtered list
    }

    /**
     * Sets the active link by searching for the link with path "/" and marking it as the home link.
     * Marks all other links as inactive and sets the home link as active.
     */
  }, {
    key: "getHome",
    value: function getHome() {
      if (!this.state.active) {
        // If no active link has been set
        this.home = this.list.find(function (obj) {
          return obj.path === "/";
        }); // Find the link with path "/"
        var _iterator = _createForOfIteratorHelper(this.list),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _this$home;
            var l = _step.value;
            l.active = (_this$home = this.home) === null || _this$home === void 0 ? void 0 : _this$home.name; // Set the home link as active for all links
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }

    /**
     * Filters and returns the list of links to be displayed.
     * It excludes links that have no name or are explicitly set to not display.
     * Then it renders these links using the MapComponent, which handles the rendering of each link item.
     * @returns {JSX.Element} The JSX element representing the rendered list of links.
     */
  }, {
    key: "getOption",
    value: function getOption() {
      var _this2 = this;
      var list = this.props.cell.links.filter(function (obj) {
        return (obj === null || obj === void 0 ? void 0 : obj.name) !== undefined && obj.display !== false;
      }); // Filter links to display
      return /*#__PURE__*/React.createElement(_mapComponentInterface.MapComponent, {
        list: list,
        theme: this.cell.linksTheme || "links",
        mapSectionClass: this.props.cell.linkSectionClass || undefined,
        mapSectionStyle: this.props.cell.linkSectionStyle || undefined,
        cells: [{
          type: "linkItem",
          "class": this.props.cell.linkItemClass || undefined,
          style: this.props.cell.linkItemStyle || undefined,
          linkClick: function linkClick(obj) {
            // Handles the click event for each link
            var _iterator2 = _createForOfIteratorHelper(_this2.props.cell.links),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var l = _step2.value;
                l.active = obj === null || obj === void 0 ? void 0 : obj.name; // Sets the clicked link as active
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
            _this2.setState({
              active: obj === null || obj === void 0 ? void 0 : obj.name
            }); // Updates the active link in the state
          }
        }]
      });
    }

    /**
     * Additional setup for the LinkContainer component.
     * This includes calling the getList and getHome methods to set up the links and the active state.
     */
  }, {
    key: "additionalSetup",
    value: function additionalSetup() {
      this.getList(); // Retrieves the list of links
      this.getHome(); // Sets the home link and active state
    }
  }]);
}(_baseClass["default"]);