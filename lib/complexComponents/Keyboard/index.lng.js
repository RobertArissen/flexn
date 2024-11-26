"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ui_components_1 = require("@lightningjs/ui-components");
var Keyboard = /** @class */ (function (_super) {
    tslib_1.__extends(Keyboard, _super);
    function Keyboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Keyboard.prototype._createRows = function (rows) {
        var _this = this;
        if (rows === void 0) { rows = []; }
        return rows.map(function (keys) {
            var h = (_this.keysConfig && _this.keysConfig.h) || 60;
            return {
                type: ui_components_1.Row,
                h: h,
                wrapSelected: _this.rowWrap === undefined ? true : _this.rowWrap,
                neverScroll: true,
                itemSpacing: _this._spacing,
                items: _this._createKeys(keys),
            };
        });
    };
    return Keyboard;
}(ui_components_1.Keyboard));
exports.default = Keyboard;
//# sourceMappingURL=index.lng.js.map