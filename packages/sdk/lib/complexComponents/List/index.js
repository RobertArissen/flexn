"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var View_1 = tslib_1.__importDefault(require("../../components/View"));
var RecyclableList_1 = tslib_1.__importStar(require("../../components/RecyclableList"));
var Row_1 = tslib_1.__importDefault(require("../Row"));
var helpers_1 = require("../../helpers");
var useDimensionsCalculator_1 = tslib_1.__importDefault(require("../../hooks/useDimensionsCalculator"));
var List = function (_a) {
    var parentContext = _a.parentContext, items = _a.items, _b = _a.itemsInViewport, itemsInViewport = _b === void 0 ? 5 : _b, _c = _a.style, style = _c === void 0 ? {} : _c, _d = _a.cardStyle, cardStyle = _d === void 0 ? {} : _d, _e = _a.titleStyle, titleStyle = _e === void 0 ? {} : _e, rerenderData = _a.rerenderData, focusOptions = _a.focusOptions, animatorOptions = _a.animatorOptions, _f = _a.itemSpacing, itemSpacing = _f === void 0 ? 30 : _f, _g = _a.verticalItemSpacing, verticalItemSpacing = _g === void 0 ? 0 : _g, _h = _a.horizontalItemSpacing, horizontalItemSpacing = _h === void 0 ? 0 : _h, itemDimensions = _a.itemDimensions, onPress = _a.onPress, onFocus = _a.onFocus, onBlur = _a.onBlur, renderCard = _a.renderCard, _j = _a.initialXOffset, initialXOffset = _j === void 0 ? 0 : _j, rowHeight = _a.rowHeight, _k = _a.disableItemContainer, disableItemContainer = _k === void 0 ? false : _k;
    var ref = (0, react_1.useRef)();
    var layoutProvider = (0, react_1.useRef)();
    var _l = (0, react_1.useState)(), rowRendererData = _l[0], setRowRendererData = _l[1];
    var dataProviderInstance = (0, react_1.useRef)(new RecyclableList_1.RecyclableListDataProvider(function (r1, r2) { return r1 !== r2; })).current;
    var _m = (0, react_1.useState)(dataProviderInstance.cloneWithRows(items)), dataProvider = _m[0], setDataProvider = _m[1];
    var _o = (0, useDimensionsCalculator_1.default)({
        style: style,
        itemSpacing: itemSpacing,
        verticalItemSpacing: verticalItemSpacing,
        horizontalItemSpacing: horizontalItemSpacing,
        itemDimensions: itemDimensions,
        itemsInViewport: itemsInViewport,
        ref: ref,
    }), boundaries = _o.boundaries, onLayout = _o.onLayout;
    (0, react_1.useEffect)(function () {
        setDataProvider(dataProviderInstance.cloneWithRows(items));
        setRowRendererData(rerenderData);
    }, [rerenderData]);
    var setLayoutProvider = function () {
        if (!layoutProvider.current) {
            layoutProvider.current = new RecyclableList_1.RecyclableListLayoutProvider(function () { return '_'; }, function (_, dim) {
                dim.width = boundaries.width;
                dim.height = (0, helpers_1.Ratio)(rowHeight);
            });
        }
    };
    setLayoutProvider();
    var renderRow = function (_a) {
        var index = _a.index, data = _a.data, title = _a.title, repeatContext = _a.repeatContext;
        return (react_1.default.createElement(Row_1.default, { key: index, items: data.items, itemsInViewport: data.itemsInViewport || itemsInViewport, title: title, onPress: onPress, onFocus: onFocus, onBlur: onBlur, renderCard: renderCard, repeatContext: repeatContext, style: {
                width: boundaries.width,
                height: (0, helpers_1.Ratio)(rowHeight),
            }, cardStyle: cardStyle, titleStyle: titleStyle, itemDimensions: itemDimensions, itemSpacing: itemSpacing, initialXOffset: initialXOffset, animatorOptions: animatorOptions, disableItemContainer: disableItemContainer, 
            // TODO: This should be not needed eventually
            focusOptions: {
                nextFocusLeft: focusOptions === null || focusOptions === void 0 ? void 0 : focusOptions.nextFocusLeft,
                nextFocusRight: focusOptions === null || focusOptions === void 0 ? void 0 : focusOptions.nextFocusRight,
            }, rerenderData: rowRendererData }));
    };
    var renderRecycler = function () {
        return (react_1.default.createElement(RecyclableList_1.default, { parentContext: parentContext, type: "list", isHorizontal: false, scrollViewProps: {
                showsVerticalScrollIndicator: false,
            }, style: [{ width: boundaries.width, height: boundaries.height }], dataProvider: dataProvider, layoutProvider: layoutProvider.current, rowRenderer: function (_type, rowData, index, repeatContext) {
                return renderRow({
                    index: index,
                    data: rowData,
                    title: rowData.rowTitle,
                    nestedParentContext: repeatContext === null || repeatContext === void 0 ? void 0 : repeatContext.parentContext,
                    repeatContext: repeatContext,
                });
            }, focusOptions: focusOptions }));
    };
    return (react_1.default.createElement(View_1.default, { parentContext: parentContext, style: style, onLayout: onLayout, ref: ref }, renderRecycler()));
};
exports.default = List;
//# sourceMappingURL=index.js.map