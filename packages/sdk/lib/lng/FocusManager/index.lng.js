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
/**
 * FocusManager Component
 *
 * Container to set focus on elements with key[Up/Down] or key[Left/Right]
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("@lightningjs/core"));
var FocusManager = /** @class */ (function (_super) {
    tslib_1.__extends(FocusManager, _super);
    function FocusManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FocusManager._template = function () {
        return { Items: {} };
    };
    FocusManager.prototype._construct = function () {
        this._selectedIndex = 0;
        this._independentNavigation = false;
        this.direction = this.direction || 'row';
    };
    Object.defineProperty(FocusManager.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (direction) {
            this._direction = direction;
            var state = {
                none: 'None',
                column: 'Column',
                row: 'Row',
            }[direction];
            if (state) {
                this._setState(state);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FocusManager.prototype, "Items", {
        get: function () {
            return this.tag('Items');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FocusManager.prototype, "items", {
        get: function () {
            return this.Items.children;
        },
        set: function (items) {
            this.Items.childList.clear();
            this._selectedIndex = 0;
            this.appendItems(items);
            // If the first item has skip focus when appended get the next focusable item
            var initialSelection = this.Items.children[this.selectedIndex];
            if (initialSelection && initialSelection.skipFocus) {
                this.selectNext();
            }
            this.setParentToItems();
        },
        enumerable: false,
        configurable: true
    });
    FocusManager.prototype.appendItems = function (items) {
        if (items === void 0) { items = []; }
        this.Items.childList.a(items);
        this._refocus();
    };
    Object.defineProperty(FocusManager.prototype, "selected", {
        get: function () {
            return this.Items.children[this.selectedIndex];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FocusManager.prototype, "selectedIndex", {
        get: function () {
            var _a, _b;
            if (this._independentNavigation) {
                var state = this._getState();
                if (state === 'Row') {
                    var rowLength = this.parent.data.length - 1;
                    var prevIndex = (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.parentColumn) === null || _b === void 0 ? void 0 : _b.prevRowSelection;
                    if (prevIndex === undefined || Math.abs(prevIndex - this._selectedIndex) === 0) {
                        return this._selectedIndex;
                    }
                    else if (prevIndex > rowLength) {
                        this.parent.parentColumn.prevRowSelection = rowLength;
                        this._selectedIndex = prevIndex;
                        return this._selectedIndex;
                    }
                    this._selectedIndex = prevIndex;
                    return prevIndex;
                }
                return this._selectedIndex;
            }
            return this._selectedIndex;
        },
        set: function (index) {
            this.prevSelected = this.selected;
            if (!this.Items.children.length || !this.Items.children[index] || !this.Items.children[index].skipFocus) {
                if (index !== this._selectedIndex) {
                    this._selectedIndex = index;
                }
                if (this.selected) {
                    this.render(this.selected, this.prevSelected);
                    this.signal('selectedChange', this.selected, this.prevSelected);
                }
                // Don't call refocus until after a new render in case of a situation like Plinko nav
                // where we don't want to focus the previously selected item and need to get the new one first
                this._refocus();
            }
        },
        enumerable: false,
        configurable: true
    });
    FocusManager.prototype.setParentToItems = function () {
        // Override
    };
    // Override
    FocusManager.prototype.render = function () {
        // Override
    };
    FocusManager.prototype._firstFocusableIndex = function () {
        if (!this.items.length)
            return 0;
        var firstItem = this.items
            .reduce(function (acc, item, idx) {
            if (!item.skipFocus) {
                acc.push(tslib_1.__assign(tslib_1.__assign({}, item), { originalIdx: idx }));
            }
            return acc;
        }, [])
            .shift();
        return firstItem.originalIdx;
    };
    FocusManager.prototype._lastFocusableIndex = function () {
        if (!this.items.length)
            return 0;
        var lastItem = this.items
            .reduce(function (acc, item, idx) {
            if (!item.skipFocus) {
                acc.push(tslib_1.__assign(tslib_1.__assign({}, item), { originalIdx: idx }));
            }
            return acc;
        }, [])
            .pop();
        return lastItem.originalIdx;
    };
    FocusManager.prototype.selectPrevious = function () {
        var hasFocusable = !!(this.items || []).filter(function (i) { return !i.skipFocus; }).length;
        if ((this.selectedIndex === 0 && !this.wrapSelected) || !hasFocusable) {
            return false;
        }
        var previousItemIndex = this.items
            .map(function (item) { return !!item.skipFocus; })
            .lastIndexOf(false, this._selectedIndex - 1);
        var state = this._getState();
        if (state === 'Row' && this.parent.parentColumn) {
            this.parent.parentColumn.prevRowSelection = previousItemIndex;
        }
        if (previousItemIndex > -1) {
            this.selectedIndex = previousItemIndex;
        }
        else if (this.wrapSelected) {
            this.selectedIndex = this._lastFocusableIndex();
        }
        return true;
    };
    FocusManager.prototype.selectNext = function () {
        var _this = this;
        var hasFocusable = !!(this.items || []).filter(function (i) { return !i.skipFocus; }).length;
        if ((this.selectedIndex === this.Items.children.length - 1 && !this.wrapSelected) || !hasFocusable) {
            return false;
        }
        var nextIndex = this.items.findIndex(function (item, idx) { return !item.skipFocus && idx > _this._selectedIndex; });
        var state = this._getState();
        if (state === 'Row' && this.parent.parentColumn) {
            this.parent.parentColumn.prevRowSelection = nextIndex;
        }
        if (nextIndex > -1) {
            this.selectedIndex = nextIndex;
        }
        else if (this.wrapSelected) {
            this.selectedIndex = this._firstFocusableIndex();
        }
        return true;
    };
    FocusManager.prototype._getIndexOfItemNear = function (selected, prev) {
        // Euclidean distance
        function distance(xA, yA, xB, yB) {
            var xDiff = xA - xB;
            var yDiff = yA - yB;
            return Math.sqrt(Math.pow(xDiff, 2) + Math.sqrt(Math.pow(yDiff, 2)));
        }
        var prevItem = prev.selected || prev.currentItem;
        if (!selected || !selected.items || !selected.items.length || !prevItem) {
            return 0;
        }
        var prevOffsetX = prev.transition('x').targetValue || 0;
        var prevOffsetY = prev.transition('y').targetValue || 0;
        var _a = prevItem.core.getAbsoluteCoords(-prevOffsetX, -prevOffsetY), itemX = _a[0], itemY = _a[1];
        var prevMiddle = [itemX + prevItem.w / 2, itemY + prevItem.h / 2];
        // Get all item center points from selected
        var selectedCoordArray = selected.items
            .map(function (item, index) {
            var _a = item.core.getAbsoluteCoords(0, 0), x = _a[0], y = _a[1];
            return {
                index: index,
                distance: !item.skipFocus
                    ? distance(prevMiddle[0], prevMiddle[1], x + item.w / 2, y + item.h / 2)
                    : null,
            };
        })
            .filter(function (item) {
            // Remove all indexes that don't have a distance (skipFocus)
            return null !== item.distance;
        })
            .sort(function (a, b) {
            return a.distance - b.distance;
        });
        return selectedCoordArray[0].index;
    };
    FocusManager.prototype._getFocused = function () {
        var selected = this.selected;
        // Make sure we're focused on a component
        if (selected) {
            if (selected.focusRef) {
                return selected.tag(selected.focusRef);
            }
            else if (selected.cparent) {
                return selected;
            }
        }
        return this;
    };
    FocusManager._states = function () {
        return [
            /** @class */ (function (_super) {
                tslib_1.__extends(None, _super);
                function None() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return None;
            }(this)),
            /** @class */ (function (_super) {
                tslib_1.__extends(Row, _super);
                function Row() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Row.prototype._handleLeft = function () {
                    return this.selectPrevious();
                };
                Row.prototype._handleRight = function () {
                    return this.selectNext();
                };
                return Row;
            }(this)),
            /** @class */ (function (_super) {
                tslib_1.__extends(Column, _super);
                function Column() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Column.prototype._handleUp = function () {
                    return this.selectPrevious();
                };
                Column.prototype._handleDown = function () {
                    return this.selectNext();
                };
                return Column;
            }(this)),
        ];
    };
    return FocusManager;
}(core_1.default.Component));
exports.default = FocusManager;
//# sourceMappingURL=index.lng.js.map