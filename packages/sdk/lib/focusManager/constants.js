"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANIMATION_TYPES = exports.ANIMATIONS = exports.CUTOFF_SIZE = exports.DEFAULT_VIEWPORT_OFFSET = exports.FOCUS_PADDING = exports.DIRECTION = exports.DIRECTION_LEFT = exports.DIRECTION_RIGHT = exports.DIRECTION_DOWN = exports.DIRECTION_UP = exports.DIRECTION_VERTICAL = exports.DIRECTION_HORIZONTAL = exports.defaultAnimation = exports.WINDOW_ALIGNMENT = exports.CONTEXT_TYPES = exports.SCREEN_STATES = void 0;
var tslib_1 = require("tslib");
var renative_1 = require("@rnv/renative");
var helpers_1 = require("../helpers");
var BACKGROUND = 'background';
var FOREGROUND = 'foreground';
exports.SCREEN_STATES = {
    BACKGROUND: BACKGROUND,
    FOREGROUND: FOREGROUND,
};
exports.CONTEXT_TYPES = {
    SCREEN: 'screen',
    VIEW: 'view',
    RECYCLER: 'recycler',
};
exports.WINDOW_ALIGNMENT = {
    BOTH_EDGE: 'both-edge',
    LOW_EDGE: 'low-edge'
};
exports.defaultAnimation = {
    type: 'scale',
    scale: 1.1,
};
exports.DIRECTION_HORIZONTAL = ['left', 'swipeLeft', 'right', 'swipeRight'];
exports.DIRECTION_VERTICAL = ['up', 'swipeUp', 'down', 'swipeDown'];
exports.DIRECTION_UP = ['up', 'swipeUp'];
exports.DIRECTION_DOWN = ['down', 'swipeDown'];
exports.DIRECTION_RIGHT = ['right', 'swipeRight'];
exports.DIRECTION_LEFT = ['left', 'swipeLeft'];
exports.DIRECTION = tslib_1.__spreadArray(tslib_1.__spreadArray([], exports.DIRECTION_HORIZONTAL, true), exports.DIRECTION_VERTICAL, true);
exports.FOCUS_PADDING = (0, renative_1.getScaledValue)(100);
exports.DEFAULT_VIEWPORT_OFFSET = (0, helpers_1.Ratio)(70);
exports.CUTOFF_SIZE = (0, renative_1.getScaledValue)(400);
exports.ANIMATIONS = {
    BORDER: 'border',
    SCALE: 'scale',
    SCALE_BORDER: 'scale_with_border',
    BACKGROUND: 'background',
};
exports.ANIMATION_TYPES = {
    BORDER: 'border',
    SCALE: 'scale',
    SCALE_BORDER: 'scale_with_border',
    BACKGROUND: 'background',
};
//# sourceMappingURL=constants.js.map