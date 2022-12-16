"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATE_BACKGROUND = void 0;
var layoutManager_1 = require("../layoutManager");
var TYPE_SCREEN = 'screen';
exports.STATE_BACKGROUND = 'background';
// const TYPE_VIEW = 'view';
// const TYPE_RECYCLER = 'recycler';
// const TYPE_SCROLLVIEW = 'scrollview';
var AbstractFocusModel = /** @class */ (function () {
    function AbstractFocusModel(params) {
        var nextFocusRight = params.nextFocusRight, nextFocusLeft = params.nextFocusLeft, nextFocusUp = params.nextFocusUp, nextFocusDown = params.nextFocusDown;
        this._id = '';
        this._children = [];
        this._nextFocusRight = nextFocusRight;
        this._nextFocusLeft = nextFocusLeft;
        this._nextFocusUp = nextFocusUp;
        this._nextFocusDown = nextFocusDown;
    }
    AbstractFocusModel.prototype.getScreen = function () {
        if (this._screen) {
            return this._screen;
        }
        var parentCls = this.getParent();
        while (parentCls && !parentCls.isScreen()) {
            parentCls = parentCls.getParent();
        }
        if (parentCls === null || parentCls === void 0 ? void 0 : parentCls.isScreen()) {
            this._screen = parentCls;
            return this._screen;
        }
    };
    AbstractFocusModel.prototype.getId = function () {
        return this._id;
    };
    AbstractFocusModel.prototype.setLayout = function (layout) {
        this._layout = layout;
        return this;
    };
    AbstractFocusModel.prototype.updateLayoutProperty = function (prop, value) {
        this._layout[prop] = value;
        return this;
    };
    AbstractFocusModel.prototype.getLayout = function () {
        return this._layout;
    };
    AbstractFocusModel.prototype.addChildren = function (cls) {
        this._children.push(cls);
        return this;
    };
    AbstractFocusModel.prototype.removeChildren = function (index) {
        this.getChildren().splice(index, 1);
        return this;
    };
    AbstractFocusModel.prototype.removeChildrenFromParent = function () {
        var _this = this;
        var _a, _b, _c;
        if (this.getParent()) {
            (_a = this.getParent()) === null || _a === void 0 ? void 0 : _a.getChildren().forEach(function (ch, index) {
                var _a;
                if (ch.getId() === _this.getId()) {
                    (_a = _this.getParent()) === null || _a === void 0 ? void 0 : _a.getChildren().splice(index, 1);
                }
            });
            if ((_b = this.getParent()) === null || _b === void 0 ? void 0 : _b.isRecyclable()) {
                var recycler = this.getParent();
                if (((_c = recycler.getFocusedView()) === null || _c === void 0 ? void 0 : _c.getId()) === this.getId()) {
                    recycler.setFocusedView(undefined);
                }
            }
        }
        else {
            this.getChildren().forEach(function (_, index) {
                _this.removeChildren(index);
            });
        }
        return this;
    };
    AbstractFocusModel.prototype.getChildren = function () {
        return this._children;
    };
    AbstractFocusModel.prototype.getMostBottomChildren = function () {
        return this.getChildren().sort(function (a, b) {
            var _a, _b;
            if (((_a = a.getLayout()) === null || _a === void 0 ? void 0 : _a.yMax) > ((_b = b.getLayout()) === null || _b === void 0 ? void 0 : _b.yMax)) {
                return 1;
            }
            return -1;
        })[this.getChildren().length - 1];
    };
    AbstractFocusModel.prototype.getMostRightChildren = function () {
        return this.getChildren().sort(function (a, b) {
            var _a, _b;
            if (((_a = a.getLayout()) === null || _a === void 0 ? void 0 : _a.xMax) > ((_b = b.getLayout()) === null || _b === void 0 ? void 0 : _b.xMax)) {
                return 1;
            }
            return -1;
        })[this.getChildren().length - 1];
    };
    AbstractFocusModel.prototype.recalculateChildrenLayouts = function (ch) {
        var _this = this;
        ch.getChildren().forEach(function (a) {
            _this.recalculateChildrenLayouts(a);
        });
        if (ch.isInForeground()) {
            (0, layoutManager_1.recalculateLayout)(ch);
        }
    };
    AbstractFocusModel.prototype.getNextFocusRight = function () {
        return this._nextFocusRight || '';
    };
    AbstractFocusModel.prototype.getNextFocusLeft = function () {
        return this._nextFocusLeft || '';
    };
    AbstractFocusModel.prototype.getNextFocusUp = function () {
        return this._nextFocusUp || '';
    };
    AbstractFocusModel.prototype.getNextFocusDown = function () {
        return this._nextFocusDown || '';
    };
    AbstractFocusModel.prototype.getLayouts = function () {
        throw new Error('Method is not implemented');
    };
    AbstractFocusModel.prototype.isScrollable = function () {
        return false;
    };
    AbstractFocusModel.prototype.setScrollOffsetX = function (_value) {
        return this;
    };
    AbstractFocusModel.prototype.getScrollOffsetX = function () {
        return 0;
    };
    AbstractFocusModel.prototype.getScrollOffsetY = function () {
        return 0;
    };
    AbstractFocusModel.prototype.setScrollOffsetY = function (_value) {
        return this;
    };
    AbstractFocusModel.prototype.setIsFocused = function (_isFocused) {
        return this;
    };
    AbstractFocusModel.prototype.getIsFocused = function () {
        return false;
    };
    AbstractFocusModel.prototype.isFocusable = function () {
        return false;
    };
    AbstractFocusModel.prototype.getForbiddenFocusDirections = function () {
        return [];
    };
    AbstractFocusModel.prototype.isHorizontal = function () {
        return false;
    };
    AbstractFocusModel.prototype.isRecyclable = function () {
        return false;
    };
    AbstractFocusModel.prototype.isNested = function () {
        return false;
    };
    AbstractFocusModel.prototype.onFocus = function () {
        // NO ACTION
    };
    AbstractFocusModel.prototype.onBlur = function () {
        // NO ACTION
    };
    AbstractFocusModel.prototype.onPress = function () {
        // NO ACTION
    };
    AbstractFocusModel.prototype.getState = function () {
        var _a;
        if (this.getType() === TYPE_SCREEN) {
            return this.getState();
        }
        return ((_a = this.getScreen()) === null || _a === void 0 ? void 0 : _a.getState()) || exports.STATE_BACKGROUND;
    };
    AbstractFocusModel.prototype.isInForeground = function () {
        var _a, _b;
        if (this.getType() === TYPE_SCREEN) {
            return this.isInForeground();
        }
        return (_b = (_a = this.getScreen()) === null || _a === void 0 ? void 0 : _a.isInForeground()) !== null && _b !== void 0 ? _b : false;
    };
    AbstractFocusModel.prototype.isInBackground = function () {
        var _a, _b;
        if (this.getType() === TYPE_SCREEN) {
            return this.isInBackground();
        }
        return (_b = (_a = this.getScreen()) === null || _a === void 0 ? void 0 : _a.isInBackground()) !== null && _b !== void 0 ? _b : false;
    };
    AbstractFocusModel.prototype.containsForbiddenDirection = function (direction) {
        return this.getForbiddenFocusDirections().includes(direction);
    };
    AbstractFocusModel.prototype.setFocus = function (_cls) {
        // TODO: Implement
    };
    AbstractFocusModel.prototype.getOrder = function () {
        var _a;
        if (this.isScreen()) {
            return this.getOrder();
        }
        return ((_a = this.getScreen()) === null || _a === void 0 ? void 0 : _a.getOrder()) || 0;
    };
    AbstractFocusModel.prototype.isScreen = function () {
        return false;
    };
    AbstractFocusModel.prototype.getFocusKey = function () {
        return '';
    };
    AbstractFocusModel.prototype.getNextFocusable = function (_direction) {
        return;
    };
    AbstractFocusModel.prototype.getFocusTaskExecutor = function (direction) {
        var _a, _b;
        if ((_a = this.getParent()) === null || _a === void 0 ? void 0 : _a.getFocusTaskExecutor(direction)) {
            return (_b = this.getParent()) === null || _b === void 0 ? void 0 : _b.getFocusTaskExecutor(direction);
        }
        return null;
    };
    ;
    return AbstractFocusModel;
}());
exports.default = AbstractFocusModel;
//# sourceMappingURL=AbstractFocusModel.js.map