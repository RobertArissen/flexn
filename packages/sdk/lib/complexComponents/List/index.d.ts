import { StyleProp, ViewStyle, TextStyle } from 'react-native';

import { Context, RecyclableListFocusOptions } from '../../focusManager/types';
declare type RowItem = {
    backgroundImage: string;
    title?: string;
};
interface ListProps {
    parentContext?: Context;
    focusOptions?: RecyclableListFocusOptions;
    animatorOptions?: any;
    itemsInViewport?: number;
    style?: StyleProp<ViewStyle>;
    cardStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
    titleStyle?: StyleProp<TextStyle>;
    onFocus?(data: any): void;
    onBlur?(data: any): void;
    onPress?(data: any): void;
    renderCard?(data: any, _repeatContext: any, dimensions: any, _renderProps: any): JSX.Element | JSX.Element[] | null;
    items: {
        rowTitle?: string;
        itemsInViewport?: number;
        items: RowItem[][];
    }[];
    itemDimensions: {
        height: number;
    };
    itemSpacing?: number;
    verticalItemSpacing?: number;
    horizontalItemSpacing?: number;
    initialXOffset?: number;
    rowHeight: number;
    rerenderData?: any;
    disableItemContainer?: boolean;
}
declare const List: ({ parentContext, items, itemsInViewport, style, cardStyle, titleStyle, rerenderData, focusOptions, animatorOptions, itemSpacing, verticalItemSpacing, horizontalItemSpacing, itemDimensions, onPress, onFocus, onBlur, renderCard, initialXOffset, rowHeight, disableItemContainer, }: ListProps) => JSX.Element;
export default List;
//# sourceMappingURL=index.d.ts.map