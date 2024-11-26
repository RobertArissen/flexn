"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var renative_1 = require("@rnv/renative");
var View_1 = tslib_1.__importDefault(require("../../components/View"));
var RecyclableList_1 = tslib_1.__importStar(require("../../components/RecyclableList"));
var Card_1 = require("../Card");
var useDimensionsCalculator_1 = tslib_1.__importDefault(require("../../hooks/useDimensionsCalculator"));
var Grid = function (_a) {
    var items = _a.items, _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.cardStyle, cardStyle = _c === void 0 ? {} : _c, _d = _a.itemSpacing, itemSpacing = _d === void 0 ? 30 : _d, _e = _a.verticalItemSpacing, verticalItemSpacing = _e === void 0 ? 0 : _e, _f = _a.horizontalItemSpacing, horizontalItemSpacing = _f === void 0 ? 0 : _f, itemDimensions = _a.itemDimensions, _g = _a.itemsInViewport, itemsInViewport = _g === void 0 ? 5 : _g, parentContext = _a.parentContext, focusOptions = _a.focusOptions, rerenderData = _a.rerenderData, animatorOptions = _a.animatorOptions, onFocus = _a.onFocus, onPress = _a.onPress, onBlur = _a.onBlur, renderCard = _a.renderCard, _h = _a.disableItemContainer, disableItemContainer = _h === void 0 ? false : _h;
    var ref = (0, react_1.useRef)();
    var layoutProvider = (0, react_1.useRef)();
    var dataProviderInstance = (0, react_1.useRef)(new RecyclableList_1.RecyclableListDataProvider(function (r1, r2) { return r1 !== r2; })).current;
    var _j = (0, react_1.useState)(dataProviderInstance.cloneWithRows(items)), dataProvider = _j[0], setDataProvider = _j[1];
    var _k = (0, useDimensionsCalculator_1.default)({
        style: style,
        itemSpacing: itemSpacing,
        verticalItemSpacing: verticalItemSpacing,
        horizontalItemSpacing: horizontalItemSpacing,
        itemDimensions: itemDimensions,
        itemsInViewport: itemsInViewport,
        ref: ref,
    }), boundaries = _k.boundaries, spacings = _k.spacings, onLayout = _k.onLayout, rowDimensions = _k.rowDimensions, isLoading = _k.isLoading;
    (0, react_1.useEffect)(function () {
        setDataProvider(dataProviderInstance.cloneWithRows(items));
    }, [rerenderData]);
    var setLayoutProvider = function () {
        if (!isLoading && !layoutProvider.current) {
            layoutProvider.current = new RecyclableList_1.RecyclableListLayoutProvider(function () { return '_'; }, function (_, dim) {
                dim.width = rowDimensions.layout.width;
                dim.height = rowDimensions.layout.height;
            });
        }
    };
    setLayoutProvider();
    var renderGrid = function () { return (react_1.default.createElement(RecyclableList_1.default, { type: "grid", dataProvider: dataProvider, layoutProvider: layoutProvider.current, rowRenderer: function (_type, data, _index, repeatContext, renderProps) {
            if (renderCard) {
                return renderCard(data, repeatContext, tslib_1.__assign({}, rowDimensions.item), renderProps);
            }
            return (react_1.default.createElement(Card_1.PosterCard, { src: { uri: data.backgroundImage }, title: data.title, style: [cardStyle, { width: rowDimensions.item.width, height: rowDimensions.item.height }], onFocus: function () { return onFocus === null || onFocus === void 0 ? void 0 : onFocus(data); }, onPress: function () { return onPress === null || onPress === void 0 ? void 0 : onPress(data); }, onBlur: function () { return onBlur === null || onBlur === void 0 ? void 0 : onBlur(data); }, repeatContext: repeatContext, renderProps: renderProps, focusOptions: { animatorOptions: animatorOptions } }));
        }, style: [{ width: boundaries.width, height: boundaries.relativeHeight }], contentContainerStyle: tslib_1.__assign({}, spacings), scrollViewProps: {
            showsHorizontalScrollIndicator: false,
        }, focusOptions: focusOptions, isHorizontal: false, disableItemContainer: disableItemContainer && renative_1.isPlatformTvos })); };
    return (react_1.default.createElement(View_1.default, { parentContext: parentContext, style: style, onLayout: onLayout, ref: ref }, !isLoading && renderGrid()));
};
Grid.displayName = 'Grid';
exports.default = Grid;
//# sourceMappingURL=index.js.map