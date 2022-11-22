"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("@lightningjs/core"));
var View = /** @class */ (function (_super) {
    tslib_1.__extends(View, _super);
    function View() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    View._template = function () {
        return {
            rect: true,
            color: 0xffffffff,
            w: 0,
            h: 0,
        };
    };
    return View;
}(core_1.default.Component));
exports.default = View;
//# sourceMappingURL=index.lng.js.map