"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withParentContextMapper = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
function withParentContextMapper(WrappedComponent) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.render = function () {
            var parentContext = this.props.parentContext;
            var childrenWithProps = react_1.default.Children.map(this.props.children, function (child) {
                if (react_1.default.isValidElement(child)) {
                    return react_1.default.cloneElement(child, { parentContext: parentContext });
                }
                return child;
            });
            return (react_1.default.createElement(WrappedComponent, tslib_1.__assign({}, this.props), childrenWithProps));
        };
        return class_1;
    }(react_1.default.Component));
}
exports.withParentContextMapper = withParentContextMapper;
//# sourceMappingURL=withParentContextMapper.js.map