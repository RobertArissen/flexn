"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleDriveDeploy = void 0;
var tslib_1 = require("tslib");
/* eslint-disable max-statements */
var rnv_1 = require("rnv");
var slackNotifier_1 = require("../slackNotifier");
var fs = require('fs');
var path = require('path');
var google = require('googleapis').google;
var child_process = require('child_process');
var logSuccess = rnv_1.Logger.logSuccess, logError = rnv_1.Logger.logError;
// eslint-disable-next-line no-underscore-dangle
var _googleDriveDeploy = function (config, driveRoot, binaryPath, targetName) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var cnfPrivatePath, ROOT_FOLDER, PATH_TO_CREDENTIALS, PATH_TO_TOKEN, credentials, _a, client_secret, client_id, redirect_uris, oAuth2Client, token, title, appPath, apkPath, version_1, drive, data, currentFolder, data_1, e_1;
    var _b, _c, _d;
    return tslib_1.__generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 14, , 15]);
                cnfPrivatePath = config.paths.workspace.project;
                ROOT_FOLDER = driveRoot;
                PATH_TO_CREDENTIALS = path.resolve("".concat(cnfPrivatePath.dir, "/gdrive_uploader_credentials.json"));
                PATH_TO_TOKEN = path.resolve("".concat(cnfPrivatePath.dir, "/gdrive_uploader_token.json"));
                credentials = JSON.parse(fs.readFileSync(PATH_TO_CREDENTIALS));
                _a = credentials.installed, client_secret = _a.client_secret, client_id = _a.client_id, redirect_uris = _a.redirect_uris;
                oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
                token = fs.readFileSync(PATH_TO_TOKEN);
                oAuth2Client.setCredentials(JSON.parse(token));
                title = rnv_1.Common.getConfigProp(config, config.platform, 'title');
                appPath = path.join(config.paths.project.builds.dir, "".concat(config.runtime.appId, "_").concat(config.platform));
                apkPath = "".concat(path.join(appPath, binaryPath));
                version_1 = config.files.project.package.version;
                logSuccess("Deployment started for ".concat(title));
                drive = google.drive({ version: 'v3', auth: oAuth2Client });
                return [4 /*yield*/, drive.files.list({
                        pageSize: 999,
                        fields: 'nextPageToken, files(id, name)',
                        q: "'".concat(ROOT_FOLDER, "' in parents and trashed=false"),
                    })];
            case 1:
                data = (_e.sent()).data;
                if (!data) return [3 /*break*/, 13];
                currentFolder = data.files.find(function (folder) { return folder.name === version_1; });
                if (!!currentFolder) return [3 /*break*/, 3];
                return [4 /*yield*/, drive.files.create({
                        resource: {
                            name: version_1,
                            mimeType: 'application/vnd.google-apps.folder',
                            parents: [ROOT_FOLDER],
                        },
                        fields: 'id',
                    })];
            case 2:
                currentFolder = _e.sent();
                currentFolder.id = currentFolder.data.id;
                return [3 /*break*/, 10];
            case 3: return [4 /*yield*/, drive.files.list({
                    pageSize: 999,
                    fields: 'nextPageToken, files(id, name)',
                    q: "'".concat(currentFolder.id, "' in parents and trashed=false"),
                })];
            case 4:
                data_1 = (_e.sent()).data;
                if (!data_1) return [3 /*break*/, 10];
                if (!((_b = data_1.files[0]) === null || _b === void 0 ? void 0 : _b.id)) return [3 /*break*/, 6];
                return [4 /*yield*/, drive.files.delete({ fileId: data_1.files[0].id })];
            case 5:
                _e.sent();
                _e.label = 6;
            case 6:
                if (!((_c = data_1.files[1]) === null || _c === void 0 ? void 0 : _c.id)) return [3 /*break*/, 8];
                return [4 /*yield*/, drive.files.delete({ fileId: data_1.files[1].id })];
            case 7:
                _e.sent();
                _e.label = 8;
            case 8:
                if (!((_d = data_1.files[2]) === null || _d === void 0 ? void 0 : _d.id)) return [3 /*break*/, 10];
                return [4 /*yield*/, drive.files.delete({ fileId: data_1.files[2].id })];
            case 9:
                _e.sent();
                _e.label = 10;
            case 10:
                if (config.platform === 'macos') {
                    child_process.execSync("hdiutil create -volname \"".concat(title, "\" -srcfolder \"").concat(apkPath, "\" -ov -format UDZO \"").concat(title, ".dmg\""), { cwd: path.join(appPath, 'release') });
                }
                else {
                    child_process.execSync("zip \"".concat(title, ".zip\" \"").concat(targetName, "\""), {
                        cwd: path.join(appPath, 'app/build/outputs/apk/release'),
                    });
                }
                return [4 /*yield*/, drive.files.create({
                        resource: {
                            name: config.platform === 'macos' ? targetName : "".concat(title, ".zip"),
                            parents: [currentFolder.id],
                        },
                        media: {
                            mimeType: 'application/octet-stream',
                            body: fs.createReadStream(config.platform === 'macos'
                                ? path.join(appPath, "release/".concat(title, ".dmg"))
                                : path.join(appPath, "app/build/outputs/apk/release/".concat(title, ".zip"))),
                        },
                    })];
            case 11:
                _e.sent();
                return [4 /*yield*/, (0, slackNotifier_1.notifySlack)("Deployed *".concat(title, "* (*").concat(config.platform, "*) *v").concat(version_1, "* to https://drive.google.com/drive/folders/").concat(currentFolder.id), config)];
            case 12:
                _e.sent();
                logSuccess('Binaries uploaded to google drive succesfully!');
                _e.label = 13;
            case 13: return [3 /*break*/, 15];
            case 14:
                e_1 = _e.sent();
                if (e_1 instanceof Error) {
                    logError("Binary upload to google drive failed with error ".concat(e_1.toString()));
                    throw e_1;
                }
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); };
var googleDriveDeploy = function (c) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var driveRoot, title;
    return tslib_1.__generator(this, function (_a) {
        driveRoot = rnv_1.Common.getConfigProp(c, c.platform, 'googleDriveFolderID');
        switch (c.platform) {
            case 'firetv':
                return [2 /*return*/, _googleDriveDeploy(c, driveRoot, 'app/build/outputs/apk/release/app-release.apk', 'app-release.apk')];
            case 'macos': {
                title = 'RNVApp';
                return [2 /*return*/, _googleDriveDeploy(c, driveRoot, "release/".concat(title, ".app"), "".concat(title, ".dmg"))];
            }
            default:
                rnv_1.Logger.logWarning("Platform ".concat(c.platform, " not supported"));
                return [2 /*return*/, Promise.resolve()];
        }
        return [2 /*return*/];
    });
}); };
exports.googleDriveDeploy = googleDriveDeploy;
//# sourceMappingURL=googleDrive.js.map