"use strict";
/**
 * Created by ananya.chandra on 20/09/18.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var StickyObject_1 = tslib_1.__importStar(require("./StickyObject"));
var BinarySearch_1 = tslib_1.__importDefault(require("../../utils/BinarySearch"));
var StickyHeader = /** @class */ (function (_super) {
    tslib_1.__extends(StickyHeader, _super);
    function StickyHeader(props, context) {
        return _super.call(this, props, context) || this;
    }
    StickyHeader.prototype.onScroll = function (offsetY) {
        var startCorrection = this.getWindowCorrection(this.props).startCorrection;
        if (startCorrection) {
            this.containerPosition = { top: startCorrection };
            offsetY += startCorrection;
        }
        _super.prototype.onScroll.call(this, offsetY);
    };
    StickyHeader.prototype.initStickyParams = function () {
        this.stickyType = StickyObject_1.StickyType.HEADER;
        this.stickyTypeMultiplier = 1;
        this.containerPosition = { top: this.getWindowCorrection(this.props).startCorrection };
        // Kept as true contrary to as in StickyFooter because in case of initialOffset not given, onScroll isn't called and boundaryProcessing isn't done.
        // Default behaviour in that case will be sticky header hidden.
        this.bounceScrolling = true;
    };
    StickyHeader.prototype.calculateVisibleStickyIndex = function (stickyIndices, smallestVisibleIndex) {
        if (stickyIndices && smallestVisibleIndex !== undefined) {
            this.bounceScrolling = this.hasReachedBoundary();
            if (smallestVisibleIndex < stickyIndices[0] || this.bounceScrolling) {
                this.stickyVisiblity = false;
            }
            else {
                this.stickyVisiblity = true;
                var valueAndIndex = BinarySearch_1.default.findValueSmallerThanTarget(stickyIndices, smallestVisibleIndex);
                if (valueAndIndex) {
                    this.currentIndex = valueAndIndex.index;
                    this.currentStickyIndex = valueAndIndex.value;
                }
                else {
                    console.log('Header sticky index calculation gone wrong.'); // eslint-disable-line
                }
            }
        }
    };
    StickyHeader.prototype.getNextYd = function (nextY) {
        return nextY;
    };
    StickyHeader.prototype.getCurrentYd = function (currentY) {
        return currentY;
    };
    StickyHeader.prototype.getScrollY = function (offsetY) {
        return offsetY;
    };
    StickyHeader.prototype.hasReachedBoundary = function () {
        //TODO (Swapnil) Refer to talha and understand what needs to be done.
        return false;
    };
    return StickyHeader;
}(StickyObject_1.default));
exports.default = StickyHeader;
//# sourceMappingURL=StickyHeader.js.map