"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifySlack = void 0;
var tslib_1 = require("tslib");
var isomorphic_unfetch_1 = tslib_1.__importDefault(require("isomorphic-unfetch"));
var triggerHooks = function (text, hook) {
    var url = "https://hooks.slack.com/services/".concat(hook);
    var headers = new Headers();
    var body = { text: text };
    headers.append('Content-Type', 'application/json');
    var options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    };
    return (0, isomorphic_unfetch_1.default)(url, options);
};
var notifySlack = function (message, config) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var prd_flexn, err_1;
    var _a, _b, _c;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                prd_flexn = (_c = (_b = (_a = config.files.workspace.project) === null || _a === void 0 ? void 0 : _a.configPrivate) === null || _b === void 0 ? void 0 : _b.slack) === null || _c === void 0 ? void 0 : _c.prd_flexn;
                if (!prd_flexn) {
                    return [2 /*return*/];
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, triggerHooks(message, prd_flexn)];
            case 2:
                _d.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _d.sent();
                //eslint-disable-next-line no-console
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.notifySlack = notifySlack;
//# sourceMappingURL=slackNotifier.js.map