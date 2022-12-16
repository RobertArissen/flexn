"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sdk_1 = require("@lightningjs/sdk");
var Image = /** @class */ (function (_super) {
    tslib_1.__extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Image._template = function () {
        return {
            color: 0xffffffff,
            w: 0,
            h: 0
        };
    };
    Object.defineProperty(Image.prototype, "source", {
        set: function (src) {
            this._source = src;
            this._update();
        },
        enumerable: false,
        configurable: true
    });
    Image.prototype._init = function () {
        this._update();
    };
    Image.prototype._update = function () {
        var _a = this, _source = _a._source, w = _a.w, h = _a.h;
        var template = getIconTemplate(_source, w, h);
        this.patch(template);
    };
    return Image;
}(sdk_1.Lightning.Component));
exports.default = Image;
var _a = [
    /^<svg.*<\/svg>$/,
    /\.svg$/,
    /\.(a?png|bmp|gif|ico|cur|jpe?g|pjp(eg)?|jfif|tiff?|webp)$/
].map(function (regex) { return RegExp.prototype.test.bind(regex); }), isSvgTag = _a[0], isSvgURI = _a[1], isImageURI = _a[2];
function getIconTemplate(icon, w, h) {
    var template = { w: w, h: h };
    switch (true) {
        case isSvgTag(icon):
            template.texture = sdk_1.Lightning.Tools.getSvgTexture("data:image/svg+xml,".concat(encodeURIComponent(icon)), w, h);
            break;
        case isSvgURI(icon):
            template.texture = sdk_1.Lightning.Tools.getSvgTexture(icon, w, h);
            break;
        case isImageURI(icon):
            template.src = icon.indexOf('http://') === 0 || icon.indexOf('https://') === 0 ? icon : sdk_1.Utils.asset(icon);
            break;
        default:
            break;
    }
    return template;
}
//# sourceMappingURL=index.lng.js.map