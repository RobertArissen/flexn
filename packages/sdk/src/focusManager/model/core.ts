import { findNodeHandle, UIManager } from 'react-native';
import { distCalc } from '../nextFocusFinder';
import { getNextForcedFocusKey } from '../helpers';
import { recalculateLayout } from '../layoutManager';
import AbstractFocusModel from './AbstractFocusModel';
import Scroller from './scroller';
import View from './view';
import Recycler from './recycler';
import Screen from './screen';
import Logger from './logger';
class CoreManager {
    public _focusMap: {
        [key: string]: AbstractFocusModel;
    };

    public _currentFocus: AbstractFocusModel | null;

    private _debuggerEnabled: boolean;

    private _hasPendingUpdateGuideLines: boolean;

    private _guideLineY: number;

    private _guideLineX: number;

    private _hasPendingIndex: boolean;

    constructor() {
        this._focusMap = {};

        this._currentFocus = null;

        this._debuggerEnabled = false;
        this._hasPendingUpdateGuideLines = false;
        this._guideLineY = 0;
        this._guideLineX = 0;

        this._hasPendingIndex = false;
    }

    public registerFocusable(cls: AbstractFocusModel, node?: any) {
        if (this._focusMap[cls.getId()]) {
            return;
        }
        if (node) {
            const nodeId = findNodeHandle(node.current);
            cls.nodeId = nodeId;
            cls.node = node;
        }

        this._focusMap[cls.getId()] = cls;

        Object.keys(this._focusMap).forEach((k) => {
            const v = this._focusMap[k];

            // Register as parent for children
            if (v.getParent() && v.getParent()?.getId() === cls.getId()) {
                cls.addChildren(v);
            }
            // Register as child in parent
            if (cls.getParent() && cls.getParent()?.getId() === v.getId()) {
                v.addChildren(cls);
            }
        });
    }

    public removeFocusable(cls: AbstractFocusModel) {
        cls.removeChildrenFromParent();
        delete this._focusMap[cls.getId()];
        if (cls.getId() === this._currentFocus?.getId()) {
            this._currentFocus = null;
        }
    }

    public executeFocus(cls: AbstractFocusModel) {
        if (cls.getId() === this._currentFocus?.getId()) {
            return;
        }

        if (this._currentFocus) {
            // @ts-ignore
            UIManager.dispatchViewManagerCommand(this._currentFocus.nodeId, 'cmdBlur', null);
            this._currentFocus.onBlur();
            this._currentFocus.setIsFocused(false);
        }

        this._currentFocus = cls;
        // @ts-ignore
        UIManager.dispatchViewManagerCommand(cls.nodeId, 'cmdFocus', null);
        cls.onFocus();
        cls.setIsFocused(true);
        cls.setFocus();
        if (cls.getScreen()) {
            cls.getScreen()?.setCurrentFocus(cls as View);
        }
    }

    public executeDirectionalFocus(direction: string) {
        const parent = this._currentFocus;
        if (parent) {
            const output: {
                match1: number;
                match1Context?: AbstractFocusModel;
                match2: number;
                match2Context?: AbstractFocusModel;
                match3: number;
                match3Context?: AbstractFocusModel;
            } = {
                match1: 999999,
                match2: 9999999,
                match3: 9999999,
            };
            const next = this.getNextFocusableContext(direction, output);
            if (next) this.executeFocus(next);
        }
    }

    public executeInlineFocus(nextIndex = 0, direction: string) {
        let target: any;
        const parent = this._currentFocus?.getParent();
        if (parent?.isRecyclable() && this._currentFocus) {
            if (['up', 'down'].includes(direction)) {
                const layouts = parent?.isNested() ? parent.getParent()?.getLayouts() : parent?.getLayouts();
                const nextLayout = layouts[nextIndex];
                if (nextLayout) {
                    target = {
                        x: 0,
                        y: nextLayout.y,
                    };
                }
            } else if (['left', 'right'].includes(direction)) {
                const layouts = parent?.getLayouts();
                const nextLayout = layouts[nextIndex];
                if (nextLayout) {
                    target = {
                        x: nextLayout.x,
                        y: nextLayout.y,
                    };
                }
            }

            if (target) {
                Scroller.scrollTo(this._currentFocus, target, direction);
            }
        }
    }

    public executeScroll(direction = '') {
        const contextParameters = {
            currentFocus: this._currentFocus,
            focusMap: this._focusMap,
            isDebuggerEnabled: this._debuggerEnabled,
        };
        Scroller.scroll(direction, contextParameters);
    }

    public executeUpdateGuideLines() {
        if (!this._currentFocus?.getLayout()) {
            this._hasPendingUpdateGuideLines = true;
            return;
        }

        if (this._guideLineX !== this._currentFocus.getLayout().absolute.xCenter) {
            this._guideLineX = this._currentFocus.getLayout().absolute.xCenter;
        }
        if (this._guideLineY !== this._currentFocus.getLayout().absolute.yCenter) {
            this._guideLineY = this._currentFocus.getLayout().absolute.yCenter;
        }
        this._hasPendingUpdateGuideLines = false;
    }

    public focusElementByFocusKey = (focusKey: string) => {
        const element: AbstractFocusModel | undefined = Object.values(this._focusMap).find(
            (cls) => cls.getFocusKey() === focusKey && cls.isInForeground()
        );

        if (element) {
            if (element.isScreen()) {
                element.setFocus((element as Screen).getFirstFocusableOnScreen());
            } else {
                element.setFocus();
            }
        }
    };

    public getNextFocusableContext = (direction: string, output: any): AbstractFocusModel | undefined | null => {
        const currentFocus = this._currentFocus;
        const focusMap = this._focusMap;

        if (!currentFocus) {
            return focusMap[Object.keys(focusMap)[0]];
        }

        const nextForcedFocusKey = getNextForcedFocusKey(currentFocus, direction, this._focusMap);
        if (nextForcedFocusKey) {
            this.focusElementByFocusKey(nextForcedFocusKey);
            return;
        }

        if (currentFocus.containsForbiddenDirection(direction)) {
            return currentFocus;
        }

        // This can happen if we opened new screen which doesn't have any focusable
        // then last screen in context map still keeping focus
        if (currentFocus?.getScreen()?.isInBackground()) {
            return currentFocus;
        }

        const candidates = Object.values(focusMap).filter(
            (c) => c.getScreen()?.isInForeground() && c.isFocusable() && c.getId() !== currentFocus.getId()
        );

        for (let i = 0; i < candidates.length; i++) {
            const cls = candidates[i];

            this.findClosestNode(cls, direction, output);
        }

        const closestContext: AbstractFocusModel | undefined =
            output.match1Context || output.match2Context || output.match3Context;

        if (closestContext) {
            if (currentFocus.getParent()?.isRecyclable()) {
                const parent = currentFocus.getParent() as Recycler;

                const d1 = parent.isHorizontal() ? ['right', 'swipeRight'] : ['down', 'swipeDown'];
                const d2 = parent.isHorizontal() ? ['left', 'swipeLeft'] : ['up', 'swipeUp'];
                const lastIsVisible = d1.includes(direction) ? parent.isLastVisible?.() : true;
                const firstIsVisible = d2.includes(direction) ? parent.isFirstVisible?.() : true;
                if (!lastIsVisible || !firstIsVisible) {
                    if (closestContext.getParent()?.getId() !== parent.getId()) {
                        return currentFocus;
                    }
                }
            }

            if (closestContext.getParent()?.getId() !== currentFocus.getParent()?.getId()) {
                const parent = currentFocus.getParent() as AbstractFocusModel;

                const nextForcedFocusKey = getNextForcedFocusKey(parent, direction, this._focusMap);
                if (nextForcedFocusKey) {
                    this.focusElementByFocusKey(nextForcedFocusKey);
                    return;
                }

                if (parent.containsForbiddenDirection(direction)) {
                    return currentFocus;
                }
            }

            if (closestContext.getScreen()?.getId() !== currentFocus.getScreen()?.getId()) {
                currentFocus.getScreen()?.onBlur?.();
                closestContext.getScreen()?.onFocus?.();
            }

            return closestContext;
        }

        if (this._currentFocus?.getParent()) {
            const parent = this._currentFocus?.getParent() as AbstractFocusModel;
            const _nextForcedFocusKey = getNextForcedFocusKey(parent, direction, this._focusMap);
            if (_nextForcedFocusKey) {
                this.focusElementByFocusKey(_nextForcedFocusKey);
                return;
            }

            if (parent.containsForbiddenDirection(direction)) {
                return currentFocus;
            }
        }

        return this._currentFocus;
    };

    public recalculateActiveLayouts() {
        Object.values(this._focusMap).forEach((ch) => {
            if (ch.isInForeground()) {
                recalculateLayout(ch);
            }
        });
    }

    public findClosestNode = (cls: AbstractFocusModel, direction: string, output: any) => {
        recalculateLayout(cls);
        const nextLayout = cls.getLayout();
        const currentLayout = this._currentFocus?.getLayout();
        if (!nextLayout) {
            // eslint-disable-next-line
            // Logger.getInstance().warn('LAYOUT OF FOCUSABLE IS NOT MEASURED YET');
            // console.log('LAYOUT OF FOCUSABLE IS NOT MEASURED YET');
            return;
        }
        if (!currentLayout) {
            // eslint-disable-next-line
            Logger.getInstance().warn('Current context were removed during focus find');
            return;
        }

        switch (direction) {
            case 'swipeLeft':
            case 'left': {
                distCalc(output, 'left', this._currentFocus as AbstractFocusModel, cls);
                break;
            }
            case 'swipeRight':
            case 'right': {
                distCalc(
                    output, //
                    'right',
                    this._currentFocus as AbstractFocusModel,
                    cls
                );
                break;
            }
            case 'swipeUp':
            case 'up': {
                distCalc(output, 'up', this._currentFocus as AbstractFocusModel, cls);
                break;
            }
            case 'swipeDown':
            case 'down': {
                distCalc(output, 'down', this._currentFocus as AbstractFocusModel, cls);
                break;
            }
            default: {
                // Booo
            }
        }

        // if (this._currentFocus?.getParent()?.isRecyclable()) {
        //     const parent = this._currentFocus.getParent() as Recycler;
        //     if (parent.isNested()) {
        //         const d1 = ['down', 'swipeDown'];
        //         const d2 = ['up', 'swipeUp'];
        //         if (parent?.getParent()?.isRecyclable()) {
        //             const parentOfParent = parent.getParent() as Recycler;
        //             const lastIsVisible = d1.includes(direction) ? parentOfParent.isLastVisible?.() : true;
        //             const firstIsVisible = d2.includes(direction) ? parentOfParent.isFirstVisible?.() : true;

        //             if (!lastIsVisible || !firstIsVisible) {
        //                 const closestContext: AbstractFocusModel =
        //                     output.match1Context || output.match2Context || output.match3Context;
        //                 if (closestContext && !closestContext?.getParent()?.isRecyclable()) {
        //                     output.match1Context = this._currentFocus;
        //                 }
        //             }
        //         }
        //     }
        // }
    };

    public get isDebuggerEnabled(): boolean {
        return this._debuggerEnabled;
    }

    public set debuggerEnabled(enabled: boolean) {
        this._debuggerEnabled = enabled;
    }

    public get hasPendingUpdateGuideLines(): boolean {
        return this._hasPendingUpdateGuideLines;
    }

    public get guideLineY(): number {
        return this._guideLineY;
    }

    public get guideLineX(): number {
        return this._guideLineX;
    }

    public getCurrentFocus(): AbstractFocusModel | null {
        return this._currentFocus;
    }

    public getFocusMap(): { [key: string]: AbstractFocusModel } {
        return this._focusMap;
    }
}

const CoreManagerInstance = new CoreManager();

Logger.getInstance(CoreManagerInstance);

export default CoreManagerInstance;
