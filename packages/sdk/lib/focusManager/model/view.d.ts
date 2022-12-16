import AbstractFocusModel from './AbstractFocusModel';
import { ForbiddenFocusDirections } from '../types';
declare class View extends AbstractFocusModel {
    private _type;
    private _parent?;
    private _isFocused;
    private _forbiddenFocusDirections;
    private _focusKey;
    private _hasPreferredFocus;
    private _repeatContext;
    private _onFocus?;
    private _onBlur?;
    private _onPress?;
    constructor(params: any);
    private init;
    getType(): string;
    isFocusable(): boolean;
    updateEvents({ onPress, onFocus, onBlur, nextFocusRight, nextFocusLeft, nextFocusUp, nextFocusDown }: any): this;
    setFocus(): void;
    onFocus(): void;
    onBlur(): void;
    onPress(): void;
    setIsFocused(value: boolean): this;
    getIsFocused(): boolean;
    setRepeatContext(value: any): this;
    getRepeatContext(): {
        parentContext: AbstractFocusModel;
        index: number;
    } | undefined;
    getParent(): AbstractFocusModel | undefined;
    getFocusKey(): string;
    getForbiddenFocusDirections(): ForbiddenFocusDirections[];
    hasPreferredFocus(): boolean;
}
export default View;
//# sourceMappingURL=view.d.ts.map