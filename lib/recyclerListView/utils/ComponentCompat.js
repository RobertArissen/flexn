"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentCompat = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
//Interim solve given we want to be active on old react as well for now.
var ComponentCompat = /** @class */ (function (_super) {
    tslib_1.__extends(ComponentCompat, _super);
    function ComponentCompat(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._hasRenderedOnce = false;
        _this._didPropsChange = false;
        return _this;
    }
    ComponentCompat.prototype.shouldComponentUpdate = function (newProps) {
        if (this.props !== newProps) {
            this.componentWillReceivePropsCompat();
        }
        return true;
    };
    //setState inside will not update the existing cycle, not a true replacement for componentWillReceiveProps
    ComponentCompat.prototype.componentWillReceivePropsCompat = function () {
        //no op
    };
    ComponentCompat.prototype.componentWillMountCompat = function () {
        //no op
    };
    ComponentCompat.prototype.componentWillUpdateCompat = function () {
        //no op
    };
    ComponentCompat.prototype.render = function () {
        if (!this._hasRenderedOnce) {
            this._hasRenderedOnce = true;
            this.componentWillMountCompat();
        }
        else {
            this.componentWillUpdateCompat();
        }
        return this.renderCompat();
    };
    return ComponentCompat;
}(React.Component));
exports.ComponentCompat = ComponentCompat;
//# sourceMappingURL=ComponentCompat.js.map