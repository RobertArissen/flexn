"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("@lightningjs/core"));
var Pressable = /** @class */ (function (_super) {
    tslib_1.__extends(Pressable, _super);
    function Pressable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pressable._template = function () {
        return {
            w: 0,
            h: 0,
        };
    };
    Pressable.prototype._construct = function () {
        this._disableDefaultAnimation = false;
    };
    Pressable.prototype._init = function () {
        this._disableDefaultAnimation = this.disableDefaultAnimation;
    };
    Object.defineProperty(Pressable.prototype, "disableDefaultAnimation", {
        get: function () {
            return this._disableDefaultAnimation;
        },
        set: function (val) {
            this._disableDefaultAnimation = val;
        },
        enumerable: false,
        configurable: true
    });
    Pressable.prototype._handleEnter = function () {
        this.signal('onPress');
    };
    Pressable.prototype._focus = function () {
        if (!this.disableDefaultAnimation) {
            this.smooth = { scale: 1.2 };
        }
        this.signal('onFocus');
    };
    Pressable.prototype._unfocus = function () {
        if (!this.disableDefaultAnimation) {
            this.smooth = { scale: 1 };
        }
        this.signal('onBlur');
    };
    return Pressable;
}(core_1.default.Component));
exports.default = Pressable;
//# sourceMappingURL=index.lng.js.map