"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSentrySecrets = exports.uploadSentryMaps = void 0;
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var child_process_1 = tslib_1.__importDefault(require("child_process"));
var rnv_1 = require("rnv");
var readObjectSync = rnv_1.FileUtils.readObjectSync;
var uploadSentryMaps = function (c) {
    var rootPkgFile = readObjectSync(path_1.default.join(c.paths.project.dir, '../../lerna.json'));
    var version = rootPkgFile.version;
    var args = [
        "files ".concat(version),
        'upload-sourcemaps',
        "--dist ".concat(version.replace(new RegExp(/([.,-]|alpha)/g), '')),
        "--strip-prefix ".concat(path_1.default.resolve(__dirname, '..', '..', '..', '..', '..')),
        "--rewrite platformBuilds/".concat(c.runtime.appId, "_").concat(c.platform, "/main.jsbundle platformBuilds/").concat(c.runtime.appId, "_").concat(c.platform, "/main.jsbundle.map"),
    ];
    return child_process_1.default.exec("".concat(path_1.default.join(require.resolve('@sentry/react-native'), '..', 'cli', 'bin', 'sentry-cli'), " ").concat(args.join(' ')));
};
exports.uploadSentryMaps = uploadSentryMaps;
var setupSentrySecrets = function (c) {
    var _a, _b;
    var url = (_b = (_a = c.files.workspace.project) === null || _a === void 0 ? void 0 : _a.configPrivate) === null || _b === void 0 ? void 0 : _b.SENTRY_URL;
    fs_1.default.writeFileSync(path_1.default.join(c.paths.project.dir, 'renative.private.json'), "{\"SENTRY_URL\":\"".concat(url, "\"}"));
};
exports.setupSentrySecrets = setupSentrySecrets;
//# sourceMappingURL=sentry.js.map