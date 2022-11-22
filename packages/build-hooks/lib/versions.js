"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prePublish = exports.updateVersions = void 0;
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var rnv_1 = require("rnv");
var readObjectSync = rnv_1.FileUtils.readObjectSync, writeFileSync = rnv_1.FileUtils.writeFileSync;
var logHook = rnv_1.Logger.logHook;
//TODO: not useful unless we use independent versioning
// const VERSIONED_PACKAGES = ['@flexn/sdk', '@flexn/template'];
var updateDeps = function (pkgConfig, depKey, packageNamesAll, packageConfigs, semVer) {
    if (semVer === void 0) { semVer = ''; }
    var pkgFile = pkgConfig.pkgFile;
    packageNamesAll.forEach(function (v) {
        var _a, _b;
        if (pkgFile) {
            var hasChanges = false;
            var currVer = (_a = pkgFile === null || pkgFile === void 0 ? void 0 : pkgFile[depKey]) === null || _a === void 0 ? void 0 : _a[v];
            if (currVer) {
                var newVer = "".concat(semVer).concat((_b = packageConfigs[v].pkgFile) === null || _b === void 0 ? void 0 : _b.version);
                if (currVer !== newVer) {
                    //eslint-disable-next-line no-console 
                    console.log('Found linked dependency to update:', v, currVer, newVer);
                    hasChanges = true;
                    pkgFile[depKey][v] = newVer;
                }
            }
            if (hasChanges) {
                var output = rnv_1.Doctor.fixPackageObject(pkgFile);
                rnv_1.FileUtils.writeFileSync(pkgConfig.pkgPath, output, 4, true);
            }
        }
    });
};
var updateRnvDeps = function (pkgConfig, packageNamesAll, packageConfigs, semVer) {
    if (semVer === void 0) { semVer = ''; }
    var rnvFile = pkgConfig.rnvFile, pkgFile = pkgConfig.pkgFile, metaFile = pkgConfig.metaFile, rnvPath = pkgConfig.rnvPath, metaPath = pkgConfig.metaPath, plugTempFile = pkgConfig.plugTempFile, plugTempPath = pkgConfig.plugTempPath;
    packageNamesAll.forEach(function (v) {
        var _a, _b, _c;
        var newVer = "".concat(semVer).concat((_a = packageConfigs[v].pkgFile) === null || _a === void 0 ? void 0 : _a.version);
        if (rnvFile) {
            var hasRnvChanges = false;
            var templateVer = (_c = (_b = rnvFile === null || rnvFile === void 0 ? void 0 : rnvFile.templates) === null || _b === void 0 ? void 0 : _b[v]) === null || _c === void 0 ? void 0 : _c.version;
            if (templateVer) {
                if (templateVer !== newVer) {
                    //eslint-disable-next-line no-console 
                    console.log('Found linked plugin dependency to update:', v, templateVer, newVer);
                    hasRnvChanges = true;
                    rnvFile.templates[v].version = newVer;
                }
            }
            var rnvPlugin = rnvFile.plugins[v];
            if (rnvPlugin === null || rnvPlugin === void 0 ? void 0 : rnvPlugin.version) {
                rnvPlugin.version = "".concat(newVer);
                hasRnvChanges = true;
            }
            else if (rnvPlugin) {
                if (!rnvPlugin.startsWith('source')) {
                    rnvFile.plugins[v] = newVer;
                    hasRnvChanges = true;
                }
            }
            if (hasRnvChanges) {
                var output = rnv_1.Doctor.fixPackageObject(rnvFile);
                rnv_1.FileUtils.writeFileSync(rnvPath, output, 4, true);
            }
        }
        if (metaFile) {
            metaFile.version = pkgFile.version;
            var output = rnv_1.Doctor.fixPackageObject(metaFile);
            writeFileSync(metaPath, output);
        }
        if (plugTempFile) {
            var hasChanges = false;
            var rnvPlugin = plugTempFile.pluginTemplates[v];
            if (rnvPlugin === null || rnvPlugin === void 0 ? void 0 : rnvPlugin.version) {
                rnvPlugin.version = "".concat(newVer);
                hasChanges = true;
            }
            else if (rnvPlugin) {
                rnvFile.plugins[v] = newVer;
                hasChanges = true;
            }
            if (hasChanges) {
                var output = rnv_1.Doctor.fixPackageObject(plugTempFile);
                rnv_1.FileUtils.writeFileSync(plugTempPath, output, 4, true);
            }
        }
    });
};
var updateVersions = function (c) {
    var pkgDirPath = path_1.default.join(c.paths.project.dir, 'packages');
    var dirs = fs_1.default.readdirSync(pkgDirPath);
    var packageNamesAll = [];
    var packageConfigs = {};
    var parsePackages = function (dirPath) {
        var conf = {};
        if (fs_1.default.statSync(dirPath).isDirectory()) {
            var _pkgPath = path_1.default.join(dirPath, 'package.json');
            if (fs_1.default.existsSync(_pkgPath)) {
                conf.pkgFile = readObjectSync(_pkgPath);
                conf.pkgPath = _pkgPath;
                conf.pkgName = conf.pkgFile.name;
            }
            var _rnvPath = path_1.default.join(dirPath, 'renative.json');
            if (fs_1.default.existsSync(_rnvPath)) {
                conf.rnvPath = _rnvPath;
                conf.rnvFile = readObjectSync(_rnvPath);
            }
            var _metaPath = path_1.default.join(dirPath, 'metadata.json');
            if (fs_1.default.existsSync(_metaPath)) {
                conf.metaPath = _metaPath;
                conf.metaFile = readObjectSync(_metaPath);
            }
            var _plugTempPath = path_1.default.join(dirPath, '/pluginTemplates/renative.plugins.json');
            if (fs_1.default.existsSync(_plugTempPath)) {
                conf.plugTempPath = _plugTempPath;
                conf.plugTempFile = readObjectSync(_plugTempPath);
            }
        }
        packageConfigs[conf.pkgName] = conf;
        packageNamesAll.push(conf.pkgName);
    };
    parsePackages(c.paths.project.dir);
    dirs.forEach(function (dir) {
        parsePackages(path_1.default.join(pkgDirPath, dir));
    });
    packageNamesAll.forEach(function (pkgName) {
        var pkgConfig = packageConfigs[pkgName];
        updateDeps(pkgConfig, 'dependencies', packageNamesAll, packageConfigs);
        updateDeps(pkgConfig, 'devDependencies', packageNamesAll, packageConfigs);
        updateDeps(pkgConfig, 'optionalDependencies', packageNamesAll, packageConfigs);
        updateDeps(pkgConfig, 'peerDependencies', packageNamesAll, packageConfigs, '^');
        updateRnvDeps(pkgConfig, packageNamesAll, packageConfigs);
    });
};
exports.updateVersions = updateVersions;
var prePublish = function (c) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logHook('bump plugins');
                return [4 /*yield*/, (0, exports.updateVersions)(c)];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
        }
    });
}); };
exports.prePublish = prePublish;
//# sourceMappingURL=versions.js.map