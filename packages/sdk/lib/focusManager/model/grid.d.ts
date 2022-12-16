import Recycler from './recycler';
import AbstractFocusModel from './AbstractFocusModel';
declare class Grid extends Recycler {
    private _itemsInRow;
    constructor(params: any);
    getType(): string;
    private getCurrentFocusIndex;
    private getCurrentRow;
    private getMaxRows;
    getNextFocusable(direction: string): AbstractFocusModel | undefined | null;
    private _isInBounds;
    getItemsInRow(): number;
    scrollToInitialRenderIndex(): void;
    getFocusTaskExecutor(_direction: string): AbstractFocusModel;
}
export default Grid;
//# sourceMappingURL=grid.d.ts.map