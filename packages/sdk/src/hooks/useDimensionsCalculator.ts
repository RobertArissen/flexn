import { useState } from 'react';
import { Dimensions } from 'react-native';
import { Ratio } from '../helpers';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

interface Props {
    style: any;
    itemSpacing: number;
    itemDimensions: { height: number };
    itemsInViewport: number;
    ref: React.MutableRefObject<any>;
}

export default function useDimensionsCalculator({ style, itemSpacing, itemDimensions, itemsInViewport, ref }: Props) {
    const spacing = Ratio(itemSpacing);

    const [spacings] = useState(() => {
        return {
            left: spacing,
            top: spacing,
            paddingBottom: spacing,
            paddingRight: spacing,
        };
    });

    const [boundaries, setBoundaries] = useState(() => {
        let width = style.width || windowWidth;
        const height = style.height || windowHeight;

        if (style.borderWidth) {
            width -= style.borderWidth * 2;
        }
        if (style.marginVertical) {
            width -= style.marginVertical * 2;
        }
        if (style.marginLeft) {
            width -= style.marginLeft;
        }
        if (style.marginRight) {
            width -= style.marginRight;
        }

        return {
            width,
            height,
            relativeHeight: height,
        };
    });

    const calculateRowDimensions = (width: number) => {
        const itemHeight = Ratio(itemDimensions.height);
        const actualWidth = width - itemSpacing;

        return {
            layout: { width: actualWidth / itemsInViewport, height: itemHeight + spacing },
            item: { width: actualWidth / itemsInViewport - spacing, height: itemHeight },
        };
    };

    const [rowDimensions, setRowDimensions] = useState(calculateRowDimensions(boundaries.width));

    const onLayout = () => {
        ref.current.measure(
            (_fx: number, _fy: number, _width: number, _height: number, pageX: number, pageY: number) => {
                setRowDimensions(calculateRowDimensions(boundaries.width - pageX));
                setBoundaries((prev) => ({
                    width: prev.width - pageX,
                    relativeHeight: prev.height - pageY,
                    height: prev.height,
                }));
            }
        );
    };

    return {
        spacings,
        boundaries,
        rowDimensions,
        onLayout,
    };
}