"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("@lightningjs/core"));
var ActivityIndicator = /** @class */ (function (_super) {
    tslib_1.__extends(ActivityIndicator, _super);
    function ActivityIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityIndicator._template = function () {
        return {
            rect: true,
            w: 0,
            h: 0,
            color: 0xffffffff,
        };
    };
    return ActivityIndicator;
}(core_1.default.Component));
exports.default = ActivityIndicator;
//# sourceMappingURL=index.lng.js.map