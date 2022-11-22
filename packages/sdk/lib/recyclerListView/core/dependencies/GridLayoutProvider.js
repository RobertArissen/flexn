"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridLayoutProvider = void 0;
var tslib_1 = require("tslib");
var LayoutProvider_1 = require("./LayoutProvider");
var GridLayoutManager_1 = require("../layoutmanager/GridLayoutManager");
var GridLayoutProvider = /** @class */ (function (_super) {
    tslib_1.__extends(GridLayoutProvider, _super);
    function GridLayoutProvider(maxSpan, getLayoutType, getSpan, 
    // If horizonal return width while spans will be rowspans. Opposite holds true if not horizontal
    getHeightOrWidth, acceptableRelayoutDelta) {
        var _this = _super.call(this, getLayoutType, function (type, dimension, index) {
            _this.setLayout(dimension, index);
        }) || this;
        _this._getHeightOrWidth = getHeightOrWidth;
        _this._getSpan = getSpan;
        _this._maxSpan = maxSpan;
        _this._acceptableRelayoutDelta =
            acceptableRelayoutDelta === undefined || acceptableRelayoutDelta === null ? 1 : acceptableRelayoutDelta;
        return _this;
    }
    GridLayoutProvider.prototype.newLayoutManager = function (renderWindowSize, isHorizontal, cachedLayouts) {
        this._isHorizontal = isHorizontal;
        this._renderWindowSize = renderWindowSize;
        return new GridLayoutManager_1.GridLayoutManager(this, renderWindowSize, this._getSpan, this._maxSpan, this._acceptableRelayoutDelta, this._isHorizontal, cachedLayouts);
    };
    GridLayoutProvider.prototype.setLayout = function (dimension, index) {
        var maxSpan = this._maxSpan;
        var itemSpan = this._getSpan(index);
        if (itemSpan > maxSpan) {
            throw new Error('Item span for index ' + index + ' is more than the max span');
        }
        if (this._renderWindowSize) {
            if (this._isHorizontal) {
                dimension.width = this._getHeightOrWidth(index);
                dimension.height = (this._renderWindowSize.height / maxSpan) * itemSpan;
            }
            else {
                dimension.height = this._getHeightOrWidth(index);
                dimension.width = (this._renderWindowSize.width / maxSpan) * itemSpan;
            }
        }
        else {
            throw new Error('setLayout called before layoutmanager was created, cannot be handled');
        }
    };
    return GridLayoutProvider;
}(LayoutProvider_1.LayoutProvider));
exports.GridLayoutProvider = GridLayoutProvider;
//# sourceMappingURL=GridLayoutProvider.js.map