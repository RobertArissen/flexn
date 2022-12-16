import AbstractFocusModel from './AbstractFocusModel';
import Recycler from './recycler';
declare class Row extends Recycler {
    constructor(params: any);
    getType(): string;
    getLastFocused(): AbstractFocusModel;
    private getCurrentFocusIndex;
    getNextFocusable(direction: string): AbstractFocusModel | undefined | null;
    private _isInBounds;
    scrollToInitialRenderIndex(): void;
    getFocusTaskExecutor(direction: string): AbstractFocusModel | undefined;
}
export default Row;
//# sourceMappingURL=row.d.ts.map