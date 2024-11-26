"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_native_1 = require("react-native");
var renative_1 = require("@rnv/renative");
var Text_1 = tslib_1.__importDefault(require("../../components/Text"));
var View_1 = tslib_1.__importDefault(require("../../components/View"));
var RecyclableList_1 = tslib_1.__importStar(require("../../components/RecyclableList"));
var helpers_1 = require("../../helpers");
var Card_1 = require("../Card");
var useDimensionsCalculator_1 = tslib_1.__importDefault(require("../../hooks/useDimensionsCalculator"));
var Row = function (_a) {
    var items = _a.items, title = _a.title, itemsInViewport = _a.itemsInViewport, parentContext = _a.parentContext, repeatContext = _a.repeatContext, focusOptions = _a.focusOptions, animatorOptions = _a.animatorOptions, _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.cardStyle, cardStyle = _c === void 0 ? {} : _c, _d = _a.titleStyle, titleStyle = _d === void 0 ? {} : _d, rerenderData = _a.rerenderData, onFocus = _a.onFocus, onPress = _a.onPress, onBlur = _a.onBlur, renderCard = _a.renderCard, itemDimensions = _a.itemDimensions, _e = _a.itemSpacing, itemSpacing = _e === void 0 ? 30 : _e, _f = _a.verticalItemSpacing, verticalItemSpacing = _f === void 0 ? 0 : _f, _g = _a.horizontalItemSpacing, horizontalItemSpacing = _g === void 0 ? 0 : _g, _h = _a.initialXOffset, initialXOffset = _h === void 0 ? 0 : _h, _j = _a.disableItemContainer, disableItemContainer = _j === void 0 ? false : _j;
    var ref = (0, react_1.useRef)();
    var layoutProvider = (0, react_1.useRef)();
    var dataProviderInstance = (0, react_1.useRef)(new RecyclableList_1.RecyclableListDataProvider(function (r1, r2) { return r1 !== r2; })).current;
    var _k = (0, react_1.useState)(dataProviderInstance.cloneWithRows(items)), dataProvider = _k[0], setDataProvider = _k[1];
    var flattenTitleStyles = react_native_1.StyleSheet.flatten(titleStyle);
    var _l = (0, useDimensionsCalculator_1.default)({
        style: style,
        initialXOffset: initialXOffset,
        itemSpacing: itemSpacing,
        verticalItemSpacing: verticalItemSpacing,
        horizontalItemSpacing: horizontalItemSpacing,
        itemDimensions: itemDimensions,
        itemsInViewport: itemsInViewport,
        ref: ref,
    }), boundaries = _l.boundaries, isLoading = _l.isLoading, spacings = _l.spacings, onLayout = _l.onLayout, rowDimensions = _l.rowDimensions;
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
    var rowRenderer = function (_type, data, _index, _repeatContext, _renderProps) {
        if (renderCard) {
            return renderCard(data, _repeatContext, tslib_1.__assign({}, rowDimensions.item), _renderProps);
        }
        return (react_1.default.createElement(Card_1.PosterCard, { src: { uri: data.backgroundImage }, title: data.title, style: [cardStyle, { width: rowDimensions.item.width, height: rowDimensions.item.height }], onFocus: function () { return onFocus === null || onFocus === void 0 ? void 0 : onFocus(data); }, onBlur: function () { return onBlur === null || onBlur === void 0 ? void 0 : onBlur(data); }, onPress: function () { return onPress === null || onPress === void 0 ? void 0 : onPress(data); }, repeatContext: _repeatContext, renderProps: _renderProps, focusOptions: {
                animatorOptions: animatorOptions,
            } }));
    };
    var renderRecycler = function () {
        if (!isLoading) {
            return (react_1.default.createElement(RecyclableList_1.default, { type: "row", dataProvider: dataProvider, layoutProvider: layoutProvider.current, initialXOffset: (0, helpers_1.Ratio)(initialXOffset), repeatContext: repeatContext, rowRenderer: rowRenderer, disableItemContainer: disableItemContainer && renative_1.isPlatformTvos, isHorizontal: true, style: [{ width: boundaries.width, height: boundaries.height }], contentContainerStyle: tslib_1.__assign({}, spacings), scrollViewProps: {
                    showsHorizontalScrollIndicator: false,
                }, focusOptions: focusOptions, unmeasurableRelativeDimensions: {
                    y: (flattenTitleStyles === null || flattenTitleStyles === void 0 ? void 0 : flattenTitleStyles.fontSize) || 0,
                    x: 0,
                } }));
        }
        return null;
    };
    var renderTitle = function () {
        if (title) {
            return react_1.default.createElement(Text_1.default, { style: [{ left: spacings.paddingLeft }, titleStyle] }, title);
        }
        return null;
    };
    return (react_1.default.createElement(View_1.default, { parentContext: parentContext, style: style, onLayout: onLayout, ref: ref },
        renderTitle(),
        renderRecycler()));
};
exports.default = Row;
//# sourceMappingURL=index.js.map