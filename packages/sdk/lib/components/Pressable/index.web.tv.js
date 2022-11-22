"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAnimation = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_native_1 = require("react-native");
var helpers_1 = require("../../focusManager/helpers");
var core_1 = tslib_1.__importDefault(require("../../focusManager/model/core"));
var layoutManager_1 = require("../../focusManager/layoutManager");
var view_1 = tslib_1.__importDefault(require("../../focusManager/model/view"));
var __1 = require("../..");
exports.defaultAnimation = {
    type: 'scale',
    scale: 1.1,
};
var View = react_1.default.forwardRef(function (_a, refOuter) {
    var children = _a.children, style = _a.style, _b = _a.focus, focus = _b === void 0 ? true : _b, _c = _a.focusOptions, focusOptions = _c === void 0 ? {} : _c, parentContext = _a.parentContext, repeatContext = _a.repeatContext, _d = _a.onPress, onPress = _d === void 0 ? function () {
        return null;
    } : _d, _e = _a.onFocus, onFocus = _e === void 0 ? function () {
        return null;
    } : _e, _f = _a.onBlur, onBlur = _f === void 0 ? function () {
        return null;
    } : _f, props = tslib_1.__rest(_a, ["children", "style", "focus", "focusOptions", "parentContext", "repeatContext", "onPress", "onFocus", "onBlur"]);
    var scaleAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(1)).current;
    var refInner = (0, react_1.useRef)(null);
    var ref = (0, helpers_1.useCombinedRefs)(refOuter, refInner);
    var prevFocus = (0, helpers_1.usePrevious)(focus);
    var pctx = (repeatContext === null || repeatContext === void 0 ? void 0 : repeatContext.parentContext) || parentContext;
    var animatorOptions = focusOptions.animatorOptions || exports.defaultAnimation;
    var flattenedStyle = (0, helpers_1.flattenStyle)(style);
    var _g = (0, react_1.useState)(function () {
        if (!focus) {
            return pctx;
        }
        else {
            return new view_1.default(tslib_1.__assign(tslib_1.__assign({ focus: focus, repeatContext: repeatContext, parent: pctx }, focusOptions), { onFocus: onComponentFocus, onBlur: onComponentBlur }));
        }
    }), ViewInstance = _g[0], setViewInstance = _g[1];
    var onComponentFocus = function () {
        switch (animatorOptions.type) {
            case __1.ANIMATION_TYPES.SCALE:
                react_native_1.Animated.timing(scaleAnim, {
                    toValue: animatorOptions.scale,
                    duration: 200,
                    useNativeDriver: true
                }).start();
                break;
            case __1.ANIMATION_TYPES.SCALE_BORDER:
                react_native_1.Animated.timing(scaleAnim, {
                    toValue: animatorOptions.scale,
                    duration: 200,
                    useNativeDriver: true
                }).start();
                ref.current.setNativeProps({
                    borderColor: flattenedStyle.borderColor,
                    borderWidth: flattenedStyle.borderWidth,
                });
                break;
            case __1.ANIMATION_TYPES.BORDER:
                ref.current.setNativeProps({
                    borderColor: flattenedStyle.borderColor,
                    borderWidth: flattenedStyle.borderWidth,
                });
                break;
            case __1.ANIMATION_TYPES.BACKGROUND:
                ref.current.setNativeProps({
                    style: {
                        backgroundColor: animatorOptions.backgroundColorFocus,
                    }
                });
                break;
            default:
                break;
        }
        onFocus();
    };
    var onComponentBlur = function () {
        switch (animatorOptions.type) {
            case __1.ANIMATION_TYPES.SCALE:
                react_native_1.Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                }).start();
                break;
            case __1.ANIMATION_TYPES.SCALE_BORDER:
                react_native_1.Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                }).start();
                ref.current.setNativeProps({
                    borderWidth: 0,
                });
                break;
            case __1.ANIMATION_TYPES.BORDER:
                ref.current.setNativeProps({
                    borderWidth: 0,
                });
                break;
            case __1.ANIMATION_TYPES.BACKGROUND:
                ref.current.setNativeProps({
                    style: {
                        backgroundColor: flattenedStyle.backgroundColor,
                    }
                });
                break;
            default:
                break;
        }
        onBlur();
    };
    // We must re-assign repeat context as View instances are re-used in recycled
    if (repeatContext) {
        ViewInstance.setRepeatContext(repeatContext);
    }
    (0, react_1.useEffect)(function () {
        if (focus) {
            scaleAnim.addListener(function (_a) {
                var value = _a.value;
                if (ref.current) {
                    ref.current.setNativeProps({
                        style: {
                            transform: [{ scale: value }]
                        }
                    });
                }
            });
        }
        return function () {
            scaleAnim.removeAllListeners();
        };
    }, [focus]);
    (0, react_1.useEffect)(function () {
        // If item initially was not focusable, but during the time it became focusable we capturing that here
        if (prevFocus === false && focus === true) {
            var cls = new view_1.default({
                focus: true,
                repeatContext: repeatContext,
                parent: pctx,
                forbiddenFocusDirections: focusOptions.forbiddenFocusDirections,
            });
            setViewInstance(cls);
            core_1.default.registerFocusable(cls, ref);
        }
    }, [focus]);
    (0, react_1.useEffect)(function () {
        var _a;
        (_a = ViewInstance === null || ViewInstance === void 0 ? void 0 : ViewInstance.updateEvents) === null || _a === void 0 ? void 0 : _a.call(ViewInstance, {
            onPress: onPress,
            onFocus: onComponentFocus,
            onBlur: onComponentBlur,
        });
    }, [onPress, onFocus, onBlur]);
    (0, react_1.useEffect)(function () {
        if (focus) {
            core_1.default.registerFocusable(ViewInstance, ref);
            var screen_1 = ViewInstance.getScreen();
            if (screen_1) {
                screen_1.addComponentToPendingLayoutMap(ViewInstance.getId());
                if (ViewInstance.hasPreferredFocus())
                    screen_1.setPreferredFocus(ViewInstance);
            }
        }
        return function () {
            var _a;
            if (focus) {
                core_1.default.removeFocusable(ViewInstance);
                (_a = ViewInstance.getScreen()) === null || _a === void 0 ? void 0 : _a.onViewRemoved(ViewInstance);
            }
        };
    }, []);
    var childrenWithProps = react_1.default.Children.map(children, function (child) {
        if (react_1.default.isValidElement(child)) {
            return react_1.default.cloneElement(child, {
                parentContext: ViewInstance,
            });
        }
        return child;
    });
    var onLayout = function () {
        (0, layoutManager_1.measure)(ViewInstance, ref, undefined, function () {
            var _a;
            (_a = ViewInstance.getScreen()) === null || _a === void 0 ? void 0 : _a.removeComponentFromPendingLayoutMap(ViewInstance.getId());
        });
    };
    // In recycled mode we must re-measure on render
    if (repeatContext && ref.current) {
        (0, layoutManager_1.measure)(ViewInstance, ref);
    }
    if (focus) {
        return (react_1.default.createElement(react_native_1.View, tslib_1.__assign({ style: flattenedStyle, onLayout: onLayout }, props, { ref: ref }), childrenWithProps));
    }
    return (react_1.default.createElement(react_native_1.View, tslib_1.__assign({ style: style }, props, { ref: ref }), childrenWithProps));
});
View.displayName = 'View';
exports.default = View;
//# sourceMappingURL=index.web.tv.js.map