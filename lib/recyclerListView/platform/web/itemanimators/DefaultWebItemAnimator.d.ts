import { BaseItemAnimator } from '../../../core/ItemAnimator';
/**
 * Default implementation of RLV layout animations for web. We simply hook in transform transitions to beautifully animate all
 * shift events.
 */
export declare class DefaultWebItemAnimator implements BaseItemAnimator {
    shouldAnimateOnce: boolean;
    private _hasAnimatedOnce;
    private _isTimerOn;
    animateWillMount(_atX: number, _atY: number, _itemIndex: number): object | undefined;
    animateDidMount(_atX: number, _atY: number, _itemRef: object, _itemIndex: number): void;
    animateWillUpdate(_fromX: number, _fromY: number, _toX: number, _toY: number, _itemRef: object, _itemIndex: number): void;
    animateShift(fromX: number, fromY: number, toX: number, toY: number, itemRef: object, _itemIndex: number): boolean;
    animateWillUnmount(_atX: number, _atY: number, _itemRef: object, _itemIndex: number): void;
}
//# sourceMappingURL=DefaultWebItemAnimator.d.ts.map