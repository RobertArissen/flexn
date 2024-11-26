"use strict";
/**
 * Copyright 2021 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var FocusManager_1 = tslib_1.__importDefault(require("../FocusManager"));
//  import { getY, getW } from '../../utils';
var debounce_1 = require("debounce");
var utils_1 = require("@lightningjs/ui-components/utils");
var Column = /** @class */ (function (_super) {
    tslib_1.__extends(Column, _super);
    function Column() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Column._template = function () {
        return tslib_1.__assign(tslib_1.__assign({}, _super._template.call(this)), { direction: 'column' });
    };
    Column.prototype._construct = function () {
        var _this = this;
        _super.prototype._construct.call(this);
        this._smooth = false;
        this._independentNavigation = false;
        this._itemSpacing = 0;
        this._itemPosX = 0;
        this._itemPosY = 0;
        this._scrollIndex = 0;
        this._whenEnabled = new Promise(function (resolve) { return (_this._firstEnable = resolve); });
        this.debounceDelay = Number.isInteger(this.debounceDelay) ? this.debounceDelay : 30;
        this._update = (0, debounce_1.debounce)(this._updateLayout, this.debounceDelay);
        this._updateImmediate = (0, debounce_1.debounce)(this._updateLayout, this.debounceDelay, true);
    };
    Column.prototype._init = function () {
        _super.prototype._init.call(this);
        if (!this.h) {
            // if height is undefinend or 0, set the Columns's height
            this.h =
                this.parent && // if the Column is a child item in a FocusManager (like Row)
                    this.parent.parent &&
                    this.parent.parent instanceof FocusManager_1.default
                    ? this.parent.parent.h
                    : this.stage.h;
        }
    };
    Object.defineProperty(Column.prototype, "_itemTransition", {
        get: function () {
            return (this.itemTransition || {
                duration: 0.4,
                timingFunction: 'cubic-bezier(0.20, 1.00, 0.30, 1.00)',
            });
        },
        enumerable: false,
        configurable: true
    });
    Column.prototype._focus = function () {
        this.items.forEach(function (item) { return (item.parentFocus = true); });
    };
    Column.prototype._unfocus = function () {
        this.items.forEach(function (item) { return (item.parentFocus = false); });
    };
    Column.prototype.selectNext = function () {
        this._smooth = true;
        return _super.prototype.selectNext.call(this);
    };
    Column.prototype.selectPrevious = function () {
        this._smooth = true;
        return _super.prototype.selectPrevious.call(this);
    };
    Column.prototype._shouldScroll = function () {
        var shouldScroll = this.alwaysScroll;
        if (!shouldScroll && !this.neverScroll) {
            var lastChild = this.Items.childList.last;
            shouldScroll = lastChild && (this.shouldScrollUp() || this.shouldScrollDown());
        }
        return shouldScroll;
    };
    // TODO: can be documented in API when lastScrollIndex is made public
    Column.prototype.shouldScrollUp = function () {
        var shouldScroll = false;
        if (this._lastScrollIndex) {
            shouldScroll = this.selectedIndex < this._lastScrollIndex;
            if (this._prevLastScrollIndex !== undefined && this._prevLastScrollIndex !== this._lastScrollIndex) {
                shouldScroll = true;
            }
        }
        else {
            shouldScroll = this.selectedIndex >= this._scrollIndex;
        }
        return this._itemsY < 0 && shouldScroll;
    };
    // TODO: can be documented in API when lastScrollIndex is made public
    Column.prototype.shouldScrollDown = function () {
        var lastChild = this.Items.childList.last;
        return (this.selectedIndex > this._scrollIndex &&
            // end of Items container < end of last item
            Math.abs(this._itemsY - this.h) < lastChild.y + this.Items.childList.last.h);
    };
    Column.prototype.render = function (next, prev) {
        this._prevLastScrollIndex = this._lastScrollIndex;
        if (this.plinko &&
            prev &&
            (prev.currentItem || prev.selected) &&
            !(this.items.indexOf(prev) === 0 && prev.skipPlinko)) {
            var prevPlinko = this.checkSkipPlinko(prev, next);
            next.selectedIndex = this._getIndexOfItemNear(next, prevPlinko || prev);
        }
        else if (next && !next.selectedIndex) {
            next.selectedIndex = 0;
        }
        this._performRender();
    };
    Column.prototype.checkSkipPlinko = function (prev, next) {
        var _this = this;
        // If previous doesn't have skip plinko or previous is the first or last item
        if (!prev || !prev.skipPlinko || [0, this.items.length - 1].includes(this.items.indexOf(prev))) {
            return null;
        }
        var prevIndex = this.items.indexOf(prev);
        var direction = prevIndex - this.items.indexOf(next);
        var up = direction > 0;
        // Grab all items below prev if up or all items before prev if down
        var prevItems = null;
        if (up) {
            prevItems = this.items.slice(prevIndex).map(function (i) { return ({
                skipPlinko: i.skipPlinko,
                index: _this.items.indexOf(i),
            }); });
        }
        else {
            prevItems = this.items
                .slice(0, prevIndex + 1)
                .map(function (i) { return ({
                skipPlinko: i.skipPlinko,
                index: _this.items.indexOf(i),
            }); })
                .reverse();
        }
        // first item that has skipPlinko but the previous does not
        // Start at the index prev
        var endOfMultiSkipPlinkos = prevItems.find(function (i) { return i.skipPlinko && !_this.items[i.index + direction].skipPlinko; });
        var prevPlinkoIndex = endOfMultiSkipPlinkos ? endOfMultiSkipPlinkos.index + direction : prevIndex + direction; // +/- 1, item index before prev
        return this.items[prevPlinkoIndex];
    };
    Column.prototype._performRender = function () {
        var _this = this;
        this._whenEnabled.then(function () {
            if (!_this.Items.children.length) {
                if (_this._smooth) {
                    _this.Items.smooth = { y: _this.itemPosY };
                }
                else {
                    _this.Items.y = _this.itemPosY;
                }
            }
            else if (_this._shouldScroll()) {
                var scrollItem = _this.selectedIndex > _this._lastScrollIndex
                    ? _this.Items.children[_this._lastScrollIndex - _this._scrollIndex]
                    : _this.selected;
                if (_this.Items.children[_this._firstFocusableIndex()] === scrollItem) {
                    scrollItem = _this.Items.children[0];
                }
                var scrollOffset = (_this.Items.children[_this._scrollIndex] || { y: 0 }).y;
                if (_this._smooth) {
                    var firstChild = _this.Items.childList.first;
                    _this.Items.smooth = {
                        y: [
                            -(scrollItem || firstChild).transition('y').targetValue +
                                (scrollItem === _this.selected ? scrollOffset : 0),
                            _this._itemTransition,
                        ],
                    };
                }
                else {
                    _this.Items.patch({
                        y: -scrollItem.y + (scrollItem === _this.selected ? scrollOffset : 0),
                    });
                }
            }
            _this.onScreenEffect(_this.onScreenItems);
        });
    };
    Object.defineProperty(Column.prototype, "onScreenItems", {
        get: function () {
            var _this = this;
            return this.Items.children.filter(function (child) { return _this._isOnScreen(child); });
        },
        enumerable: false,
        configurable: true
    });
    Column.prototype._isOnScreen = function (child) {
        if (!child)
            return false;
        var y = (0, utils_1.getY)(child);
        if (!Number.isFinite(y))
            return false;
        // to calculate the target absolute Y position of the item, we need to use
        // 1) the entire column's absolute position,
        // 2) the target animation value of the items container, and
        // 3) the target value of the item itself
        var ItemY = this.core.renderContext.py + this.Items.transition('y').targetValue + y;
        var h = child.h;
        // check that the child is inside the bounds of the stage
        var withinTopStageBounds = ItemY + h > 0;
        // stage height needs to be adjusted with precision since all other values assume the original height and width (pre-scaling)
        var withinBottomStageBounds = ItemY < this.stage.h / this.stage.getRenderPrecision();
        // check that the child is inside the bounds of any clipping
        var withinTopClippingBounds = true;
        var withinBottomClippingBounds = true;
        if (this.core._scissor && this.core._scissor.length) {
            // _scissor consists of [ left position (x), top position (y), width, height ]
            var topBounds = this.core._scissor[1];
            var bottomBounds = topBounds + this.core._scissor[3];
            withinTopClippingBounds = Math.round(ItemY + h) > Math.round(topBounds);
            withinBottomClippingBounds = Math.round(ItemY) < Math.round(bottomBounds);
        }
        return withinTopStageBounds && withinBottomStageBounds && withinTopClippingBounds && withinBottomClippingBounds;
    };
    Column.prototype._updateLayout = function () {
        var _this = this;
        this._whenEnabled.then(function () {
            var nextY = 0;
            var nextW = 0;
            // layout items in row
            for (var i = 0; i < _this.Items.children.length; i++) {
                var child = _this.Items.children[i];
                nextW = Math.max(nextW, (0, utils_1.getW)(child));
                if (_this._smooth) {
                    child.smooth = { y: [nextY, _this._itemTransition] };
                }
                else {
                    child.patch({ y: nextY });
                }
                nextY += child.h;
                if (i < _this.Items.children.length - 1) {
                    nextY += _this.itemSpacing;
                }
                if (child.centerInParent) {
                    // if the child is another focus manager, check the width of the item container
                    var childWidth = (child.Items && child.Items.w) || child.w;
                    // only center the child if it is within the bounds of this focus manager
                    if (childWidth < _this.w) {
                        child.x = (_this.w - childWidth) / 2;
                    }
                }
            }
            _this.Items.patch({ w: nextW, h: nextY });
            var lastChild = _this.Items.childList.last;
            var endOfLastChild = lastChild ? (0, utils_1.getY)(lastChild) + lastChild.h : 0;
            var scrollOffset = (_this.Items.children[_this._scrollIndex] || { y: 0 }).y;
            // determine when to stop scrolling down
            if (_this.alwaysScroll) {
                _this._lastScrollIndex = _this.Items.children.length - 1;
            }
            else if (endOfLastChild > _this.h) {
                for (var i = _this.Items.children.length - 1; i >= 0; i--) {
                    var child = _this.Items.children[i];
                    var childY = (0, utils_1.getY)(child);
                    if (childY + _this.h - scrollOffset > endOfLastChild) {
                        _this._lastScrollIndex = i;
                    }
                    else {
                        break;
                    }
                }
            }
            else if (_this._lastScrollIndex > _this.items.length) {
                _this._lastScrollIndex = _this.items.length - 1;
            }
            _this._performRender();
        });
    };
    Object.defineProperty(Column.prototype, "independentNavigation", {
        get: function () {
            return this._independentNavigation;
        },
        set: function (value) {
            if (value !== this._independentNavigation) {
                this._independentNavigation = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "itemSpacing", {
        get: function () {
            return this._itemSpacing;
        },
        set: function (itemSpacing) {
            if (itemSpacing !== this._itemSpacing) {
                this._itemSpacing = itemSpacing;
                this._update();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "scrollIndex", {
        get: function () {
            return this._scrollIndex;
        },
        set: function (scrollIndex) {
            if (scrollIndex !== this._scrollIndex) {
                this._scrollIndex = scrollIndex;
                this._update();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "itemPosX", {
        get: function () {
            return this._itemPosX;
        },
        set: function (x) {
            this.Items.x = this._itemPosX = x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "itemPosY", {
        get: function () {
            return this._itemPosY;
        },
        set: function (y) {
            this.Items.y = this._itemPosY = y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "_itemsY", {
        get: function () {
            return (0, utils_1.getY)(this.Items);
        },
        enumerable: false,
        configurable: true
    });
    Column.prototype.appendItems = function (items) {
        var _this = this;
        if (items === void 0) { items = []; }
        var itemWidth = this.renderWidth;
        this._smooth = false;
        items.forEach(function (item) {
            item.parentFocus = _this.hasFocus();
            item = _this.Items.childList.a(item);
            item.w = (0, utils_1.getW)(item) || itemWidth;
        });
        this.stage.update();
        this._updateLayout();
        this._update.clear();
        this._refocus();
    };
    Column.prototype.setParentToItems = function () {
        var _this = this;
        this.Items.childList.forEach(function (ch) {
            ch.parentColumn = _this;
        });
    };
    Column.prototype.scrollTo = function (index, duration) {
        var _this = this;
        if (duration === void 0) { duration = this._itemTransition.duration * 100; }
        if (duration === 0) {
            this.selectedIndex = index;
            return;
        }
        for (var i = 0; i !== Math.abs(this.selectedIndex - index); i++) {
            setTimeout(function () {
                if (_this.selectedIndex > index) {
                    _this.selectPrevious();
                }
                else {
                    _this.selectNext();
                }
            }, duration * i);
        }
        this.Items.transition('y').on('finish', function () { return (_this._smooth = false); });
    };
    Column.prototype.$itemChanged = function () {
        this._updateImmediate();
    };
    Column.prototype.$removeItem = function (item) {
        if (item) {
            var wasSelected = item === this.selected;
            this.Items.childList.remove(item);
            this._updateImmediate();
            if (wasSelected || this.selectedIndex >= this.items.length) {
                this.selectedIndex = this._selectedIndex;
            }
            if (!this.items.length) {
                this.fireAncestors('$columnEmpty');
            }
        }
    };
    Column.prototype.$columnChanged = function () {
        this._updateImmediate();
    };
    // can be overridden
    Column.prototype.onScreenEffect = function () {
        // Override
    };
    return Column;
}(FocusManager_1.default));
exports.default = Column;
//# sourceMappingURL=index.lng.js.map