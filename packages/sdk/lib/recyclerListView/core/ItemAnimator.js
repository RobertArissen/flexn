"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseItemAnimator = void 0;
var BaseItemAnimator = /** @class */ (function () {
    function BaseItemAnimator() {
    }
    BaseItemAnimator.prototype.animateWillMount = function (_atX, _atY, _itemIndex) {
        return undefined;
    };
    BaseItemAnimator.prototype.animateDidMount = function (_atX, _atY, _itemRef, _itemIndex) {
        //no need
    };
    BaseItemAnimator.prototype.animateWillUpdate = function (_fromX, _fromY, _toX, _toY, _itemRef, _itemIndex) {
        //no need
    };
    BaseItemAnimator.prototype.animateShift = function (_fromX, _fromY, _toX, _toY, _itemRef, _itemIndex) {
        return false;
    };
    BaseItemAnimator.prototype.animateWillUnmount = function (_atX, _atY, _itemRef, _itemIndex) {
        //no need
    };
    BaseItemAnimator.USE_NATIVE_DRIVER = true;
    return BaseItemAnimator;
}());
exports.BaseItemAnimator = BaseItemAnimator;
//# sourceMappingURL=ItemAnimator.js.map