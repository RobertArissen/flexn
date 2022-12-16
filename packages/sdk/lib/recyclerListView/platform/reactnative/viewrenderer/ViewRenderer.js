"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_native_1 = require("react-native");
var BaseViewRenderer_1 = tslib_1.__importDefault(require("../../../core/viewrenderer/BaseViewRenderer"));
/***
 * View renderer is responsible for creating a container of size provided by LayoutProvider and render content inside it.
 * Also enforces a logic to prevent re renders. RecyclerListView keeps moving these ViewRendereres around using transforms to enable recycling.
 * View renderer will only update if its position, dimensions or given data changes. Make sure to have a relevant shouldComponentUpdate as well.
 * This is second of the two things recycler works on. Implemented both for web and react native.
 */
var ViewRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ViewRenderer, _super);
    function ViewRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._dim = { width: 0, height: 0 };
        _this._viewRef = null;
        _this._setRef = function (view) {
            _this._viewRef = view;
        };
        _this._onLayout = function (event) {
            //Preventing layout thrashing in super fast scrolls where RN messes up onLayout event
            var xDiff = Math.abs(_this.props.x - event.nativeEvent.layout.x);
            var yDiff = Math.abs(_this.props.y - event.nativeEvent.layout.y);
            if (xDiff < 1 &&
                yDiff < 1 &&
                (_this.props.height !== event.nativeEvent.layout.height ||
                    _this.props.width !== event.nativeEvent.layout.width)) {
                _this._dim.height = event.nativeEvent.layout.height;
                _this._dim.width = event.nativeEvent.layout.width;
                if (_this.props.onSizeChanged) {
                    _this.props.onSizeChanged(_this._dim, _this.props.index);
                }
            }
            if (_this.props.onItemLayout) {
                _this.props.onItemLayout(_this.props.index);
            }
        };
        return _this;
    }
    ViewRenderer.prototype.renderCompat = function () {
        var props = this.props.forceNonDeterministicRendering
            ? {
                ref: this._setRef,
                onLayout: this._onLayout,
                style: tslib_1.__assign(tslib_1.__assign({ flexDirection: this.props.isHorizontal ? 'column' : 'row', left: this.props.x, position: 'absolute', top: this.props.y }, this.props.styleOverrides), this.animatorStyleOverrides),
            }
            : {
                ref: this._setRef,
                style: tslib_1.__assign(tslib_1.__assign({ left: this.props.x, position: 'absolute', top: this.props.y, height: this.props.height, width: this.props.width }, this.props.styleOverrides), this.animatorStyleOverrides),
            };
        if (this.props.disableItemContainer === true) {
            return this.renderChild(props);
        }
        else {
            return this._renderItemContainer(props, this.props, this.renderChild());
        }
    };
    ViewRenderer.prototype.getRef = function () {
        return this._viewRef;
    };
    ViewRenderer.prototype._renderItemContainer = function (props, parentProps, children) {
        return ((this.props.renderItemContainer && this.props.renderItemContainer(props, parentProps, children)) || (React.createElement(react_native_1.View, tslib_1.__assign({}, props), children)));
    };
    return ViewRenderer;
}(BaseViewRenderer_1.default));
exports.default = ViewRenderer;
//# sourceMappingURL=ViewRenderer.js.map