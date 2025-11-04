"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = require("react-dom/client");
var _Component = _interopRequireDefault(require("./components/Component1"));
var _Component2 = _interopRequireDefault(require("./components/Component2"));
require("./index.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var root = (0, _client.createRoot)(document.getElementById('app'));
root.render(/*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", null, "Hello, world!"), /*#__PURE__*/_react["default"].createElement("div", {
  "class": "root"
}, /*#__PURE__*/_react["default"].createElement(_Component["default"], null), /*#__PURE__*/_react["default"].createElement(_Component2["default"], null))));