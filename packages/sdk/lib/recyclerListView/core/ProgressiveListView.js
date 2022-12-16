"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RecyclerListView_1 = tslib_1.__importDefault(require("./RecyclerListView"));
/**
 * This will incremently update renderAhread distance and render the page progressively.
 * renderAheadOffset = initial value which will be incremented
 * renderAheadStep = amount of increment made on each frame
 * maxRenderAhead = maximum value for render ahead at the end of update cycle
 * finalRenderAheadOffset = value to set after whole update cycle is completed. If undefined, final offset value will be equal to maxRenderAhead
 */
var ProgressiveListView = /** @class */ (function (_super) {
    tslib_1.__extends(ProgressiveListView, _super);
    function ProgressiveListView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressiveListView.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this.updateRenderAheadProgessively(this.getCurrentRenderAheadOffset());
    };
    ProgressiveListView.prototype.updateRenderAheadProgessively = function (newVal) {
        var _this = this;
        this.cancelRenderAheadUpdate(); // Cancel any pending callback.
        this.renderAheadUdpateCallbackId = requestAnimationFrame(function () {
            if (!_this.updateRenderAheadOffset(newVal)) {
                _this.updateRenderAheadProgessively(newVal);
            }
            else {
                _this.incrementRenderAhead();
            }
        });
    };
    ProgressiveListView.prototype.incrementRenderAhead = function () {
        if (this.props.maxRenderAhead && this.props.renderAheadStep) {
            var layoutManager = this.getVirtualRenderer().getLayoutManager();
            var currentRenderAheadOffset = this.getCurrentRenderAheadOffset();
            if (layoutManager) {
                var contentDimension = layoutManager.getContentDimension();
                var maxContentSize = this.props.isHorizontal ? contentDimension.width : contentDimension.height;
                if (currentRenderAheadOffset < maxContentSize && currentRenderAheadOffset < this.props.maxRenderAhead) {
                    var newRenderAheadOffset = currentRenderAheadOffset + this.props.renderAheadStep;
                    this.updateRenderAheadProgessively(newRenderAheadOffset);
                }
                else {
                    this.performFinalUpdate();
                }
            }
        }
    };
    ProgressiveListView.prototype.performFinalUpdate = function () {
        var _this = this;
        requestAnimationFrame(function () {
            if (_this.props.finalRenderAheadOffset !== undefined) {
                _this.updateRenderAheadOffset(_this.props.finalRenderAheadOffset);
            }
        });
    };
    ProgressiveListView.prototype.cancelRenderAheadUpdate = function () {
        if (this.renderAheadUdpateCallbackId) {
            cancelAnimationFrame(this.renderAheadUdpateCallbackId);
        }
    };
    ProgressiveListView.defaultProps = tslib_1.__assign(tslib_1.__assign({}, RecyclerListView_1.default.defaultProps), { maxRenderAhead: Number.MAX_VALUE, renderAheadStep: 300, renderAheadOffset: 0 });
    return ProgressiveListView;
}(RecyclerListView_1.default));
exports.default = ProgressiveListView;
//# sourceMappingURL=ProgressiveListView.js.map