"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = /** @class */ (function () {
    function Logger(CoreManagerInstance) {
        this._coreManager = CoreManagerInstance;
    }
    Logger.getInstance = function (CoreManagerInstance) {
        if (!Logger._loggerInstance) {
            Logger._loggerInstance = new Logger(CoreManagerInstance);
        }
        return Logger._loggerInstance;
    };
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, args); // eslint-disable-line
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.error.apply(console, args); // eslint-disable-line
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.warn.apply(console, args); // eslint-disable-line
    };
    Logger.prototype.debug = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if ((_a = this._coreManager) === null || _a === void 0 ? void 0 : _a.isDebuggerEnabled) {
            console.debug.apply(console, args); // eslint-disable-line
        }
    };
    return Logger;
}());
exports.default = Logger;
//# sourceMappingURL=logger.js.map