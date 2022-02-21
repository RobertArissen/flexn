import type {
    GestureResponderEvent,
    ScrollViewProps as RNScrollViewProps,
    StyleProp,
    ViewProps as RNViewProps,
    PressableProps as RNPressableProps,
    ViewStyle,
    ScrollView,
} from 'react-native';

export type ForbiddenFocusDirections = 'down' | 'up' | 'left' | 'right';
export type WindowAlignment = 'both-edge' | 'low-edge';
export type ScreenStates = 'background' | 'foreground';
export type FocusOptions = {
    forbiddenFocusDirections?: ForbiddenFocusDirections[];
    animatorOptions?: any;
    focusKey?: string;
    hasInitialFocus?: boolean;
};

export type ViewFocusOptions = {
    forbiddenFocusDirections?: ForbiddenFocusDirections[];
    animatorOptions?: any;
    focusKey?: string;
    hasInitialFocus?: boolean;
};

export type ScreenFocusOptions = {
    forbiddenFocusDirections?: ForbiddenFocusDirections[];
    focusKey?: string;
    verticalWindowAlignment?: WindowAlignment;
    horizontalWindowAlignment?: WindowAlignment;
};

export type RecyclableListFocusOptions = {
    forbiddenFocusDirections?: ForbiddenFocusDirections[];
};

export interface ViewProps extends RNViewProps {
    focus?: boolean;
    focusOptions?: ViewFocusOptions;
    parentContext?: any;
    repeatContext?: any;
    onPress?: (e: GestureResponderEvent | any) => void;
    onBlur?: (response?: any) => void;
    onFocus?: any;
    children?: React.ReactNode;
    ref?: any;
    activeOpacity?: any;
    style?: StyleProp<ViewStyle>;
}

export interface PressableProps extends RNPressableProps {
    focus?: boolean;
    focusOptions?: FocusOptions;
    parentContext?: any;
    repeatContext?: any;
    onPress?: (e: GestureResponderEvent | any) => void;
    onBlur?: (response?: any) => void;
    onFocus?: any;
    children: React.ReactNode;
    ref?: any;
    activeOpacity?: any;
    style?: StyleProp<ViewStyle>;
}

export interface ScrollViewProps extends RNScrollViewProps {
    parentContext: any;
    horizontal?: boolean;
    children?: React.ReactNode;
    ref?: React.MutableRefObject<ScrollView>;
}

export interface ScreenProps {
    screenState?: ScreenStates;
    screenOrder?: number;
    stealFocus?: boolean;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    onBlur?: () => void;
    onFocus?: () => void;
    focusOptions?: ScreenFocusOptions;
}

export interface RecyclerViewProps {
    parentContext?: any;
    repeatContext?: any;
    isHorizontal?: boolean;
    children?: React.ReactNode;
    dataProvider: any;
    layoutProvider: any;
    rowRenderer: any;
    bounces?: boolean;
    scrollViewProps?: any;
    scrollEventThrottle?: number;
    contentContainerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    focusOptions?: RecyclableListFocusOptions;
}

export interface Context {
    id: string;
    type: string;
    children: Context[];
    parent?: Context;
    layout?: any;
    prevState?: string;
    screen?: Context;
    data?: any;
    onFocus?(): void;
    onBlur?(): void;
    isScrollable?: boolean;
    nodeId?: any;
    node?: any;
    isFocused?: boolean;
    isHorizontal?: boolean;
    stealFocus?: boolean;
    verticalWindowAlignment?: string;
    horizontalWindowAlignment?: string;
    isNested?: boolean;
    order?: number;
    scrollOffsetX?: number;
    scrollOffsetY?: number;
    isLastVisible?(): boolean;
    isFirstVisible?(): boolean;
    isRecyclable?: boolean;
    isFocusable?: boolean;
    focusKey?: string;
    state?: string; // proper type
    initialFocus?: Context;
    lastFocused?: Context;
    repeatContext?: Context;
    parentContext?: Context;
    layouts?: any;
    index?: number;
    forbiddenFocusDirections?: string[];
}

export type ContextMap = { [key: string]: Context };
