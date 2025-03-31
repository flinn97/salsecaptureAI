"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _baseClass = _interopRequireDefault(require("./baseClass"));
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
//this could be updated to use the baseclass getHtml
var MapComponentItem = exports["default"] = /*#__PURE__*/function (_BaseClass) {
  /**
   * Constructor initializes the component with props, sets up initial functions, 
   * and defines the default types and state properties.
   * @param {Object} props - The props passed to the component.
   */
  function MapComponentItem(props) {
    var _this;
    _classCallCheck(this, MapComponentItem);
    _this = _callSuper(this, MapComponentItem, [props]); // Calls the parent constructor

    // Adds functions to the initial setup sequence
    _this.initialPropsSetupFunctions = [].concat(_toConsumableArray(_this.initialPropsSetupFunctions), [_this.setList, _this.setFactory]);

    // Sets up the state properties specific to this component
    _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
      mapContainerClass: "MCMapContainer",
      // Class for the map container
      "interface": "map",
      // Type of interface, set to "map"
      mapSectionClass: "MCMapSection" // Class for the map section
    });

    // Defines default types for map components
    _this.defaultTypes = ["del", "edit", "img"];
    return _this;
  }

  /**
   * Initializes the factory property by retrieving the factory from the interface.
   */
  _inherits(MapComponentItem, _BaseClass);
  return _createClass(MapComponentItem, [{
    key: "setFactory",
    value: function setFactory() {
      this.factory = this["interface"].getFactory(); // Retrieves the factory for map components
    }

    /**
     * Returns the default types of components that can be created.
     * @returns {Array} List of default types ["del", "edit", "img"]
     */
  }, {
    key: "getDefaultTypes",
    value: function getDefaultTypes() {
      return this.defaultTypes; // Returns the array of default types
    }

    /**
     * Checks if a cell matches any of the default types and returns the matching type if found.
     * @param {Object} cell - The cell object to check.
     * @returns {string|undefined} - The matching default type or undefined if not found.
     */
  }, {
    key: "checkCellForDefaults",
    value: function checkCellForDefaults(cell) {
      var arr = this.getDefaultTypes(); // Retrieves default types
      return arr[arr.indexOf(cell)]; // Checks and returns matching type
    }

    /**
     * Determines if the value of a cell is text or an attribute.
     * @param {Object} obj - The object containing the data.
     * @param {Object} cell - The cell object to check.
     * @returns {string} - "attribute" if the cell has an attribute, "text" otherwise.
     */
  }, {
    key: "textOrAttribute",
    value: function textOrAttribute(obj, cell) {
      var type = obj.getJson && obj !== null && obj !== void 0 && obj.getJson()[cell] ? "attribute" : "text"; // Determines type based on whether it's an attribute or text
      return type; // Returns the type as "attribute" or "text"
    }

    /**
     * Determines the type of a cell, either using its defined type, checking defaults,
     * or determining if it should be treated as text or attribute.
     * @param {Object} cell - The cell object to determine the type for.
     * @param {Object} obj - The object that may contain the cell data.
     * @returns {string} - The type of the cell (either from its type, defaults, or based on text/attribute).
     */
  }, {
    key: "getType",
    value: function getType(cell, obj) {
      var type = cell.type; // Retrieves the type of the cell

      //this stuff is all because we want them to be able to send in text sometimes instead of an obj. So its not important code.
      if (!type) {
        type = this.checkCellForDefaults(cell); // If no type, check for defaults
        if (!type) {
          type = this.textOrAttribute(obj, cell); // If still no type, determine if it's text or an attribute
        }
      }
      return type; // Returns the determined type
    }

    /**
     * Creates the props object to be passed to a component, including the obj, interface, cell, and theme.
     * @param {Object} cell - The cell for which props are being created.
     * @param {Object} obj - The object to be passed to the component.
     * @returns {Object} - The props object for the component.
     */
  }, {
    key: "getProps",
    value: function getProps(cell, obj) {
      var p = _objectSpread(_objectSpread({
        obj: obj
      }, this.props), {}, {
        "interface": this["interface"],
        cell: cell,
        theme: this.props.theme
      });
      return p; // Returns the constructed props object
    }

    /**
     * Generates a list of cell components based on the cells array from props,
     * passing appropriate props to each component via the factory.
     * @param {Object} obj - The object to be used in the components.
     * @returns {JSX.Element} - A JSX element containing the list of cell components.
     */
  }, {
    key: "getCellList",
    value: function getCellList(obj) {
      var _this2 = this;
      var cells = this.props.cells; // Retrieves the list of cells from props

      return /*#__PURE__*/React.createElement(React.Fragment, null, cells.map(function (cell, i) {
        var type = _this2.getType(cell, obj); // Determines the type of each cell
        var p = _this2.getProps(cell, obj); // Retrieves the props for each cell
        return /*#__PURE__*/React.createElement(React.Fragment, null, _this2.factory.getComponent(type, p)); // Gets the component from the factory based on the type and props
      })); // Maps over the cells and returns the corresponding components
    }

    /**
     * Generates the HTML for the list by mapping over the list and passing each object 
     * to `mapSection.getHtml`, which creates the necessary structure.
     * @returns {JSX.Element} - The JSX representing the list of map sections.
     */
  }, {
    key: "getListHtml",
    value: function getListHtml() {
      var _this3 = this;
      return /*#__PURE__*/React.createElement(React.Fragment, null, this.list.map(function (obj) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, _this3.mapSection.getHtml({
          type: "div",
          content: _this3.getCellList(obj)
        }));
      })); // Maps over the list and generates the HTML for each map section
    }

    /**
     * Sets the list property by extracting the list from props.
     */
  }, {
    key: "setList",
    value: function setList() {
      this.list = this.props.list; // Sets the list from the props
    }

    /**
     * Pre-setup function that adds component setup steps to the initialization process.
     * It ensures that the required components (mapContainer, mapSection, link) are set up.
     */
  }, {
    key: "preSetup",
    value: function preSetup() {
      this.setComponents(["mapContainer", "mapSection", "link"]); // Initializes the components for the map container, section, and link
    }

    /**
     * Generates the HTML content for the component by retrieving the HTML for the map container
     * and passing the list HTML as its content.
     * @returns {JSX.Element} - The final HTML structure for the map component.
     */
  }, {
    key: "getHtml",
    value: function getHtml() {
      var html = this.mapContainer.getHtml({
        type: "div",
        content: this.getListHtml()
      }); // Gets the HTML for the map container
      this.html = /*#__PURE__*/React.createElement(React.Fragment, null, html); // Stores the generated HTML in the `html` property
      return this.html; // Returns the final HTML content
    }
  }]);
}(_baseClass["default"]);