"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
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
        _this._mainDiv = null;
        _this._setRef = function (div) {
            _this._mainDiv = div;
        };
        return _this;
    }
    ViewRenderer.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this._checkSizeChange();
    };
    ViewRenderer.prototype.componentDidUpdate = function () {
        this._checkSizeChange();
    };
    ViewRenderer.prototype.renderCompat = function () {
        var style = this.props.forceNonDeterministicRendering
            ? tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ transform: this._getTransform(), WebkitTransform: this._getTransform() }, styles.baseViewStyle), this.props.styleOverrides), this.animatorStyleOverrides) : tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ height: this.props.height, overflow: 'hidden', width: this.props.width, transform: this._getTransform(), WebkitTransform: this._getTransform() }, styles.baseViewStyle), this.props.styleOverrides), this.animatorStyleOverrides);
        return (React.createElement("div", { ref: this._setRef, style: style }, this.renderChild()));
    };
    ViewRenderer.prototype.getRef = function () {
        return this._mainDiv;
    };
    ViewRenderer.prototype._getTransform = function () {
        return 'translate(' + this.props.x + 'px,' + this.props.y + 'px)';
    };
    ViewRenderer.prototype._checkSizeChange = function () {
        if (this.props.forceNonDeterministicRendering && this.props.onSizeChanged) {
            var mainDiv = this._mainDiv;
            if (mainDiv) {
                this._dim.width = mainDiv.clientWidth;
                this._dim.height = mainDiv.clientHeight;
                if (this.props.width !== this._dim.width || this.props.height !== this._dim.height) {
                    this.props.onSizeChanged(this._dim, this.props.index);
                }
            }
        }
        this._onItemRendered();
    };
    ViewRenderer.prototype._onItemRendered = function () {
        if (this.props.onItemLayout) {
            this.props.onItemLayout(this.props.index);
        }
    };
    return ViewRenderer;
}(BaseViewRenderer_1.default));
exports.default = ViewRenderer;
var styles = {
    baseViewStyle: {
        alignItems: 'stretch',
        borderWidth: 0,
        borderStyle: 'solid',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 0,
        position: 'absolute',
        minHeight: 0,
        minWidth: 0,
        left: 0,
        top: 0,
    },
};
//# sourceMappingURL=ViewRenderer.js.map