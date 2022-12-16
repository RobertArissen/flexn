"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iosFirebaseDeploy = void 0;
var rnv_1 = require("rnv");
var slackNotifier_1 = require("../slackNotifier");
var logSuccess = rnv_1.Logger.logSuccess, logTask = rnv_1.Logger.logTask;
var iosFirebaseDeploy = function (config) {
    return new Promise(function (resolve, reject) {
        var _a, _b, _c;
        logTask('BUILD_HOOK:iosDeployFirebase');
        var basePath = rnv_1.Common.getAppFolder(config, config.platform);
        var ipaPath = "".concat(basePath, "/release/RNVApp.ipa");
        var version = config.files.project.package.version;
        var token = (_c = (_b = (_a = config.files.workspace.project) === null || _a === void 0 ? void 0 : _a.configPrivate) === null || _b === void 0 ? void 0 : _b.firebase) === null || _c === void 0 ? void 0 : _c.token;
        var firebaseId = rnv_1.Common.getConfigProp(config, config.platform, 'firebaseId');
        var title = rnv_1.Common.getConfigProp(config, config.platform, 'title');
        var args = "firebase appdistribution:distribute ".concat(ipaPath, " --app ").concat(firebaseId, " --groups \"RS\" --token=\"").concat(token, "\"");
        rnv_1.Exec.executeAsync(config, args, {
            shell: true,
            stdio: 'inherit',
            silent: false,
            privateParams: [token],
        })
            .then(function () { return (0, slackNotifier_1.notifySlack)("Deployed *".concat(title, "* (*").concat(config.platform, "*) *v").concat(version, "* to Firebase"), config); })
            .then(function () {
            logSuccess('IPA Successfully uploaded to Firebase.');
            resolve(true);
        })
            .catch(function (error) {
            return (0, slackNotifier_1.notifySlack)("YOU FAIL ME YET AGAIN, STARSCREAM.\n                    \n                    Deploy failed *".concat(title, "* (*").concat(config.platform, "*) version: *").concat(version, "* to *Firebase*:\n                    \n                    ").concat(error), config).then(function () { return reject(error); });
        });
    });
};
exports.iosFirebaseDeploy = iosFirebaseDeploy;
//# sourceMappingURL=iosFirebase.js.map