"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var helpers_1 = require("../helpers");
var _a = react_native_1.Dimensions.get('window'), windowWidth = _a.width, windowHeight = _a.height;
function useDimensionsCalculator(_a) {
    var style = _a.style, itemSpacing = _a.itemSpacing, verticalItemSpacing = _a.verticalItemSpacing, horizontalItemSpacing = _a.horizontalItemSpacing, itemDimensions = _a.itemDimensions, itemsInViewport = _a.itemsInViewport, _b = _a.initialXOffset, initialXOffset = _b === void 0 ? 0 : _b, ref = _a.ref;
    var spacing = (0, helpers_1.Ratio)(itemSpacing);
    var verticalSpacing = (0, helpers_1.Ratio)(verticalItemSpacing);
    var horizontalSpacing = (0, helpers_1.Ratio)(horizontalItemSpacing);
    var _c = (0, react_1.useState)(true), isLoading = _c[0], setIsLoading = _c[1];
    var spacings = (0, react_1.useState)(function () {
        return {
            paddingLeft: horizontalSpacing || spacing,
            paddingTop: verticalSpacing || spacing,
            paddingBottom: verticalSpacing || spacing,
            paddingRight: (horizontalSpacing || spacing) + initialXOffset,
        };
    })[0];
    var _d = (0, react_1.useState)(function () {
        var width = style.width || windowWidth;
        var height = style.height || windowHeight;
        if (style.borderWidth) {
            width -= style.borderWidth * 2;
        }
        if (style.marginVertical) {
            width -= style.marginVertical * 2;
        }
        if (style.marginLeft) {
            width -= style.marginLeft;
        }
        if (style.marginRight) {
            width -= style.marginRight;
        }
        return {
            width: width,
            height: height,
            relativeHeight: height,
        };
    }), boundaries = _d[0], setBoundaries = _d[1];
    var calculateRowDimensions = function (width) {
        var itemHeight = (0, helpers_1.Ratio)(itemDimensions.height);
        var actualWidth = width - itemSpacing; // todo: calculate both sides???
        return {
            layout: { width: actualWidth / itemsInViewport, height: itemHeight + spacing },
            item: { width: actualWidth / itemsInViewport - spacing, height: itemHeight },
        };
    };
    var _e = (0, react_1.useState)(calculateRowDimensions(boundaries.width)), rowDimensions = _e[0], setRowDimensions = _e[1];
    var onLayout = function () {
        ref.current.measure(function (_fx, _fy, _width, _height, pageX, pageY) {
            if (isLoading) {
                setRowDimensions(calculateRowDimensions(boundaries.width - pageX));
                setBoundaries(function (prev) { return ({
                    width: prev.width - pageX,
                    relativeHeight: prev.height - pageY,
                    height: prev.height,
                }); });
                setIsLoading(false);
            }
        });
    };
    return {
        spacings: spacings,
        isLoading: isLoading,
        boundaries: boundaries,
        rowDimensions: rowDimensions,
        onLayout: onLayout,
    };
}
exports.default = useDimensionsCalculator;
//# sourceMappingURL=useDimensionsCalculator.js.map