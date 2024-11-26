export default class Card {
    static _template(): {
        rect: boolean;
        Image: {
            rtt: boolean;
            h: number;
            w: number;
            shader: {
                type: any;
            };
            resizeMode: string;
        };
        Text: {
            y: number;
            w: (w: any) => number;
            text: {
                fontSize: number;
                maxLinesSuffix: string;
                maxLines: number;
                textColor: number;
                text: string;
            };
        };
    };
    _construct(): void;
    _whenEnabled: Promise<any> | undefined;
    _enable: ((value: any) => void) | undefined;
    _animator: {
        focus: {
            smooth: {
                scale: any;
            };
            shader?: undefined;
        } | {
            smooth: {
                scale: any;
            };
            shader: {
                strokeColor: any;
                stroke: any;
                radius: any;
            };
        } | {
            shader: {
                strokeColor: any;
                stroke: any;
                radius: any;
            };
            smooth?: undefined;
        } | {
            smooth: {
                scale: number;
            };
            shader?: undefined;
        };
        unfocus: {
            smooth: {
                scale: number;
            };
            shader?: undefined;
        } | {
            shader: {
                stroke: number;
            };
            smooth: {
                scale: number;
            };
        } | {
            shader: {
                stroke: number;
            };
            smooth?: undefined;
        } | {
            smooth: {
                scale: number;
            };
            shader?: undefined;
        };
    } | null | undefined;
    get _Image(): any;
    get _Text(): any;
    set w(arg: any);
    get w(): any;
    _w: any;
    set h(arg: any);
    get h(): any;
    _h: any;
    set src(arg: any);
    get src(): any;
    _src: any;
    set title(arg: any);
    get title(): any;
    _title: any;
    set focusOptions(arg: any);
    get focusOptions(): any;
    _focusOptions: any;
    set eventValue(arg: any);
    get eventValue(): any;
    _eventValue: any;
    set borderColor(arg: any);
    get borderColor(): any;
    _borderColor: any;
    set borderWidth(arg: any);
    get borderWidth(): any;
    _borderWidth: any;
    set borderRadius(arg: any);
    get borderRadius(): any;
    _borderRadius: any;
    set fontSize(arg: any);
    get fontSize(): any;
    _fontSize: any;
    set fontColor(arg: any);
    get fontColor(): any;
    _fontColor: any;
    _setAnimationValues(): {
        focus: {
            smooth: {
                scale: any;
            };
            shader?: undefined;
        } | {
            smooth: {
                scale: any;
            };
            shader: {
                strokeColor: any;
                stroke: any;
                radius: any;
            };
        } | {
            shader: {
                strokeColor: any;
                stroke: any;
                radius: any;
            };
            smooth?: undefined;
        } | {
            smooth: {
                scale: number;
            };
            shader?: undefined;
        };
        unfocus: {
            smooth: {
                scale: number;
            };
            shader?: undefined;
        } | {
            shader: {
                stroke: number;
            };
            smooth: {
                scale: number;
            };
        } | {
            shader: {
                stroke: number;
            };
            smooth?: undefined;
        } | {
            smooth: {
                scale: number;
            };
            shader?: undefined;
        };
    };
    _handleEnter(): void;
    _focus(): void;
    _unfocus(): void;
}
//# sourceMappingURL=index.lng.d.ts.map