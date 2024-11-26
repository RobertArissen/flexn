import { BaseItemAnimator } from '../../../core/ItemAnimator';
export declare class DefaultNativeItemAnimator implements BaseItemAnimator {
    shouldAnimateOnce: boolean;
    private _hasAnimatedOnce;
    private _isTimerOn;
    constructor();
    animateWillMount(): object | undefined;
    animateDidMount(): void;
    animateWillUpdate(): void;
    animateShift(fromX: number, fromY: number, toX: number, toY: number, _itemRef: object, _itemIndex: number): boolean;
    animateWillUnmount(): void;
}
//# sourceMappingURL=DefaultNativeItemAnimator.d.ts.map