import { StyleProp, ViewStyle } from 'react-native';

import { Context, RecyclableListFocusOptions } from '../../focusManager/types';
declare type RowItem = {
    backgroundImage: string;
    title?: string;
};
interface GridProps {
    parentContext?: Context;
    focusOptions?: RecyclableListFocusOptions;
    itemsInViewport: number;
    style?: StyleProp<ViewStyle>;
    cardStyle?: StyleProp<ViewStyle>;
    onFocus?(data: any): void;
    onBlur?(data: any): void;
    onPress?(data: any): void;
    renderCard?(data: any, _repeatContext: any, dimensions: any, _renderProps: any): JSX.Element | JSX.Element[] | null;
    items: RowItem[];
    itemDimensions: {
        height: number;
    };
    itemSpacing?: number;
    verticalItemSpacing?: number;
    horizontalItemSpacing?: number;
    rerenderData?: any;
    animatorOptions?: any;
    disableItemContainer?: boolean;
}
declare const Grid: {
    ({ items, style, cardStyle, itemSpacing, verticalItemSpacing, horizontalItemSpacing, itemDimensions, itemsInViewport, parentContext, focusOptions, rerenderData, animatorOptions, onFocus, onPress, onBlur, renderCard, disableItemContainer, }: GridProps): JSX.Element;
    displayName: string;
};
export default Grid;
//# sourceMappingURL=index.d.ts.map