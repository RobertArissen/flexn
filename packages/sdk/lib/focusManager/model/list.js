"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var recycler_1 = tslib_1.__importDefault(require("./recycler"));
var core_1 = tslib_1.__importDefault(require("./core"));
var constants_1 = require("../constants");
var List = /** @class */ (function (_super) {
    tslib_1.__extends(List, _super);
    function List(params) {
        var _this = _super.call(this, params) || this;
        _this._type = 'list';
        return _this;
    }
    List.prototype.getType = function () {
        return this._type;
    };
    List.prototype.getRows = function () {
        return this._children;
    };
    List.prototype.getCurrentFocusIndex = function () {
        var _a, _b, _c;
        return ((_c = (_b = (_a = core_1.default.getCurrentFocus()) === null || _a === void 0 ? void 0 : _a.getParent()) === null || _b === void 0 ? void 0 : _b.getRepeatContext()) === null || _c === void 0 ? void 0 : _c.index) || 0;
    };
    List.prototype.getNextFocusable = function (direction) {
        if (this._isInBounds(direction)) {
            var candidates = Object.values(core_1.default.getFocusMap()).filter(function (c) {
                var _a, _b, _c, _d, _e;
                return c.isInForeground() &&
                    c.isFocusable() &&
                    ((_b = (_a = c.getParent()) === null || _a === void 0 ? void 0 : _a.getParent()) === null || _b === void 0 ? void 0 : _b.getId()) === ((_e = (_d = (_c = core_1.default.getCurrentFocus()) === null || _c === void 0 ? void 0 : _c.getParent()) === null || _d === void 0 ? void 0 : _d.getParent()) === null || _e === void 0 ? void 0 : _e.getId()) &&
                    c.getOrder() === core_1.default.getCurrentMaxOrder();
            });
            return core_1.default.getNextFocusableContext(direction, candidates, false);
        }
        else if (!this._isInBounds(direction)) {
            return core_1.default.getNextFocusableContext(direction);
        }
    };
    List.prototype._isInBounds = function (direction) {
        var current = this.getCurrentFocusIndex();
        if (constants_1.DIRECTION_UP.includes(direction) && current === 0) {
            return false;
        }
        if (constants_1.DIRECTION_DOWN.includes(direction) && current === this.getLayouts().length - 1) {
            return false;
        }
        return true;
    };
    List.prototype.scrollToInitialRenderIndex = function () {
        //TODO: implement
    };
    List.prototype.getFocusTaskExecutor = function (_direction) {
        return this;
    };
    return List;
}(recycler_1.default));
exports.default = List;
//# sourceMappingURL=list.js.map