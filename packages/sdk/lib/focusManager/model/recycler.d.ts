import { ForbiddenFocusDirections } from '../types';

import AbstractFocusModel from './AbstractFocusModel';
import View from './view';
declare class Recycler extends AbstractFocusModel {
    protected _type: string;
    private _parent?;
    private _layouts;
    private _scrollOffsetX;
    private _scrollOffsetY;
    private _isNested;
    private _isHorizontal;
    private _forbiddenFocusDirections;
    private _focusedIndex;
    private _initialRenderIndex;
    private _focusedView?;
    private _repeatContext;
    private _onFocus?;
    private _onBlur?;
    constructor(params: any);
    getType(): string;
    isFocusable(): boolean;
    getLayouts(): [];
    setLayouts(layouts: any): this;
    isScrollable(): boolean;
    isRecyclable(): boolean;
    isNested(): boolean;
    isHorizontal(): boolean;
    setScrollOffsetX(value: number): this;
    getScrollOffsetX(): number;
    setScrollOffsetY(value: number): this;
    getScrollOffsetY(): number;
    getParent(): AbstractFocusModel | undefined;
    setRepeatContext(value: any): this;
    getRepeatContext(): {
        parentContext: AbstractFocusModel;
        index: number;
    } | undefined;
    getForbiddenFocusDirections(): ForbiddenFocusDirections[];
    setFocusedIndex(index: number): this;
    getFocusedIndex(): number;
    setFocusedView(view?: View): this;
    getInitialRenderIndex(): number;
    getFocusedView(): View | undefined;
    onFocus(): void;
    onBlur(): void;
}
export default Recycler;
//# sourceMappingURL=recycler.d.ts.map