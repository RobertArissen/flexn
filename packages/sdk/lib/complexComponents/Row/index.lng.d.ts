export default class Row {
    static _template(): {
        h: number;
        Title: {};
        Row: {
            type: typeof LngRow;
            itemSpacing: number;
            items: never[];
        };
    };
    _construct(): void;
    _whenEnabled: Promise<any> | undefined;
    _enable: ((value: any) => void) | undefined;
    _itemsInViewport: any;
    _init(): void;
    get _Row(): any;
    set title(arg: any);
    get title(): any;
    _title: any;
    set independentNavigation(arg: any);
    get independentNavigation(): any;
    _independentNavigation: any;
    set w(arg: any);
    get w(): any;
    _w: any;
    set h(arg: any);
    get h(): any;
    _h: any;
    set data(arg: any);
    get data(): any;
    _data: any;
    set itemsInViewport(arg: any);
    get itemsInViewport(): any;
    set row(arg: any);
    get row(): any;
    set card(arg: any);
    get card(): any;
    _card: any;
    set focusOptions(arg: any);
    get focusOptions(): any;
    _focusOptions: any;
    set itemSpacing(arg: any);
    get itemSpacing(): any;
    _itemSpacing: any;
    set lazyScroll(arg: any);
    _calculateCardWidth(): void;
    $onCardPress(eventValue: any): void;
    $onCardFocus(eventValue: any): void;
    $onCardBlur(eventValue: any): void;
    _getFocused(): any;
}
import LngRow from "../../lng/Row/index.lng";
//# sourceMappingURL=index.lng.d.ts.map