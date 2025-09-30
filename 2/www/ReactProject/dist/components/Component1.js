"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Component1;
var _react = _interopRequireDefault(require("react"));
var _monkey = _interopRequireDefault(require("../assets/monkey.png"));
require("./Component1.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function Component1() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    "class": "comp1"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", null, "\u041A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 1"), /*#__PURE__*/_react["default"].createElement("img", {
    src: _monkey["default"],
    alt: "\u0411\u0438\u0431\u0438\u0437\u044F\u043D\u0430",
    "class": "rotate-on-hover"
  })));
}