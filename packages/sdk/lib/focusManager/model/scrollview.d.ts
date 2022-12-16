import AbstractFocusModel from './AbstractFocusModel';
declare class ScrollView extends AbstractFocusModel {
    private _type;
    private _parent?;
    private _scrollOffsetX;
    private _scrollOffsetY;
    private _isHorizontal;
    constructor(params: any);
    getType(): string;
    setScrollOffsetX(value: number): this;
    getScrollOffsetX(): number;
    setScrollOffsetY(value: number): this;
    getScrollOffsetY(): number;
    isScrollable(): boolean;
    isFocusable(): boolean;
    isHorizontal(): boolean;
    getParent(): AbstractFocusModel | undefined;
    setRepeatContext(_value: any): this;
    getRepeatContext(): {
        parentContext: AbstractFocusModel;
        index: number;
    } | undefined;
}
export default ScrollView;
//# sourceMappingURL=scrollview.d.ts.map