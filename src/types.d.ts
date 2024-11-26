import 'react-native';

declare module 'react-native' {
    class TVEventHandler {
        enable: any;
    }
    class ViewProps {
        animatorOptions?: any;
        parentContext?: any;
        className?: any;
    }
    class TouchableOpacityProps {
        parentContext?: any;
        className?: any;
    }
    class PressableProps {
        parentContext?: any;
        className?: any;
    }
    class ScrollViewProps {
        parentContext?: any;
    }
    interface UIManagerStatic {
        dispatchViewManagerCommand: (
            reactTag: number | null,
            commandID: number | string,
            commandArgs?: Array<any>
        ) => void;
    }
}
