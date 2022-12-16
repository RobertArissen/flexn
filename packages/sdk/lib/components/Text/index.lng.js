"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("@lightningjs/core"));
var Text = /** @class */ (function (_super) {
    tslib_1.__extends(Text, _super);
    function Text() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Text._template = function () {
        return {
            w: 0,
            h: 0,
        };
    };
    Object.defineProperty(Text.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (content) {
            this._content = content;
            this._render();
        },
        enumerable: false,
        configurable: true
    });
    Text.prototype._init = function () {
        this._render();
    };
    Text.prototype._render = function () {
        this.patch(this.content);
    };
    return Text;
}(core_1.default.Component));
exports.default = Text;
//# sourceMappingURL=index.lng.js.map