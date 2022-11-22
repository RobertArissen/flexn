'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var react_native_1 = require('react-native');
var layoutManager_1 = require('../layoutManager');
var constants_1 = require('../constants');
var windowWidth = react_native_1.Dimensions.get('window').width;
var Scroller = /** @class */ (function () {
	function Scroller() {}
	Scroller.prototype.scroll = function (direction, contextParameters) {
		var _this = this;
		var currentFocus = contextParameters.currentFocus;
		if (
			!(currentFocus === null || currentFocus === void 0
				? void 0
				: currentFocus.getLayout())
		) {
			//eslint-disable-next-line
			console.warn('Current context were removed during scroll find');
			return;
		}

		if (currentFocus.getForbiddenFocusDirections().includes('scroll')) {
			return null;
		}

		var scrollContextParents = this.getParentScrollers(currentFocus);
		scrollContextParents.forEach(function (p) {
			var scrollTarget = p.isHorizontal()
				? _this.calculateHorizontalScrollViewTarget(
						direction,
						p,
						contextParameters
				  )
				: _this.calculateVerticalScrollViewTarget(
						direction,
						p,
						contextParameters
				  );
			if (scrollTarget) {
				if (
					p.getScrollOffsetX() !== scrollTarget.x ||
					p.getScrollOffsetY() !== scrollTarget.y
				) {
					p.node.current.scrollTo(scrollTarget);
				}
			}
		});
	};
	Scroller.prototype.scrollTo = function (cls, scrollTarget, direction) {
		var _a;
		var parentSW = cls.getParent();
		if (['up', 'down'].includes(direction) && parentSW.isNested()) {
			parentSW =
				(_a = cls.getParent()) === null || _a === void 0
					? void 0
					: _a.getParent();
		}
		if (scrollTarget) {
			if (
				parentSW.getScrollOffsetX() !== scrollTarget.x ||
				parentSW.getScrollOffsetY() !== scrollTarget.y
			) {
				parentSW.node.current.scrollTo(scrollTarget);
				parentSW
					.setScrollOffsetX(scrollTarget.x)
					.setScrollOffsetY(scrollTarget.y);
				(0, layoutManager_1.recalculateLayout)(cls);
			}
		}
	};
	Scroller.prototype.scrollRecycler = function (scrollTarget, scroller) {
		if (scrollTarget) {
			if (
				scroller.getScrollOffsetX() !== scrollTarget.x ||
				scroller.getScrollOffsetY() !== scrollTarget.y
			) {
				scroller.node.current.scrollTo(scrollTarget);
				scroller
					.setScrollOffsetX(scrollTarget.x)
					.setScrollOffsetY(scrollTarget.y);
				(0, layoutManager_1.recalculateLayout)(scroller);
			}
		}
	};
	Scroller.prototype.inlineScroll = function (direction, nextFocus) {
		var _this = this;
		var scrollContextParents = this.getParentScrollers(nextFocus);
		var contextParameters = {
			currentFocus: nextFocus,
		};
		scrollContextParents.forEach(function (p) {
			var scrollTarget = p.isHorizontal()
				? _this.calculateHorizontalScrollViewTarget(
						direction,
						p,
						contextParameters
				  )
				: _this.calculateVerticalScrollViewTarget(
						direction,
						p,
						contextParameters
				  );
			if (scrollTarget) {
				if (
					p.getScrollOffsetX() !== scrollTarget.x ||
					p.getScrollOffsetY() !== scrollTarget.y
				) {
					p.node.current.scrollTo(scrollTarget);
					p.setScrollOffsetX(scrollTarget.x).setScrollOffsetY(scrollTarget.y);
					(0, layoutManager_1.recalculateLayout)(nextFocus);
				}
			}
		});
	};
	Scroller.prototype.getParentScrollers = function (currentFocus) {
		var scrollContextParents = [];
		var parent =
			currentFocus === null || currentFocus === void 0
				? void 0
				: currentFocus.getParent();
		// We can only scroll 2 ScrollView at max. one Horz and Vert
		var directionsFilled = [];
		while (parent) {
			if (
				parent.isScrollable() &&
				!directionsFilled.includes(parent.isHorizontal())
			) {
				directionsFilled.push(parent.isHorizontal());
				scrollContextParents.push(parent);
			}
			parent =
				parent === null || parent === void 0 ? void 0 : parent.getParent();
		}
		return scrollContextParents;
	};
	Scroller.prototype.calculateHorizontalScrollViewTarget = function (
		direction,
		scrollView,
		contextParameters
	) {
		var _a, _b, _c, _d, _e;
		var currentFocus = contextParameters.currentFocus;
		var currentLayout = currentFocus.getLayout();
		var scrollTarget = {
			x: scrollView.getScrollOffsetX(),
			y: scrollView.getScrollOffsetY(),
		};
		var horizontalViewportOffset =
			(_b =
				(_a = currentFocus.getScreen()) === null || _a === void 0
					? void 0
					: _a.getHorizontalViewportOffset()) !== null && _b !== void 0
				? _b
				: constants_1.DEFAULT_VIEWPORT_OFFSET;
		var verticalViewportOffset =
			(_d =
				(_c = currentFocus.getScreen()) === null || _c === void 0
					? void 0
					: _c.getVerticalViewportOffset()) !== null && _d !== void 0
				? _d
				: constants_1.DEFAULT_VIEWPORT_OFFSET;
		// This will be executed if we have nested scroll view
		// and jumping between scroll views with buttons UP or DOWN
		if (constants_1.DIRECTION_VERTICAL.includes(direction)) {
			if (scrollView.getScrollOffsetX() > currentLayout.xMin) {
				scrollTarget.x = currentLayout.xMin - verticalViewportOffset;
			} else if (
				scrollView.getScrollOffsetX() + windowWidth <
				currentLayout.xMax
			) {
				scrollTarget.x = currentLayout.xMin - verticalViewportOffset;
			}
		}
		if (constants_1.DIRECTION_RIGHT.includes(direction)) {
			var xMaxScroll =
				scrollView.getLayout().xMaxScroll ||
				((_e = scrollView.getMostRightChildren().getLayout()) === null ||
				_e === void 0
					? void 0
					: _e.xMax) ||
				0;
			xMaxScroll += scrollView.getLayout().xMin || 0;
			//Prevent OVERSCROLL
			var targetX =
				currentLayout.xMin -
				scrollView.getLayout().xMin -
				horizontalViewportOffset +
				windowWidth;
			if (xMaxScroll >= targetX) {
				scrollTarget.x =
					currentLayout.xMin -
					scrollView.getLayout().xMin -
					horizontalViewportOffset;
			} else {
				scrollTarget.x = xMaxScroll + horizontalViewportOffset - windowWidth;
			}
		}
		if (constants_1.DIRECTION_LEFT.includes(direction)) {
			scrollTarget.x = Math.min(
				currentLayout.xMin -
					scrollView.getLayout().xMin -
					horizontalViewportOffset,
				scrollView.getScrollOffsetX()
			);
		}
		if (scrollTarget.x < 0) scrollTarget.x = 0;
		if (scrollTarget.y < 0) scrollTarget.y = 0;
		return scrollTarget;
	};
	Scroller.prototype.calculateVerticalScrollViewTarget = function (
		direction,
		scrollView,
		contextParameters
	) {
		var _a, _b, _c;
		var currentFocus = contextParameters.currentFocus;
		var scrollContentHeight = scrollView.getLayout().scrollContentHeight;
		var currentLayout = currentFocus.getLayout();
		var scrollTarget = {
			x: scrollView.getScrollOffsetX(),
			y: scrollView.getScrollOffsetY(),
		};
		var verticalViewportOffset =
			(_b =
				(_a = currentFocus.getScreen()) === null || _a === void 0
					? void 0
					: _a.getVerticalViewportOffset()) !== null && _b !== void 0
				? _b
				: constants_1.DEFAULT_VIEWPORT_OFFSET;
		var yMaxScroll =
			scrollView.getLayout().yMaxScroll ||
			((_c = scrollView.getMostBottomChildren().getLayout()) === null ||
			_c === void 0
				? void 0
				: _c.yMax) ||
			0;
		yMaxScroll += scrollView.getLayout().yMin || 0;
		var targetY =
			currentLayout.yMin -
			scrollView.getLayout().yMin -
			verticalViewportOffset +
			scrollContentHeight;
		if (constants_1.DIRECTION_UP.includes(direction)) {
			var innerViewMin = scrollView.getLayout().innerView.yMin;
			scrollTarget.y = Math.min(
				currentLayout.yMin -
					innerViewMin -
					verticalViewportOffset -
					scrollView.getLayout().yMin,
				scrollView.getScrollOffsetY()
			);
		} else {
			if (yMaxScroll >= targetY) {
				scrollTarget.y =
					currentLayout.yMin -
					scrollView.getLayout().yMin -
					verticalViewportOffset;
			} else {
				scrollTarget.y = yMaxScroll - scrollContentHeight;
			}
		}
		if (scrollTarget.x < 0) scrollTarget.x = 0;
		if (scrollTarget.y < 0) scrollTarget.y = 0;
		return scrollTarget;
	};
	return Scroller;
})();
exports.default = new Scroller();
//# sourceMappingURL=scroller.js.map
