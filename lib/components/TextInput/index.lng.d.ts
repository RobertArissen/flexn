export default class TextInput {
    static _template(): {
        rect: boolean;
        Input: {
            w: number;
            h: number;
            clipping: boolean;
            texture: any;
            Caret: {
                text: {
                    textColor: number;
                    maxLines: number;
                    verticalAlign: string;
                    textOverflow: string;
                    paddingRight: number;
                    paddingLeft: number;
                    wordWrap: boolean;
                    fontSize: number;
                    lineHeight: number;
                    text: string;
                };
            };
            Text: {
                text: {
                    textColor: number;
                    maxLines: number;
                    verticalAlign: string;
                    textOverflow: string;
                    paddingRight: number;
                    paddingLeft: number;
                    wordWrap: boolean;
                    fontSize: number;
                    lineHeight: number;
                    text: string;
                };
            };
        };
        Keyboard: {
            type: {};
            visible: boolean;
            formats: any;
        };
    };
    static _states(): {
        new (): {
            _construct(): void;
            isKeyboardOpen: any;
            isTyping: boolean | undefined;
            caretOffset: number | undefined;
            onType: import("lodash").DebouncedFunc<() => void> | undefined;
            interval: any;
            _init(): void;
            _inactive(): void;
            readonly value: any;
            input: any;
            keyboard: any;
            _keyboard: any;
            onTypeDebounced(): void;
            $onSoftKey({ key }: {
                key: any;
            }): void;
            _toggleKeyboard(shouldOpen: any): void;
            _setVirtualCaret(showCaret: any): void;
            _focus(): void;
            _unfocus(): void;
            _handleEnter(): void;
            _getFocused(): any;
        };
        _template(): {
            rect: boolean;
            Input: {
                w: number;
                h: number;
                clipping: boolean;
                texture: any;
                Caret: {
                    text: {
                        textColor: number;
                        maxLines: number;
                        verticalAlign: string;
                        textOverflow: string;
                        paddingRight: number;
                        paddingLeft: number;
                        wordWrap: boolean;
                        fontSize: number;
                        lineHeight: number;
                        text: string;
                    };
                };
                Text: {
                    text: {
                        textColor: number;
                        maxLines: number;
                        verticalAlign: string;
                        textOverflow: string;
                        paddingRight: number;
                        paddingLeft: number;
                        wordWrap: boolean;
                        fontSize: number;
                        lineHeight: number;
                        text: string;
                    };
                };
            };
            Keyboard: {
                type: {};
                visible: boolean;
                formats: any;
            };
        };
        _states(): any[];
    }[];
    _construct(): void;
    isKeyboardOpen: any;
    isTyping: boolean | undefined;
    caretOffset: number | undefined;
    onType: import("lodash").DebouncedFunc<() => void> | undefined;
    interval: any;
    _init(): void;
    _inactive(): void;
    get value(): any;
    set input(arg: any);
    set keyboard(arg: any);
    get keyboard(): any;
    _keyboard: any;
    onTypeDebounced(): void;
    $onSoftKey({ key }: {
        key: any;
    }): void;
    _toggleKeyboard(shouldOpen: any): void;
    _setVirtualCaret(showCaret: any): void;
    _focus(): void;
    _unfocus(): void;
    _handleEnter(): void;
    _getFocused(): any;
}
//# sourceMappingURL=index.lng.d.ts.map