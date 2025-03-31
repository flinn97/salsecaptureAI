"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _BaseComponent2 = _interopRequireDefault(require("../templateTech/baseClasses/BaseComponent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
/**
 * This is the base class for map component items that go into a <MapComponent /> tag. 
 */
var BaseClass = exports["default"] = /*#__PURE__*/function (_BaseComponent) {
  function BaseClass(props) {
    var _this;
    _classCallCheck(this, BaseClass);
    _this = _callSuper(this, BaseClass, [props]);

    // Initial setup functions for props
    _this.initialPropsSetupFunctions = [].concat(_toConsumableArray(_this.initialPropsSetupFunctions), [_this.setCell, _this.getUseId]);

    // Component state
    _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
      defaultTheme: "defaultColumn",
      "interface": "map",
      wrapperClass: "MCCell",
      linkClass: "MCLink"
    });
    _this.setItemPropsRan = false;
    return _this;
  }

  /**
   * Sets the cell property from props.
   */
  _inherits(BaseClass, _BaseComponent);
  return _createClass(BaseClass, [{
    key: "setCell",
    value: function setCell() {
      this.cell = this.props.cell;
    }

    /**
     * Prepares components before setup.
     */
  }, {
    key: "preSetup",
    value: function preSetup() {
      this.setComponents(["link", "wrapper", "item", "option"]);
    }

    /**
     * Sets properties for the item component.
     */
  }, {
    key: "setitemprops",
    value: function setitemprops() {
      var json = _objectSpread(_objectSpread({}, this.createPropObj("item", "cell")), {}, {
        className: this.cell["class"] || this.theme[this.state.classKey],
        style: this.cell.style
      });
      if (this.cell.itemClick) {
        json.checkItemClick = true;
      }
      if (!this.setItemPropsRan) {
        this.builderObserver.subscribe(json);
        this.setItemPropsRan = true;
      } else {
        this.item.setProps(json);
      }
    }

    /**
     * Sets properties for the wrapper component.
     */
  }, {
    key: "setwrapperprops",
    value: function setwrapperprops() {
      var json = _objectSpread({}, this.createPropObj("wrapper", "cell"));
      if (!this.setWrapperPropsRan) {
        this.builderObserver.subscribe(json);
        this.setWrapperPropsRan = true;
      } else {
        this.wrapper.setProps(json);
      }
    }

    /**
     * Returns an empty option element.
     */
  }, {
    key: "getOption",
    value: function getOption() {
      return /*#__PURE__*/React.createElement(React.Fragment, null);
    }

    /**
     * Retrieves the useId based on the cell properties and JSON data.
     */
  }, {
    key: "getUseId",
    value: function getUseId() {
      if (this.cell) {
        if (this.obj.getJson) {
          this.useId = this.cell.useId === false ? "" : this.cell.useId === undefined ? this.obj.getJson()._id : this.obj.getJson()[this.cell.useId];
        }
      }
      return this.useId;
    }

    /**
     * Generates the inner content for rendering.
     */
  }, {
    key: "getInnerContent",
    value: function getInnerContent() {
      this.innerContent = [this.item.getHtml({
        type: this.state.itemType || "span",
        content: this.getOption()
      })];
      return this.innerContent;
    }

    /**
     * Constructs the link URL based on cell properties.
     */
  }, {
    key: "getLinkUrl",
    value: function getLinkUrl() {
      var _this$cell, _this$obj;
      var url = (_this$cell = this.cell) !== null && _this$cell !== void 0 && _this$cell.to ? this.cell.to : "/".concat((_this$obj = this.obj) === null || _this$obj === void 0 || (_this$obj = _this$obj.getJson()) === null || _this$obj === void 0 ? void 0 : _this$obj.type, "/").concat(this.useId);
      return url;
    }

    /**
     * Sets up link click functionality.
     */
  }, {
    key: "getLinkFunc",
    value: function getLinkFunc() {
      var _this2 = this;
      if (this.cell.forceUpdate) {
        var func = function func() {
          _this2.dispatch({
            forceUpdate: _this2.cell.forceUpdate
          });
        };
        this.link.setOnClick(func);
      }
      if (this.cell.linkClick) {
        var _func = function _func() {
          _this2.cell.linkClick(_this2.obj);
          if (_this2.cell.forceUpdate) {
            _this2.dispatch({
              forceUpdate: _this2.cell.forceUpdate
            });
          }
        };
        this.link.setOnClick(_func);
      }
    }

    /**
     * Generates and returns the HTML representation of the component.
     */
  }, {
    key: "getHtml",
    value: function getHtml() {
      var _this$cell2;
      this.mapInnerContent();
      this.getLinkFunc();
      if (this.cell.type === "backgroundImage") {
        // Additional handling for background images (currently empty)
      }
      var html = !((_this$cell2 = this.cell) !== null && _this$cell2 !== void 0 && _this$cell2.hasLink) ? this.wrapper.getHtml({
        type: this.state.wrapperType || "span",
        content: this.innerContent
      }) : this.link.getHtml({
        type: this.state.linkType || "link",
        content: this.innerContent,
        props: {
          to: this.getLinkUrl()
        }
      });
      this.html = /*#__PURE__*/React.createElement(React.Fragment, null, html);
      return this.html;
    }
  }]);
}(_BaseComponent2["default"]);
/**
 * change themes for every individual cell
 * create refs and more click/change events.
 * be able to change the cell and link styles/classes depending on what gets sent int.[cell1:cell1theme, cell2:cell2theme etc.]
 */