"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("@lightningjs/core"));
var Debugger = /** @class */ (function (_super) {
    tslib_1.__extends(Debugger, _super);
    function Debugger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Debugger._template = function () {
        return {
            rect: true,
            w: 0,
            h: 0,
            color: 0xffffffff,
        };
    };
    return Debugger;
}(core_1.default.Component));
exports.default = Debugger;
//# sourceMappingURL=index.lng.js.map