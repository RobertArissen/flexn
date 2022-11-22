"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.androidFirebaseDeploy = void 0;
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var rnv_1 = require("rnv");
var slackNotifier_1 = require("../slackNotifier");
var logSuccess = rnv_1.Logger.logSuccess, logTask = rnv_1.Logger.logTask;
var androidFirebaseDeploy = function (config) {
    return new Promise(function (resolve, reject) {
        var _a, _b, _c;
        logTask('BUILD_HOOK:androidDeployFirebase');
        var appPath = path_1.default.join(config.paths.project.builds.dir, "".concat(config.runtime.appId, "_").concat(config.platform));
        var apkPath = "".concat(path_1.default.join(appPath, 'app/build/outputs/apk/release/app-release.apk'));
        var version = config.files.project.package.version;
        var token = (_c = (_b = (_a = config.files.workspace.project) === null || _a === void 0 ? void 0 : _a.configPrivate) === null || _b === void 0 ? void 0 : _b.firebase) === null || _c === void 0 ? void 0 : _c.token;
        var firebaseId = rnv_1.Common.getConfigProp(config, config.platform, 'firebaseId');
        var firebaseGroups = rnv_1.Common.getConfigProp(config, config.platform, 'firebaseGroups');
        var title = rnv_1.Common.getConfigProp(config, config.platform, 'title');
        var args = "firebase appdistribution:distribute ".concat(apkPath, " --app ").concat(firebaseId, " --groups \"").concat(firebaseGroups, "\" --token=\"").concat(token, "\"");
        rnv_1.Exec.executeAsync(config, args, {
            shell: true,
            stdio: 'inherit',
            silent: false,
            privateParams: [token],
        })
            .then(function () { return (0, slackNotifier_1.notifySlack)("Deployed *".concat(title, "* (*").concat(config.platform, "*) *v").concat(version, "* to Firebase"), config); })
            .then(function () {
            logSuccess('APK Successfully uploaded to Firebase.');
            resolve(true);
        })
            .catch(function (error) {
            return (0, slackNotifier_1.notifySlack)("YOU FAIL ME YET AGAIN, STARSCREAM.\n                    \n                    Deploy failed *".concat(title, "* platform: (*").concat(config.platform, "*) version: *").concat(version, "* to *Firebase*:\n                    \n                    ").concat(error), config).then(function () { return reject(error); });
        });
    });
};
exports.androidFirebaseDeploy = androidFirebaseDeploy;
//# sourceMappingURL=androidFirebase.js.map