interface Props {
    style: any;
    itemSpacing: number;
    verticalItemSpacing: number;
    horizontalItemSpacing: number;
    itemDimensions: {
        height: number;
    };
    itemsInViewport: number;
    initialXOffset?: number;
    ref: React.MutableRefObject<any>;
}
export default function useDimensionsCalculator({ style, itemSpacing, verticalItemSpacing, horizontalItemSpacing, itemDimensions, itemsInViewport, initialXOffset, ref, }: Props): {
    spacings: {
        paddingLeft: number;
        paddingTop: number;
        paddingBottom: number;
        paddingRight: number;
    };
    isLoading: boolean;
    boundaries: {
        width: any;
        height: any;
        relativeHeight: any;
    };
    rowDimensions: {
        layout: {
            width: number;
            height: number;
        };
        item: {
            width: number;
            height: number;
        };
    };
    onLayout: () => void;
};
export {};
//# sourceMappingURL=useDimensionsCalculator.d.ts.map