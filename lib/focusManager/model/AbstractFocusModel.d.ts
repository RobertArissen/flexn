import { Screen, ScreenStates } from '../types';
export declare const STATE_BACKGROUND: ScreenStates;
export default abstract class AbstractFocusModel {
    protected _layout: any;
    protected _id: string;
    protected _children: AbstractFocusModel[];
    protected _screen: Screen | undefined;
    protected _nextFocusRight: string | string[];
    protected _nextFocusLeft: string | string[];
    protected _nextFocusUp: string | string[];
    protected _nextFocusDown: string | string[];
    constructor(params: any);
    nodeId?: number | null;
    node?: any;
    abstract getType(): string;
    abstract getParent(): AbstractFocusModel | undefined;
    abstract getRepeatContext(): {
        parentContext: AbstractFocusModel;
        index: number;
    } | undefined;
    abstract setRepeatContext(rp: AbstractFocusModel): this;
    getScreen(): Screen | undefined;
    getId(): string;
    setLayout(layout: any): this;
    updateLayoutProperty(prop: string, value: any): this;
    getLayout(): any;
    addChildren(cls: AbstractFocusModel): this;
    removeChildren(index: number): this;
    removeChildrenFromParent(): this;
    getChildren(): AbstractFocusModel[];
    getMostBottomChildren(): AbstractFocusModel;
    getMostRightChildren(): AbstractFocusModel;
    recalculateChildrenLayouts(ch: AbstractFocusModel): void;
    remeasureChildrenLayouts(ch: AbstractFocusModel): void;
    getNextFocusRight(): string | string[];
    getNextFocusLeft(): string | string[];
    getNextFocusUp(): string | string[];
    getNextFocusDown(): string | string[];
    getLayouts(): any;
    isScrollable(): boolean;
    setScrollOffsetX(_value: number): this;
    getScrollOffsetX(): number;
    getScrollOffsetY(): number;
    setScrollOffsetY(_value: number): this;
    setIsFocused(_isFocused: boolean): this;
    getIsFocused(): boolean;
    isFocusable(): boolean;
    getForbiddenFocusDirections(): string[];
    isHorizontal(): boolean;
    isRecyclable(): boolean;
    isNested(): boolean;
    onFocus(): void;
    onBlur(): void;
    onPress(): void;
    getState(): string;
    isInForeground(): boolean;
    isInBackground(): boolean;
    containsForbiddenDirection(direction: string): boolean;
    setFocus(_cls?: AbstractFocusModel): void;
    getOrder(): number;
    isScreen(): boolean;
    getFocusKey(): string;
    getNextFocusable(_direction: string): AbstractFocusModel | undefined | null;
    getFocusTaskExecutor(direction: string): AbstractFocusModel | undefined | null;
}
//# sourceMappingURL=AbstractFocusModel.d.ts.map