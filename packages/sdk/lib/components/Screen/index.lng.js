"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("@lightningjs/core"));
var Screen = /** @class */ (function (_super) {
    tslib_1.__extends(Screen, _super);
    function Screen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Screen._template = function () {
        return {
            rect: true,
            w: 0,
            h: 0,
            color: 0xffffffff,
        };
    };
    return Screen;
}(core_1.default.Component));
exports.default = Screen;
//# sourceMappingURL=index.lng.js.map