"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("./core"));
var constants_1 = require("../constants");
var logger_1 = tslib_1.__importDefault(require("./logger"));
var EVENT_TYPE_SELECT = 'select';
var EVENT_TYPE_RIGHT = 'right';
var EVENT_TYPE_LEFT = 'left';
var EVENT_TYPE_DOWN = 'down';
var EVENT_TYPE_UP = 'up';
var EVENT_TYPE_PLAY_PAUSE = 'playPause';
var DEFAULT_KEY_MAP = {
    37: EVENT_TYPE_LEFT,
    38: EVENT_TYPE_UP,
    39: EVENT_TYPE_RIGHT,
    40: EVENT_TYPE_DOWN,
    13: EVENT_TYPE_SELECT,
    32: EVENT_TYPE_PLAY_PAUSE,
};
var KeyHandler = /** @class */ (function () {
    function KeyHandler() {
        this.onKeyDown = this.onKeyDown.bind(this);
        this.enableKeyHandler = this.enableKeyHandler.bind(this);
        this.enableKeyHandler();
    }
    KeyHandler.prototype.enableKeyHandler = function () {
        var _this = this;
        this.keyUpEventListener = function (event) {
            var eventType = DEFAULT_KEY_MAP[event.keyCode];
            _this.onKeyDown(eventType);
        };
        window.addEventListener('keyup', this.keyUpEventListener);
    };
    KeyHandler.prototype.removeListeners = function () {
        // to be implemented
    };
    ;
    KeyHandler.prototype.onKeyDown = function (eventType) {
        var _a;
        if (eventType === 'playPause') {
            logger_1.default.getInstance().debug(core_1.default);
            core_1.default.debuggerEnabled = !core_1.default.isDebuggerEnabled;
        }
        if (eventType === EVENT_TYPE_SELECT && core_1.default.getCurrentFocus()) {
            (_a = core_1.default.getCurrentFocus()) === null || _a === void 0 ? void 0 : _a.onPress();
        }
        if (core_1.default.getCurrentFocus()) {
            if (core_1.default.hasPendingUpdateGuideLines) {
                core_1.default.executeUpdateGuideLines();
            }
            if (constants_1.DIRECTION.includes(eventType)) {
                core_1.default.executeDirectionalFocus(eventType);
                core_1.default.executeScroll(eventType);
                core_1.default.executeUpdateGuideLines();
            }
        }
    };
    return KeyHandler;
}());
exports.default = KeyHandler;
//# sourceMappingURL=keyHandler.tv.web.js.map