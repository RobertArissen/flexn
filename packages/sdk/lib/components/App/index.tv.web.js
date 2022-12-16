"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_native_1 = require("react-native");
var keyHandler_1 = tslib_1.__importDefault(require("../../focusManager/model/keyHandler"));
function App(_a) {
    var children = _a.children, props = tslib_1.__rest(_a, ["children"]);
    (0, react_1.useEffect)(function () {
        var Handler = new keyHandler_1.default();
        return function () {
            Handler.removeListeners();
        };
    }, []);
    return (react_1.default.createElement(react_native_1.View, tslib_1.__assign({ style: { flex: 1 } }, props), children));
}
exports.default = App;
//# sourceMappingURL=index.tv.web.js.map