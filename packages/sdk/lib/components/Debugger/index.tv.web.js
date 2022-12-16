"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_native_1 = require("react-native");
var core_1 = tslib_1.__importDefault(require("../../focusManager/model/core"));
var windowWidth = react_native_1.Dimensions.get('window').width;
var windowHeight = react_native_1.Dimensions.get('window').height;
function FocusDebugger() {
    var _a = (0, react_1.useState)(0), seconds = _a[0], setSeconds = _a[1];
    (0, react_1.useEffect)(function () {
        var interval = null;
        if (core_1.default.hasPendingUpdateGuideLines) {
            core_1.default.executeUpdateGuideLines();
        }
        interval = setInterval(function () {
            setSeconds(function (s) { return s + 1; });
        }, 500);
        return function () { return clearInterval(interval); };
    });
    var grid = [];
    for (var i = 0; i < 10; i++) {
        grid.push(react_1.default.createElement(react_native_1.View, { key: "focus-debugger-grid-".concat(i), style: {
                width: '100%',
                height: 1,
                backgroundColor: '#333333',
                position: 'absolute',
                top: i * 100,
            } }));
    }
    var colors = {
        view: 'white',
        screen: 'yellow',
        recycler: 'green',
        scrollView: 'purple',
    };
    if (core_1.default.isDebuggerEnabled) {
        var contexts_1 = [];
        var contextMap = core_1.default.getFocusMap(); // eslint-disable-line prefer-destructuring
        Object.values(contextMap)
            .filter(function (ctx) { return ctx.getType() === 'view'; })
            .forEach(function (ctx) {
            var _a;
            var parentInForeground = (_a = ctx.getScreen()) === null || _a === void 0 ? void 0 : _a.isInForeground();
            if (ctx.getLayout() && parentInForeground) {
                var borderColor = colors[ctx.getType()] || 'white';
                contexts_1.push(react_1.default.createElement(react_native_1.View, { key: "".concat(ctx.getId()).concat(ctx.nodeId), style: {
                        width: ctx.getLayout().width,
                        height: ctx.getLayout().height,
                        borderColor: borderColor,
                        borderWidth: ctx.getIsFocused() ? 5 : 1,
                        position: 'absolute',
                        top: isNaN(ctx.getLayout().absolute.yMin) ? 0 : ctx.getLayout().absolute.yMin,
                        left: isNaN(ctx.getLayout().absolute.xMin) ? 0 : ctx.getLayout().absolute.xMin,
                    } },
                    react_1.default.createElement(react_native_1.Text, { style: { color: borderColor } }, ctx.getId().substr(ctx.getId().length - 5))), react_1.default.createElement(react_native_1.View, { key: ctx.getId(), style: {
                        width: 6,
                        height: 6,
                        borderRadius: 5,
                        backgroundColor: borderColor,
                        position: 'absolute',
                        top: isNaN(ctx.getLayout().absolute.xCenter - 3)
                            ? 0
                            : ctx.getLayout().absolute.xCenter - 3,
                        left: isNaN(ctx.getLayout().absolute.yCenter - 3)
                            ? 0
                            : ctx.getLayout().absolute.yCenter - 3,
                    } }));
            }
        });
        return (react_1.default.createElement(react_native_1.View, { style: {
                width: windowWidth,
                height: windowHeight,
                backgroundColor: '#00000066',
                position: 'absolute',
            } },
            grid,
            contexts_1,
            react_1.default.createElement(react_native_1.View, { style: {
                    width: '100%',
                    height: 1,
                    backgroundColor: 'red',
                    top: isNaN(core_1.default.guideLineY) ? 0 : core_1.default.guideLineY,
                    position: 'absolute',
                } }),
            react_1.default.createElement(react_native_1.View, { style: {
                    height: '100%',
                    width: 1,
                    backgroundColor: 'red',
                    left: isNaN(core_1.default.guideLineX) ? 0 : core_1.default.guideLineX,
                    position: 'absolute',
                } }),
            react_1.default.createElement(react_native_1.Text, null, seconds)));
    }
    return null;
}
exports.default = FocusDebugger;
//# sourceMappingURL=index.tv.web.js.map