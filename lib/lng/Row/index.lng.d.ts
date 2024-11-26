export default class Row {
    static _template(): any;
    _construct(): void;
    _smooth: boolean | undefined;
    _independentNavigation: any;
    _itemSpacing: any;
    _itemPosX: any;
    _itemPosY: any;
    _scrollIndex: any;
    _whenEnabled: Promise<any> | undefined;
    _firstEnable: ((value: any) => void) | undefined;
    debounceDelay: any;
    _update: any;
    _init(): void;
    w: any;
    get _itemTransition(): any;
    _focus(): void;
    _unfocus(): void;
    selectNext(): any;
    selectPrevious(): any;
    shouldScrollLeft(): boolean;
    shouldScrollRight(): boolean;
    get onScreenItems(): any;
    _isOnScreen(child: any): boolean;
    _isOnScreenCompletely(child: any): boolean;
    _shouldScroll(): any;
    _getLazyScrollX(prev: any): number | undefined;
    _getScrollX(): number | undefined;
    render(next: any, prev: any): void;
    _prevLastScrollIndex: number | undefined;
    _updateLayout(): void;
    _lastScrollIndex: number | undefined;
    set itemSpacing(arg: any);
    get itemSpacing(): any;
    set scrollIndex(arg: any);
    get scrollIndex(): any;
    set itemPosX(arg: any);
    get itemPosX(): any;
    set itemPosY(arg: any);
    get itemPosY(): any;
    get _itemsX(): any;
    set independentNavigation(arg: any);
    get independentNavigation(): any;
    appendItems(items?: any[]): void;
    $itemChanged(): void;
    onScreenEffect(): void;
}
//# sourceMappingURL=index.lng.d.ts.map