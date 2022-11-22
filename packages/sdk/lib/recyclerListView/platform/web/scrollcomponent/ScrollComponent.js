"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var BaseScrollComponent_1 = tslib_1.__importDefault(require("../../../core/scrollcomponent/BaseScrollComponent"));
var ScrollViewer_1 = tslib_1.__importDefault(require("./ScrollViewer"));
/***
 * The responsibility of a scroll component is to report its size, scroll events and provide a way to scroll to a given offset.
 * RecyclerListView works on top of this interface and doesn't care about the implementation. To support web we only had to provide
 * another component written on top of web elements
 */
var ScrollComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ScrollComponent, _super);
    function ScrollComponent(args) {
        var _this = _super.call(this, args) || this;
        _this._scrollViewRef = null;
        _this._onScroll = function (e) {
            _this.props.onScroll(e.nativeEvent.contentOffset.x, e.nativeEvent.contentOffset.y, e);
        };
        _this._onSizeChanged = function (event) {
            if (_this.props.onSizeChanged) {
                _this.props.onSizeChanged(event);
            }
        };
        _this._height = 0;
        _this._width = 0;
        return _this;
    }
    ScrollComponent.prototype.scrollTo = function (x, y, animated) {
        if (this._scrollViewRef) {
            this._scrollViewRef.scrollTo({ x: x, y: y, animated: animated });
        }
    };
    ScrollComponent.prototype.render = function () {
        var _this = this;
        var Scroller = this.props.externalScrollView; //TSI
        return (React.createElement(Scroller, tslib_1.__assign({ ref: function (scrollView) { return _this._scrollViewRef = scrollView; } }, this.props, { horizontal: this.props.isHorizontal, onScroll: this._onScroll, onSizeChanged: this._onSizeChanged }),
            React.createElement("div", { style: {
                    height: this.props.contentHeight,
                    width: this.props.contentWidth,
                } }, this.props.children),
            this.props.renderFooter ? React.createElement("div", { style: this.props.isHorizontal ? {
                    left: this.props.contentWidth,
                    position: 'absolute',
                    top: 0,
                } : undefined }, this.props.renderFooter()) : null));
    };
    ScrollComponent.defaultProps = {
        contentHeight: 0,
        contentWidth: 0,
        externalScrollView: ScrollViewer_1.default,
        isHorizontal: false,
        scrollThrottle: 16,
        canChangeSize: false,
    };
    return ScrollComponent;
}(BaseScrollComponent_1.default));
exports.default = ScrollComponent;
//# sourceMappingURL=ScrollComponent.js.map