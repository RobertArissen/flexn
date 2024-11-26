"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHexColor = exports.Ratio = void 0;
var react_native_1 = require("react-native");
var renative_1 = require("@rnv/renative");
function Ratio(pixels) {
    if (!(renative_1.isPlatformAndroidtv || renative_1.isPlatformFiretv))
        return pixels;
    var resolution = react_native_1.Dimensions.get('screen').height * react_native_1.PixelRatio.get();
    return Math.round(pixels / (resolution < 2160 ? 2 : 1));
}
exports.Ratio = Ratio;
function getHexColor(hex, alpha) {
    if (alpha === void 0) { alpha = 100; }
    if (!hex) {
        return 0x00;
    }
    if (hex.startsWith('#')) {
        hex = hex.substring(1);
    }
    var hexAlpha = Math.round((alpha / 100) * 255).toString(16);
    var str = "0x".concat(hexAlpha).concat(hex);
    //@ts-ignore
    return parseInt(Number(str), 10);
}
exports.getHexColor = getHexColor;
//# sourceMappingURL=helpers.js.map