"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_native_1 = require("react-native");
var renative_1 = require("@rnv/renative");
var lodash_throttle_1 = tslib_1.__importDefault(require("lodash.throttle"));
var core_1 = tslib_1.__importDefault(require("./core"));
var constants_1 = require("../constants");
var logger_1 = tslib_1.__importDefault(require("./logger"));
var EVENT_KEY_ACTION_UP = 'up';
var EVENT_KEY_ACTION_DOWN = 'down';
var EVENT_KEY_ACTION_LONG_PRESS = 'longPress';
var INTERVAL_TIME_MS = 100;
var SCROLL_INDEX_INTERVAL_ROW = 3;
var SCROLL_INDEX_INTERVAL_GRID = 5;
var SCROLL_INDEX_INTERVAL_LIST = 1;
var EVENT_TYPE_SELECT = 'select';
var EVENT_TYPE_RIGHT = 'right';
var EVENT_TYPE_LEFT = 'left';
var EVENT_TYPE_DOWN = 'down';
var EVENT_TYPE_UP = 'up';
var IS_ANDROID_BASED = renative_1.isPlatformAndroidtv || renative_1.isPlatformFiretv;
var KeyHandler = /** @class */ (function () {
    function KeyHandler() {
        this._stopKeyDownEvents = false;
        this._longPressInterval = 0;
        this._currentIndex = 0;
        this._maxIndex = 0;
        this._currentScrollTarget = {};
        var TvRemoteHandler = react_native_1.NativeModules.TvRemoteHandler;
        if (renative_1.isPlatformTvos) {
            this.eventEmitter = new react_native_1.NativeEventEmitter(TvRemoteHandler);
        }
        else {
            this.eventEmitter = react_native_1.DeviceEventEmitter;
        }
        this.selectHandler = new react_native_1.TVEventHandler();
        this.onKeyDown = (0, lodash_throttle_1.default)(this.onKeyDown.bind(this), 100);
        this.onKeyLongPress = this.onKeyLongPress.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.handleKeyEvent = this.handleKeyEvent.bind(this);
        this.enableKeyHandler = this.enableKeyHandler.bind(this);
        this.enableKeyHandler();
        this.enableSelectHandler();
    }
    KeyHandler.prototype.removeListeners = function () {
        if (renative_1.isPlatformTvos) {
            this.eventEmitter.removeListener('onTVRemoteKey', this.handleKeyEvent);
        }
        if (IS_ANDROID_BASED) {
            this.eventEmitter.remove();
        }
    };
    KeyHandler.prototype.enableKeyHandler = function () {
        if (renative_1.isPlatformTvos) {
            this.eventEmitter.addListener('onTVRemoteKey', this.handleKeyEvent);
        }
        else {
            this.eventEmitter = react_native_1.DeviceEventEmitter.addListener('onTVRemoteKey', this.handleKeyEvent);
        }
    };
    KeyHandler.prototype.enableSelectHandler = function () {
        this.selectHandler.enable(null, function (_, evt) {
            var _a;
            var direction = evt.eventType;
            if (renative_1.isPlatformTvos) {
                if (direction === 'playPause') {
                    logger_1.default.getInstance().debug(core_1.default);
                    core_1.default.debuggerEnabled = !core_1.default.isDebuggerEnabled;
                }
                if (direction === 'select') {
                    // This can happen if we opened new screen which doesn't have any focusable
                    // then last screen in context map still keeping focus
                    var currentFocus = core_1.default.getCurrentFocus();
                    if (currentFocus && ((_a = currentFocus === null || currentFocus === void 0 ? void 0 : currentFocus.getScreen()) === null || _a === void 0 ? void 0 : _a.isInForeground())) {
                        currentFocus.onPress();
                    }
                }
            }
        });
    };
    KeyHandler.prototype.handleKeyEvent = function (_a) {
        var eventKeyAction = _a.eventKeyAction, eventType = _a.eventType;
        switch (eventKeyAction) {
            case EVENT_KEY_ACTION_UP:
                return this.onKeyUp(eventType);
            case EVENT_KEY_ACTION_DOWN:
                return this.onKeyDown(eventType);
            case EVENT_KEY_ACTION_LONG_PRESS:
                return this.onKeyLongPress(eventType);
            default:
                break;
        }
    };
    KeyHandler.prototype.onKeyDown = function (eventType) {
        var _a;
        if (eventType === 'playPause') {
            logger_1.default.getInstance().debug(core_1.default);
            core_1.default.debuggerEnabled = !core_1.default.isDebuggerEnabled;
        }
        if (!this._stopKeyDownEvents) {
            if (IS_ANDROID_BASED && eventType === EVENT_TYPE_SELECT && core_1.default.getCurrentFocus()) {
                (_a = core_1.default.getCurrentFocus()) === null || _a === void 0 ? void 0 : _a.onPress();
            }
            if (core_1.default.getCurrentFocus()) {
                if (core_1.default.hasPendingUpdateGuideLines) {
                    core_1.default.executeUpdateGuideLines();
                }
                if (constants_1.DIRECTION.includes(eventType)) {
                    core_1.default.executeDirectionalFocus(eventType);
                    core_1.default.executeScroll(eventType);
                    core_1.default.executeUpdateGuideLines();
                }
            }
        }
    };
    KeyHandler.prototype.onKeyLongPress = function (eventType) {
        var _this = this;
        if (this.isInRecycler()) {
            if (!this.isNested()) {
                if (this.isHorizontal() && [EVENT_TYPE_DOWN, EVENT_TYPE_UP].includes(eventType)) {
                    this._stopKeyDownEvents = false;
                    return;
                }
                if (!this.isHorizontal() && [EVENT_TYPE_LEFT, EVENT_TYPE_RIGHT].includes(eventType)) {
                    this._stopKeyDownEvents = false;
                    return;
                }
            }
            this._stopKeyDownEvents = true;
            var selectedIndex_1 = this.getSelectedIndex();
            this._longPressInterval = setInterval(function () {
                if (EVENT_TYPE_RIGHT === eventType) {
                    selectedIndex_1 += SCROLL_INDEX_INTERVAL_ROW;
                    if (selectedIndex_1 > _this.getMaxIndex())
                        selectedIndex_1 = _this.getMaxIndex();
                }
                if (EVENT_TYPE_LEFT === eventType) {
                    selectedIndex_1 -= SCROLL_INDEX_INTERVAL_ROW;
                    if (selectedIndex_1 < 0)
                        selectedIndex_1 = 0;
                }
                if (EVENT_TYPE_UP === eventType) {
                    selectedIndex_1 -= _this.isNested() ? SCROLL_INDEX_INTERVAL_LIST : _this.getGridScrollInterval();
                    if (selectedIndex_1 < 0)
                        selectedIndex_1 = 0;
                }
                if (EVENT_TYPE_DOWN === eventType) {
                    selectedIndex_1 += _this.isNested() ? SCROLL_INDEX_INTERVAL_LIST : _this.getGridScrollInterval();
                    if (selectedIndex_1 > _this.getMaxIndex(true))
                        selectedIndex_1 = _this.getMaxIndex(true);
                }
                _this._currentIndex = selectedIndex_1;
                _this._currentScrollTarget = core_1.default.executeInlineFocus(selectedIndex_1, eventType);
                core_1.default.executeUpdateGuideLines();
                if (selectedIndex_1 === 0 || selectedIndex_1 === _this.getMaxIndex(EVENT_TYPE_DOWN === eventType)) {
                    clearInterval(_this._longPressInterval);
                    _this.onEnd(selectedIndex_1, eventType);
                }
            }, INTERVAL_TIME_MS);
        }
    };
    KeyHandler.prototype.onEnd = function (selectedIndex, eventType) {
        setTimeout(function () {
            var _a;
            var currentFocus = core_1.default.getCurrentFocus();
            var index = selectedIndex === 0 ? selectedIndex : selectedIndex - 1;
            var closestByIndex = (_a = currentFocus === null || currentFocus === void 0 ? void 0 : currentFocus.getParent()) === null || _a === void 0 ? void 0 : _a.getChildren().find(function (ch) { var _a; return ((_a = ch.getRepeatContext()) === null || _a === void 0 ? void 0 : _a.index) === index; });
            if (closestByIndex) {
                core_1.default.executeFocus(closestByIndex);
                core_1.default.executeScroll(eventType);
                core_1.default.executeUpdateGuideLines();
            }
        }, 300);
    };
    KeyHandler.prototype.onKeyUp = function (eventType) {
        var _this = this;
        if (this._longPressInterval) {
            clearInterval(this._longPressInterval);
            this._longPressInterval = 0;
            setTimeout(function () {
                var _a;
                _this._stopKeyDownEvents = false;
                var currentFocus = core_1.default.getCurrentFocus();
                var closestByIndex = (_a = currentFocus === null || currentFocus === void 0 ? void 0 : currentFocus.getParent()) === null || _a === void 0 ? void 0 : _a.getChildren().find(function (ch) { var _a; return ((_a = ch.getRepeatContext()) === null || _a === void 0 ? void 0 : _a.index) === _this._currentIndex; });
                if (closestByIndex) {
                    core_1.default.executeFocus(closestByIndex);
                    core_1.default.executeScroll(eventType);
                    core_1.default.executeUpdateGuideLines();
                }
            }, 200);
        }
    };
    KeyHandler.prototype.getSelectedIndex = function () {
        var _a;
        var currentFocus = core_1.default.getCurrentFocus();
        if (currentFocus) {
            return ((_a = currentFocus.getRepeatContext()) === null || _a === void 0 ? void 0 : _a.index) || 0;
        }
        return 0;
    };
    KeyHandler.prototype.getMaxIndex = function (vertical) {
        var _a;
        if (vertical === void 0) { vertical = false; }
        var parent = (_a = core_1.default.getCurrentFocus()) === null || _a === void 0 ? void 0 : _a.getParent();
        if (this.isNested() && vertical) {
            parent = parent === null || parent === void 0 ? void 0 : parent.getParent();
        }
        if (parent) {
            this._maxIndex = parent.getLayouts().length;
            return this._maxIndex;
        }
        return 0;
    };
    KeyHandler.prototype.isInRecycler = function () {
        var _a;
        var parent = (_a = core_1.default.getCurrentFocus()) === null || _a === void 0 ? void 0 : _a.getParent();
        return (parent === null || parent === void 0 ? void 0 : parent.isRecyclable()) ? true : false;
    };
    KeyHandler.prototype.isHorizontal = function () {
        var _a;
        var parent = (_a = core_1.default.getCurrentFocus()) === null || _a === void 0 ? void 0 : _a.getParent();
        return (parent === null || parent === void 0 ? void 0 : parent.isRecyclable()) && (parent === null || parent === void 0 ? void 0 : parent.isHorizontal()) ? true : false;
    };
    KeyHandler.prototype.isNested = function () {
        var _a;
        var parent = (_a = core_1.default.getCurrentFocus()) === null || _a === void 0 ? void 0 : _a.getParent();
        return (parent === null || parent === void 0 ? void 0 : parent.isRecyclable()) && (parent === null || parent === void 0 ? void 0 : parent.isNested()) ? true : false;
    };
    KeyHandler.prototype.getGridScrollInterval = function () {
        var _a;
        var currentFocus = core_1.default.getCurrentFocus();
        if (currentFocus) {
            if (((_a = currentFocus.getParent()) === null || _a === void 0 ? void 0 : _a.getType()) === 'grid') {
                return currentFocus.getParent().getItemsInRow();
            }
        }
        return SCROLL_INDEX_INTERVAL_GRID;
    };
    return KeyHandler;
}());
exports.default = KeyHandler;
//# sourceMappingURL=keyHandler.js.map