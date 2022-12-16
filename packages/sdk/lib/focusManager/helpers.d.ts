import React from 'react';
import { ForbiddenFocusDirections } from './types';
import AbstractFocusModel from './model/AbstractFocusModel';
export declare function makeid(length: number): string;
export declare function flattenStyle(style: any): any;
export declare function getDirectionName(direction: string): string;
export declare function alterForbiddenFocusDirections(forbiddenFocusDirections?: ForbiddenFocusDirections[]): ForbiddenFocusDirections[];
export declare function getNextForcedFocusKey(cls: AbstractFocusModel, direction: string, focusMap: {
    [key: string]: AbstractFocusModel;
}): string | null;
export declare function useCombinedRefs(...refs: any): React.MutableRefObject<any>;
export declare function usePrevious(value: any): undefined;
//# sourceMappingURL=helpers.d.ts.map