import Recycler from './recycler';
import Row from './row';
import AbstractFocusModel from './AbstractFocusModel';
declare class List extends Recycler {
    constructor(params: any);
    getType(): string;
    getRows(): Row[];
    private getCurrentFocusIndex;
    getNextFocusable(direction: string): AbstractFocusModel | undefined | null;
    private _isInBounds;
    scrollToInitialRenderIndex(): void;
    getFocusTaskExecutor(_direction: string): AbstractFocusModel;
}
export default List;
//# sourceMappingURL=list.d.ts.map