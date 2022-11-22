import React from 'react';
import { ImageBackgroundProps } from 'react-native';
import type { Context } from '../../focusManager/types';
interface ImageBackgroundPropsExtended extends ImageBackgroundProps {
    children?: React.ReactNode;
    parentContext: Context;
}
declare const ImageBackground: {
    ({ children, parentContext, source, ...props }: ImageBackgroundPropsExtended): JSX.Element;
    displayName: string;
};
export default ImageBackground;
//# sourceMappingURL=index.native.tv.d.ts.map