"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("@lightningjs/core"));
var helpers_1 = require("../../helpers");
var DEFAULT_DIMENSIONS = {
    w: 250,
    h: 250,
};
var Card = /** @class */ (function (_super) {
    tslib_1.__extends(Card, _super);
    function Card() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Card._template = function () {
        return {
            rect: true,
            Image: {
                rtt: true,
                h: DEFAULT_DIMENSIONS.h,
                w: DEFAULT_DIMENSIONS.w,
                shader: {
                    type: core_1.default.shaders.RoundedRectangle,
                },
                resizeMode: 'contain',
            },
            Text: {
                y: DEFAULT_DIMENSIONS.h + 30,
                w: function (w) { return w - 50; },
                text: {
                    fontSize: 28,
                    maxLinesSuffix: '...',
                    maxLines: 1,
                    textColor: (0, helpers_1.getHexColor)('#000000'),
                    text: '',
                },
            },
        };
    };
    Card.prototype._construct = function () {
        var _this = this;
        this._whenEnabled = new Promise(function (resolve) { return (_this._enable = resolve); });
        this._animator = null;
    };
    Object.defineProperty(Card.prototype, "_Image", {
        get: function () {
            return this.tag('Image');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "_Text", {
        get: function () {
            return this.tag('Text');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "w", {
        get: function () {
            return this._w;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._w) {
                this._w = value;
                this.w = value;
                this._whenEnabled.then(function () {
                    _this._Image.w = _this.w;
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "h", {
        get: function () {
            return this._h;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._h) {
                this._h = value;
                this.h = value;
                this._whenEnabled.then(function () {
                    _this._Image.h = _this.h;
                    _this._Text.y = _this.h + 30;
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._src) {
                this._src = value;
                this.src = value;
                this._whenEnabled.then(function () {
                    _this._Image.src = _this.src;
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._title) {
                this._title = value;
                this.title = value;
                this._whenEnabled.then(function () {
                    _this._Text.text = {
                        text: _this.title,
                    };
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "focusOptions", {
        get: function () {
            return this._focusOptions;
        },
        set: function (value) {
            this._focusOptions = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "eventValue", {
        get: function () {
            return this._eventValue;
        },
        set: function (item) {
            this._eventValue = item;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "borderColor", {
        get: function () {
            return this._borderColor;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._borderColor) {
                this._borderColor = value;
                this._whenEnabled.then(function () {
                    _this._Image.shader = {
                        strokeColor: _this._borderColor,
                    };
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "borderWidth", {
        get: function () {
            return this._borderWidth;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._borderWidth) {
                this._borderWidth = value;
                this._whenEnabled.then(function () {
                    _this._Image.shader = {
                        stroke: _this._borderWidth,
                    };
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "borderRadius", {
        get: function () {
            return this._borderRadius;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._borderRadius) {
                this._borderRadius = value;
                this._whenEnabled.then(function () {
                    _this._Image.shader = {
                        radius: _this._borderRadius,
                    };
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "fontSize", {
        get: function () {
            return this._fontSize;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._fontSize) {
                this._fontSize = value;
                this._whenEnabled.then(function () {
                    _this._Text.text = {
                        text: _this._fontSize,
                    };
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "fontColor", {
        get: function () {
            return this._fontColor;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._fontColor) {
                this._fontColor = value;
                this._whenEnabled.then(function () {
                    _this._Text.text = {
                        text: _this._fontColor,
                    };
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Card.prototype._setAnimationValues = function () {
        if (this._animator) {
            return this._animator;
        }
        var template = {};
        var animatorOptions = this.focusOptions.animatorOptions;
        var type = animatorOptions.type, borderColor = animatorOptions.borderColor, borderWidth = animatorOptions.borderWidth, borderRadius = animatorOptions.borderRadius, scaleAmount = animatorOptions.scale;
        var scaleDefault = { scale: 1 };
        var shaderDefault = { stroke: 0 };
        var scale = { scale: scaleAmount };
        var shader = {
            strokeColor: borderColor,
            stroke: borderWidth,
            radius: borderRadius,
        };
        switch (type) {
            case 'scale':
                template.focus = { smooth: scale };
                template.unfocus = { smooth: scaleDefault };
                break;
            case 'scale_with_border':
                template.focus = { smooth: scale, shader: shader };
                template.unfocus = { shader: shaderDefault, smooth: scaleDefault };
                break;
            case 'border':
                template.focus = { shader: shader };
                template.unfocus = { shader: shaderDefault };
                break;
            case 'background_color':
                break;
            default:
                template.focus = { smooth: { scale: 1.2 } };
                template.unfocus = { smooth: scaleDefault };
                break;
        }
        this._animator = template;
        return template;
    };
    Card.prototype._handleEnter = function () {
        this.fireAncestors('$onCardPress', this.eventValue);
        this.signal('onPress', this.eventValue);
    };
    Card.prototype._focus = function () {
        // this.fireAncestors('$onCardFocus', this.eventValue);
        // this.signal('onFocus', this.eventValue);
        this.patch({ Image: this._setAnimationValues().focus, zIndex: 1 });
    };
    Card.prototype._unfocus = function () {
        // this.fireAncestors('$onCardBlur', this.eventValue);
        // this.signal('onBlur', this.eventValue);
        this.patch({ Image: this._setAnimationValues().unfocus, zIndex: 0 });
    };
    return Card;
}(core_1.default.Component));
exports.default = Card;
//# sourceMappingURL=index.lng.js.map