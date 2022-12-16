"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TVRemoteHandler = exports.useTVRemoteHandler = void 0;
var tslib_1 = require("tslib");
var react_native_1 = require("react-native");
var react_1 = require("react");
var lodash_throttle_1 = tslib_1.__importDefault(require("lodash.throttle"));
var EVENT_NAME = 'onTVRemoteKey';
var TVRemoteHandler = /** @class */ (function () {
    function TVRemoteHandler() {
    }
    TVRemoteHandler.prototype.enable = function (component, callback) {
        this.__listener = react_native_1.DeviceEventEmitter.addListener(EVENT_NAME, function (_a) {
            var eventKeyAction = _a.eventKeyAction, eventType = _a.eventType;
            return callback(component, {
                eventType: eventType,
                eventKeyAction: eventKeyAction,
            });
        });
    };
    TVRemoteHandler.prototype.disable = function () {
        if (this.__listener)
            this.__listener.remove();
    };
    return TVRemoteHandler;
}());
exports.TVRemoteHandler = TVRemoteHandler;
function useTVRemoteHandler(callback) {
    var handler = (0, react_1.useCallback)((0, lodash_throttle_1.default)(callback, 100), []);
    (0, react_1.useEffect)(function () {
        var listener = react_native_1.DeviceEventEmitter.addListener(EVENT_NAME, function (_a) {
            var eventKeyAction = _a.eventKeyAction, eventType = _a.eventType;
            return handler({
                eventType: eventType,
                eventKeyAction: eventKeyAction,
            });
        });
        return function () {
            if (listener)
                listener.remove();
        };
    }, [callback]);
    return {};
}
exports.useTVRemoteHandler = useTVRemoteHandler;
//# sourceMappingURL=index.androidtv.js.map