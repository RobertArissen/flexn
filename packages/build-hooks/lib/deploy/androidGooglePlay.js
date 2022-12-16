"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.androidGPDeploy = void 0;
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var rnv_1 = require("rnv");
var slackNotifier_1 = require("../slackNotifier");
var androidGPDeploy = function (c) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var version, title, appPath, aabPath, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!['androidtv', 'android'].includes(c.platform))
                    return [2 /*return*/];
                rnv_1.Logger.logHook('androidDeploy', 'APK DEPLOY STARTED');
                version = c.files.project.package.version;
                title = rnv_1.Common.getConfigProp(c, c.platform, 'title');
                appPath = path_1.default.join(c.paths.project.builds.dir, "".concat(c.runtime.appId, "_").concat(c.platform));
                aabPath = "".concat(path_1.default.join(appPath, "app/build/outputs/bundle/release/app-release.aab"));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 6]);
                return [4 /*yield*/, rnv_1.Exec.executeAsync(c, "fastlane supply --aab ".concat(aabPath, " --track alpha --json_key ").concat(path_1.default.join(c.paths.workspace.project.dir, 'play-store-credentials.json'), " --package_name ").concat(rnv_1.Common.getConfigProp(c, c.platform, 'id'), " "), {
                        env: process.env,
                        shell: true,
                        stdio: 'inherit',
                        silent: true,
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, slackNotifier_1.notifySlack)("Deployed *".concat(title, "* (*").concat(c.platform, "*) *v").concat(version, "* to Google Play Console"), c)];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4:
                err_1 = _a.sent();
                return [4 /*yield*/, (0, slackNotifier_1.notifySlack)("YOU FAIL ME YET AGAIN, STARSCREAM.\n                \n            Deploy failed *".concat(title, "* platform: (*").concat(c.platform, "*) version: *").concat(version, "* to *Google Play*:\n                \n            ").concat(err_1), c)];
            case 5:
                _a.sent();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.androidGPDeploy = androidGPDeploy;
//# sourceMappingURL=androidGooglePlay.js.map