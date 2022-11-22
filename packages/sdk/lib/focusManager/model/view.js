"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("./core"));
var helpers_1 = require("../helpers");
var AbstractFocusModel_1 = tslib_1.__importDefault(require("./AbstractFocusModel"));
var helpers_2 = require("../helpers");
var View = /** @class */ (function (_super) {
    tslib_1.__extends(View, _super);
    function View(params) {
        var _this = _super.call(this, params) || this;
        var repeatContext = params.repeatContext, parent = params.parent, forbiddenFocusDirections = params.forbiddenFocusDirections, onFocus = params.onFocus, onBlur = params.onBlur, onPress = params.onPress, focusKey = params.focusKey, hasPreferredFocus = params.hasPreferredFocus;
        var id = (0, helpers_1.makeid)(8);
        _this._id = (parent === null || parent === void 0 ? void 0 : parent.getId()) ? "".concat(parent.getId(), ":view-").concat(id) : "view-".concat(id);
        _this._type = 'view';
        _this._parent = parent;
        _this._isFocused = false;
        _this._repeatContext = repeatContext;
        _this._focusKey = focusKey;
        _this._forbiddenFocusDirections = (0, helpers_2.alterForbiddenFocusDirections)(forbiddenFocusDirections);
        _this._hasPreferredFocus = hasPreferredFocus;
        _this._onFocus = onFocus;
        _this._onBlur = onBlur;
        _this._onPress = onPress;
        _this.init();
        return _this;
    }
    View.prototype.init = function () {
        var _a, _b, _c;
        if ((_a = this.getParent()) === null || _a === void 0 ? void 0 : _a.isRecyclable()) {
            var parent_1 = this.getParent();
            if (parent_1.getInitialRenderIndex() && parent_1.getInitialRenderIndex() === ((_b = this.getRepeatContext()) === null || _b === void 0 ? void 0 : _b.index)) {
                parent_1.setFocusedView(this);
            }
            else if (!parent_1.getFocusedView() && ((_c = this.getRepeatContext()) === null || _c === void 0 ? void 0 : _c.index) === 0) {
                parent_1.setFocusedView(this);
            }
        }
    };
    View.prototype.getType = function () {
        return this._type;
    };
    View.prototype.isFocusable = function () {
        return true;
    };
    View.prototype.updateEvents = function (_a) {
        var onPress = _a.onPress, onFocus = _a.onFocus, onBlur = _a.onBlur;
        this._onPress = onPress;
        this._onFocus = onFocus;
        this._onBlur = onBlur;
        return this;
    };
    View.prototype.setFocus = function () {
        core_1.default.executeFocus(this);
        core_1.default.executeUpdateGuideLines();
    };
    View.prototype.onFocus = function () {
        if (this._onFocus) {
            this._onFocus();
        }
    };
    View.prototype.onBlur = function () {
        if (this._onBlur) {
            this._onBlur();
        }
    };
    View.prototype.onPress = function () {
        if (this._onPress) {
            this._onPress();
        }
    };
    View.prototype.setIsFocused = function (value) {
        var _a, _b;
        this._isFocused = value;
        if (value && ((_a = this.getParent()) === null || _a === void 0 ? void 0 : _a.isRecyclable())) {
            var currentIndex = (_b = this.getRepeatContext()) === null || _b === void 0 ? void 0 : _b.index;
            if (currentIndex !== undefined) {
                this.getParent().setFocusedIndex(currentIndex).setFocusedView(this);
            }
        }
        return this;
    };
    View.prototype.getIsFocused = function () {
        return this._isFocused;
    };
    View.prototype.setRepeatContext = function (value) {
        this._repeatContext = value;
        return this;
    };
    View.prototype.getRepeatContext = function () {
        return this._repeatContext;
    };
    View.prototype.getParent = function () {
        return this._parent;
    };
    View.prototype.getFocusKey = function () {
        return this._focusKey;
    };
    View.prototype.getForbiddenFocusDirections = function () {
        return this._forbiddenFocusDirections;
    };
    View.prototype.hasPreferredFocus = function () {
        return this._hasPreferredFocus;
    };
    return View;
}(AbstractFocusModel_1.default));
exports.default = View;
//# sourceMappingURL=view.js.map