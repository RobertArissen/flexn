"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TVRemoteHandler = exports.useTVRemoteHandler = void 0;
var react_1 = require("react");
var TVRemoteHandler = /** @class */ (function () {
    function TVRemoteHandler() {
    }
    TVRemoteHandler.prototype.enable = function (_component, _callback) {
        //void
    };
    TVRemoteHandler.prototype.disable = function () {
        //void
    };
    return TVRemoteHandler;
}());
exports.TVRemoteHandler = TVRemoteHandler;
var useTVRemoteHandler = function (callback, _component) {
    (0, react_1.useEffect)(function () {
        if (!callback)
            callback();
    });
    return {};
};
exports.useTVRemoteHandler = useTVRemoteHandler;
//# sourceMappingURL=index.js.map