"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// import { Column, FocusManager } from '@lightningjs/ui-components';
var sdk_1 = require("@lightningjs/sdk");
var Row_1 = tslib_1.__importDefault(require("../Row"));
var index_lng_1 = tslib_1.__importDefault(require("../../lng/Column/index.lng"));
var Grid = /** @class */ (function (_super) {
    tslib_1.__extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grid._template = function () {
        return {
            Grid: {
                type: index_lng_1.default,
                independentNavigation: true,
                plinko: true,
                scrollIndex: 1,
                items: [],
            },
        };
    };
    Grid.prototype._construct = function () {
        var _this = this;
        this._whenEnabled = new Promise(function (resolve) { return (_this._enable = resolve); });
        this._itemSpacing = 30;
        this._itemsInViewport = 6;
    };
    Grid.prototype._init = function () {
        this._setItemSpacing();
    };
    Object.defineProperty(Grid.prototype, "_Grid", {
        get: function () {
            return this.tag('Grid');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "w", {
        get: function () {
            return this._w;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._w) {
                this._w = value;
                this.w = value;
                this._whenEnabled.then(function () {
                    _this._Grid.w = _this.w;
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "h", {
        get: function () {
            return this._h;
        },
        set: function (value) {
            var _this = this;
            if (value !== this._h) {
                this._h = value;
                this.h = value;
                this._whenEnabled.then(function () {
                    _this._Grid.h = _this.h;
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            var _this = this;
            this._data = value;
            this._whenEnabled.then(function () {
                var arrayOfRows = [];
                while (_this.data.length) {
                    arrayOfRows.push(_this.data.splice(0, _this.itemsInViewport));
                }
                _this._Grid.items = arrayOfRows.map(function (rowData) { return ({
                    type: Row_1.default,
                    data: rowData,
                    focusOptions: _this.focusOptions,
                    itemSpacing: _this.itemSpacing,
                    itemsInViewport: _this.itemsInViewport,
                    independentNavigation: true,
                    lazyScroll: _this.lazyScroll,
                    card: _this.card,
                    row: _this.row,
                }); });
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "card", {
        get: function () {
            return this._card || {};
        },
        set: function (value) {
            this._card = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "row", {
        get: function () {
            return this._row || {};
        },
        set: function (value) {
            this._row = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "scrollIndex", {
        get: function () {
            return this._scrollIndex;
        },
        set: function (value) {
            if (value === this._scrollIndex) {
                this._scrollIndex = value;
                this._Grid.scrollIndex = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "focusOptions", {
        get: function () {
            return this._focusOptions;
        },
        set: function (value) {
            this._focusOptions = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "itemSpacing", {
        get: function () {
            return this._itemSpacing;
        },
        set: function (value) {
            if (value !== this._itemSpacing) {
                this._itemSpacing = value;
                this._setItemSpacing();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "lazyScroll", {
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
    Object.defineProperty(Grid.prototype, "itemsInViewport", {
        get: function () {
            return this._itemsInViewport;
        },
        set: function (value) {
            if (value !== this.itemsInViewport) {
                this._itemsInViewport = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Grid.prototype._setItemSpacing = function () {
        var _this = this;
        this._whenEnabled.then(function () {
            _this._Grid.x = _this.itemSpacing;
            _this._Grid.y = _this.itemSpacing;
        });
    };
    Grid.prototype.$onCardPress = function (eventValue) {
        this.signal('onPress', eventValue);
    };
    Grid.prototype.$onCardFocus = function (eventValue) {
        this.signal('onFocus', eventValue);
    };
    Grid.prototype.$onCardBlur = function (eventValue) {
        this.signal('onBlur', eventValue);
    };
    Grid.prototype._getFocused = function () {
        return this._Grid;
    };
    return Grid;
}(sdk_1.Lightning.Component));
exports.default = Grid;
//# sourceMappingURL=index.lng.js.map