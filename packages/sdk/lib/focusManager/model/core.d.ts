import { AbstractFocusModel } from '../types';
declare class CoreManager {
    _focusMap: {
        [key: string]: AbstractFocusModel;
    };
    _currentFocus: AbstractFocusModel | null;
    private _debuggerEnabled;
    private _hasPendingUpdateGuideLines;
    private _guideLineY;
    private _guideLineX;
    constructor();
    registerFocusable(cls: AbstractFocusModel, node?: any): void;
    removeFocusable(cls: AbstractFocusModel): void;
    onScreenRemoved(): void;
    executeFocus(cls: AbstractFocusModel): void;
    executeDirectionalFocus(direction: string): void;
    executeInlineFocus(nextIndex: number | undefined, direction: string): any;
    executeScroll(direction?: string): void;
    executeUpdateGuideLines(): void;
    focusElementByFocusKey: (focusKey: string) => void;
    getNextFocusableContext: (direction: string, ownCandidates?: AbstractFocusModel[], findFocusInParent?: boolean) => AbstractFocusModel | undefined | null;
    getCurrentMaxOrder(): number;
    findClosestNode: (cls: AbstractFocusModel, direction: string, output: any) => void;
    get isDebuggerEnabled(): boolean;
    set debuggerEnabled(enabled: boolean);
    get hasPendingUpdateGuideLines(): boolean;
    get guideLineY(): number;
    get guideLineX(): number;
    getCurrentFocus(): AbstractFocusModel | null;
    getFocusMap(): {
        [key: string]: AbstractFocusModel;
    };
}
declare const CoreManagerInstance: CoreManager;
export default CoreManagerInstance;
//# sourceMappingURL=core.d.ts.map