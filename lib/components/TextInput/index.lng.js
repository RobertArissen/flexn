"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sdk_1 = require("@lightningjs/sdk");
var ui_components_1 = require("@lightningjs/ui-components");
var Keyboard_1 = tslib_1.__importDefault(require("../../complexComponents/Keyboard"));
var helpers_1 = require("../../helpers");
var lodash_debounce_1 = tslib_1.__importDefault(require("lodash.debounce"));
var defaultStyles = {
    width: 300,
    height: 50,
    borderColor: (0, helpers_1.getHexColor)('#000000'),
    backgroundColor: (0, helpers_1.getHexColor)('#FFFFFF'),
    textColor: (0, helpers_1.getHexColor)('#000000'),
};
var styles = {
    text: {
        textColor: defaultStyles.textColor,
        maxLines: 1,
        verticalAlign: 'middle',
        textOverflow: 'clip',
        paddingRight: 5,
        paddingLeft: 5,
        wordWrap: false,
        fontSize: 28,
        lineHeight: defaultStyles.height,
    },
};
var TextInput = /** @class */ (function (_super) {
    tslib_1.__extends(TextInput, _super);
    function TextInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextInput._template = function () {
        return {
            rect: true,
            Input: {
                w: defaultStyles.width,
                h: defaultStyles.height,
                clipping: true,
                texture: sdk_1.Lightning.Tools.getRoundRect(defaultStyles.width, defaultStyles.height, 4, 1, defaultStyles.borderColor, true, defaultStyles.backgroundColor),
                Caret: {
                    text: tslib_1.__assign({ text: '' }, styles.text),
                },
                Text: {
                    text: tslib_1.__assign({ text: '' }, styles.text),
                },
            },
            Keyboard: {
                type: Keyboard_1.default,
                visible: false,
                formats: ui_components_1.KEYBOARD_FORMATS.qwerty,
            },
        };
    };
    TextInput.prototype._construct = function () {
        this.isKeyboardOpen = false;
        this.isTyping = false;
        this.caretOffset = 0;
        this.onType = (0, lodash_debounce_1.default)(this.onTypeDebounced.bind(this), 500);
        this.interval = null;
    };
    TextInput.prototype._init = function () {
        var _this = this;
        var showCaret = true;
        this.interval = sdk_1.Registry.setInterval(function () {
            if (!_this.isTyping && _this.isKeyboardOpen) {
                _this._setVirtualCaret(showCaret);
                showCaret = !showCaret;
            }
            else {
                _this._setVirtualCaret(false);
            }
        }, 500);
    };
    TextInput.prototype._inactive = function () {
        sdk_1.Registry.clearInterval(this.interval);
    };
    TextInput._states = function () {
        return [
            /** @class */ (function (_super) {
                tslib_1.__extends(KeyboardOpen, _super);
                function KeyboardOpen() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                KeyboardOpen.prototype._handleDown = function () {
                    return;
                };
                KeyboardOpen.prototype._handleUp = function () {
                    return;
                };
                KeyboardOpen.prototype._handleLeft = function () {
                    return;
                };
                KeyboardOpen.prototype._handleRight = function () {
                    return;
                };
                return KeyboardOpen;
            }(this)),
            /** @class */ (function (_super) {
                tslib_1.__extends(KeyboardClose, _super);
                function KeyboardClose() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return KeyboardClose;
            }(this)),
        ];
    };
    Object.defineProperty(TextInput.prototype, "value", {
        get: function () {
            return this.tag('Input').tag('Text').text.text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextInput.prototype, "input", {
        set: function (template) {
            this.patch({
                Input: template,
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextInput.prototype, "keyboard", {
        get: function () {
            return this._keyboard;
        },
        set: function (template) {
            this._keyboard = template;
            this.patch({
                Keyboard: template,
            });
        },
        enumerable: false,
        configurable: true
    });
    TextInput.prototype.onTypeDebounced = function () {
        this.isTyping = false;
    };
    TextInput.prototype.$onSoftKey = function (_a) {
        var _b;
        var key = _a.key;
        // Component can be measured from measureText method in utils
        var shouldMoveCaret = ((_b = this.tag('Input').tag('Text').text._source) === null || _b === void 0 ? void 0 : _b.w) > this.tag('Input').w - 40;
        this.isTyping = true;
        this.onType();
        if (!shouldMoveCaret) {
            this.caretOffset = 0;
        }
        var value = this.value;
        switch (key) {
            case 'Delete':
                value = value.slice(0, -1);
                if (shouldMoveCaret) {
                    this.caretOffset += 20;
                }
                break;
            case 'Clear':
                value = '';
                this.caretOffset = 0;
                break;
            case 'Space':
                value = "".concat(value, " ");
                if (shouldMoveCaret) {
                    this.caretOffset -= 20;
                }
                break;
            case '#@!':
            case 'abc':
            case 'áöû':
            case 'shift':
                // Ignore these keys
                break;
            case 'Done':
                this._toggleKeyboard(false);
                return;
            default:
                value = "".concat(value).concat(key);
                if (shouldMoveCaret) {
                    this.caretOffset -= 20;
                }
                break;
        }
        var template = {
            Input: {
                Text: {
                    x: this.caretOffset,
                    text: {
                        text: value,
                    },
                },
                Caret: {
                    x: this.caretOffset,
                    text: {
                        text: '',
                    },
                },
            },
        };
        this.patch(template);
    };
    TextInput.prototype._toggleKeyboard = function (shouldOpen) {
        this.isKeyboardOpen = shouldOpen;
        if (shouldOpen) {
            this._setState('KeyboardOpen');
        }
        else {
            this._setState('KeyboardClose');
        }
        var template = {
            Keyboard: {
                visible: shouldOpen,
                smooth: {
                    y: shouldOpen ? this.keyboard.y : 0,
                },
            },
            Caret: {
                text: {
                    text: '',
                },
            },
        };
        this.patch(template);
        this._refocus();
    };
    TextInput.prototype._setVirtualCaret = function (showCaret) {
        var value = this.value;
        var template = {
            Input: {
                Caret: {
                    text: {
                        text: "".concat(value).concat(showCaret ? '|' : ''),
                    },
                },
            },
        };
        this.patch(template);
    };
    TextInput.prototype._focus = function () {
        var template = {
            Input: {
                texture: sdk_1.Lightning.Tools.getRoundRect(defaultStyles.width, defaultStyles.height, 4, 3, defaultStyles.borderColor, true, defaultStyles.backgroundColor),
            },
        };
        this.patch(template);
    };
    TextInput.prototype._unfocus = function () {
        var template = {
            Input: {
                texture: sdk_1.Lightning.Tools.getRoundRect(defaultStyles.width, defaultStyles.height, 4, 1, defaultStyles.borderColor, true, defaultStyles.backgroundColor),
            },
        };
        this.patch(template);
    };
    TextInput.prototype._handleEnter = function () {
        this._toggleKeyboard(true);
    };
    TextInput.prototype._getFocused = function () {
        if (this.isKeyboardOpen) {
            return this.tag('Keyboard');
        }
    };
    return TextInput;
}(sdk_1.Lightning.Component));
exports.default = TextInput;
//# sourceMappingURL=index.lng.js.map