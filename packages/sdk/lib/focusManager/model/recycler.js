"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AbstractFocusModel_1 = tslib_1.__importDefault(require("./AbstractFocusModel"));
var helpers_1 = require("../helpers");
var Recycler = /** @class */ (function (_super) {
    tslib_1.__extends(Recycler, _super);
    function Recycler(params) {
        var _this = _super.call(this, params) || this;
        var isHorizontal = params.isHorizontal, isNested = params.isNested, parent = params.parent, repeatContext = params.repeatContext, forbiddenFocusDirections = params.forbiddenFocusDirections, onFocus = params.onFocus, onBlur = params.onBlur, _a = params.initialRenderIndex, initialRenderIndex = _a === void 0 ? 0 : _a;
        _this._id = "recycler-".concat((0, helpers_1.makeid)(8));
        _this._type = 'recycler';
        _this._layouts = [];
        _this._scrollOffsetX = 0;
        _this._scrollOffsetY = 0;
        _this._isNested = isNested;
        _this._isHorizontal = isHorizontal;
        _this._parent = parent;
        _this._repeatContext = repeatContext;
        _this._forbiddenFocusDirections = (0, helpers_1.alterForbiddenFocusDirections)(forbiddenFocusDirections);
        _this._focusedIndex = 0;
        _this._initialRenderIndex = initialRenderIndex;
        _this._onFocus = onFocus;
        _this._onBlur = onBlur;
        return _this;
    }
    Recycler.prototype.getType = function () {
        return this._type;
    };
    Recycler.prototype.isFocusable = function () {
        return false;
    };
    Recycler.prototype.getLayouts = function () {
        return this._layouts;
    };
    Recycler.prototype.setLayouts = function (layouts) {
        this._layouts = layouts;
        return this;
    };
    Recycler.prototype.isScrollable = function () {
        return true;
    };
    Recycler.prototype.isRecyclable = function () {
        return true;
    };
    Recycler.prototype.isNested = function () {
        return this._isNested;
    };
    Recycler.prototype.isHorizontal = function () {
        return this._isHorizontal;
    };
    Recycler.prototype.setScrollOffsetX = function (value) {
        this._scrollOffsetX = value;
        return this;
    };
    Recycler.prototype.getScrollOffsetX = function () {
        return this._scrollOffsetX;
    };
    Recycler.prototype.setScrollOffsetY = function (value) {
        this._scrollOffsetY = value;
        return this;
    };
    Recycler.prototype.getScrollOffsetY = function () {
        return this._scrollOffsetY;
    };
    Recycler.prototype.getParent = function () {
        return this._parent;
    };
    Recycler.prototype.setRepeatContext = function (value) {
        this._repeatContext = value;
        return this;
    };
    Recycler.prototype.getRepeatContext = function () {
        return this._repeatContext;
    };
    Recycler.prototype.getForbiddenFocusDirections = function () {
        return this._forbiddenFocusDirections;
    };
    Recycler.prototype.setFocusedIndex = function (index) {
        this._focusedIndex = index;
        return this;
    };
    Recycler.prototype.getFocusedIndex = function () {
        return this._focusedIndex;
    };
    Recycler.prototype.setFocusedView = function (view) {
        this._focusedView = view;
        return this;
    };
    Recycler.prototype.getInitialRenderIndex = function () {
        return this._initialRenderIndex;
    };
    Recycler.prototype.getFocusedView = function () {
        return this._focusedView;
    };
    Recycler.prototype.onFocus = function () {
        if (this._onFocus) {
            this._onFocus();
        }
    };
    Recycler.prototype.onBlur = function () {
        if (this._onBlur) {
            this._onBlur();
        }
    };
    return Recycler;
}(AbstractFocusModel_1.default));
exports.default = Recycler;
//# sourceMappingURL=recycler.js.map