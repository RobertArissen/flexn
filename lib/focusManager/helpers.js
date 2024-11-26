"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrevious = exports.useCombinedRefs = exports.getNextForcedFocusKey = exports.alterForbiddenFocusDirections = exports.getDirectionName = exports.flattenStyle = exports.makeid = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var constants_1 = require("./constants");
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.makeid = makeid;
function flattenStyle(style) {
    var flattenedStyle = {};
    if (Array.isArray(style)) {
        style.map(function (item) {
            item && Object.keys(item) && Object.keys(item).map(function (key) { return (flattenedStyle[key] = item[key]); });
        });
    }
    else {
        flattenedStyle = style || {};
    }
    return tslib_1.__assign({}, flattenedStyle);
}
exports.flattenStyle = flattenStyle;
function getDirectionName(direction) {
    switch (direction) {
        case 'swipeLeft':
        case 'left':
            return 'left';
        case 'swipeRight':
        case 'right':
            return 'right';
        case 'swipeUp':
        case 'up':
            return 'up';
        case 'swipeDown':
        case 'down':
            return 'down';
        default:
            return direction;
    }
}
exports.getDirectionName = getDirectionName;
function alterForbiddenFocusDirections(forbiddenFocusDirections) {
    if (forbiddenFocusDirections === void 0) { forbiddenFocusDirections = []; }
    var ffd = tslib_1.__spreadArray([], forbiddenFocusDirections, true);
    forbiddenFocusDirections.forEach(function (direction) {
        if (direction === 'down')
            ffd.push('swipeDown');
        if (direction === 'up')
            ffd.push('swipeUp');
        if (direction === 'left')
            ffd.push('swipeLeft');
        if (direction === 'right')
            ffd.push('swipeRight');
    });
    return ffd;
}
exports.alterForbiddenFocusDirections = alterForbiddenFocusDirections;
function pickActiveForcedFocusContext(nextForcedFocusKey, focusMap) {
    if (Array.isArray(nextForcedFocusKey)) {
        var _loop_1 = function (index) {
            var focusKey = nextForcedFocusKey[index];
            var isActive_1 = Object.values(focusMap).find(function (cls) { return cls.getFocusKey() === focusKey && cls.isInForeground(); });
            if (isActive_1) {
                return { value: focusKey };
            }
        };
        for (var index = 0; index < nextForcedFocusKey.length; index++) {
            var state_1 = _loop_1(index);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return null;
    }
    var isActive = Object.values(focusMap).find(function (cls) { return cls.getFocusKey() === nextForcedFocusKey && cls.isInForeground(); });
    return isActive ? nextForcedFocusKey : null;
}
function getNextForcedFocusKey(cls, direction, focusMap) {
    if (cls.getNextFocusLeft() && constants_1.DIRECTION_LEFT.includes(direction)) {
        return pickActiveForcedFocusContext(cls.getNextFocusLeft(), focusMap);
    }
    if (cls.getNextFocusRight() && constants_1.DIRECTION_RIGHT.includes(direction)) {
        return pickActiveForcedFocusContext(cls.getNextFocusRight(), focusMap);
    }
    if (cls.getNextFocusUp() && constants_1.DIRECTION_UP.includes(direction)) {
        return pickActiveForcedFocusContext(cls.getNextFocusUp(), focusMap);
    }
    if (cls.getNextFocusDown() && constants_1.DIRECTION_DOWN.includes(direction)) {
        return pickActiveForcedFocusContext(cls.getNextFocusDown(), focusMap);
    }
    return null;
}
exports.getNextForcedFocusKey = getNextForcedFocusKey;
function useCombinedRefs() {
    var refs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        refs[_i] = arguments[_i];
    }
    var targetRef = react_1.default.useRef(null);
    react_1.default.useEffect(function () {
        refs.forEach(function (ref) {
            if (!ref)
                return;
            if (typeof ref === 'function') {
                ref(targetRef.current);
            }
            else {
                ref.current = targetRef.current; //eslint-disable-line
            }
        });
    }, [refs]);
    return targetRef;
}
exports.useCombinedRefs = useCombinedRefs;
function usePrevious(value) {
    var ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        ref.current = value;
    });
    return ref.current;
}
exports.usePrevious = usePrevious;
//# sourceMappingURL=helpers.js.map