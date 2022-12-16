"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("@lightningjs/core"));
var Modal = /** @class */ (function (_super) {
    tslib_1.__extends(Modal, _super);
    function Modal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Modal._template = function () {
        return {
            rect: true,
            w: 0,
            h: 0,
            color: 0xffffffff,
        };
    };
    Modal.prototype._handleBack = function () {
        this.signal('onClose');
    };
    return Modal;
}(core_1.default.Component));
exports.default = Modal;
//# sourceMappingURL=index.lng.js.map