"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_native_1 = require("react-native");
var FlatList = react_1.default.forwardRef(function (_a, ref) {
    var renderItem = _a.renderItem, data = _a.data, parentContext = _a.parentContext, props = tslib_1.__rest(_a, ["renderItem", "data", "parentContext"]);
    var renderItemWithParentContext = function (_a) {
        var index = _a.index, item = _a.item, separators = _a.separators;
        return renderItem({ index: index, item: item, separators: separators, parentContext: parentContext });
    };
    return react_1.default.createElement(react_native_1.FlatList, tslib_1.__assign({}, props, { data: data, ref: ref, renderItem: renderItemWithParentContext }));
});
FlatList.displayName = 'FlatList';
exports.default = FlatList;
//# sourceMappingURL=index.native.tv.js.map