export default class List {
    static _template(): {
        List: {
            type: typeof Column;
            itemSpacing: number;
            items: never[];
        };
    };
    _construct(): void;
    _whenEnabled: Promise<any> | undefined;
    _enable: ((value: any) => void) | undefined;
    get _List(): any;
    set w(arg: any);
    get w(): any;
    _w: any;
    set h(arg: any);
    get h(): any;
    _h: any;
    set data(arg: any);
    get data(): any;
    _data: any;
    set card(arg: any);
    get card(): any;
    _card: any;
    set row(arg: any);
    get row(): any;
    _row: any;
    set focusOptions(arg: any);
    get focusOptions(): any;
    _focusOptions: any;
    set itemSpacing(arg: any);
    get itemSpacing(): any;
    _itemSpacing: any;
    set lazyScroll(arg: any);
    get lazyScroll(): any;
    _lazyScroll: any;
    $onCardPress(eventValue: any): void;
    $onCardFocus(eventValue: any): void;
    $onCardBlur(eventValue: any): void;
    _getFocused(): any;
}
import Column from "../../lng/Column/index.lng";
//# sourceMappingURL=index.lng.d.ts.map