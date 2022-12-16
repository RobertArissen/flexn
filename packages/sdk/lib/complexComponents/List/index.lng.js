"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sdk_1 = require("@lightningjs/sdk");
var index_lng_1 = tslib_1.__importDefault(require("../Row/index.lng"));
var index_lng_2 = tslib_1.__importDefault(require("../../lng/Column/index.lng"));
var List = /** @class */ (function (_super) {
    tslib_1.__extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    List._template = function () {
        return {
            List: {
                type: index_lng_2.default,
                itemSpacing: 25,
                items: [],
            },
        };
    };
    List.prototype._construct = function () {
        var _this = this;
        this._whenEnabled = new Promise(function (resolve) { return (_this._enable = resolve); });
    };
    Object.defineProperty(List.prototype, "_List", {
        get: function () {
            return this.tag('List');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(List.prototype, "w", {
        get: function () {
            return this._w;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._w) {
                this._w = value;
                this.w = value;
                this._whenEnabled.then(function () {
                    _this._List.w = _this.w;
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(List.prototype, "h", {
        get: function () {
            return this._h;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._h) {
                this._h = value;
                this.h = value;
                this._whenEnabled.then(function () {
                    _this._List.h = _this.h;
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(List.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            var _this = this;
            this._data = value;
            this._whenEnabled.then(function () {
                _this._List.items = _this.data.map(function (rowData) { return ({
                    type: index_lng_1.default,
                    data: rowData.items,
                    itemsInViewport: rowData.itemsInViewport,
                    itemSpacing: _this.itemSpacing,
                    focusOptions: _this.focusOptions,
                    lazyScroll: _this.lazyScroll,
                    card: _this.card,
                    row: _this.row,
                    title: tslib_1.__assign(tslib_1.__assign({}, (_this.row.title || {})), { text: rowData.rowTitle }),
                }); });
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(List.prototype, "card", {
        get: function () {
            return this._card || {};
        },
        set: function (value) {
            this._card = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(List.prototype, "row", {
        get: function () {
            return this._row || {};
        },
        set: function (value) {
            this._row = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(List.prototype, "focusOptions", {
        get: function () {
            return this._focusOptions;
        },
        set: function (value) {
            this._focusOptions = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(List.prototype, "itemSpacing", {
        get: function () {
            return this._itemSpacing;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._itemSpacing) {
                this._itemSpacing = value;
                this._whenEnabled.then(function () {
                    _this._List.itemSpacing = value;
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(List.prototype, "lazyScroll", {
        get: function () {
            return this._lazyScroll;
        },
        set: function (value) {
            if (value !== this.lazyScroll) {
                this._lazyScroll = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    List.prototype.$onCardPress = function (eventValue) {
        this.signal('onPress', eventValue);
    };
    List.prototype.$onCardFocus = function (eventValue) {
        this.signal('onFocus', eventValue);
    };
    List.prototype.$onCardBlur = function (eventValue) {
        this.signal('onBlur', eventValue);
    };
    List.prototype._getFocused = function () {
        return this._List;
    };
    return List;
}(sdk_1.Lightning.Component));
exports.default = List;
//# sourceMappingURL=index.lng.js.map