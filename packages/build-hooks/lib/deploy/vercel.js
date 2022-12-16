"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vercelDeploy = void 0;
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var rnv_1 = require("rnv");
var slackNotifier_1 = require("../slackNotifier");
var logSuccess = rnv_1.Logger.logSuccess, logError = rnv_1.Logger.logError;
var vercelDeploy = function (config) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var platform, title, version, token, vercelProjectName, e_1;
    var _a, _b, _c;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                platform = config.platform;
                title = rnv_1.Common.getConfigProp(config, config.platform, 'title');
                version = config.files.project.package.version;
                token = (_c = (_b = (_a = config.files.workspace.project) === null || _a === void 0 ? void 0 : _a.configPrivate) === null || _b === void 0 ? void 0 : _b.vercel) === null || _c === void 0 ? void 0 : _c.token;
                // remove .vercel/project.json othwerise it will deploy to the last location
                try {
                    fs_1.default.unlinkSync("".concat(process.cwd(), "/platformBuilds/").concat(config.runtime.appId, "_").concat(platform, "/.vercel/project.json"));
                }
                catch (_) {
                    // it's deleted most likely
                }
                logSuccess('Vercel deployment started...');
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                vercelProjectName = rnv_1.Common.getConfigProp(config, config.platform, 'vercelProjectName');
                return [4 /*yield*/, rnv_1.Exec.executeAsync(config, "npx vercel ./platformBuilds/".concat(config.runtime.appId, "_").concat(platform, "/output --token=").concat(process.env.VERCEL_TOKEN || token, " --name=").concat(vercelProjectName, " --scope=flexn -f --confirm --prod"), {
                        shell: true,
                        stdio: 'inherit',
                        silent: false,
                    })];
            case 2:
                _d.sent();
                logSuccess("".concat(platform, " succesfully deployed to Vercel"));
                return [4 /*yield*/, (0, slackNotifier_1.notifySlack)("Deployed *".concat(title, "* (*").concat(config.platform, "*) *v").concat(version, "* ").concat(vercelProjectName, ".vercel.app"), config)];
            case 3:
                _d.sent();
                return [3 /*break*/, 5];
            case 4:
                e_1 = _d.sent();
                logError("Upload failed to Vercel with error: ".concat(e_1));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.vercelDeploy = vercelDeploy;
//# sourceMappingURL=vercel.js.map