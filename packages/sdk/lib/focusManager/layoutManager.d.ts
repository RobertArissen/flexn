import AbstractFocusModel from './model/AbstractFocusModel';
export declare function findLowestRelativeCoordinates(cls: AbstractFocusModel): void;
declare function recalculateLayout(cls: AbstractFocusModel): void;
declare function measure(cls: AbstractFocusModel, ref: any, unmeasurableRelatives?: {
    x: number;
    y: number;
}, callback?: () => void): void;
export { measure, recalculateLayout };
//# sourceMappingURL=layoutManager.d.ts.map