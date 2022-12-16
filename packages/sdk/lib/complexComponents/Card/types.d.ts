import React from 'react';
import { StyleProp, ViewStyle, ImageURISource } from 'react-native';

import { Context, PressableFocusOptions } from '../../focusManager/types';
declare type ImageResizeMode = 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
export interface CardProps extends React.ComponentPropsWithRef<any> {
    style?: StyleProp<ViewStyle>;
    src: ImageURISource;
    onFocus?(): void;
    onPress?(): void;
    onBlur?(): void;
    resizeMode?: ImageResizeMode;
    title?: string;
    parentContext?: Context;
    repeatContext?: Context;
    focusOptions?: PressableFocusOptions;
}
export {};
//# sourceMappingURL=types.d.ts.map