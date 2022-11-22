export default class FocusManager {
    static _template(): {
        Items: {};
    };
    static _states(): {
        new (): {
            _construct(): void;
            _selectedIndex: any;
            _independentNavigation: boolean | undefined;
            direction: any;
            _direction: any;
            readonly Items: any;
            items: any;
            appendItems(items?: any[]): void;
            readonly selected: any;
            selectedIndex: any;
            prevSelected: any;
            setParentToItems(): void;
            render(): void;
            _firstFocusableIndex(): any;
            _lastFocusableIndex(): any;
            selectPrevious(): boolean;
            selectNext(): boolean;
            _getIndexOfItemNear(selected: any, prev: any): any;
            _getFocused(): any;
        };
        _template(): {
            Items: {};
        };
        _states(): any[];
    }[];
    _construct(): void;
    _selectedIndex: any;
    _independentNavigation: boolean | undefined;
    set direction(arg: any);
    get direction(): any;
    _direction: any;
    get Items(): any;
    set items(arg: any);
    get items(): any;
    appendItems(items?: any[]): void;
    get selected(): any;
    set selectedIndex(arg: any);
    get selectedIndex(): any;
    prevSelected: any;
    setParentToItems(): void;
    render(): void;
    _firstFocusableIndex(): any;
    _lastFocusableIndex(): any;
    selectPrevious(): boolean;
    selectNext(): boolean;
    _getIndexOfItemNear(selected: any, prev: any): any;
    _getFocused(): any;
}
//# sourceMappingURL=index.lng.d.ts.map