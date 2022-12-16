"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATE_FOREGROUND = exports.STATE_BACKGROUND = void 0;
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("./core"));
var logger_1 = tslib_1.__importDefault(require("./logger"));
var helpers_1 = require("../helpers");
var AbstractFocusModel_1 = tslib_1.__importDefault(require("./AbstractFocusModel"));
var helpers_2 = require("../helpers");
var layoutManager_1 = require("../layoutManager");
var constants_1 = require("../constants");
var DELAY_TIME_IN_MS = 100;
exports.STATE_BACKGROUND = 'background';
exports.STATE_FOREGROUND = 'foreground';
var ALIGNMENT_BOTH_EDGE = 'bot-edge';
var ALIGNMENT_LOW_EDGE = 'low-edge';
var Screen = /** @class */ (function (_super) {
    tslib_1.__extends(Screen, _super);
    function Screen(params) {
        var _this = _super.call(this, params) || this;
        _this.getFirstFocusableOnScreen = function () {
            var _a;
            if (_this.isInForeground()) {
                if (_this._currentFocus)
                    return _this._currentFocus;
                if (_this._preferredFocus)
                    return _this._preferredFocus;
                if (_this._precalculatedFocus) {
                    if ((_a = _this._precalculatedFocus.getParent()) === null || _a === void 0 ? void 0 : _a.isRecyclable()) {
                        var recycler = _this._precalculatedFocus.getParent();
                        if (recycler.getFocusedView())
                            return recycler.getFocusedView();
                    }
                    return _this._precalculatedFocus;
                }
                _this.precalculateFocus(_this);
                return _this._precalculatedFocus;
            }
        };
        var _a = params.state, state = _a === void 0 ? exports.STATE_FOREGROUND : _a, _b = params.prevState, prevState = _b === void 0 ? exports.STATE_FOREGROUND : _b, _c = params.order, order = _c === void 0 ? 0 : _c, _d = params.stealFocus, stealFocus = _d === void 0 ? true : _d, _e = params.focusKey, focusKey = _e === void 0 ? '' : _e, _f = params.verticalWindowAlignment, verticalWindowAlignment = _f === void 0 ? ALIGNMENT_LOW_EDGE : _f, _g = params.horizontalWindowAlignment, horizontalWindowAlignment = _g === void 0 ? ALIGNMENT_LOW_EDGE : _g, _h = params.horizontalViewportOffset, horizontalViewportOffset = _h === void 0 ? constants_1.DEFAULT_VIEWPORT_OFFSET : _h, _j = params.verticalViewportOffset, verticalViewportOffset = _j === void 0 ? constants_1.DEFAULT_VIEWPORT_OFFSET : _j, _k = params.forbiddenFocusDirections, forbiddenFocusDirections = _k === void 0 ? [] : _k, onFocus = params.onFocus, onBlur = params.onBlur;
        _this._id = "screen-".concat((0, helpers_1.makeid)(8));
        _this._type = 'screen';
        _this._state = state;
        _this._prevState = prevState;
        _this._order = order;
        _this._focusKey = focusKey;
        _this._verticalWindowAlignment = verticalWindowAlignment;
        _this._horizontalWindowAlignment = horizontalWindowAlignment;
        _this._horizontalViewportOffset = horizontalViewportOffset;
        _this._verticalViewportOffset = verticalViewportOffset;
        _this._forbiddenFocusDirections = (0, helpers_2.alterForbiddenFocusDirections)(forbiddenFocusDirections);
        _this._stealFocus = stealFocus;
        _this._isFocused = false;
        _this._unmountingComponents = 0;
        _this._initialLoadInProgress = true;
        _this._componentsPendingLayoutMap = {};
        _this._onFocus = onFocus;
        _this._onBlur = onBlur;
        return _this;
    }
    Screen.prototype.addComponentToPendingLayoutMap = function (id) {
        this._componentsPendingLayoutMap[id] = true;
    };
    Screen.prototype.removeComponentFromPendingLayoutMap = function (id) {
        var _this = this;
        if (this._initialLoadInProgress) {
            setTimeout(function () {
                delete _this._componentsPendingLayoutMap[id];
                if (Object.keys(_this._componentsPendingLayoutMap).length <= 0) {
                    _this._initialLoadInProgress = false;
                    if (_this._stealFocus) {
                        _this.setFocus(_this.getFirstFocusableOnScreen());
                    }
                }
            }, DELAY_TIME_IN_MS);
        }
    };
    Screen.prototype.setFocus = function (cls) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (cls) {
            (_c = (_b = (_a = core_1.default.getCurrentFocus()) === null || _a === void 0 ? void 0 : _a.getScreen()) === null || _b === void 0 ? void 0 : _b.onBlur) === null || _c === void 0 ? void 0 : _c.call(_b);
            core_1.default.executeFocus(cls);
            core_1.default.executeUpdateGuideLines();
            (_d = cls.getScreen()) === null || _d === void 0 ? void 0 : _d.onFocus();
            if (((_e = cls.getParent()) === null || _e === void 0 ? void 0 : _e.getId()) !== ((_f = cls.getScreen()) === null || _f === void 0 ? void 0 : _f.getId())) {
                (_g = cls.getParent()) === null || _g === void 0 ? void 0 : _g.onFocus();
            }
        }
        else {
            logger_1.default.getInstance().log('Focusable not found');
        }
    };
    Screen.prototype.onViewRemoved = function (cls) {
        var _this = this;
        this._unmountingComponents++;
        setTimeout(function () {
            var _a, _b, _c;
            _this._unmountingComponents--;
            if (cls.getId() === ((_a = _this._currentFocus) === null || _a === void 0 ? void 0 : _a.getId())) {
                delete _this._currentFocus;
            }
            if (cls.getId() === ((_b = _this._preferredFocus) === null || _b === void 0 ? void 0 : _b.getId())) {
                delete _this._preferredFocus;
            }
            if (cls.getId() === ((_c = _this._precalculatedFocus) === null || _c === void 0 ? void 0 : _c.getId())) {
                delete _this._precalculatedFocus;
            }
            if (_this._unmountingComponents <= 0 && !_this._currentFocus) {
                _this.setFocus(_this.getFirstFocusableOnScreen());
            }
        }, DELAY_TIME_IN_MS);
    };
    Screen.prototype.precalculateFocus = function (cls) {
        var _this = this;
        cls.getChildren().forEach(function (ch) {
            _this.precalculateFocus(ch);
        });
        (0, layoutManager_1.findLowestRelativeCoordinates)(cls);
    };
    Screen.prototype.getType = function () {
        return this._type;
    };
    Screen.prototype.setScreen = function (_cls) {
        return this;
    };
    Screen.prototype.getScreen = function () {
        return undefined;
    };
    Screen.prototype.getState = function () {
        return this._state;
    };
    Screen.prototype.setState = function (value) {
        this._state = value;
        return this;
    };
    Screen.prototype.isInBackground = function () {
        return this._state === exports.STATE_BACKGROUND;
    };
    Screen.prototype.isInForeground = function () {
        return this._state === exports.STATE_FOREGROUND;
    };
    Screen.prototype.setPrevState = function (value) {
        this._prevState = value;
        return this;
    };
    Screen.prototype.isPrevStateBackground = function () {
        return this._prevState === exports.STATE_BACKGROUND;
    };
    Screen.prototype.getVerticalWindowAlignment = function () {
        return this._verticalWindowAlignment;
    };
    Screen.prototype.getHorizontalWindowAlignment = function () {
        return this._horizontalWindowAlignment;
    };
    Screen.prototype.setOrder = function (value) {
        this._order = value;
        return this;
    };
    ;
    Screen.prototype.getOrder = function () {
        return this._order;
    };
    Screen.prototype.getFocusKey = function () {
        return this._focusKey;
    };
    Screen.prototype.getHorizontalViewportOffset = function () {
        return this._horizontalViewportOffset;
    };
    Screen.prototype.getVerticalViewportOffset = function () {
        return this._verticalViewportOffset;
    };
    Screen.prototype.getForbiddenFocusDirections = function () {
        return this._forbiddenFocusDirections;
    };
    Screen.prototype.setInitialLoadInProgress = function (value) {
        this._initialLoadInProgress = value;
        return this;
    };
    Screen.prototype.isInitialLoadInProgress = function () {
        return this._initialLoadInProgress;
    };
    Screen.prototype.getChildren = function () {
        return this._children;
    };
    Screen.prototype.getParent = function () {
        return undefined;
    };
    Screen.prototype.setPreferredFocus = function (cls) {
        this._preferredFocus = cls;
        return this;
    };
    Screen.prototype.getPreferredFocus = function () {
        return this._preferredFocus;
    };
    Screen.prototype.setPrecalculatedFocus = function (cls) {
        this._precalculatedFocus = cls;
        return this;
    };
    Screen.prototype.setCurrentFocus = function (cls) {
        this._currentFocus = cls;
        return this;
    };
    Screen.prototype.getCurrentFocus = function () {
        return this._currentFocus;
    };
    Screen.prototype.getPrecalculatedFocus = function () {
        return this._precalculatedFocus;
    };
    Screen.prototype.setIsFocused = function (isFocused) {
        this._isFocused = isFocused;
        return this;
    };
    Screen.prototype.getIsFocused = function () {
        return this._isFocused;
    };
    Screen.prototype.isFocusable = function () {
        return false;
    };
    Screen.prototype.getRepeatContext = function () {
        return this._repeatContext;
    };
    Screen.prototype.hasStealFocus = function () {
        return this._stealFocus;
    };
    Screen.prototype.isScreen = function () {
        return true;
    };
    Screen.prototype.onFocus = function () {
        if (this._onFocus) {
            this._onFocus();
        }
    };
    Screen.prototype.onBlur = function () {
        if (this._onBlur) {
            this._onBlur();
        }
    };
    Screen.prototype.setRepeatContext = function (_value) {
        return this;
    };
    return Screen;
}(AbstractFocusModel_1.default));
exports.default = Screen;
//# sourceMappingURL=screen.js.map