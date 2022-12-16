"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var View_1 = tslib_1.__importDefault(require("../../components/View"));
var Image_1 = tslib_1.__importDefault(require("../../components/Image"));
var Text_1 = tslib_1.__importDefault(require("../../components/Text"));
var Pressable_1 = tslib_1.__importDefault(require("../../components/Pressable"));
var useStyleFlattener_1 = tslib_1.__importDefault(require("../../hooks/useStyleFlattener"));
var helpers_1 = require("../../helpers");
var Card = react_1.default.forwardRef(function (_a, ref) {
    var src = _a.src, _b = _a.title, title = _b === void 0 ? '' : _b, _c = _a.resizeMode, resizeMode = _c === void 0 ? 'cover' : _c, _d = _a.style, style = _d === void 0 ? {} : _d, onFocus = _a.onFocus, onPress = _a.onPress, onBlur = _a.onBlur, parentContext = _a.parentContext, repeatContext = _a.repeatContext, focusOptions = _a.focusOptions, renderProps = _a.renderProps;
    var styles = (0, useStyleFlattener_1.default)(style, ['width', 'height']);
    var titleStyles = {
        fontSize: styles.fontSize || baseStyles.title.fontSize,
        color: styles.color || baseStyles.title.color,
        textAlign: styles.textAlign || baseStyles.title.textAlign,
    };
    var posterStyles = {
        borderRadius: styles.borderWidth ? 0 : styles.borderRadius,
    };
    var borderProps = {
        borderWidth: styles.borderWidth,
        borderLeftWidth: styles.borderLeftWidth,
        borderRightWidth: styles.borderRightWidth,
        borderTopWidth: styles.borderTopWidth,
        borderBottomWidth: styles.borderBottomWidth,
        borderStartWidth: styles.borderStartWidth,
        borderEndWidth: styles.borderEndWidth,
        borderColor: styles.borderColor,
    };
    var containerStyle = renderProps
        ? [renderProps.style, { width: styles.width, height: styles.height }, borderProps]
        : [baseStyles.card, styles, borderProps];
    delete styles.borderWidth;
    delete styles.borderLeftWidth;
    delete styles.borderRightWidth;
    delete styles.borderTopWidth;
    delete styles.borderBottomWidth;
    delete styles.borderStartWidth;
    delete styles.borderEndWidth;
    delete styles.borderColor;
    delete styles.borderRadius;
    var renderImageWithText = function () { return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Image_1.default, { resizeMode: resizeMode, source: src, style: [baseStyles.poster, posterStyles] }),
        react_1.default.createElement(Text_1.default, { style: [baseStyles.title, titleStyles], numberOfLines: 1 }, title))); };
    var renderContainerContent = function () {
        if (renderProps) {
            return react_1.default.createElement(View_1.default, { style: [baseStyles.card, styles] }, renderImageWithText());
        }
        return renderImageWithText();
    };
    return (react_1.default.createElement(Pressable_1.default, { ref: ref, style: containerStyle, parentContext: parentContext, repeatContext: repeatContext, onFocus: onFocus, onBlur: onBlur, onPress: onPress, focusOptions: focusOptions }, renderContainerContent()));
});
var baseStyles = {
    card: {
        width: 250,
        height: 250,
    },
    poster: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: (0, helpers_1.Ratio)(26),
        color: '#000000',
        textAlign: 'center',
    },
};
Card.displayName = 'Card';
exports.default = Card;
//# sourceMappingURL=card.js.map