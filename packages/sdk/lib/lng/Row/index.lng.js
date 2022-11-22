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
// import { getX, getH } from '../../utils';
var debounce_1 = require("debounce");
var utils_1 = require("@lightningjs/ui-components/utils");
var Row = /** @class */ (function (_super) {
    tslib_1.__extends(Row, _super);
    function Row() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Row._template = function () {
        return tslib_1.__assign(tslib_1.__assign({}, _super._template.call(this)), { direction: 'row' });
    };
    Row.prototype._construct = function () {
        var _this = this;
        _super.prototype._construct.call(this);
        this._smooth = false;
        this._independentNavigation = false;
        this._itemSpacing = 0;
        this._itemPosX = 0;
        this._itemPosY = 0;
        this._scrollIndex = 0;
        this._whenEnabled = new Promise(function (resolve) { return (_this._firstEnable = resolve); });
        this.debounceDelay = Number.isInteger(this.debounceDelay) ? this.debounceDelay : 1;
        this._update = (0, debounce_1.debounce)(this._updateLayout, this.debounceDelay);
    };
    Row.prototype._init = function () {
        _super.prototype._init.call(this);
        if (!this.w) {
            // if width is undefinend or 0, set the Row's width
            this.w =
                this.parent && // if the Row is a child item in a FocusManager (like Column)
                    this.parent.parent &&
                    this.parent.parent instanceof FocusManager_1.default
                    ? this.parent.parent.w
                    : this.stage.w;
        }
    };
    Object.defineProperty(Row.prototype, "_itemTransition", {
        get: function () {
            return (this.itemTransition || {
                duration: 0.4,
                timingFunction: 'cubic-bezier(0.20, 1.00, 0.30, 1.00)',
            });
        },
        enumerable: false,
        configurable: true
    });
    Row.prototype._focus = function () {
        this.items.forEach(function (item) { return (item.parentFocus = true); });
    };
    Row.prototype._unfocus = function () {
        this.items.forEach(function (item) { return (item.parentFocus = false); });
    };
    Row.prototype.selectNext = function () {
        this._smooth = true;
        return _super.prototype.selectNext.call(this);
    };
    Row.prototype.selectPrevious = function () {
        this._smooth = true;
        return _super.prototype.selectPrevious.call(this);
    };
    // TODO: can be documented in API when lastScrollIndex is made public
    Row.prototype.shouldScrollLeft = function () {
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
        return this._itemsX < 0 && shouldScroll;
    };
    // TODO: can be documented in API when lastScrollIndex is made public
    Row.prototype.shouldScrollRight = function () {
        var lastChild = this.Items.childList.last;
        return (this.selectedIndex > this._scrollIndex &&
            // end of Items container < end of last item
            Math.abs(this._itemsX - this.w) < lastChild.x + this.Items.childList.last.w);
    };
    Object.defineProperty(Row.prototype, "onScreenItems", {
        get: function () {
            var _this = this;
            return this.Items.children.filter(function (child) { return _this._isOnScreen(child); });
        },
        enumerable: false,
        configurable: true
    });
    Row.prototype._isOnScreen = function (child) {
        if (!child)
            return false;
        var x = (0, utils_1.getX)(child);
        if (!Number.isFinite(x))
            return false;
        // to calculate the target absolute X position of the item, we need to use
        // 1) the entire row's absolute position,
        // 2) the target animation value of the items container, and
        // 3) the target value of the item itself
        var ItemX = this.core.renderContext.px + this.Items.transition('x').targetValue + x;
        var w = child.w;
        // check that the child is inside the bounds of the stage
        var withinLeftStageBounds = ItemX > 0;
        // stage width needs to be adjusted with precision since all other values assume the original height and width (pre-scaling)
        var withinRightStageBounds = ItemX + w < this.stage.w / this.stage.getRenderPrecision();
        // check that the child is inside the bounds of any clipping
        var withinLeftClippingBounds = true;
        var withinRightClippingBounds = true;
        if (this.core._scissor && this.core._scissor.length) {
            // _scissor consists of [ left position (x), top position (y), width, height ]
            var leftBounds = this.core._scissor[0];
            var rightBounds = leftBounds + this.core._scissor[2];
            withinLeftClippingBounds = Math.round(ItemX + w) > Math.round(leftBounds);
            withinRightClippingBounds = Math.round(ItemX) < Math.round(rightBounds);
        }
        return withinLeftStageBounds && withinRightStageBounds && withinLeftClippingBounds && withinRightClippingBounds;
    };
    Row.prototype._isOnScreenCompletely = function (child) {
        if (!child)
            return false;
        var itemX = child.core.renderContext.px;
        var rowX = this.core.renderContext.px;
        return itemX >= rowX && itemX + child.w <= rowX + this.w;
    };
    Row.prototype._shouldScroll = function () {
        var shouldScroll = this.alwaysScroll;
        if (!shouldScroll && !this.neverScroll) {
            if (this.lazyScroll) {
                shouldScroll = !this._isOnScreenCompletely(this.selected);
            }
            else {
                var lastChild = this.Items.childList.last;
                shouldScroll =
                    lastChild &&
                        (this.shouldScrollLeft() || this.shouldScrollRight() || !this._isOnScreenCompletely(this.selected));
            }
        }
        return shouldScroll;
    };
    Row.prototype._getLazyScrollX = function (prev) {
        var itemsContainerX;
        var prevIndex = this.Items.childList.getIndex(prev);
        if (prevIndex === this._lastFocusableIndex()) {
            itemsContainerX = -this.Items.children[0].x;
        }
        else if (prevIndex > this.selectedIndex) {
            itemsContainerX = -this.selected.x;
        }
        else if (prevIndex < this.selectedIndex) {
            itemsContainerX = this.w - this.selected.x - this.selected.w;
        }
        return itemsContainerX;
    };
    Row.prototype._getScrollX = function () {
        var itemsContainerX;
        var itemIndex = this.selectedIndex - this.scrollIndex;
        itemIndex = itemIndex < 0 ? 0 : itemIndex;
        if (itemIndex === this._firstFocusableIndex()) {
            itemIndex = 0;
        }
        if (this.Items.children[itemIndex]) {
            itemsContainerX = this.Items.children[itemIndex].transition('x')
                ? -this.Items.children[itemIndex].transition('x').targetValue
                : -this.Items.children[itemIndex].x;
        }
        return itemsContainerX;
    };
    Row.prototype.render = function (next, prev) {
        var _this = this;
        this._whenEnabled.then(function () {
            if (_this.plinko && prev && (prev.currentItem || prev.selected)) {
                next.selectedIndex = _this._getIndexOfItemNear(next, prev);
            }
            _this._prevLastScrollIndex = _this._lastScrollIndex;
            var itemsContainerX;
            if (!_this.Items.children.length) {
                itemsContainerX = _this.itemPosX;
            }
            else if (_this._shouldScroll()) {
                itemsContainerX = _this.lazyScroll && prev ? _this._getLazyScrollX(prev) : _this._getScrollX();
            }
            if (itemsContainerX !== undefined) {
                if (_this._smooth) {
                    _this.Items.smooth = {
                        x: [itemsContainerX, _this._itemTransition],
                    };
                }
                else {
                    _this.Items.x = itemsContainerX;
                }
            }
            _this.onScreenEffect(_this.onScreenItems);
        });
    };
    Row.prototype._updateLayout = function () {
        var nextX = 0;
        var nextH = 0;
        // layout items in row
        for (var i = 0; i < this.Items.children.length; i++) {
            var child = this.Items.children[i];
            nextH = Math.max(nextH, (0, utils_1.getH)(child));
            if (this._smooth) {
                child.smooth = { x: [nextX, this._itemTransition] };
            }
            else {
                child.patch({ x: nextX });
            }
            nextX += child.w;
            if (i < this.Items.children.length - 1) {
                nextX += this.itemSpacing;
            }
            if (child.centerInParent) {
                // if the child is another focus manager, check the height of the item container
                var childHeight = (child.Items && child.Items.h) || child.h;
                // only center the child if it is within the bounds of this focus manager
                if (childHeight < this.h) {
                    child.y = (this.h - childHeight) / 2;
                }
            }
        }
        this.Items.patch({ h: nextH, w: nextX });
        var lastChild = this.Items.childList.last;
        var endOfLastChild = lastChild ? (0, utils_1.getX)(lastChild) + lastChild.w : 0;
        var scrollOffset = (this.Items.children[this._scrollIndex] || { x: 0 }).x;
        // determine when to stop scrolling right
        if (this.alwaysScroll) {
            this._lastScrollIndex = this.Items.children.length - 1;
        }
        else if (endOfLastChild > this.w) {
            for (var i = this.Items.children.length - 1; i >= 0; i--) {
                var child = this.Items.children[i];
                var childX = (0, utils_1.getX)(child);
                if (childX + this.w - scrollOffset > endOfLastChild) {
                    this._lastScrollIndex = i;
                }
                else {
                    break;
                }
            }
        }
        this.fireAncestors('$itemChanged');
        this.render(this.selected, this.prevSelected);
    };
    Object.defineProperty(Row.prototype, "itemSpacing", {
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
    Object.defineProperty(Row.prototype, "scrollIndex", {
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
    Object.defineProperty(Row.prototype, "itemPosX", {
        get: function () {
            return this._itemPosX;
        },
        set: function (x) {
            this.Items.x = this._itemPosX = x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "itemPosY", {
        get: function () {
            return this._itemPosY;
        },
        set: function (y) {
            this.Items.y = this._itemPosY = y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Row.prototype, "_itemsX", {
        get: function () {
            return (0, utils_1.getX)(this.Items);
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
            }
        },
        enumerable: false,
        configurable: true
    });
    Row.prototype.appendItems = function (items) {
        var _this = this;
        if (items === void 0) { items = []; }
        var itemHeight = this.renderHeight;
        this._smooth = false;
        items.forEach(function (item) {
            item.parentFocus = _this.hasFocus();
            item = _this.Items.childList.a(item);
            item.h = item.h || itemHeight;
        });
        this.stage.update();
        this._updateLayout();
        this._update.clear();
        this._refocus();
    };
    Row.prototype.$itemChanged = function () {
        this._update();
    };
    // can be overridden
    Row.prototype.onScreenEffect = function () {
        // Override
    };
    return Row;
}(FocusManager_1.default));
exports.default = Row;
//# sourceMappingURL=index.lng.js.map