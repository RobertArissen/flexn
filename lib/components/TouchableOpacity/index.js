"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_native_1 = require("react-native");
var TouchableOpacity = react_1.default.forwardRef(function (_a, ref) {
    var children = _a.children, props = tslib_1.__rest(_a, ["children"]);
    return (react_1.default.createElement(react_native_1.TouchableOpacity, tslib_1.__assign({}, props, { ref: ref }), children));
});
TouchableOpacity.displayName = 'TouchableOpacity';
exports.default = TouchableOpacity;
//# sourceMappingURL=index.js.map