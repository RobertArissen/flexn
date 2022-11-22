"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_native_1 = require("react-native");
var renative_1 = require("@rnv/renative");
var keyHandler_1 = tslib_1.__importDefault(require("../../focusManager/model/keyHandler"));
var isAndroidBased = renative_1.isPlatformAndroidtv || renative_1.isPlatformFiretv;
function App(_a) {
    var children = _a.children, props = tslib_1.__rest(_a, ["children"]);
    var focusTrapRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var Handler = new keyHandler_1.default();
        var node = isAndroidBased && (0, react_native_1.findNodeHandle)(focusTrapRef.current);
        if (node && focusTrapRef.current) {
            focusTrapRef.current.setNativeProps({
                nextFocusRight: node,
                nextFocusLeft: node,
                nextFocusUp: node,
                nextFocusDown: node,
            });
        }
        return function () {
            Handler.removeListeners();
        };
    }, []);
    return (react_1.default.createElement(react_native_1.View, tslib_1.__assign({ style: { flex: 1 } }, props),
        isAndroidBased && (react_1.default.createElement(react_native_1.View, { style: { width: 0, height: 0 } },
            react_1.default.createElement(react_native_1.ScrollView, null,
                react_1.default.createElement(react_native_1.TouchableOpacity, { ref: focusTrapRef, hasTVPreferredFocus: true })))),
        children));
}
exports.default = App;
//# sourceMappingURL=index.native.tv.js.map