"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_native_1 = require("react-native");
var fontAwesome = require('react-native-vector-icons/FontAwesome').default;
var feather = require('react-native-vector-icons/Feather').default;
var antDesign = require('react-native-vector-icons/AntDesign').default;
var entypo = require('react-native-vector-icons/Entypo').default;
var evilIcons = require('react-native-vector-icons/EvilIcons').default;
var foundation = require('react-native-vector-icons/Foundation').default;
var ionicons = require('react-native-vector-icons/Ionicons').default;
var materialIcons = require('react-native-vector-icons/MaterialIcons')
    .default;
var octicons = require('react-native-vector-icons/Octicons').default;
var simpleLineIcons = require('react-native-vector-icons/SimpleLineIcons')
    .default;
var zocial = require('react-native-vector-icons/Zocial').default;
var IconMap = {
    fontAwesome: fontAwesome,
    feather: feather,
    antDesign: antDesign,
    entypo: entypo,
    evilIcons: evilIcons,
    foundation: foundation,
    ionicons: ionicons,
    materialIcons: materialIcons,
    octicons: octicons,
    simpleLineIcons: simpleLineIcons,
    zocial: zocial
};
var IconComponent = function (_a) {
    var iconFont = _a.iconFont, iconName = _a.iconName, iconColor = _a.iconColor, onPress = _a.onPress, style = _a.style, testID = _a.testID, size = _a.size;
    var IC = IconMap[iconFont];
    if (onPress) {
        return (react_1.default.createElement(react_native_1.TouchableOpacity, { style: style, onPress: onPress, testID: testID },
            react_1.default.createElement(IC, { style: { color: iconColor }, name: iconName, size: size || style.width || style.height })));
    }
    return (react_1.default.createElement(react_native_1.View, { style: style, testID: testID },
        react_1.default.createElement(IC, { style: { color: iconColor }, name: iconName, size: size || style.width || style.height })));
};
exports.default = IconComponent;
//# sourceMappingURL=index.js.map