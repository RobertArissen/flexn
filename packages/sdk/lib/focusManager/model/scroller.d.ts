import AbstractFocusModel from './AbstractFocusModel';
import Recycler from './recycler';
declare class Scroller {
    scroll(direction: string, contextParameters: any): null | undefined;
    scrollTo(cls: AbstractFocusModel, scrollTarget: {
        x: number;
        y: number;
    }, direction: string): void;
    scrollRecycler(scrollTarget: {
        x: number;
        y: number;
    }, scroller: Recycler): void;
    inlineScroll(direction: string, nextFocus: AbstractFocusModel): void;
    private getParentScrollers;
    private calculateHorizontalScrollViewTarget;
    private calculateVerticalScrollViewTarget;
}
declare const _default: Scroller;
export default _default;
//# sourceMappingURL=scroller.d.ts.map