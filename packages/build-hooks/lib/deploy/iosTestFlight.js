"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iosTFDeploy = void 0;
var tslib_1 = require("tslib");
/* eslint-disable no-console */
var rnv_1 = require("rnv");
var slackNotifier_1 = require("../slackNotifier");
var path = require('path');
var iosTFDeploy = function (c) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var fastlaneArguments, privateConfig, appleId, basePath, ipaPath, platformId, title, teamId, appId, version, url, e_1;
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                fastlaneArguments = [];
                privateConfig = ((_a = c.files.workspace.project) === null || _a === void 0 ? void 0 : _a.configPrivate) || {};
                appleId = c.runtime.scheme === 'canary' ? privateConfig.apple.alpha_apple_id : privateConfig.apple.prod_apple_id;
                basePath = rnv_1.Common.getAppFolder(c, c.platform);
                ipaPath = "".concat(basePath, "/release/").concat(c.platform === 'tvos' ? 'RNVAppTVOS.ipa' : 'RNVApp.ipa');
                platformId = c.platform === 'tvos' ? 'appletvos' : 'ios';
                title = rnv_1.Common.getConfigProp(c, c.platform, 'title');
                teamId = rnv_1.Common.getConfigProp(c, c.platform, 'teamID');
                appId = rnv_1.Common.getConfigProp(c, c.platform, 'id');
                version = rnv_1.Common.getConfigProp(c, c.platform, 'version', c.files.project.package.version);
                url = "https://appstoreconnect.apple.com/apps/".concat(appleId, "/testflight/").concat(c.platform);
                fastlaneArguments = [
                    'run',
                    'upload_to_testflight',
                    "app_identifier:".concat(appId),
                    "app_platform:".concat(platformId),
                    "team_id:".concat(teamId),
                    "ipa:".concat(ipaPath),
                    "apple_id:".concat(appleId),
                    'skip_waiting_for_build_processing:true',
                    "api_key_path:".concat(path.join(c.paths.workspace.project.dir, 'app_store_connect_credentials.json')),
                ];
                console.log("Fastlane ".concat(c.platform, " upload to AppStore started for ").concat(ipaPath));
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 6]);
                return [4 /*yield*/, rnv_1.Exec.executeAsync(c, "fastlane ".concat(fastlaneArguments.join(' ')), {
                        env: process.env,
                        shell: true,
                        stdio: 'inherit',
                        silent: true,
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, (0, slackNotifier_1.notifySlack)("Deployed *".concat(title, "* (*").concat(c.platform, "*) *v").concat(version, "* to Testflight - ").concat(url), c)];
            case 3:
                _b.sent();
                return [3 /*break*/, 6];
            case 4:
                e_1 = _b.sent();
                return [4 /*yield*/, (0, slackNotifier_1.notifySlack)("YOU FAIL ME YET AGAIN, STARSCREAM.\n\n            Deploy failed *".concat(title, "* (*").concat(c.platform, "*) *v").concat(version, "* to Testflight:\n\n            ").concat(e_1), c)];
            case 5:
                _b.sent();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.iosTFDeploy = iosTFDeploy;
//# sourceMappingURL=iosTestFlight.js.map