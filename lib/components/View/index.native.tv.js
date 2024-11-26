"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Pressable_1 = tslib_1.__importDefault(require("../Pressable"));
var View = react_1.default.forwardRef(function (_a, ref) {
    var children = _a.children, parentContext = _a.parentContext, props = tslib_1.__rest(_a, ["children", "parentContext"]);
    return (react_1.default.createElement(Pressable_1.default, tslib_1.__assign({ collapsable: false, parentContext: parentContext }, props, { focus: false, ref: ref }), children));
});
View.displayName = 'View';
exports.default = View;
//# sourceMappingURL=index.native.tv.js.map