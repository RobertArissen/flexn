"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_native_1 = require("react-native");
var ImageBackground = function (_a) {
    var children = _a.children, parentContext = _a.parentContext, source = _a.source, props = tslib_1.__rest(_a, ["children", "parentContext", "source"]);
    var childrenWithProps = react_1.default.Children.map(children, function (child) {
        if (react_1.default.isValidElement(child)) {
            return react_1.default.cloneElement(child, { parentContext: parentContext });
        }
        return child;
    });
    return (react_1.default.createElement(react_native_1.ImageBackground, tslib_1.__assign({ source: source }, props), childrenWithProps));
};
ImageBackground.displayName = 'ImageBackground';
exports.default = ImageBackground;
//# sourceMappingURL=index.native.tv.js.map