"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_native_1 = require("react-native");
var core_1 = tslib_1.__importDefault(require("../../focusManager/model/core"));
var layoutManager_1 = require("../../focusManager/layoutManager");
var scrollview_1 = tslib_1.__importDefault(require("../../focusManager/model/scrollview"));
var ScrollView = react_1.default.forwardRef(function (_a, refOuter) {
    var children = _a.children, style = _a.style, parentContext = _a.parentContext, horizontal = _a.horizontal, focusOptions = _a.focusOptions, props = tslib_1.__rest(_a, ["children", "style", "parentContext", "horizontal", "focusOptions"]);
    var ref = (0, react_1.useRef)();
    var ClsInstance = (0, react_1.useState)(function () {
        return new scrollview_1.default(tslib_1.__assign({ horizontal: horizontal, parent: parentContext }, focusOptions));
    })[0];
    (0, react_1.useImperativeHandle)(refOuter, function () { return ({
        scrollTo: function (_a) {
            var x = _a.x, y = _a.y;
            if (ref.current)
                ref.current.scrollTo({ x: x, y: y });
            if (x !== undefined)
                ClsInstance.setScrollOffsetX(x);
            if (y !== undefined)
                ClsInstance.setScrollOffsetY(y);
            if (core_1.default._currentFocus) {
                (0, layoutManager_1.recalculateLayout)(core_1.default._currentFocus);
            }
        },
    }); });
    var childrenWithProps = react_1.default.Children.map(children, function (child) {
        if (react_1.default.isValidElement(child)) {
            return react_1.default.cloneElement(child, { parentContext: ClsInstance });
        }
        return child;
    });
    (0, react_1.useEffect)(function () {
        core_1.default.registerFocusable(ClsInstance, ref);
        return function () {
            core_1.default.removeFocusable(ClsInstance);
        };
    }, []);
    var onLayout = function () {
        (0, layoutManager_1.measure)(ClsInstance, ref);
    };
    return (react_1.default.createElement(react_native_1.ScrollView, tslib_1.__assign({ ref: ref, onLayout: onLayout, style: style, horizontal: horizontal, scrollEnabled: false, scrollEventThrottle: 320, onScroll: function (event) {
            var _a = event.nativeEvent.contentSize, height = _a.height, width = _a.width;
            var _b = event.nativeEvent.contentOffset, y = _b.y, x = _b.x;
            var scrollContentHeight = event.nativeEvent.layoutMeasurement.height;
            ClsInstance
                .setScrollOffsetY(y)
                .setScrollOffsetX(x)
                .updateLayoutProperty('yMaxScroll', height)
                .updateLayoutProperty('xMaxScroll', width)
                .updateLayoutProperty('scrollContentHeight', scrollContentHeight);
            ClsInstance.recalculateChildrenLayouts(ClsInstance);
        } }, props), childrenWithProps));
});
exports.default = ScrollView;
//# sourceMappingURL=index.native.tv.js.map