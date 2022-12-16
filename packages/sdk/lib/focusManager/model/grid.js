"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var recycler_1 = tslib_1.__importDefault(require("./recycler"));
var core_1 = tslib_1.__importDefault(require("./core"));
var scroller_1 = tslib_1.__importDefault(require("./scroller"));
var Grid = /** @class */ (function (_super) {
    tslib_1.__extends(Grid, _super);
    function Grid(params) {
        var _this = _super.call(this, params) || this;
        _this._type = 'grid';
        _this._itemsInRow = 0;
        return _this;
    }
    Grid.prototype.getType = function () {
        return this._type;
    };
    Grid.prototype.getCurrentFocusIndex = function () {
        var _a, _b;
        return ((_b = (_a = core_1.default.getCurrentFocus()) === null || _a === void 0 ? void 0 : _a.getRepeatContext()) === null || _b === void 0 ? void 0 : _b.index) || 0;
    };
    Grid.prototype.getCurrentRow = function () {
        return Math.ceil((this.getCurrentFocusIndex() + 1) / this._itemsInRow) || 1;
    };
    Grid.prototype.getMaxRows = function () {
        return Math.ceil(this.getLayouts().length / this._itemsInRow);
    };
    Grid.prototype.getNextFocusable = function (direction) {
        var _a;
        this.getItemsInRow();
        if (this._isInBounds(direction)) {
            var candidates = Object.values(core_1.default.getFocusMap()).filter(function (c) {
                var _a, _b, _c;
                return c.isInForeground() &&
                    c.isFocusable() &&
                    ((_a = c.getParent()) === null || _a === void 0 ? void 0 : _a.getId()) === ((_c = (_b = core_1.default.getCurrentFocus()) === null || _b === void 0 ? void 0 : _b.getParent()) === null || _c === void 0 ? void 0 : _c.getId()) &&
                    c.getOrder() === core_1.default.getCurrentMaxOrder();
            });
            var next = core_1.default.getNextFocusableContext(direction, candidates, false);
            if (direction === 'down' &&
                (next === null || next === void 0 ? void 0 : next.getId()) === ((_a = core_1.default.getCurrentFocus()) === null || _a === void 0 ? void 0 : _a.getId()) &&
                this.getCurrentRow() === this.getMaxRows() - 1) {
                var max_1 = Math.max.apply(Math, candidates.map(function (o) { var _a; return ((_a = o.getRepeatContext()) === null || _a === void 0 ? void 0 : _a.index) || 0; }));
                return candidates.find(function (o) { var _a; return ((_a = o.getRepeatContext()) === null || _a === void 0 ? void 0 : _a.index) === max_1; });
            }
            return next;
        }
        else if (!this._isInBounds(direction)) {
            return core_1.default.getNextFocusableContext(direction);
        }
    };
    Grid.prototype._isInBounds = function (direction) {
        var row = Math.ceil((this.getCurrentFocusIndex() + 1) / this._itemsInRow) || 1;
        var maxRows = Math.ceil(this.getLayouts().length / this._itemsInRow);
        if (row === 1 && direction === 'up') {
            return false;
        }
        if (row === maxRows && direction === 'down') {
            return false;
        }
        if (['left', 'right'].includes(direction)) {
            return false;
        }
        return true;
    };
    Grid.prototype.getItemsInRow = function () {
        if (this._itemsInRow) {
            return this._itemsInRow;
        }
        var groups = [];
        this.getLayouts().forEach(function (layout) {
            groups[layout.x] = layout;
        });
        this._itemsInRow = Object.keys(groups).length;
        return this._itemsInRow;
    };
    Grid.prototype.scrollToInitialRenderIndex = function () {
        var _this = this;
        var _a, _b, _c;
        var layout = (_a = this.getLayouts()[this.getInitialRenderIndex()]) !== null && _a !== void 0 ? _a : { x: 0, y: 0 };
        var verticalOffset = (_c = (_b = this.getScreen()) === null || _b === void 0 ? void 0 : _b.getVerticalViewportOffset()) !== null && _c !== void 0 ? _c : 0;
        var target = { x: 0, y: layout.y - verticalOffset };
        setTimeout(function () {
            scroller_1.default.scrollRecycler(target, _this);
        }, 0);
    };
    Grid.prototype.getFocusTaskExecutor = function (_direction) {
        return this;
    };
    ;
    return Grid;
}(recycler_1.default));
exports.default = Grid;
//# sourceMappingURL=grid.js.map