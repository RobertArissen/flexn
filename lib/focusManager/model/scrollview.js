"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var helpers_1 = require("../helpers");
var AbstractFocusModel_1 = tslib_1.__importDefault(require("./AbstractFocusModel"));
var ScrollView = /** @class */ (function (_super) {
    tslib_1.__extends(ScrollView, _super);
    function ScrollView(params) {
        var _this = _super.call(this, params) || this;
        var horizontal = params.horizontal, parent = params.parent;
        _this._id = "scroll-".concat((0, helpers_1.makeid)(8));
        _this._isHorizontal = horizontal;
        _this._parent = parent;
        _this._type = 'scrollview';
        _this._scrollOffsetX = 0;
        _this._scrollOffsetY = 0;
        return _this;
    }
    ScrollView.prototype.getType = function () {
        return this._type;
    };
    ScrollView.prototype.setScrollOffsetX = function (value) {
        this._scrollOffsetX = value;
        return this;
    };
    ScrollView.prototype.getScrollOffsetX = function () {
        return this._scrollOffsetX;
    };
    ScrollView.prototype.setScrollOffsetY = function (value) {
        this._scrollOffsetY = value;
        return this;
    };
    ScrollView.prototype.getScrollOffsetY = function () {
        return this._scrollOffsetY;
    };
    ScrollView.prototype.isScrollable = function () {
        return true;
    };
    ScrollView.prototype.isFocusable = function () {
        return false;
    };
    ScrollView.prototype.isHorizontal = function () {
        return this._isHorizontal;
    };
    ScrollView.prototype.getParent = function () {
        return this._parent;
    };
    ScrollView.prototype.setRepeatContext = function (_value) {
        return this;
    };
    ScrollView.prototype.getRepeatContext = function () {
        return;
    };
    return ScrollView;
}(AbstractFocusModel_1.default));
exports.default = ScrollView;
//# sourceMappingURL=scrollview.js.map