"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TVRemoteHandler = exports.useTVRemoteHandler = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var react_native_1 = require("react-native");
var lodash_throttle_1 = tslib_1.__importDefault(require("lodash.throttle"));
var EVENT_NAME = 'onTVRemoteKey';
var TVRemoteHandler = /** @class */ (function () {
    function TVRemoteHandler() {
        this.__eventEmitter = new react_native_1.NativeEventEmitter(react_native_1.NativeModules.TvRemoteHandler);
    }
    TVRemoteHandler.prototype.enable = function (component, callback) {
        this.__listener = this.__eventEmitter.addListener(EVENT_NAME, function (eventData) {
            if (eventData.eventKeyAction === 'down') {
                callback(component, eventData);
            }
        });
    };
    TVRemoteHandler.prototype.disable = function () {
        if (this.__listener)
            this.__listener.remove();
    };
    return TVRemoteHandler;
}());
exports.TVRemoteHandler = TVRemoteHandler;
var useTVRemoteHandler = function (callback) {
    var cb = (0, react_1.useCallback)((0, lodash_throttle_1.default)(callback, 100), []);
    (0, react_1.useEffect)(function () {
        var TvRemoteHandler = react_native_1.NativeModules.TvRemoteHandler;
        var eventEmitter = new react_native_1.NativeEventEmitter(TvRemoteHandler);
        var listener = eventEmitter.addListener(EVENT_NAME, function (eventData) {
            if (eventData.eventKeyAction === 'down') {
                cb(eventData);
            }
        });
        return function () {
            if (listener) {
                listener.remove();
            }
        };
    }, [callback]);
    return {};
};
exports.useTVRemoteHandler = useTVRemoteHandler;
//# sourceMappingURL=index.tvos.js.map