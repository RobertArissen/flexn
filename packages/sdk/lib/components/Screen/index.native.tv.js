"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_native_1 = require("react-native");
var constants_1 = require("../../focusManager/constants");
var helpers_1 = require("../../focusManager/helpers");
var core_1 = tslib_1.__importDefault(require("../../focusManager/model/core"));
var layoutManager_1 = require("../../focusManager/layoutManager");
var screen_1 = tslib_1.__importDefault(require("../../focusManager/model/screen"));
var Screen = react_1.default.forwardRef(function (_a, refOuter) {
    var children = _a.children, style = _a.style, _b = _a.screenState, screenState = _b === void 0 ? constants_1.SCREEN_STATES.FOREGROUND : _b, _c = _a.screenOrder, screenOrder = _c === void 0 ? 0 : _c, _d = _a.stealFocus, stealFocus = _d === void 0 ? true : _d, _e = _a.focusOptions, focusOptions = _e === void 0 ? {} : _e, _f = _a.onFocus, onFocus = _f === void 0 ? function () {
        return null;
    } : _f, _g = _a.onBlur, onBlur = _g === void 0 ? function () {
        return null;
    } : _g, props = tslib_1.__rest(_a, ["children", "style", "screenState", "screenOrder", "stealFocus", "focusOptions", "onFocus", "onBlur"]);
    var refInner = (0, react_1.useRef)(null);
    var ref = (0, helpers_1.useCombinedRefs)(refOuter, refInner);
    var ClsInstance = (0, react_1.useState)(function () {
        return new screen_1.default(tslib_1.__assign({ prevState: screenState, state: screenState, order: screenOrder, stealFocus: stealFocus, onFocus: onFocus, onBlur: onBlur }, focusOptions));
    })[0];
    core_1.default.registerFocusable(ClsInstance);
    (0, react_1.useEffect)(function () {
        ClsInstance.setPrevState(ClsInstance.getState()).setState(screenState);
        if (ClsInstance.isPrevStateBackground() && ClsInstance.isInForeground()) {
            ClsInstance.setFocus(ClsInstance.getFirstFocusableOnScreen());
        }
    }, [screenState]);
    (0, react_1.useEffect)(function () {
        ClsInstance.setOrder(screenOrder);
    }, [screenOrder]);
    (0, react_1.useEffect)(function () { return function () {
        core_1.default.removeFocusable(ClsInstance);
    }; }, []);
    var onLayout = function (_a) {
        var layout = _a.nativeEvent.layout;
        (0, layoutManager_1.measure)(ClsInstance, ref, undefined, undefined, layout);
    };
    var childrenWithProps = react_1.default.Children.map(children, function (child) {
        if (react_1.default.isValidElement(child)) {
            return react_1.default.cloneElement(child, { parentContext: ClsInstance });
        }
        return child;
    });
    return (react_1.default.createElement(react_native_1.View, tslib_1.__assign({ style: [{ flex: 1 }, style] }, props, { ref: ref, collapsable: false, onLayout: onLayout }), childrenWithProps));
});
Screen.displayName = 'Screen';
exports.default = Screen;
//# sourceMappingURL=index.native.tv.js.map