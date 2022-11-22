"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var recycler_1 = tslib_1.__importDefault(require("./recycler"));
var core_1 = tslib_1.__importDefault(require("./core"));
var scroller_1 = tslib_1.__importDefault(require("./scroller"));
var constants_1 = require("../constants");
var Row = /** @class */ (function (_super) {
    tslib_1.__extends(Row, _super);
    function Row(params) {
        var _this = _super.call(this, params) || this;
        _this._type = 'row';
        return _this;
    }
    Row.prototype.getType = function () {
        return this._type;
    };
    Row.prototype.getLastFocused = function () {
        var _a;
        return (_a = this === null || this === void 0 ? void 0 : this.getFocusedView()) !== null && _a !== void 0 ? _a : this.getChildren()[0];
    };
    Row.prototype.getCurrentFocusIndex = function () {
        var _a, _b;
        return ((_b = (_a = core_1.default.getCurrentFocus()) === null || _a === void 0 ? void 0 : _a.getRepeatContext()) === null || _b === void 0 ? void 0 : _b.index) || 0;
    };
    Row.prototype.getNextFocusable = function (direction) {
        var _a, _b;
        if (this._isInBounds(direction) && constants_1.DIRECTION_HORIZONTAL.includes(direction)) {
            var candidates = Object.values(core_1.default.getFocusMap()).filter(function (c) {
                var _a, _b, _c;
                return c.isInForeground() &&
                    c.isFocusable() &&
                    ((_a = c.getParent()) === null || _a === void 0 ? void 0 : _a.getId()) === ((_c = (_b = core_1.default.getCurrentFocus()) === null || _b === void 0 ? void 0 : _b.getParent()) === null || _c === void 0 ? void 0 : _c.getId()) &&
                    c.getOrder() === core_1.default.getCurrentMaxOrder();
            });
            return core_1.default.getNextFocusableContext(direction, candidates, false);
        }
        else if (!this._isInBounds(direction) || constants_1.DIRECTION_VERTICAL.includes(direction)) {
            var nextFocus = core_1.default.getNextFocusableContext(direction);
            if (constants_1.DIRECTION_HORIZONTAL.includes(direction) &&
                ((_a = nextFocus === null || nextFocus === void 0 ? void 0 : nextFocus.getParent()) === null || _a === void 0 ? void 0 : _a.isRecyclable()) &&
                ((_b = nextFocus === null || nextFocus === void 0 ? void 0 : nextFocus.getParent()) === null || _b === void 0 ? void 0 : _b.isHorizontal())) {
                return core_1.default.getCurrentFocus();
            }
            return nextFocus;
        }
    };
    Row.prototype._isInBounds = function (direction) {
        var current = this.getCurrentFocusIndex();
        if (!this.isHorizontal() && constants_1.DIRECTION_HORIZONTAL.includes(direction)) {
            return false;
        }
        if (constants_1.DIRECTION_LEFT.includes(direction) && current === 0) {
            return false;
        }
        if (constants_1.DIRECTION_RIGHT.includes(direction) && current === this.getLayouts().length - 1) {
            return false;
        }
        return true;
    };
    Row.prototype.scrollToInitialRenderIndex = function () {
        var _this = this;
        var _a, _b, _c, _d, _e;
        var layout = (_a = this.getLayouts()[this.getInitialRenderIndex()]) !== null && _a !== void 0 ? _a : { x: 0, y: 0 };
        var horizontalOffset = (_c = (_b = this.getScreen()) === null || _b === void 0 ? void 0 : _b.getHorizontalViewportOffset()) !== null && _c !== void 0 ? _c : 0;
        var verticalOffset = (_e = (_d = this.getScreen()) === null || _d === void 0 ? void 0 : _d.getVerticalViewportOffset()) !== null && _e !== void 0 ? _e : 0;
        var target = this.isHorizontal()
            ? { x: layout.x - horizontalOffset, y: 0 }
            : { y: layout.y - verticalOffset, x: 0 };
        setTimeout(function () {
            scroller_1.default.scrollRecycler(target, _this);
        }, 0);
        var interval = setInterval(function () {
            var currentChildren = _this.getChildren().find(function (ch) { var _a; return ((_a = ch.getRepeatContext()) === null || _a === void 0 ? void 0 : _a.index) === _this.getInitialRenderIndex(); });
            if (currentChildren) {
                _this.setFocusedView(currentChildren);
                clearInterval(interval);
            }
        }, 100);
    };
    Row.prototype.getFocusTaskExecutor = function (direction) {
        if (this.isNested() && constants_1.DIRECTION_VERTICAL.includes(direction)) {
            return this.getParent();
        }
        return this;
    };
    return Row;
}(recycler_1.default));
exports.default = Row;
//# sourceMappingURL=row.js.map