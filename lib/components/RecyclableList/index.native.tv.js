"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = exports.RecyclableListLayoutProvider = exports.RecyclableListDataProvider = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_native_1 = require("react-native");
var recyclerListView_1 = require("../../recyclerListView");
Object.defineProperty(exports, "RecyclableListDataProvider", { enumerable: true, get: function () { return recyclerListView_1.DataProvider; } });
Object.defineProperty(exports, "RecyclableListLayoutProvider", { enumerable: true, get: function () { return recyclerListView_1.LayoutProvider; } });
var core_1 = tslib_1.__importDefault(require("../../focusManager/model/core"));
var layoutManager_1 = require("../../focusManager/layoutManager");
var grid_1 = tslib_1.__importDefault(require("../../focusManager/model/grid"));
var list_1 = tslib_1.__importDefault(require("../../focusManager/model/list"));
var row_1 = tslib_1.__importDefault(require("../../focusManager/model/row"));
var Column = null;
exports.Column = Column;
var parseStyleProps = function (prop) {
    if (typeof prop !== 'number') {
        return 0;
    }
    return prop;
};
function RecyclerView(_a) {
    var style = _a.style, parentContext = _a.parentContext, _b = _a.isHorizontal, isHorizontal = _b === void 0 ? true : _b, rowRenderer = _a.rowRenderer, scrollViewProps = _a.scrollViewProps, dataProvider = _a.dataProvider, repeatContext = _a.repeatContext, contentContainerStyle = _a.contentContainerStyle, _c = _a.unmeasurableRelativeDimensions, unmeasurableRelativeDimensions = _c === void 0 ? { y: 0, x: 0 } : _c, _d = _a.focusOptions, focusOptions = _d === void 0 ? {} : _d, _e = _a.disableItemContainer, disableItemContainer = _e === void 0 ? false : _e, type = _a.type, initialRenderIndex = _a.initialRenderIndex, _f = _a.onFocus, onFocus = _f === void 0 ? function () {
        return null;
    } : _f, _g = _a.onBlur, onBlur = _g === void 0 ? function () {
        return null;
    } : _g, props = tslib_1.__rest(_a, ["style", "parentContext", "isHorizontal", "rowRenderer", "scrollViewProps", "dataProvider", "repeatContext", "contentContainerStyle", "unmeasurableRelativeDimensions", "focusOptions", "disableItemContainer", "type", "initialRenderIndex", "onFocus", "onBlur"]);
    var layoutsReady = (0, react_1.useRef)(false);
    var scrollViewRef = (0, react_1.useRef)(null);
    var rlvRef = (0, react_1.useRef)(null);
    var rnViewRef = (0, react_1.useRef)(null);
    if (!type) {
        throw new Error('Please specify type. One of grid, list, row');
    }
    if (!['list', 'grid', 'row'].includes(type)) {
        throw new Error("Incorrect type ".concat(type, ". Valid types is grid, list, row"));
    }
    var pctx = (repeatContext === null || repeatContext === void 0 ? void 0 : repeatContext.parentContext) || parentContext;
    // const [stateIndex, setStateIndex] = useState(repeatContext?.index);
    var ClsInstance = (0, react_1.useState)(function () {
        var params = tslib_1.__assign({ isHorizontal: isHorizontal, isNested: !!repeatContext, parent: pctx, repeatContext: repeatContext, initialRenderIndex: initialRenderIndex, onFocus: onFocus, onBlur: onBlur }, focusOptions);
        if (type === 'grid') {
            return new grid_1.default(params);
        }
        else if (type === 'row') {
            return new row_1.default(params);
        }
        else {
            return new list_1.default(params);
        }
    })[0];
    if (repeatContext) {
        ClsInstance.setRepeatContext(repeatContext);
    }
    var rowRendererWithProps = function (type, data, index, _extendedState, renderProps) {
        var _a;
        var vr = (_a = rlvRef.current) === null || _a === void 0 ? void 0 : _a['_virtualRenderer'];
        var lm = vr === null || vr === void 0 ? void 0 : vr['_layoutManager'];
        var layouts = lm === null || lm === void 0 ? void 0 : lm['_layouts'];
        if (vr && (!ClsInstance.getLayouts() || layouts.length !== ClsInstance.getLayouts().length)) {
            ClsInstance.setLayouts(layouts);
            if (!layoutsReady.current) {
                layoutsReady.current = true;
                onLayoutsReady();
            }
        }
        return rowRenderer(type, data, index, { parentContext: ClsInstance, index: index }, renderProps);
    };
    var onLayoutsReady = function () {
        if (ClsInstance.getInitialRenderIndex()) {
            ClsInstance.scrollToInitialRenderIndex();
        }
    };
    (0, react_1.useEffect)(function () {
        core_1.default.registerFocusable(ClsInstance, scrollViewRef);
        return function () {
            core_1.default.removeFocusable(ClsInstance);
        };
    }, []);
    var flattenContentContainerStyle = react_native_1.StyleSheet.flatten(contentContainerStyle);
    var flattenStyles = react_native_1.StyleSheet.flatten(style);
    var paddingTop = parseStyleProps(flattenContentContainerStyle === null || flattenContentContainerStyle === void 0 ? void 0 : flattenContentContainerStyle.paddingTop);
    var paddingLeft = parseStyleProps(flattenContentContainerStyle === null || flattenContentContainerStyle === void 0 ? void 0 : flattenContentContainerStyle.paddingLeft);
    var marginTop = parseStyleProps(flattenStyles === null || flattenStyles === void 0 ? void 0 : flattenStyles.marginTop);
    var marginLeft = parseStyleProps(flattenStyles === null || flattenStyles === void 0 ? void 0 : flattenStyles.marginLeft);
    var top = parseStyleProps(flattenStyles === null || flattenStyles === void 0 ? void 0 : flattenStyles.top);
    var left = parseStyleProps(flattenStyles === null || flattenStyles === void 0 ? void 0 : flattenStyles.left);
    var onLayout = function (_a) {
        var layout = _a.nativeEvent.layout;
        var unmeasurableDimensions = {
            x: paddingLeft + marginLeft + left + (unmeasurableRelativeDimensions.x || 0),
            y: paddingTop + marginTop + top + (unmeasurableRelativeDimensions.y || 0),
        };
        (0, layoutManager_1.measure)(ClsInstance, rnViewRef, unmeasurableDimensions, undefined, layout);
    };
    return (react_1.default.createElement(react_native_1.View, { ref: rnViewRef, onLayout: onLayout, style: style, collapsable: false },
        react_1.default.createElement(recyclerListView_1.RecyclerListView, tslib_1.__assign({ ref: rlvRef, dataProvider: dataProvider, scrollViewProps: tslib_1.__assign(tslib_1.__assign({}, scrollViewProps), { ref: function (ref) {
                    // eslint-disable-next-line no-underscore-dangle
                    scrollViewRef.current = ref === null || ref === void 0 ? void 0 : ref._scrollViewRef; // `scrollTo()` is not working otherwise
                }, scrollEnabled: false, scrollEventThrottle: 320 }), onScroll: function (event) {
                var height = event.nativeEvent.contentSize.height;
                var scrollContentHeight = event.nativeEvent.layoutMeasurement.height;
                var _a = event.nativeEvent.contentOffset, y = _a.y, x = _a.x;
                ClsInstance.setScrollOffsetY(y)
                    .setScrollOffsetX(x)
                    .updateLayoutProperty('yMaxScroll', height)
                    .updateLayoutProperty('scrollContentHeight', scrollContentHeight);
                ClsInstance.recalculateChildrenLayouts(ClsInstance);
            }, rowRenderer: rowRendererWithProps, disableItemContainer: disableItemContainer, isHorizontal: isHorizontal, contentContainerStyle: contentContainerStyle, renderAheadOffset: 1000 }, props))));
}
exports.default = RecyclerView;
//# sourceMappingURL=index.native.tv.js.map