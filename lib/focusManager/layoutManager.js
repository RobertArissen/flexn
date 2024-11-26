"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recalculateLayout = exports.measure = exports.findLowestRelativeCoordinates = void 0;
var constants_1 = require("./constants");
function findLowestRelativeCoordinates(cls) {
    var _a, _b, _c, _d, _e;
    var screen = cls.getScreen();
    if (screen && cls.getType() === constants_1.CONTEXT_TYPES.VIEW) {
        var layout = (_a = screen.getPrecalculatedFocus()) === null || _a === void 0 ? void 0 : _a.getLayout();
        var c1 = !screen.getPrecalculatedFocus();
        var c2 = (layout === null || layout === void 0 ? void 0 : layout.yMin) === ((_b = cls.getLayout()) === null || _b === void 0 ? void 0 : _b.yMin) && (layout === null || layout === void 0 ? void 0 : layout.xMin) >= ((_c = cls.getLayout()) === null || _c === void 0 ? void 0 : _c.xMin);
        var c3 = (layout === null || layout === void 0 ? void 0 : layout.yMin) > ((_d = cls.getLayout()) === null || _d === void 0 ? void 0 : _d.yMin);
        if (c1 || c2 || c3) {
            (_e = cls.getScreen()) === null || _e === void 0 ? void 0 : _e.setPrecalculatedFocus(cls);
        }
    }
}
exports.findLowestRelativeCoordinates = findLowestRelativeCoordinates;
function recalculateAbsolutes(cls) {
    var layout = cls.getLayout();
    cls.updateLayoutProperty('absolute', {
        xMin: layout.xMin - layout.xOffset + layout.xOffsetDiff,
        xMax: layout.xMax - layout.xOffset + layout.xOffsetDiff,
        yMin: layout.yMin - layout.yOffset + layout.yOffsetDiff,
        yMax: layout.yMax - layout.yOffset + layout.yOffsetDiff,
        xCenter: layout.xCenter - layout.xOffset + layout.xOffsetDiff,
        yCenter: layout.yCenter - layout.yOffset + layout.yOffsetDiff,
    });
}
function recalculateLayout(cls) {
    if (!(cls === null || cls === void 0 ? void 0 : cls.getLayout())) {
        return;
    }
    // This is needed because ScrollView offsets
    var offsetX = 0;
    var offsetY = 0;
    var parent = cls.getParent();
    while (parent) {
        if (parent.isScrollable()) {
            offsetX += parent.getScrollOffsetX() || 0;
            offsetY += parent.getScrollOffsetY() || 0;
        }
        parent = parent === null || parent === void 0 ? void 0 : parent.getParent();
    }
    cls.updateLayoutProperty('xOffset', offsetX).updateLayoutProperty('yOffset', offsetY);
    recalculateAbsolutes(cls);
}
exports.recalculateLayout = recalculateLayout;
function measure(cls, ref, unmeasurableRelatives, callback, fallbackLayout) {
    var _a, _b;
    (_a = ref.current) === null || _a === void 0 ? void 0 : _a.measure(function (_, __, width, height, pageX, pageY) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (fallbackLayout) {
            if (width === undefined) {
                // eslint-disable-next-line prefer-destructuring
                width = fallbackLayout.width;
            }
            if (height === undefined) {
                // eslint-disable-next-line prefer-destructuring
                height = fallbackLayout.height;
            }
            if (pageX === undefined) {
                pageX = fallbackLayout.x;
            }
            if (pageY === undefined) {
                pageY = fallbackLayout.y;
            }
        }
        var pgX;
        var pgY;
        var repeatContext = cls.getRepeatContext();
        if (repeatContext !== undefined) {
            var pCtx = repeatContext.parentContext;
            if (pCtx !== undefined) {
                var rLayout = pCtx.getLayouts()[repeatContext.index || 0];
                pgX = pCtx.getLayout().xMin + rLayout.x;
                pgY = pCtx.getLayout().yMin + rLayout.y;
            }
        }
        else {
            pgY = pageY;
            pgX = pageX;
        }
        // Single and nested recyclers can't measure itself due to logic above
        if (unmeasurableRelatives && cls.getType() === constants_1.CONTEXT_TYPES.RECYCLER) {
            pgX = pgX + unmeasurableRelatives.x;
            pgY = pgY + unmeasurableRelatives.y;
        }
        if (((_a = cls.getLayout()) === null || _a === void 0 ? void 0 : _a.width) && cls.getLayout().width !== width) {
            width = (_b = cls.getLayout()) === null || _b === void 0 ? void 0 : _b.width;
            height = (_c = cls.getLayout()) === null || _c === void 0 ? void 0 : _c.height;
        }
        var layout = {
            xMin: pgX,
            xMax: pgX + width,
            yMin: pgY,
            yMax: pgY + height,
            width: width,
            height: height,
            yOffset: 0,
            xOffset: 0,
            xMaxScroll: 0,
            yMaxScroll: 0,
            scrollContentHeight: 0,
            xCenter: pgX + Math.floor(width / 2),
            yCenter: pgY + Math.floor(height / 2),
            innerView: {
                yMin: 0,
                yMax: 0,
                xMin: 0,
                xMax: 0,
            },
            yOffsetDiff: 0,
            xOffsetDiff: 0,
        };
        if (!repeatContext) {
            if (cls.getLayout() && ((_d = cls.getParent()) === null || _d === void 0 ? void 0 : _d.isRecyclable())) {
                layout.yOffsetDiff = cls.getLayout().yOffsetDiff;
                layout.xOffsetDiff = cls.getLayout().xOffsetDiff;
                layout.yOffsetDiff =
                    layout.yOffsetDiff === 0
                        ? ((_e = cls.getLayout()) === null || _e === void 0 ? void 0 : _e.yMin) - pgY
                        : layout.yOffsetDiff + (((_f = cls.getLayout()) === null || _f === void 0 ? void 0 : _f.yMin) - pgY);
                layout.xOffsetDiff =
                    layout.xOffsetDiff === 0
                        ? ((_g = cls.getLayout()) === null || _g === void 0 ? void 0 : _g.xMin) - pgX
                        : layout.xOffsetDiff + (((_h = cls.getLayout()) === null || _h === void 0 ? void 0 : _h.xMin) - pgX);
            }
            else {
                var offsetX = 0;
                var offsetY = 0;
                var parent_1 = cls.getParent();
                while (parent_1) {
                    if (parent_1.isScrollable()) {
                        offsetX += parent_1.getScrollOffsetX() || 0;
                        offsetY += parent_1.getScrollOffsetY() || 0;
                    }
                    parent_1 = parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.getParent();
                }
                layout.yOffsetDiff = offsetY;
                layout.xOffsetDiff = offsetX;
            }
        }
        // TODO: move it out from here
        var parent = cls.getParent();
        if ((parent === null || parent === void 0 ? void 0 : parent.isScrollable()) && (parent === null || parent === void 0 ? void 0 : parent.getLayout())) {
            var pCtx = (_j = cls === null || cls === void 0 ? void 0 : cls.getRepeatContext()) === null || _j === void 0 ? void 0 : _j.parentContext;
            if (pCtx) {
                var rLayout = pCtx.getLayouts()[pCtx.getLayouts().length - 1];
                parent.updateLayoutProperty('xMaxScroll', pCtx.getLayout().xMin + width + rLayout.x);
            }
        }
        cls.setLayout(layout);
        findLowestRelativeCoordinates(cls);
        recalculateLayout(cls);
        if (callback)
            callback();
    });
    // get the layout of innerView in scroll
    if (cls.getType() === 'scrollView')
        // eslint-disable-next-line no-underscore-dangle
        (_b = ref.current._children[0]) === null || _b === void 0 ? void 0 : _b.measure(function (_, __, width, height, pageX, pageY) {
            cls.updateLayoutProperty('innerView', {
                yMax: pageY + height - cls.getLayout().yMax,
                yMin: pageY + pageY,
                xMax: pageX + width - cls.getLayout().xMax,
                xMin: pageX,
            });
        });
}
exports.measure = measure;
//# sourceMappingURL=layoutManager.js.map