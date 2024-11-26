"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("@lightningjs/core"));
var App = /** @class */ (function (_super) {
    tslib_1.__extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App._template = function () {
        return {
            rect: true,
            w: 0,
            h: 0,
            color: 0xffffffff,
        };
    };
    return App;
}(core_1.default.Component));
exports.default = App;
//# sourceMappingURL=index.lng.js.map