"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_native_1 = require("react-native");
var renative_1 = require("@rnv/renative");
var nextFocusFinder_1 = require("../nextFocusFinder");
var helpers_1 = require("../helpers");
var layoutManager_1 = require("../layoutManager");
var scroller_1 = tslib_1.__importDefault(require("./scroller"));
var logger_1 = tslib_1.__importDefault(require("./logger"));
var constants_1 = require("../constants");
var CoreManager = /** @class */ (function () {
    function CoreManager() {
        var _this = this;
        this.focusElementByFocusKey = function (focusKey) {
            var element = Object.values(_this._focusMap).find(function (cls) { return cls.getFocusKey() === focusKey && cls.isInForeground(); });
            if (element) {
                if (element.isScreen()) {
                    element.setFocus(element.getFirstFocusableOnScreen());
                }
                else {
                    element.setFocus();
                }
            }
        };
        this.getNextFocusableContext = function (direction, ownCandidates, findFocusInParent) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            if (findFocusInParent === void 0) { findFocusInParent = true; }
            var currentFocus = _this._currentFocus;
            var focusMap = _this._focusMap;
            if (!currentFocus) {
                return focusMap[Object.keys(focusMap)[0]];
            }
            var nextForcedFocusKey = (0, helpers_1.getNextForcedFocusKey)(currentFocus, direction, _this._focusMap);
            if (nextForcedFocusKey) {
                _this.focusElementByFocusKey(nextForcedFocusKey);
                return;
            }
            if (currentFocus.containsForbiddenDirection(direction)) {
                return currentFocus;
            }
            // This can happen if we opened new screen which doesn't have any focusable
            // then last screen in context map still keeping focus
            if (currentFocus === null || currentFocus === void 0 ? void 0 : currentFocus.isInBackground()) {
                return currentFocus;
            }
            var closestContext;
            var output = {
                match1: 9999999,
                match2: 9999999,
            };
            var candidates = ownCandidates !== null && ownCandidates !== void 0 ? ownCandidates : Object.values(focusMap).filter(function (c) {
                return c.isInForeground() &&
                    c.isFocusable() &&
                    c.getId() !== currentFocus.getId() &&
                    c.getOrder() === _this.getCurrentMaxOrder();
            });
            for (var i = 0; i < candidates.length; i++) {
                var cls = candidates[i];
                _this.findClosestNode(cls, direction, output);
            }
            closestContext = output.match1Context || output.match2Context;
            if (closestContext) {
                if (((_a = closestContext.getParent()) === null || _a === void 0 ? void 0 : _a.getId()) !== ((_b = currentFocus.getParent()) === null || _b === void 0 ? void 0 : _b.getId())) {
                    var parent_1 = currentFocus.getParent();
                    var nextForcedFocusKey_1 = (0, helpers_1.getNextForcedFocusKey)(parent_1, direction, _this._focusMap);
                    if (nextForcedFocusKey_1) {
                        _this.focusElementByFocusKey(nextForcedFocusKey_1);
                        return;
                    }
                    if (parent_1.containsForbiddenDirection(direction)) {
                        return currentFocus;
                    }
                    (_c = currentFocus.getParent()) === null || _c === void 0 ? void 0 : _c.onBlur();
                    (_d = closestContext.getParent()) === null || _d === void 0 ? void 0 : _d.onFocus();
                    if ((_e = closestContext.getParent()) === null || _e === void 0 ? void 0 : _e.isRecyclable()) {
                        var parent_2 = closestContext.getParent();
                        closestContext = (_f = parent_2.getFocusedView()) !== null && _f !== void 0 ? _f : closestContext;
                    }
                }
                if (((_g = closestContext.getScreen()) === null || _g === void 0 ? void 0 : _g.getId()) !== ((_h = currentFocus.getScreen()) === null || _h === void 0 ? void 0 : _h.getId())) {
                    (_k = (_j = currentFocus.getScreen()) === null || _j === void 0 ? void 0 : _j.onBlur) === null || _k === void 0 ? void 0 : _k.call(_j);
                    (_m = (_l = closestContext.getScreen()) === null || _l === void 0 ? void 0 : _l.onFocus) === null || _m === void 0 ? void 0 : _m.call(_l);
                    if ((_o = closestContext.getScreen()) === null || _o === void 0 ? void 0 : _o.getCurrentFocus()) {
                        return (_p = closestContext.getScreen()) === null || _p === void 0 ? void 0 : _p.getCurrentFocus();
                    }
                }
                return closestContext;
            }
            if (((_q = _this._currentFocus) === null || _q === void 0 ? void 0 : _q.getParent()) && findFocusInParent) {
                var parent_3 = _this._currentFocus.getParent();
                var parents = parent_3 ? [parent_3] : [];
                while (parent_3) {
                    parent_3 = parent_3 === null || parent_3 === void 0 ? void 0 : parent_3.getParent();
                    if (parent_3) {
                        parents.push(parent_3);
                    }
                }
                for (var idx in parents) {
                    var p = parents[idx];
                    var _nextForcedFocusKey = (0, helpers_1.getNextForcedFocusKey)(p, direction, _this._focusMap);
                    if (_nextForcedFocusKey) {
                        _this.focusElementByFocusKey(_nextForcedFocusKey);
                        return;
                    }
                }
                for (var idx in parents) {
                    var p = parents[idx];
                    if (p.containsForbiddenDirection(direction)) {
                        return currentFocus;
                    }
                }
            }
            return _this._currentFocus;
        };
        this.findClosestNode = function (cls, direction, output) {
            var _a;
            (0, layoutManager_1.recalculateLayout)(cls);
            var nextLayout = cls.getLayout();
            var currentLayout = (_a = _this._currentFocus) === null || _a === void 0 ? void 0 : _a.getLayout();
            if (!nextLayout || !currentLayout) {
                // eslint-disable-next-line
                logger_1.default.getInstance().warn('LAYOUT OF FOCUSABLE IS NOT MEASURED YET');
                return;
            }
            (0, nextFocusFinder_1.distCalc)(output, (0, helpers_1.getDirectionName)(direction), _this._currentFocus, cls);
        };
        this._focusMap = {};
        this._currentFocus = null;
        this._debuggerEnabled = false;
        this._hasPendingUpdateGuideLines = false;
        this._guideLineY = 0;
        this._guideLineX = 0;
    }
    CoreManager.prototype.registerFocusable = function (cls, node) {
        var _this = this;
        if (this._focusMap[cls.getId()]) {
            return;
        }
        if (node) {
            var nodeId = (0, react_native_1.findNodeHandle)(node.current);
            cls.nodeId = nodeId;
            cls.node = node;
        }
        this._focusMap[cls.getId()] = cls;
        Object.keys(this._focusMap).forEach(function (k) {
            var _a, _b;
            var v = _this._focusMap[k];
            // Register as parent for children
            if (v.getParent() && ((_a = v.getParent()) === null || _a === void 0 ? void 0 : _a.getId()) === cls.getId()) {
                cls.addChildren(v);
            }
            // Register as child in parent
            if (cls.getParent() && ((_b = cls.getParent()) === null || _b === void 0 ? void 0 : _b.getId()) === v.getId()) {
                v.addChildren(cls);
            }
        });
    };
    CoreManager.prototype.removeFocusable = function (cls) {
        var _this = this;
        var _a;
        cls.removeChildrenFromParent();
        delete this._focusMap[cls.getId()];
        if (cls.getId() === ((_a = this._currentFocus) === null || _a === void 0 ? void 0 : _a.getId())) {
            this._currentFocus = null;
        }
        if (cls.isScreen()) {
            setTimeout(function () {
                _this.onScreenRemoved();
            }, 0);
        }
    };
    CoreManager.prototype.onScreenRemoved = function () {
        var _this = this;
        var _a;
        var screens = Object.values(this._focusMap).filter(function (c) { return c.isInForeground() && c.isScreen() && c.getOrder() === _this.getCurrentMaxOrder(); });
        var nextScreen = (_a = screens.find(function (c) { return c === null || c === void 0 ? void 0 : c.hasStealFocus(); })) !== null && _a !== void 0 ? _a : screens[0];
        if (nextScreen) {
            nextScreen.setFocus(nextScreen.getFirstFocusableOnScreen());
        }
    };
    CoreManager.prototype.executeFocus = function (cls) {
        var _a, _b;
        if (cls.getId() === ((_a = this._currentFocus) === null || _a === void 0 ? void 0 : _a.getId())) {
            return;
        }
        if (this._currentFocus) {
            if (this._currentFocus.node.current && !renative_1.isPlatformTizen && !renative_1.isPlatformWebos) {
                // @ts-ignore
                react_native_1.UIManager.dispatchViewManagerCommand(this._currentFocus.nodeId, 'cmdBlur', null);
            }
            this._currentFocus.onBlur();
            this._currentFocus.setIsFocused(false);
        }
        this._currentFocus = cls;
        if (cls.node.current && !renative_1.isPlatformTizen && !renative_1.isPlatformWebos) {
            // @ts-ignore
            react_native_1.UIManager.dispatchViewManagerCommand(cls.nodeId, 'cmdFocus', null);
        }
        cls.onFocus();
        cls.setIsFocused(true);
        if (cls.getScreen()) {
            (_b = cls.getScreen()) === null || _b === void 0 ? void 0 : _b.setCurrentFocus(cls);
        }
    };
    CoreManager.prototype.executeDirectionalFocus = function (direction) {
        if (this._currentFocus) {
            if (this._currentFocus.getFocusTaskExecutor(direction)) {
                var focusExecutor = this._currentFocus.getFocusTaskExecutor(direction);
                var next_1 = focusExecutor === null || focusExecutor === void 0 ? void 0 : focusExecutor.getNextFocusable(direction);
                if (next_1)
                    this.executeFocus(next_1);
                return;
            }
            var next = this.getNextFocusableContext(direction);
            if (next)
                this.executeFocus(next);
        }
    };
    CoreManager.prototype.executeInlineFocus = function (nextIndex, direction) {
        var _a, _b;
        if (nextIndex === void 0) { nextIndex = 0; }
        var target;
        var parent = (_a = this._currentFocus) === null || _a === void 0 ? void 0 : _a.getParent();
        if ((parent === null || parent === void 0 ? void 0 : parent.isRecyclable()) && this._currentFocus) {
            if (constants_1.DIRECTION_VERTICAL.includes(direction)) {
                var layouts = (parent === null || parent === void 0 ? void 0 : parent.isNested()) ? (_b = parent.getParent()) === null || _b === void 0 ? void 0 : _b.getLayouts() : parent === null || parent === void 0 ? void 0 : parent.getLayouts();
                var nextLayout = layouts[nextIndex];
                if (nextLayout) {
                    target = {
                        x: 0,
                        y: nextLayout.y,
                    };
                }
            }
            else if (constants_1.DIRECTION_HORIZONTAL.includes(direction)) {
                var layouts = parent === null || parent === void 0 ? void 0 : parent.getLayouts();
                var nextLayout = layouts[nextIndex];
                if (nextLayout) {
                    target = {
                        x: nextLayout.x,
                        y: nextLayout.y,
                    };
                }
            }
            if (target) {
                scroller_1.default.scrollTo(this._currentFocus, target, direction);
                return target;
            }
        }
    };
    CoreManager.prototype.executeScroll = function (direction) {
        if (direction === void 0) { direction = ''; }
        var contextParameters = {
            currentFocus: this._currentFocus,
            focusMap: this._focusMap,
            isDebuggerEnabled: this._debuggerEnabled,
        };
        scroller_1.default.scroll(direction, contextParameters);
    };
    CoreManager.prototype.executeUpdateGuideLines = function () {
        var _a;
        if (!((_a = this._currentFocus) === null || _a === void 0 ? void 0 : _a.getLayout())) {
            this._hasPendingUpdateGuideLines = true;
            return;
        }
        if (this._guideLineX !== this._currentFocus.getLayout().absolute.xCenter) {
            this._guideLineX = this._currentFocus.getLayout().absolute.xCenter;
        }
        if (this._guideLineY !== this._currentFocus.getLayout().absolute.yCenter) {
            this._guideLineY = this._currentFocus.getLayout().absolute.yCenter;
        }
        this._hasPendingUpdateGuideLines = false;
    };
    CoreManager.prototype.getCurrentMaxOrder = function () {
        return Math.max.apply(Math, Object.values(this._focusMap).map(function (o) { return (isNaN(o.getOrder()) ? 0 : o.getOrder()); }));
    };
    Object.defineProperty(CoreManager.prototype, "isDebuggerEnabled", {
        get: function () {
            return this._debuggerEnabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreManager.prototype, "debuggerEnabled", {
        set: function (enabled) {
            this._debuggerEnabled = enabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreManager.prototype, "hasPendingUpdateGuideLines", {
        get: function () {
            return this._hasPendingUpdateGuideLines;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreManager.prototype, "guideLineY", {
        get: function () {
            return this._guideLineY;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreManager.prototype, "guideLineX", {
        get: function () {
            return this._guideLineX;
        },
        enumerable: false,
        configurable: true
    });
    CoreManager.prototype.getCurrentFocus = function () {
        return this._currentFocus;
    };
    CoreManager.prototype.getFocusMap = function () {
        return this._focusMap;
    };
    return CoreManager;
}());
var CoreManagerInstance = new CoreManager();
logger_1.default.getInstance(CoreManagerInstance);
exports.default = CoreManagerInstance;
//# sourceMappingURL=core.js.map