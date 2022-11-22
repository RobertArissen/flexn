import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Context, RecyclableListFocusOptions } from '../../focusManager/types';
declare type RowItem = {
    backgroundImage: string;
    title?: string;
};
interface RowProps {
    index?: number;
    parentContext?: Context;
    repeatContext?: Context;
    title?: string;
    focusOptions?: RecyclableListFocusOptions;
    animatorOptions?: any;
    itemsInViewport: number;
    style?: StyleProp<ViewStyle>;
    cardStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
    titleStyle?: StyleProp<TextStyle>;
    onFocus?(data: any): void;
    onBlur?(data: any): void;
    onPress?(data: any): void;
    renderCard?(data: any, _repeatContext: any, dimensions: any, _renderProps: any): JSX.Element | JSX.Element[] | null;
    items: RowItem[];
    rerenderData?: any;
    itemDimensions: {
        height: number;
    };
    itemSpacing?: number;
    verticalItemSpacing?: number;
    horizontalItemSpacing?: number;
    initialXOffset?: number;
    disableItemContainer?: boolean;
}
declare const Row: ({ items, title, itemsInViewport, parentContext, repeatContext, focusOptions, animatorOptions, style, cardStyle, titleStyle, rerenderData, onFocus, onPress, onBlur, renderCard, itemDimensions, itemSpacing, verticalItemSpacing, horizontalItemSpacing, initialXOffset, disableItemContainer, }: RowProps) => JSX.Element;
export default Row;
//# sourceMappingURL=index.d.ts.map