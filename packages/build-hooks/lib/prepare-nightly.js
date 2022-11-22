"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupPostNightly = exports.prepareNightlyBuild = void 0;
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var rnv_1 = require("rnv");
var readObjectSync = rnv_1.FileUtils.readObjectSync, writeFileSync = rnv_1.FileUtils.writeFileSync;
var prepareNightlyBuild = function (c) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var rootPkgFile, pkgFile, version, splitVersion, semanticVersion, needsMinorIncrease, _a, major, minor, increasedMinor, output;
    return tslib_1.__generator(this, function (_b) {
        rootPkgFile = readObjectSync(path_1.default.join(c.paths.project.dir, '../../lerna.json'));
        pkgFile = readObjectSync(c.paths.project.package);
        version = rootPkgFile.version;
        splitVersion = version.split('-');
        semanticVersion = splitVersion[0];
        needsMinorIncrease = splitVersion.length === 1;
        if (needsMinorIncrease) {
            _a = semanticVersion.split('.'), major = _a[0], minor = _a[1];
            increasedMinor = parseInt(minor, 10) + 1;
            semanticVersion = [major, increasedMinor, '0'].join('.');
        }
        pkgFile.version = "".concat(semanticVersion, "-").concat(c.files.project.assets.config.timestamp.slice(3, 7));
        output = rnv_1.Doctor.fixPackageObject(pkgFile);
        writeFileSync(c.paths.project.package, output);
        return [2 /*return*/, true];
    });
}); };
exports.prepareNightlyBuild = prepareNightlyBuild;
var cleanupPostNightly = function (c) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var rootPkgFile, version, pkgFile, output;
    return tslib_1.__generator(this, function (_a) {
        rootPkgFile = readObjectSync(path_1.default.join(c.paths.project.dir, '../../lerna.json'));
        version = rootPkgFile.version;
        pkgFile = readObjectSync(c.paths.project.package);
        pkgFile.version = version;
        output = rnv_1.Doctor.fixPackageObject(pkgFile);
        writeFileSync(c.paths.project.package, output);
        return [2 /*return*/, true];
    });
}); };
exports.cleanupPostNightly = cleanupPostNightly;
//# sourceMappingURL=prepare-nightly.js.map