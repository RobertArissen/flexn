interface ItemAnimator {
    animateWillMount: (atX: number, atY: number, itemIndex: number) => object | undefined;
    animateDidMount: (atX: number, atY: number, itemRef: object, itemIndex: number) => void;
    animateWillUpdate: (fromX: number, fromY: number, toX: number, toY: number, itemRef: object, itemIndex: number) => void;
    animateShift: (fromX: number, fromY: number, toX: number, toY: number, itemRef: object, itemIndex: number) => boolean;
    animateWillUnmount: (atX: number, atY: number, itemRef: object, itemIndex: number) => void;
}
export declare class BaseItemAnimator implements ItemAnimator {
    static USE_NATIVE_DRIVER: boolean;
    animateWillMount(_atX: number, _atY: number, _itemIndex: number): object | undefined;
    animateDidMount(_atX: number, _atY: number, _itemRef: object, _itemIndex: number): void;
    animateWillUpdate(_fromX: number, _fromY: number, _toX: number, _toY: number, _itemRef: object, _itemIndex: number): void;
    animateShift(_fromX: number, _fromY: number, _toX: number, _toY: number, _itemRef: object, _itemIndex: number): boolean;
    animateWillUnmount(_atX: number, _atY: number, _itemRef: object, _itemIndex: number): void;
}
export default ItemAnimator;
//# sourceMappingURL=ItemAnimator.d.ts.map