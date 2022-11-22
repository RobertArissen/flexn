"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sdk_1 = require("@lightningjs/sdk");
var Card_1 = tslib_1.__importDefault(require("../Card"));
var helpers_1 = require("../../helpers");
var index_lng_1 = tslib_1.__importDefault(require("../../lng/Row/index.lng"));
var styles = {
    container: {
        flex: {
            direction: 'column',
        },
    },
    title: {
        flexItem: { marginBottom: 15 },
    },
    text: {
        fontSize: 42,
        textColor: (0, helpers_1.getHexColor)('#000000'),
    },
};
var Row = /** @class */ (function (_super) {
    tslib_1.__extends(Row, _super);
    function Row() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Row._template = function () {
        return {
            h: 280,
            Title: {},
            Row: {
                type: index_lng_1.default,
                itemSpacing: 25,
                items: [],
            },
        };
    };
    Row.prototype._construct = function () {
        var _this = this;
        this._whenEnabled = new Promise(function (resolve) { return (_this._enable = resolve); });
        this._itemsInViewport = 5;
    };
    Row.prototype._init = function () {
        var _this = this;
        this._whenEnabled.then(function () {
            var _a;
            if ((_a = _this.title) === null || _a === void 0 ? void 0 : _a.text) {
                var template = tslib_1.__assign(tslib_1.__assign({}, styles.container), { Title: tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, styles.title), (_this.title.containerStyle || {})), { text: tslib_1.__assign(tslib_1.__assign({ text: _this.title.text }, styles.text), (_this.title.textStyle || {})) }) });
                _this.patch(template);
            }
        });
    };
    Object.defineProperty(Row.prototype, "_Row", {
        get: function () {
            return this.tag('Row');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "independentNavigation", {
        get: function () {
            return this._independentNavigation;
        },
        set: function (value) {
            if (value !== this._independentNavigation) {
                this._independentNavigation = value;
                this._Row.independentNavigation = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "w", {
        get: function () {
            return this._w;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._w) {
                this._w = value;
                this.w = value;
                this._whenEnabled.then(function () {
                    _this._Row.w = _this.w;
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "h", {
        get: function () {
            return this._h;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._h) {
                this._h = value;
                this.h = value;
                this._whenEnabled.then(function () {
                    _this._Row.h = _this.h;
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "data", {
        // END
        get: function () {
            return this._data;
        },
        set: function (value) {
            var _this = this;
            this._data = value;
            this._whenEnabled.then(function () {
                _this._calculateCardWidth();
                _this._Row.items = _this.data.map(function (item) { return (tslib_1.__assign({ type: Card_1.default, src: item.backgroundImage, title: item.title, eventValue: item, focusOptions: _this.focusOptions }, _this.card)); });
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "itemsInViewport", {
        get: function () {
            return this._itemsInViewport;
        },
        set: function (value) {
            if (value !== undefined) {
                this._itemsInViewport = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "row", {
        get: function () {
            return this._row || {};
        },
        set: function (value) {
            var _this = this;
            var baseProps = ['h', 'w'];
            baseProps.forEach(function (prop) {
                if (_this.row[prop] !== value[prop]) {
                    _this[prop] = value[prop];
                }
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "card", {
        get: function () {
            return this._card || {};
        },
        set: function (card) {
            this._card = card;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "focusOptions", {
        get: function () {
            return this._focusOptions;
        },
        set: function (value) {
            this._focusOptions = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "itemSpacing", {
        get: function () {
            return this._itemSpacing || 0;
        },
        set: function (value) {
            var _this = this;
            if (value !== undefined) {
                this._itemSpacing = value;
                this._whenEnabled.then(function () {
                    _this._Row.itemSpacing = value;
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "lazyScroll", {
        set: function (value) {
            var _this = this;
            this._whenEnabled.then(function () {
                _this._Row.lazyScroll = value;
            });
        },
        enumerable: false,
        configurable: true
    });
    Row.prototype._calculateCardWidth = function () {
        var w = this.w || this.stage.w;
        if (w) {
            var actualWidth = w - this.itemSpacing * 2;
            var cardWidth = actualWidth / this.itemsInViewport - this.itemSpacing;
            if (this._card.w !== cardWidth) {
                this._card.w = cardWidth;
            }
        }
    };
    Row.prototype.$onCardPress = function (eventValue) {
        this.fireAncestors('$onCardPress', eventValue);
        this.signal('onPress', eventValue);
    };
    Row.prototype.$onCardFocus = function (eventValue) {
        this.fireAncestors('$onCardFocus', eventValue);
        this.signal('onFocus', eventValue);
    };
    Row.prototype.$onCardBlur = function (eventValue) {
        this.fireAncestors('$onCardBlur', eventValue);
        this.signal('onBlur', eventValue);
    };
    Row.prototype._getFocused = function () {
        return this._Row;
    };
    return Row;
}(sdk_1.Lightning.Component));
exports.default = Row;
//# sourceMappingURL=index.lng.js.map