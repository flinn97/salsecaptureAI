"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _binder = require("../../serviceTech/Util/binder");
var _reactRouterDom = require("react-router-dom");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * HtmlBuilderBaseClass is a utility class to dynamically generate and manage HTML components using React.
 * It allows users to define the HTML element type, manage its properties, content, styles, and render it as a React component.
 */
var HtmlBuilderBaseClass = exports["default"] = /*#__PURE__*/function () {
  /**
   * Constructor to initialize the HtmlBuilderBaseClass instance.
   * @param {Object} obj - Initial properties and content for the HTML element.
   */
  function HtmlBuilderBaseClass(obj) {
    _classCallCheck(this, HtmlBuilderBaseClass);
    _binder.binder.bind(this);
    this.props = _objectSpread({}, obj);
    this.content = obj.content || '';
    this.type = "div";
  }

  /**
   * Sets the HTML element type (e.g., div, span, button).
   * @param {string} type - The type of the HTML element.
   */
  return _createClass(HtmlBuilderBaseClass, [{
    key: "setHtmlType",
    value: function setHtmlType(type) {
      this.type = type;
    }

    /**
     * Gets the current HTML element type.
     * @returns {string} - The type of the HTML element.
     */
  }, {
    key: "getHtmlType",
    value: function getHtmlType() {
      return this.type;
    }

    /**
     * Sets a specific property of the HTML element.
     * @param {string} name - The name of the property.
     * @param {*} val - The value of the property.
     */
  }, {
    key: "setProp",
    value: function setProp(name, val) {
      this.props[name] = val;
    }

    /**
     * Sets all properties of the HTML element.
     * @param {Object} p - The properties object.
     */
  }, {
    key: "setProps",
    value: function setProps(p) {
      this.props = _objectSpread({}, p);
      if (p.content) {
        this.content = p.content;
      }
    }

    /**
     * Updates properties of the HTML element by merging with existing properties.
     * @param {Object} p - The properties object to merge.
     */
  }, {
    key: "updateProps",
    value: function updateProps(p) {
      this.props = _objectSpread(_objectSpread({}, this.props), p);
      if (p.content) {
        this.content = p.content;
      }
    }

    /**
     * Adds properties to the HTML element.
     * @param {Object} p - The properties object to add.
     */
  }, {
    key: "addProps",
    value: function addProps(p) {
      this.props = _objectSpread(_objectSpread({}, this.props), p);
      if (p.content) {
        this.content = p.content;
      }
    }

    /**
     * Retrieves all properties of the HTML element.
     * @returns {Object} - The properties object.
     */
  }, {
    key: "getProps",
    value: function getProps() {
      return this.props;
    }

    /**
     * Retrieves a specific property of the HTML element.
     * @param {string} name - The name of the property.
     * @returns {*} - The value of the property.
     */
  }, {
    key: "getProp",
    value: function getProp(name) {
      return this.props[name];
    }

    /**
     * Sets the style object of the HTML element.
     * @param {Object} style - The style object.
     */
  }, {
    key: "setStyle",
    value: function setStyle(style) {
      this.props.style = style;
    }

    /**
     * Updates the style of the HTML element by merging with the existing style.
     * @param {Object} s - The style object to merge.
     */
  }, {
    key: "updateStyle",
    value: function updateStyle(s) {
      this.props.style = _objectSpread(_objectSpread({}, this.props.style), s);
    }

    /**
     * Retrieves the style object of the HTML element.
     * @returns {Object} - The style object.
     */
  }, {
    key: "getStyle",
    value: function getStyle() {
      return this.props.style;
    }

    /**
     * Sets the CSS class name of the HTML element.
     * @param {string} c - The class name.
     */
  }, {
    key: "setClass",
    value: function setClass(c) {
      this.props.className = c;
    }

    /**
     * Retrieves the CSS class name of the HTML element.
     * @returns {string} - The class name.
     */
  }, {
    key: "getClass",
    value: function getClass() {
      return this.props.className;
    }

    /**
     * Sets the onChange event handler of the HTML element.
     * @param {Function} onChange - The event handler function.
     */
  }, {
    key: "setOnChange",
    value: function setOnChange(onChange) {
      this.props.onChange = onChange;
    }

    /**
     * Sets the onClick event handler of the HTML element.
     * @param {Function} onClick - The event handler function.
     */
  }, {
    key: "setOnClick",
    value: function setOnClick(onClick) {
      this.props.onClick = onClick;
    }

    /**
     * Retrieves the onClick event handler of the HTML element.
     * @returns {Function} - The onClick event handler function.
     */
  }, {
    key: "getOnClick",
    value: function getOnClick() {
      return this.props.onClick;
    }

    /**
     * Sets the content of the HTML element.
     * @param {React.ReactNode} content - The content to set.
     */
  }, {
    key: "setContent",
    value: function setContent(content) {
      this.content = content;
    }

    /**
     * Retrieves the content of the HTML element.
     * @returns {React.ReactNode} - The content of the HTML element.
     */
  }, {
    key: "getContent",
    value: function getContent() {
      return this.content;
    }

    /**
     * Generates and returns the React component based on the current configuration.
     * @param {Object} obj - An object containing additional properties, content, or type to override.
     * @returns {React.ReactNode} - The generated React component.
     */
  }, {
    key: "getHtml",
    value: function getHtml(obj) {
      var content = obj.content,
        props = obj.props;
      var type = obj === null || obj === void 0 ? void 0 : obj.type;
      if (content) {
        this.content = content;
      }
      props = _objectSpread(_objectSpread({}, this.props), props);
      var types = {
        a: /*#__PURE__*/React.createElement("a", props, this.content),
        button: /*#__PURE__*/React.createElement("button", props, this.content),
        div: /*#__PURE__*/React.createElement("div", props, this.content),
        h1: /*#__PURE__*/React.createElement("h1", props, this.content),
        h2: /*#__PURE__*/React.createElement("h2", props, this.content),
        h3: /*#__PURE__*/React.createElement("h3", props, this.content),
        h4: /*#__PURE__*/React.createElement("h4", props, this.content),
        h5: /*#__PURE__*/React.createElement("h5", props, this.content),
        h6: /*#__PURE__*/React.createElement("h6", props, this.content),
        img: /*#__PURE__*/React.createElement("img", props),
        input: /*#__PURE__*/React.createElement("input", props),
        p: /*#__PURE__*/React.createElement("p", props, this.content),
        span: /*#__PURE__*/React.createElement("span", props, this.content),
        table: /*#__PURE__*/React.createElement("table", props, this.content),
        tr: /*#__PURE__*/React.createElement("tr", props, this.content),
        td: /*#__PURE__*/React.createElement("td", props, this.content),
        th: /*#__PURE__*/React.createElement("th", props, this.content),
        ul: /*#__PURE__*/React.createElement("ul", props, this.content),
        li: /*#__PURE__*/React.createElement("li", props, this.content),
        ol: /*#__PURE__*/React.createElement("ol", props, this.content),
        form: /*#__PURE__*/React.createElement("form", props, this.content),
        textarea: /*#__PURE__*/React.createElement("textarea", props, this.content),
        select: /*#__PURE__*/React.createElement("select", props, this.content),
        option: /*#__PURE__*/React.createElement("option", props, this.content),
        label: /*#__PURE__*/React.createElement("label", props, this.content),
        nav: /*#__PURE__*/React.createElement("nav", props, this.content),
        footer: /*#__PURE__*/React.createElement("footer", props, this.content),
        header: /*#__PURE__*/React.createElement("header", props, this.content),
        article: /*#__PURE__*/React.createElement("article", props, this.content),
        section: /*#__PURE__*/React.createElement("section", props, this.content),
        aside: /*#__PURE__*/React.createElement("aside", props, this.content),
        main: /*#__PURE__*/React.createElement("main", props, this.content),
        video: /*#__PURE__*/React.createElement("video", props, this.content),
        audio: /*#__PURE__*/React.createElement("audio", props, this.content),
        iframe: /*#__PURE__*/React.createElement("iframe", props, this.content),
        canvas: /*#__PURE__*/React.createElement("canvas", props, this.content),
        content: /*#__PURE__*/React.createElement(React.Fragment, null),
        fragment: /*#__PURE__*/React.createElement(React.Fragment, null, this.content),
        link: /*#__PURE__*/React.createElement(_reactRouterDom.Link, props, this.content)
      };
      if (type === "content" || this.type === "conent") {
        var Comp = this.content;
        types.content = /*#__PURE__*/React.createElement(Comp, props);
      }
      var component = type ? types[type] : types[this.type];
      return component;
    }
  }]);
}();