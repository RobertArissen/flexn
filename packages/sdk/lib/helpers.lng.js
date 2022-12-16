"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHexColor = exports.Ratio = void 0;
function Ratio(_pixels) {
    return 0;
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
//# sourceMappingURL=helpers.lng.js.map