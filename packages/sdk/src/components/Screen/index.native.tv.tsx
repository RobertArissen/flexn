import React, { useEffect, useRef, useState } from 'react';
import { View as RNView } from 'react-native';
import { SCREEN_STATES, WINDOW_ALIGNMENT, DEFAULT_VIEWPORT_OFFSET } from '../../focusManager/constants';
import type { ScreenProps, Context } from '../../focusManager/types';
import { makeid, useCombinedRefs, alterForbiddenFocusDirections } from '../../focusManager/helpers';
import CoreManager from '../../focusManager/core';
import { measure } from '../../focusManager/layoutManager';

import { createInstance, ScreenCls } from '../../focusManager/Model/screen';

const Screen = React.forwardRef<any, ScreenProps>(
    (
        {
            children,
            style,
            screenState = SCREEN_STATES.FOREGROUND,
            screenOrder = 0,
            stealFocus = true,
            focusOptions = {},
            onFocus = () => {
                return null;
            },
            onBlur = () => {
                return null;
            },
            ...props
        },
        refOuter
    ) => {
        const refInner = useRef(null);
        const ref = useCombinedRefs(refOuter, refInner);
        const {
            focusKey,
            nextFocusRight,
            nextFocusLeft,
            verticalWindowAlignment = WINDOW_ALIGNMENT.LOW_EDGE,
            horizontalWindowAlignment = WINDOW_ALIGNMENT.LOW_EDGE,
            horizontalViewportOffset = DEFAULT_VIEWPORT_OFFSET,
            verticalViewportOffset = DEFAULT_VIEWPORT_OFFSET,
            forbiddenFocusDirections,
        }: any = focusOptions;

        const [ClsInstance] = useState<ScreenCls>(() =>
            createInstance({
                prevState: screenState,
                state: screenState,
                order: screenOrder,
                stealFocus,
                focusKey,
                verticalWindowAlignment,
                horizontalWindowAlignment,
                horizontalViewportOffset,
                verticalViewportOffset,
                forbiddenFocusDirections: alterForbiddenFocusDirections(forbiddenFocusDirections),
                nextFocusRight,
                nextFocusLeft,
                onFocus,
                onBlur,
            })
        );

        CoreManager.registerFocusable(ClsInstance);

        useEffect(() => {
            ClsInstance.setPrevState(ClsInstance.getState()).setState(screenState);
            if (ClsInstance.isPrevStateBackground() && ClsInstance.isInForeground()) {
                ClsInstance.setFocus(ClsInstance.getFirstFocusableOnScreen());
            }
        }, [screenState]);

        useEffect(
            () => () => {
                CoreManager.removeFocusable(ClsInstance);
            },
            []
        );

        const onLayout = () => {
            measure(ClsInstance, ref);
        };

        const childrenWithProps = React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, { parentContext: ClsInstance });
            }
            return child;
        });

        return (
            <RNView style={[{ flex: 1 }, style]} {...props} ref={ref} onLayout={onLayout}>
                {childrenWithProps}
            </RNView>
        );
    }
);

Screen.displayName = 'Screen';

export default Screen;
