"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distCalc = void 0;
var OVERLAP_THRESHOLD_PERCENTAGE = 20;
var OVERLAP_NEXT_VALUE = 10;
var nextOverlapValue = function (currentSize) {
    return (currentSize * OVERLAP_NEXT_VALUE) / 100;
};
var intersects = function (guideLine, sizeOfCurrent, startOfNext, endOfNext) {
    var a1 = guideLine - sizeOfCurrent * 0.5;
    var a2 = guideLine + sizeOfCurrent * 0.5;
    var c1 = a1 >= startOfNext && a1 <= endOfNext;
    var c2 = a2 >= startOfNext && a2 <= endOfNext;
    var c3 = a1 <= startOfNext && a2 >= endOfNext;
    if (c1) {
        var ixValue = ((endOfNext - a1) * 100) / sizeOfCurrent;
        return ixValue >= OVERLAP_THRESHOLD_PERCENTAGE;
    }
    if (c2) {
        var ixValue = ((a2 - startOfNext) * 100) / sizeOfCurrent;
        return ixValue >= OVERLAP_THRESHOLD_PERCENTAGE;
    }
    if (c3)
        return true;
    return false;
};
var euclideanDistance = function (current, next, direction) {
    var currentLayout = current.getLayout().absolute;
    var nextLayout = next.getLayout().absolute;
    var c1, c2, c3, c4, c5;
    if (direction === 'left' || direction === 'right') {
        c2 = Math.abs(currentLayout.yMin - nextLayout.yMin);
        c3 = Math.abs(currentLayout.yMax - nextLayout.yMin);
        c4 = Math.abs(nextLayout.yMin - currentLayout.yMax);
        c5 = Math.abs(currentLayout.yMax - nextLayout.yMax);
    }
    else {
        c2 = Math.abs(currentLayout.xMin - nextLayout.xMin);
        c3 = Math.abs(currentLayout.xMax - nextLayout.xMin);
        c4 = Math.abs(nextLayout.xMin - currentLayout.xMax);
        c5 = Math.abs(currentLayout.xMax - nextLayout.xMax);
    }
    switch (direction) {
        case 'left':
            c1 = Math.abs(currentLayout.xMin - nextLayout.xMax);
            break;
        case 'right':
            c1 = Math.abs(nextLayout.xMin - currentLayout.xMax);
            break;
        case 'down':
            c1 = Math.abs(nextLayout.yMin - currentLayout.yMax);
            break;
        case 'up':
            c1 = Math.abs(currentLayout.yMin - nextLayout.yMax);
            break;
        default:
            c1 = 0;
            break;
    }
    return Math.min(Math.sqrt(Math.pow(c1, 2) + Math.pow(c2, 2)), Math.sqrt(Math.pow(c1, 2) + Math.pow(c3, 2)), Math.sqrt(Math.pow(c1, 2) + Math.pow(c4, 2)), Math.sqrt(Math.pow(c1, 2) + Math.pow(c5, 2)));
};
var closestDist = function (current, next, direction) {
    var currentLayout = current.getLayout().absolute;
    var nextLayout = next.getLayout().absolute;
    switch (direction) {
        case 'up': {
            if (currentLayout.yMin >= nextLayout.yMax - nextOverlapValue(next.getLayout().height)) {
                var isIntersects = intersects(currentLayout.xCenter, current.getLayout().width, nextLayout.xMin, nextLayout.xMax);
                if (isIntersects) {
                    return ['p1', euclideanDistance(current, next, 'up')];
                }
                return ['p2', euclideanDistance(current, next, 'up')];
            }
            break;
        }
        case 'down': {
            if (currentLayout.yMin + nextOverlapValue(current.getLayout().height) <= nextLayout.yMin) {
                var isIntersects = intersects(currentLayout.xCenter, current.getLayout().width, nextLayout.xMin, nextLayout.xMax);
                if (isIntersects) {
                    return ['p1', euclideanDistance(current, next, 'down')];
                }
                return ['p2', euclideanDistance(current, next, 'down')];
            }
            break;
        }
        case 'left': {
            if (currentLayout.xMin >= nextLayout.xMax - nextOverlapValue(next.getLayout().width)) {
                var isIntersects = intersects(currentLayout.yCenter, current.getLayout().height, nextLayout.yMin, nextLayout.yMax);
                if (isIntersects) {
                    return ['p1', euclideanDistance(current, next, 'left')];
                }
                return ['p2', euclideanDistance(current, next, 'left')];
            }
            break;
        }
        case 'right': {
            if (currentLayout.xMax <= nextLayout.xMin + nextOverlapValue(next.getLayout().width)) {
                var isIntersects = intersects(currentLayout.yCenter, current.getLayout().height, nextLayout.yMin, nextLayout.yMax);
                if (isIntersects) {
                    return ['p1', euclideanDistance(current, next, 'right')];
                }
                return ['p2', euclideanDistance(current, next, 'right')];
            }
            break;
        }
        default:
            break;
    }
    return ['', 0];
};
var distCalc = function (output, direction, current, next) {
    var _a = closestDist(current, next, direction), priority = _a[0], dist = _a[1];
    switch (priority) {
        case 'p1':
            {
                if (dist !== undefined && output.match1 >= dist) {
                    output.match1 = dist;
                    output.match1Context = next;
                    // console.log('FOUND', dist, priority, current.getId(), next.getId());
                }
            }
            break;
        case 'p2':
            {
                if (dist !== undefined && output.match2 >= dist) {
                    output.match2 = dist;
                    output.match2Context = next;
                    // console.log('FOUND', dist, priority, current.getId(), next.getId());
                }
            }
            break;
        default:
            break;
    }
};
exports.distCalc = distCalc;
//# sourceMappingURL=nextFocusFinder.js.map