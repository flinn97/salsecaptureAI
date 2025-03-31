"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * factory for getting different items for the map component
 */
var FilterFactory = exports["default"] = /*#__PURE__*/function () {
  function FilterFactory() {
    _classCallCheck(this, FilterFactory);
    _defineProperty(this, "factory", {
      text: textAttributeFilter,
      tag: filterByTag,
      plain: textFilter,
      textAndTag: filterByTextThenTitle,
      textAndTag2: filterByTitleThenTagText,
      bool: filterByBool,
      textAttributeList: consistentlyFilterByTextAttributeList
    });
  }
  return _createClass(FilterFactory, [{
    key: "getFilter",
    value:
    /**
     * get a map item
     * @param {*} type 
     * @param {*} obj 
     * @returns a react item for the map
     */
    function getFilter(type) {
      if (type) {
        return this.factory[type];
      }
    }

    /**
     * register a new map component.
     * @param {*} type 
     * @param {*} comp 
     */
  }, {
    key: "registerFilter",
    value: function registerFilter(type, filter) {
      this.factory[type] = filter;
    }
  }]);
}();
/**
 * 
 * @param {*} json 
 * @returns list of tag filtered data tags would be objs
 */
function filterByTag(json) {
  var list = json.list,
    attribute = json.attribute,
    tagList = json.tagList;
  if (list.length > 0) {
    list = list.filter(function (obj) {
      var bool = tagList.find(function (tag) {
        var tagConnect = !attribute ? tag.getJson().connectedId : tag.getJson()[attribute];
        return tagConnect === obj.getJson()._id;
      });
      if (bool) {
        return true;
      } else {
        return false;
      }
    });
  }
  return list;
}

/**
 * 
 * @param {*} json 
 * @returns filtered list of items by tags that come in as text comma seperated
 */
function filterByTagText(json) {
  var list = [];
  if (json.search && json.list) {
    // Check if search and list are provided
    var tags = json.search.toLowerCase().split(' ').map(function (tag) {
      return tag.trim();
    });
    list = json.list.filter(function (obj) {
      var objTags = obj.getJson()[json.attribute || "tags"];
      if (objTags) {
        // Check if the attribute exists

        var splitTags = objTags.split(json.splitStr || ',');
        splitTags = splitTags.map(function (tag) {
          return tag.toLowerCase();
        });
        var _iterator = _createForOfIteratorHelper(tags),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var tag = _step.value;
            if (splitTags.includes(tag)) {
              return true;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        return false; // Object doesn't have the specified attribute
      }
    });
  }
  return list;
}

/**
 * 
 * @param {*} json 
 * @returns filtered list of things by title and then by tags.
 */
function filterByTitleThenTagText(json) {
  var list = json.list,
    attributes = json.attributes,
    search = json.search;
  var newList = [];
  var nameList = [];
  var aList = attributes.split(",");
  var _iterator2 = _createForOfIteratorHelper(aList),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var str = _step2.value;
      nameList.push(textAttributeFilter(_objectSpread(_objectSpread({}, json), {}, {
        attribute: str
      })));
    }
    //filter by tags text
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  var newTagList = filterByTagText(_objectSpread({}, json));
  newList = [].concat(_toConsumableArray(nameList[0]), _toConsumableArray(newTagList), _toConsumableArray(nameList[1]), _toConsumableArray(nameList[2]));
  newList = filterRemoveDupes(newList);
  return newList;
}

/**
 * 
 * @param {*} json 
 * @returns get the list by text then by title so there are multiple things  being filtered
 * the consistentlyFilterByTextAttributeList would work as well
 */
function filterByTextThenTitle(json) {
  var list = json.list,
    attribute = json.attribute,
    tagList = json.tagList,
    attribute2 = json.attribute2,
    attributeTag = json.attributeTag,
    search = json.search;
  var nameList = textAttributeFilter(_objectSpread(_objectSpread({}, json), {}, {
    attribute: attribute
  }));
  var newTagList = filterByTag(_objectSpread(_objectSpread({}, json), {}, {
    attribute: attributeTag
  }));
  var promoList = textAttributeFilter(_objectSpread(_objectSpread({}, json), {}, {
    attribute: attribute2
  }));
  list = [].concat(_toConsumableArray(nameList), _toConsumableArray(newTagList), _toConsumableArray(promoList));
  var newList = filterRemoveDupes(list);
  return newList;
}

/**
 * 
 * @param {*} list 
 * @returns list of all duplicates removed
 */
function filterRemoveDupes(list) {
  var uniqueItems = new Map();
  list.forEach(function (item) {
    var itemJson = item.getJson();
    var itemId = itemJson._id;
    if (!uniqueItems.has(itemId)) {
      uniqueItems.set(itemId, item);
    }
  });
  return Array.from(uniqueItems.values());
}

/**
 * 
 * @param {*} json 
 * @returns list fitlered by attribute on the obj sent in
 */
function textAttributeFilter(json) {
  var list = json.list,
    attribute = json.attribute,
    search = json.search;
  if (search && search.length > 0) {
    list = list.filter(function (obj) {
      var _obj$getJson$attribut;
      return (_obj$getJson$attribut = obj.getJson()[attribute]) === null || _obj$getJson$attribut === void 0 ? void 0 : _obj$getJson$attribut.toLowerCase().includes(search === null || search === void 0 ? void 0 : search.toLowerCase());
    });
  }
  return list;
}

/**
 * 
 * @param {*} json 
 * @returns plain text filter
 */
function textFilter(json) {
  var list = json.list,
    attribute = json.attribute,
    search = json.search;
  if (search && search.length > 0) {
    list = list.filter(function (obj) {
      var _obj$attribute;
      return (_obj$attribute = obj[attribute]) === null || _obj$attribute === void 0 ? void 0 : _obj$attribute.toLowerCase().includes(search === null || search === void 0 ? void 0 : search.toLowerCase());
    });
  }
  return list;
}
//Better function than the one above for a more pluggable multi filter with attributes.
function consistentlyFilterByTextAttributeList(json) {
  var attributeList = json.attributeList;
  var newList = [];
  var _iterator3 = _createForOfIteratorHelper(attributeList),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var attribute = _step3.value;
      newList = [].concat(_toConsumableArray(newList), _toConsumableArray(textAttributeFilter(_objectSpread(_objectSpread({}, json), {}, {
        attribute: attribute
      }))));
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  newList = filterRemoveDupes(newList);
  return newList;
}

/**
 * 
 * @param {*} json 
 * @returns list of objs whos attribute was the same as search
 */
function filterByBool(json) {
  var list = json.list,
    attribute = json.attribute,
    search = json.search;
  list = list.filter(function (obj) {
    return obj.getJson()[attribute] === search;
  });
  return list;
}