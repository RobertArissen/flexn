declare class KeyHandler {
    private selectHandler;
    private eventEmitter;
    private _longPressInterval;
    private _stopKeyDownEvents;
    private _currentScrollTarget;
    private _currentIndex;
    private _maxIndex;
    constructor();
    removeListeners(): void;
    private enableKeyHandler;
    private enableSelectHandler;
    private handleKeyEvent;
    private onKeyDown;
    private onKeyLongPress;
    private onEnd;
    private onKeyUp;
    private getSelectedIndex;
    private getMaxIndex;
    private isInRecycler;
    private isHorizontal;
    private isNested;
    private getGridScrollInterval;
}
export default KeyHandler;
//# sourceMappingURL=keyHandler.d.ts.map