"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("../helpers");
function useStyleFlattener(style, ignoreRatioConversion) {
    if (ignoreRatioConversion === void 0) { ignoreRatioConversion = []; }
    if (style !== null) {
        if (Array.isArray(style)) {
            var flatted_1 = {};
            style.map(function (item) {
                item &&
                    Object.keys(item) &&
                    Object.keys(item).map(function (key) {
                        if (ignoreRatioConversion.includes(key)) {
                            return (flatted_1[key] = item[key]);
                        }
                        else {
                            return (flatted_1[key] = isNaN(item[key]) ? item[key] : (0, helpers_1.Ratio)(item[key]));
                        }
                    });
            });
            return flatted_1;
        }
        return style;
    }
    return {};
}
exports.default = useStyleFlattener;
//# sourceMappingURL=useStyleFlattener.js.map