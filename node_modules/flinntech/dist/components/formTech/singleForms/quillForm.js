"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactQuill = _interopRequireDefault(require("react-quill"));
require("react-quill/dist/quill.snow.css");
var _react = _interopRequireDefault(require("react"));
var _inputBaseClass = _interopRequireDefault(require("../inputBaseClass"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
// import './snowDark.css';
/**
 * Quill form
 */
var QuillForm = exports["default"] = /*#__PURE__*/function (_InputBaseClass) {
  function QuillForm(props) {
    var _this;
    _classCallCheck(this, QuillForm);
    _this = _callSuper(this, QuillForm, [props]);
    _this.quillRef = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }

  /**
   * 
   * @returns form for using quil library
   */
  _inherits(QuillForm, _InputBaseClass);
  return _createClass(QuillForm, [{
    key: "getFormHtml",
    value: function getFormHtml() {
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_reactQuill["default"], {
        ref: this.quillRef,
        modules: {
          toolbar: [['bold', 'italic', 'underline',
          // 'strike', 
          'blockquote'], [{
            'color': ["#F4F5F8", "#E6FFFD", "#99AFD1", "#ecd23a", "#fd5259", "#D7ABF7", "#9EFFA0", "#F4F5F888", "#E6FFFD77", "#99AFD188", "#ecd23a88", "#fd525988", "#D7ABF788", "#9EFFA088", "#000000", "#E6FFFD44", "#99AFD155", "#ecd23a55", "#fd525955", "#D7ABF755", "#9EFFA055"]
          }, {
            'background': [false, "black", "#00274D", "#C1A71B", "#5F0C0C", "#4B0082", "#002E07"]
          }], [, 'code-block'], [{
            'list': 'ordered'
          }, {
            'list': 'bullet'
          }, {
            'align': []
          }],
          // superscript/subscript
          [{
            'indent': '-1'
          }, {
            'indent': '+1'
          }],
          // text direction
          // [{ 'header': [false, 1, 2, 3] }],
          [{
            'size': ['small', false, 'large', 'huge']
          }],
          // [],['link'], // Link insertion
          [], ['clean']
          // remove formatting button
          ]
        },
        style: this.props.wrapperStyle ? _objectSpread({}, this.props.wrapperStyle) : {
          minHeight: "100%",
          padding: "8px",
          minWidth: "99%",
          width: "100%"
        },
        theme: "snow",
        value: this.obj[0].getJson()[this.props.name],
        onChange: this.objDispatch
      }));
    }
  }]);
}(_inputBaseClass["default"]);
/**
 * this component needs work.
 * bug: wierd space added every time refresh.
 */