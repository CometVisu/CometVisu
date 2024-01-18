(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.module.Animation": {
        "require": true
      },
      "qx.module.Manipulating": {
        "require": true
      },
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.Event": {
        "construct": true
      },
      "qx.bom.client.OperatingSystem": {
        "construct": true,
        "require": true
      },
      "qx.bom.element.Location": {},
      "qx.bom.element.Animation": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "os.name": {
          "construct": true,
          "className": "qx.bom.client.OperatingSystem"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  /**
   * @require(qx.module.Animation)
   * @require(qx.module.Manipulating)
   *
   * Mixin for the {@link Scroll} container. Used when the variant
   * <code>qx.mobile.nativescroll</code> is set to "on".
   */
  qx.Mixin.define("qx.ui.mobile.container.MNativeScroll", {
    construct: function construct() {
      this.addCssClass("native");
      this._snapPoints = [];
      this.addListenerOnce("appear", this._onAppear, this);
      this.addListener("trackstart", this._onTrackStart, this);
      this.addListener("trackend", this._onTrackEnd, this);
      qx.bom.Event.addNativeListener(this._getContentElement(), "scroll", this._onScroll.bind(this));
      if (qx.core.Environment.get("os.name") == "ios") {
        this.addListener("touchmove", this._onTouchMove, this);
      }
    },
    members: {
      _snapPoints: null,
      _onTrack: null,
      _snapTimeoutId: null,
      /**
       * Event handler for <code>appear</code> event.
       */
      _onAppear: function _onAppear() {
        this._calcSnapPoints();
      },
      /**
       * Event handler for <code>touchmove</code> event.
       * Needed for preventing iOS page bounce.
       * @param evt {qx.event.type.Touch} touchmove event.
       */
      _onTouchMove: function _onTouchMove(evt) {
        // If scroll container is scrollable
        if (this._isScrollableY()) {
          evt.stopPropagation();
        } else {
          evt.preventDefault();
        }
      },
      /**
       * Event handler for <code>trackstart</code> events.
       * @param evt {qx.event.type.Track} touchmove event.
       */
      _onTrackStart: function _onTrackStart(evt) {
        this._onTrack = true;
        if (qx.core.Environment.get("os.name") == "ios") {
          this._preventPageBounce();
        }
      },
      /**
       * Prevents the iOS page bounce if scroll container reaches the upper or lower vertical scroll limit.
       */
      _preventPageBounce: function _preventPageBounce() {
        // If scroll container is scrollable
        if (this._isScrollableY()) {
          var element = this.getContentElement();
          var scrollTop = element.scrollTop;
          var maxScrollTop = element.scrollHeight - this.getLayoutParent().getContentElement().offsetHeight;
          if (scrollTop === 0) {
            element.scrollTop = 1;
          } else if (scrollTop == maxScrollTop) {
            element.scrollTop = maxScrollTop - 1;
          }
        }
      },
      /**
       * Event handler for <code>trackend</code> events.
       * @param evt {qx.event.type.Track} touchmove event.
       */
      _onTrackEnd: function _onTrackEnd(evt) {
        this._onTrack = false;
        if (this._snapTimeoutId) {
          clearTimeout(this._snapTimeoutId);
        }
        this._snapTimeoutId = setTimeout(function () {
          this._snap();
        }.bind(this), 100);
        evt.stopPropagation();
      },
      /**
       * Event handler for <code>scroll</code> events.
       */
      _onScroll: function _onScroll() {
        var scrollLeft = this.getContentElement().scrollLeft;
        var scrollTop = this.getContentElement().scrollTop;
        this._setCurrentX(scrollLeft);
        this._setCurrentY(scrollTop);
        if (this._snapTimeoutId) {
          clearTimeout(this._snapTimeoutId);
        }
        this._snapTimeoutId = setTimeout(function () {
          if (!this._onTrack) {
            this._snap();
          }
        }.bind(this), 100);
      },
      /**
       * Calculates the snapping points for the x/y axis.
       */
      _calcSnapPoints: function _calcSnapPoints() {
        if (this._scrollProperties) {
          var snap = this._scrollProperties.snap;
          if (snap) {
            this._snapPoints = [];
            var snapTargets = this.getContentElement().querySelectorAll(snap);
            for (var i = 0; i < snapTargets.length; i++) {
              var snapPoint = qx.bom.element.Location.getRelative(this._getContentElement(), snapTargets[i], "scroll", "scroll");
              this._snapPoints.push(snapPoint);
            }
          }
        }
      },
      /**
       * Determines the next snap points for the passed current position.
       * @param current {Integer} description
       * @param snapProperty {String} "top" or "left"
       * @return {Integer} the determined snap point.
       */
      _determineSnapPoint: function _determineSnapPoint(current, snapProperty) {
        for (var i = 0; i < this._snapPoints.length; i++) {
          var snapPoint = this._snapPoints[i];
          if (current <= -snapPoint[snapProperty]) {
            if (i > 0) {
              var previousSnapPoint = this._snapPoints[i - 1];
              var previousSnapDiff = Math.abs(current + previousSnapPoint[snapProperty]);
              var nextSnapDiff = Math.abs(current + snapPoint[snapProperty]);
              if (previousSnapDiff < nextSnapDiff) {
                return -previousSnapPoint[snapProperty];
              } else {
                return -snapPoint[snapProperty];
              }
            } else {
              return -snapPoint[snapProperty];
            }
          }
        }
        return current;
      },
      /**
       * Snaps the scrolling area to the nearest snap point.
       */
      _snap: function _snap() {
        this.fireEvent("scrollEnd");
        var element = this.getContentElement();
        if (element.scrollTop < 1 || element.scrollTop > this._getScrollHeight()) {
          return;
        }
        var current = this._getPosition();
        var nextX = this._determineSnapPoint(current[0], "left");
        var nextY = this._determineSnapPoint(current[1], "top");
        if (nextX != current[0] || nextY != current[1]) {
          this._scrollTo(nextX, nextY, 300);
        }
      },
      /**
       * Refreshes the scroll container. Recalculates the snap points.
       */
      _refresh: function _refresh() {
        this._calcSnapPoints();
      },
      /**
       * Mixin method. Creates the scroll element.
       *
       * @return {Element} The scroll element
       */
      _createScrollElement: function _createScrollElement() {
        return null;
      },
      /**
       * Returns the current scroll position
       * @return {Array} an array with <code>[scrollLeft,scrollTop]</code>.
       */
      _getPosition: function _getPosition() {
        return [this.getContentElement().scrollLeft, this.getContentElement().scrollTop];
      },
      /**
       * Mixin method. Returns the scroll content element.
       *
       * @return {Element} The scroll content element
       */
      _getScrollContentElement: function _getScrollContentElement() {
        return null;
      },
      /**
       * Returns the scrolling height of the inner container.
       * @return {Number} the scrolling height.
       */
      _getScrollHeight: function _getScrollHeight() {
        if (!this.getContentElement()) {
          return 0;
        }
        return this.getContentElement().scrollHeight - this.getContentElement().offsetHeight;
      },
      /**
       * Returns the scrolling width of the inner container.
       * @return {Number} the scrolling width.
       */
      _getScrollWidth: function _getScrollWidth() {
        if (!this.getContentElement()) {
          return 0;
        }
        return this.getContentElement().scrollWidth - this.getContentElement().offsetWidth;
      },
      /**
       * Scrolls the wrapper contents to the x/y coordinates in a given period.
       *
       * @param x {Integer} X coordinate to scroll to.
       * @param y {Integer} Y coordinate to scroll to.
       * @param time {Integer} is always <code>0</code> for this mixin.
       */
      _scrollTo: function _scrollTo(x, y, time) {
        var element = this.getContentElement();
        if (!time) {
          element.scrollLeft = x;
          element.scrollTop = y;
          return;
        }
        var startY = element.scrollTop;
        var startX = element.scrollLeft;
        if (element) {
          qx.bom.element.Animation.animate(element, {
            duration: time,
            keyFrames: {
              0: {
                scrollTop: startY,
                scrollLeft: startX
              },
              100: {
                scrollTop: y,
                scrollLeft: x
              }
            },
            keep: 100,
            timing: "ease-out"
          });
        }
      }
    },
    destruct: function destruct() {
      qx.bom.Event.removeNativeListener(this._getContentElement(), "scroll", this._onScroll.bind(this));
      this.removeListener("touchmove", this._onTouchMove, this);
      this.removeListener("appear", this._onAppear, this);
      this.removeListener("trackstart", this._onTrackStart, this);
      this.removeListener("trackend", this._onTrackEnd, this);
    }
  });
  qx.ui.mobile.container.MNativeScroll.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MNativeScroll.js.map?dt=1705596680700