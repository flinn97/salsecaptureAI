"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapInterface = exports.SearchMapComponent = exports.MapComponentInterface = exports.MapComponent = void 0;
var _itemTypeFactory = _interopRequireDefault(require("./itemTypeFactory"));
var _react = require("react");
var _themeFactory = _interopRequireDefault(require("./themes/themeFactory"));
var _filterFacotry = _interopRequireDefault(require("./filterFacotry"));
var _BaseComponent = _interopRequireDefault(require("../templateTech/baseClasses/BaseComponent"));
var _interfaceBaseClass = _interopRequireDefault(require("../templateTech/baseClasses/interfaceBaseClass"));
var _interfaceComponentBaseClass = _interopRequireDefault(require("../templateTech/baseClasses/interfaceComponentBaseClass"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
var MapComponentInterface = exports.MapComponentInterface = /*#__PURE__*/function (_BaseInterface) {
  function MapComponentInterface() {
    var _this;
    _classCallCheck(this, MapComponentInterface);
    _this = _callSuper(this, MapComponentInterface);
    _defineProperty(_this, "FilterFactory", void 0);
    _this.getFilterFactory();
    _this.mainFunc = _this.getMapComponent;
    return _this;
  }

  /**
   
   * @returns factory for map items
   */
  _inherits(MapComponentInterface, _BaseInterface);
  return _createClass(MapComponentInterface, [{
    key: "getFactory",
    value: function getFactory() {
      if (this.factory === undefined) {
        this.factory = new _itemTypeFactory["default"]();
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
     * 
     * @returns singleton filter factory;
     */
  }, {
    key: "getFilterFactory",
    value: function getFilterFactory() {
      if (this.filterFactory === undefined) {
        this.filterFactory = new _filterFacotry["default"]();
      }
      return this.filterFactory;
    }

    /**
     * 
     * @param {*} props 
     * @param {*} type 
     * @returns Map component for ui mapping of objs
     */
  }, {
    key: "getMapComponent",
    value: function getMapComponent(props, type) {
      type = type || "default";
      var map = this.factory.getComponent(type, props);
      return map;
    }
  }]);
}(_interfaceBaseClass["default"]);
var MapComponent = exports.MapComponent = /*#__PURE__*/function (_InterfaceComponentBa) {
  /**
   * Constructor initializes the state and sets the interface to `mapInterface`.
   * @param {Object} props - The props passed to the component.
   */
  function MapComponent(props) {
    var _this2;
    _classCallCheck(this, MapComponent);
    _this2 = _callSuper(this, MapComponent, [props]); // Calls the parent constructor
    _this2.state = {
      type: "map" // Sets the type to "map"
    };
    _this2["interface"] = mapInterface; // Initializes the interface to mapInterface
    return _this2;
  }

  /**
   * Sets up the filter information by initializing the filter factory, filters, 
   * and the filter function from the component props.
   */
  _inherits(MapComponent, _InterfaceComponentBa);
  return _createClass(MapComponent, [{
    key: "setFilterInfo",
    value: function setFilterInfo() {
      this.filterFacotry = this["interface"].getFilterFactory(); // Sets the filter factory from the interface
      this.filters = this.props.filters; // Gets the filters from props
      this.filterFunc = this.props.filterFunc; // Gets the filter function from props
      this.filter = this.props.filter; // Gets the filter object from props
    }

    /**
     * Sets the filter function (`filterFunc`) if it hasn't been set already,
     * by searching for a filter of type "filterFunc" from the `filters` array.
     */
  }, {
    key: "getFilterFunc",
    value: function getFilterFunc() {
      if (!this.filterFunc && this.filters !== undefined) {
        var _this$filters;
        var funcOb = (_this$filters = this.filters) === null || _this$filters === void 0 ? void 0 : _this$filters.find(function (obj) {
          return obj.type === "filterFunc";
        }); // Searches for a filter function
        if (funcOb) {
          this.filterFunc = funcOb.func; // Sets the filter function if found
        }
      }
    }

    /**
     * Sets the filter object (`filter`) if it hasn't been set already,
     * by searching for a filter of type "filter" from the `filters` array.
     */
  }, {
    key: "getFilter",
    value: function getFilter() {
      if (!this.filter && this.filters !== undefined) {
        var _this$filters2;
        var filterOb = (_this$filters2 = this.filters) === null || _this$filters2 === void 0 ? void 0 : _this$filters2.find(function (obj) {
          return obj.type === "filter";
        }); // Searches for a filter
        if (filterOb) {
          this.filter = _objectSpread({}, filterOb); // Sets the filter object if found
        }
      }
    }

    /**
     * Initializes the list by checking for the `list` prop or using the `filter`
     * to retrieve the list using the component list's `getList` method.
     */
  }, {
    key: "getList",
    value: function getList() {
      var _this$componentList, _this$filter, _this$filter2, _this$componentList2;
      var name = this.props.name; // Gets the name from props
      this.list = this.props.list ? this.props.list : this.filter ? (_this$componentList = this.componentList) === null || _this$componentList === void 0 ? void 0 : _this$componentList.getList(name, (_this$filter = this.filter) === null || _this$filter === void 0 ? void 0 : _this$filter.search, (_this$filter2 = this.filter) === null || _this$filter2 === void 0 ? void 0 : _this$filter2.attribute) : (_this$componentList2 = this.componentList) === null || _this$componentList2 === void 0 ? void 0 : _this$componentList2.getList(name);
      // If a list is provided, use it, otherwise retrieve the list based on the filter or just by name
    }

    /**
     * Filters the list using the `filterFunc` function if it exists.
     * If no `filterFunc` is defined, the list is left unchanged.
     */
  }, {
    key: "filterListByFilterFunc",
    value: function filterListByFilterFunc() {
      var _this3 = this;
      if (this.list) {
        this.list = this.list.filter(function (obj) {
          if (_this3.filterFunc) {
            return _this3.filterFunc(obj); // Filters the list using the filter function if it exists
          } else {
            return true; // If no filter function, keeps all items
          }
        });
      }
    }

    /**
     * Filters the list using the filter factory by applying each filter from the `filters` array.
     * The filters are applied sequentially to the list.
     */
  }, {
    key: "filterListByFilterFactory",
    value: function filterListByFilterFactory() {
      if (this.filters) {
        var _iterator = _createForOfIteratorHelper(this.filters),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var obj = _step.value;
            var func = this.filterFacotry.getFilter(obj.type); // Retrieves the filter function from the factory
            if (func) {
              this.list = func(_objectSpread({
                list: this.list
              }, obj)); // Applies the filter function to the list
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }

    /**
     * Sets the props for the component, including the `cells` and the filtered list.
     */
  }, {
    key: "setProps",
    value: function setProps() {
      var cells = this.props.cells; // Retrieves the cells from props
      this.addToProps = {
        cells: cells,
        list: this.list
      }; // Adds cells and list to the props
    }

    /**
     * Pre-setup function that adds filter-related setup functions to the initial setup.
     * These functions are run before the component is fully set up.
     */
  }, {
    key: "componentPreSetup",
    value: function componentPreSetup() {
      this.addToInitialSetup = [this.setFilterInfo,
      // Sets filter information
      this.getFilterFunc,
      // Retrieves the filter function
      this.getFilter,
      // Retrieves the filter object
      this.getList,
      // Initializes the list
      this.filterListByFilterFunc,
      // Filters the list by filter function
      this.filterListByFilterFactory // Filters the list by filter factory
      ];
    }
  }]);
}(_interfaceComponentBaseClass["default"]);
/**
 * allows for a mapcomponent to have a search bar to filter it.
 */
var SearchMapComponent = exports.SearchMapComponent = /*#__PURE__*/function (_Component) {
  function SearchMapComponent(props) {
    var _this4;
    _classCallCheck(this, SearchMapComponent);
    _this4 = _callSuper(this, SearchMapComponent, [props]);
    _this4.state = {};
    return _this4;
  }
  _inherits(SearchMapComponent, _Component);
  return _createClass(SearchMapComponent, [{
    key: "render",
    value: function render() {
      var _this5 = this;
      var mapComponentInterface = mapInterface;
      var app = this.props.app ? this.props.app : mapComponentInterface.getApp();
      var componentList = mapComponentInterface === null || mapComponentInterface === void 0 ? void 0 : mapComponentInterface.getComponentList();
      var name = this.props.name;
      var attribute = this.props.attribute;
      var list = this.props.list ? this.props.list : componentList.getList(name);
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "row"
        }
      }, this.props.imgLeft && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginRight: "-41px"
        }
      }, /*#__PURE__*/React.createElement("img", {
        src: this.props.imgLeft,
        style: {
          width: "32px",
          height: "32px",
          opacity: "71%"
        }
      })), /*#__PURE__*/React.createElement("input", {
        autocomplete: "off",
        name: attribute,
        placeholder: this.props.placeholder ? this.props.placeholder : "Search...",
        style: this.props.style ? this.props.style : {
          width: "120px"
        },
        "class": this.props["class"] ? this.props["class"] : "flinntechInput",
        onChange: function onChange(e) {
          var _e$target = e.target,
            name = _e$target.name,
            value = _e$target.value;
          if (_this5.props.onTextChange) {
            _this5.props.onTextChange(e);
          } else {
            list = list.filter(function (obj) {
              return obj.getJson()[attribute].includes(value);
            });
            app.dispatch({
              searchTags: _toConsumableArray(list)
            });
          }
          if (_this5.props.callBackFunc) {
            _this5.props.callBackFunc(e, {
              list: list,
              attribute: attribute,
              name: name
            });
          }
        }
      }));
    }
  }]);
}(_react.Component);
var mapInterface = exports.mapInterface = new MapComponentInterface();

/**

 * TODO: TEST if I can create mulitple classes to add to the factory. and test adding different themes.
 * test everythingP
 * Test filtering
 * create other really cool map options.
 *  Create a new map type that allows for any type a list. (non getJson lists are fine. components that use them)
 * refactor the mapComponent so that we can use multiple and also make it so that we don't have to change two things all at once. also it needs to have style ability
 * Also refactor css so that things that are the same can be in one spot
 * Check for null pointers everywhere so people can put in whatever.
 * setup so that individual things can be setup with a different theme then the rest of the map *
 * set up searchMapComponent to be set up with themes *
 * make a component for zoom in zoom out and then use the type.
 * searchcomponent needs to be more refined to work with all sorts of searches
 * make it so that you can do dropdown search
 * make it so interactive map does not need pin type if they provide an object
 * The props do not update in the map component. Either we need to add an observer it can't be done that way. * This actually can't be done on the react side. So temporarily we will add the ability to pass in app as a prop.
 * selector item
 * html should be returned by a function.
 */