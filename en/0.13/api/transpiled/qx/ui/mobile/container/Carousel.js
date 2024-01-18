(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.core.MResize": {
        "require": true
      },
      "qx.ui.mobile.layout.HBox": {
        "construct": true
      },
      "qx.bom.Event": {
        "construct": true
      },
      "qx.event.Registration": {
        "construct": true
      },
      "qx.ui.mobile.layout.VBox": {
        "construct": true
      },
      "qx.util.DisposeUtil": {},
      "qx.bom.element.Style": {},
      "qx.ui.mobile.basic.Label": {},
      "qx.bom.element.Dimension": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * Creates a Carousel widget.
   * A carousel is a widget which can switch between several sub pages {@link  qx.ui.mobile.container.Composite}.
   * A page switch is triggered by a swipe to left, for next page, or a swipe to right for
   * previous page.
   *
   * A carousel shows by default a pagination indicator at the bottom of the carousel.
   * This pagination indicator can be hidden by property <code>showPagination</code>.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *
   *  var carousel = new qx.ui.mobile.container.Carousel();
   *  var carouselPage1 = new qx.ui.mobile.container.Composite();
   *  var carouselPage2 = new qx.ui.mobile.container.Composite();
   *
   *  carouselPage1.add(new qx.ui.mobile.basic.Label("This is a carousel. Please swipe left."));
   *  carouselPage2.add(new qx.ui.mobile.basic.Label("Now swipe right."));
   *
   *  carousel.add(carouselPage1);
   *  carousel.add(carouselPage2);
   * </pre>
   *
   */
  qx.Class.define("qx.ui.mobile.container.Carousel", {
    extend: qx.ui.mobile.container.Composite,
    include: qx.ui.mobile.core.MResize,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param transitionDuration {Integer ? 0.4} transition duration on carouselPage change in seconds.
     */
    construct: function construct(transitionDuration) {
      qx.ui.mobile.container.Composite.constructor.call(this);
      if (transitionDuration) {
        this.setTransitionDuration(transitionDuration);
      }
      this.__P_392_0 = [];
      this.__P_392_1 = [0, 0];
      this.__P_392_2 = [0, 0];
      this.__P_392_3 = [0, 0];
      this.__P_392_4 = [];
      this.__P_392_5 = [];
      var carouselScroller = this.__P_392_6 = new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.HBox());
      carouselScroller.setTransformUnit("px");
      carouselScroller.addCssClass("carousel-scroller");
      carouselScroller.addListener("pointerdown", this._onPointerDown, this);
      carouselScroller.addListener("pointerup", this._onPointerUp, this);
      carouselScroller.addListener("track", this._onTrack, this);
      carouselScroller.addListener("swipe", this._onSwipe, this);
      this.addListener("touchmove", qx.bom.Event.preventDefault, this);
      this.addListener("appear", this._onContainerUpdate, this);
      qx.event.Registration.addListener(this.__P_392_6.getContainerElement(), "transitionEnd", this._onScrollerTransitionEnd, this);
      qx.event.Registration.addListener(window, "orientationchange", this._onContainerUpdate, this);
      qx.event.Registration.addListener(window, "resize", this._onContainerUpdate, this);
      qx.event.Registration.addListener(this.getContentElement(), "scroll", this._onNativeScroll, this);
      var pagination = this.__P_392_7 = new qx.ui.mobile.container.Composite();
      pagination.setLayout(new qx.ui.mobile.layout.HBox());
      pagination.setTransformUnit("px");
      pagination.addCssClass("carousel-pagination");
      this.setLayout(new qx.ui.mobile.layout.VBox());
      this._add(carouselScroller, {
        flex: 1
      });
      this._add(pagination, {
        flex: 1
      });
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "carousel"
      },
      /** Property for setting visibility of pagination indicator */
      showPagination: {
        check: "Boolean",
        init: true,
        apply: "_applyShowPagination"
      },
      /** Defines whether the carousel should scroll back to first or last page
       * when the start/end of carousel pages is reached  */
      scrollLoop: {
        check: "Boolean",
        init: true
      },
      /**
       * Defines the height of the carousel. If value is equal to <code>null</code>
       * the height is set to <code>100%</code>.
       */
      height: {
        check: "Number",
        init: 200,
        nullable: true,
        apply: "_updateCarouselLayout"
      },
      /**
       * The current visible page index.
       */
      currentIndex: {
        check: "Number",
        init: 0,
        apply: "_scrollToPage",
        event: "changeCurrentIndex"
      },
      /**
       * Duration of the carousel page transition.
       */
      transitionDuration: {
        check: "Number",
        init: 0.5
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_392_6: null,
      __P_392_8: null,
      __P_392_9: null,
      __P_392_5: null,
      __P_392_7: null,
      __P_392_0: null,
      __P_392_1: null,
      __P_392_2: null,
      __P_392_3: null,
      __P_392_4: null,
      __P_392_10: null,
      __P_392_11: null,
      __P_392_12: null,
      __P_392_13: null,
      // overridden
      /**
       * Adds a page to the end of the carousel.
       * @param page {qx.ui.mobile.container.Composite} The composite which should be added as a page to the end of carousel.
       */
      add: function add(page) {
        page.addCssClass("carousel-page");
        this.__P_392_4.push(page);
        this.__P_392_6.add(page, {
          flex: 1
        });
        var paginationLabel = this._createPaginationLabel();
        this.__P_392_5.push(paginationLabel);
        this.__P_392_7.add(paginationLabel);
        this._setTransitionDuration(0);
        this._onContainerUpdate();
      },
      /**
       * Removes a carousel page from carousel identified by its index.
       * @param pageIndex {Integer} The page index which should be removed from carousel.
       * @return {qx.ui.mobile.container.Composite} the page which was removed from carousel.
       */
      removePageByIndex: function removePageByIndex(pageIndex) {
        if (this.__P_392_4 && this.__P_392_4.length > pageIndex) {
          if (pageIndex <= this.getCurrentIndex() && this.getCurrentIndex() !== 0) {
            this.setCurrentIndex(this.getCurrentIndex() - 1);
          }
          var targetPage = this.__P_392_4[pageIndex];
          var paginationLabel = this.__P_392_5[pageIndex];
          this.__P_392_6.remove(targetPage);
          this.__P_392_7.remove(paginationLabel);
          paginationLabel.removeListener("tap", this._onPaginationLabelTap, {
            self: this,
            targetIndex: pageIndex - 1
          });
          qx.util.DisposeUtil.destroyContainer(paginationLabel);
          this.__P_392_4.splice(pageIndex, 1);
          this.__P_392_5.splice(pageIndex, 1);
          this._onContainerUpdate();
          return targetPage;
        }
      },
      // overridden
      removeAll: function removeAll() {
        var removedPages = [];
        if (this.__P_392_4) {
          for (var i = this.__P_392_4.length - 1; i >= 0; i--) {
            removedPages.push(this.removePageByIndex(i));
          }
        }
        return removedPages;
      },
      /**
       * Scrolls the carousel to next page.
       */
      nextPage: function nextPage() {
        if (this.getCurrentIndex() == this.__P_392_4.length - 1) {
          if (this.isScrollLoop() && this.__P_392_4.length > 1) {
            this._doScrollLoop();
          }
        } else {
          this.setCurrentIndex(this.getCurrentIndex() + 1);
        }
      },
      /**
       * Scrolls the carousel to previous page.
       */
      previousPage: function previousPage() {
        if (this.getCurrentIndex() === 0) {
          if (this.isScrollLoop() && this.__P_392_4.length > 1) {
            this._doScrollLoop();
          }
        } else {
          this.setCurrentIndex(this.getCurrentIndex() - 1);
        }
      },
      /**
       * Returns the current page count of this carousel.
       * @return {Integer} the current page count
       */
      getPageCount: function getPageCount() {
        if (this.__P_392_4) {
          return this.__P_392_4.length;
        }
        return 0;
      },
      /**
       * Scrolls the carousel to the page with the given pageIndex.
       * @param pageIndex {Integer} the target page index, which should be visible
       * @param showTransition {Boolean ? true} flag if a transition should be shown or not
       */
      _scrollToPage: function _scrollToPage(pageIndex, showTransition) {
        if (pageIndex >= this.__P_392_4.length || pageIndex < 0) {
          return;
        }
        this._updatePagination(pageIndex);
        var snapPoint = -pageIndex * this.__P_392_9;
        this._updateScrollerPosition(snapPoint);

        // Update lastOffset, because snapPoint has changed.
        this.__P_392_2[0] = snapPoint;
      },
      /**
       * Manages the the scroll loop. First fades out carousel scroller >>
       * waits till fading is done >> scrolls to pageIndex >> waits till scrolling is done
       * >> fades scroller in.
       */
      _doScrollLoop: function _doScrollLoop() {
        this._setTransitionDuration(this.getTransitionDuration());
        setTimeout(function () {
          this._setScrollersOpacity(0);
        }.bind(this), 0);
      },
      /**
       * Event handler for <code>transitionEnd</code> event on carouselScroller.
       */
      _onScrollerTransitionEnd: function _onScrollerTransitionEnd() {
        var opacity = qx.bom.element.Style.get(this.__P_392_6.getContainerElement(), "opacity");
        if (opacity === 0) {
          var pageIndex = null;
          if (this.getCurrentIndex() == this.__P_392_4.length - 1) {
            pageIndex = 0;
          }
          if (this.getCurrentIndex() === 0) {
            pageIndex = this.__P_392_4.length - 1;
          }
          this._setTransitionDuration(0);
          this.setCurrentIndex(pageIndex);
          setTimeout(function () {
            this._setTransitionDuration(this.getTransitionDuration());
            this._setScrollersOpacity(1);
          }.bind(this), 0);
        }
      },
      /**
       * Factory method for a paginationLabel.
       * @return {qx.ui.mobile.container.Composite} the created pagination label.
       */
      _createPaginationLabel: function _createPaginationLabel() {
        var paginationIndex = this.__P_392_4.length;
        var paginationLabel = new qx.ui.mobile.container.Composite();
        var paginationLabelText = new qx.ui.mobile.basic.Label("" + paginationIndex);
        paginationLabel.add(paginationLabelText);
        paginationLabel.addCssClass("carousel-pagination-label");
        paginationLabel.addListener("tap", this._onPaginationLabelTap, {
          self: this,
          targetIndex: paginationIndex - 1
        });
        return paginationLabel;
      },
      /**
       * Changes the opacity of the carouselScroller element.
       * @param opacity {Integer} the target value of the opacity.
       */
      _setScrollersOpacity: function _setScrollersOpacity(opacity) {
        if (this.__P_392_6) {
          qx.bom.element.Style.set(this.__P_392_6.getContainerElement(), "opacity", opacity);
        }
      },
      /**
       * Called when showPagination property is changed.
       * Manages <code>show()</code> and <code>hide()</code> of pagination container.
       */
      _applyShowPagination: function _applyShowPagination(value, old) {
        if (value) {
          if (this.__P_392_4.length > 1) {
            this.__P_392_7.show();
          }
        } else {
          this.__P_392_7.hide();
        }
      },
      /**
       * Handles a tap on paginationLabel.
       */
      _onPaginationLabelTap: function _onPaginationLabelTap() {
        this.self.setCurrentIndex(this.targetIndex);
      },
      /**
       * Updates the layout of the carousel the carousel scroller and its pages.
       */
      _updateCarouselLayout: function _updateCarouselLayout() {
        if (!this.getContainerElement()) {
          return;
        }
        var carouselSize = qx.bom.element.Dimension.getSize(this.getContainerElement());
        this.__P_392_9 = carouselSize.width;
        if (this.getHeight() !== null) {
          this._setStyle("height", this.getHeight() / 16 + "rem");
        } else {
          this._setStyle("height", "100%");
        }
        qx.bom.element.Style.set(this.__P_392_6.getContentElement(), "width", this.__P_392_4.length * carouselSize.width + "px");
        for (var i = 0; i < this.__P_392_4.length; i++) {
          var pageContentElement = this.__P_392_4[i].getContentElement();
          qx.bom.element.Style.set(pageContentElement, "width", carouselSize.width + "px");
          qx.bom.element.Style.set(pageContentElement, "height", carouselSize.height + "px");
        }
        if (this.__P_392_4.length == 1) {
          this.__P_392_7.exclude();
        } else {
          if (this.isShowPagination()) {
            this.__P_392_7.show();
          }
        }
        this._refreshScrollerPosition();
      },
      /**
       * Synchronizes the positions of the scroller to the current shown page index.
       */
      _refreshScrollerPosition: function _refreshScrollerPosition() {
        this.__P_392_8 = qx.bom.element.Dimension.getWidth(this.__P_392_6.getContentElement());
        this._scrollToPage(this.getCurrentIndex());
      },
      /**
       * Handles window resize, device orientatonChange or page appear events.
       */
      _onContainerUpdate: function _onContainerUpdate() {
        this._setTransitionDuration(0);
        this._updateCarouselLayout();
        this._refreshScrollerPosition();
      },
      /**
       * Returns the current horizontal position of the carousel scrolling container.
       * @return {Number} the horizontal position
       */
      _getScrollerOffset: function _getScrollerOffset() {
        var transformMatrix = qx.bom.element.Style.get(this.__P_392_6.getContentElement(), "transform");
        var transformValueArray = transformMatrix.substr(7, transformMatrix.length - 8).split(", ");
        var i = 4;
        // Check if MSCSSMatrix is used.
        if ("MSCSSMatrix" in window && !("WebKitCSSMatrix" in window)) {
          i = transformValueArray.length - 4;
        }
        return Math.floor(parseInt(transformValueArray[i], 10));
      },
      /**
       * Event handler for <code>pointerdown</code> events.
       * @param evt {qx.event.type.Pointer} The pointer event.
       */
      _onPointerDown: function _onPointerDown(evt) {
        if (!evt.isPrimary()) {
          return;
        }
        this.__P_392_2[0] = this._getScrollerOffset();
        this.__P_392_11 = null;
        this.__P_392_3[0] = -this.__P_392_8 + this.__P_392_9;
        this._updateScrollerPosition(this.__P_392_2[0]);
      },
      /**
       * Event handler for <code>track</code> events.
       * @param evt {qx.event.type.Track} The track event.
       */
      _onTrack: function _onTrack(evt) {
        if (!evt.isPrimary()) {
          return;
        }
        this._setTransitionDuration(0);
        this.__P_392_12 = evt.getDelta().x;
        this.__P_392_13 = evt.getDelta().y;
        if (this.__P_392_11 === null) {
          this.__P_392_11 = evt.getDelta().axis == "y";
        }
        if (!this.__P_392_11) {
          this.__P_392_1[0] = Math.floor(this.__P_392_12 + this.__P_392_2[0]);
          if (this.__P_392_1[0] >= this.__P_392_3[1]) {
            this.__P_392_1[0] = this.__P_392_3[1];
          }
          if (this.__P_392_1[0] <= this.__P_392_3[0]) {
            this.__P_392_1[0] = this.__P_392_3[0];
          }
          this._updateScrollerPosition(this.__P_392_1[0]);
          evt.preventDefault();
        }
      },
      /**
       * Handler for <code>pointerup</code> event on carousel scroller.
       * @param evt {qx.event.type.Pointer} the pointerup event.
       */
      _onPointerUp: function _onPointerUp(evt) {
        if (!evt.isPrimary()) {
          return;
        }
        this._setTransitionDuration(this.getTransitionDuration());
        this._refreshScrollerPosition();
      },
      /**
       * Handler for swipe event on carousel scroller.
       * @param evt {qx.event.type.Swipe} The swipe event.
       */
      _onSwipe: function _onSwipe(evt) {
        if (!evt.isPrimary()) {
          return;
        }
        if (evt.getDuration() < 750 && Math.abs(evt.getDistance()) > 50) {
          var duration = this._calculateTransitionDuration(this.__P_392_12, evt.getDuration());
          duration = Math.min(this.getTransitionDuration(), duration);
          this._setTransitionDuration(duration);
          if (evt.getDirection() == "left") {
            this.nextPage();
          } else if (evt.getDirection() == "right") {
            this.previousPage();
          }
        } else {
          this._snapCarouselPage();
        }
      },
      /**
       * Calculates the duration the transition will need till the next carousel
       * snap point is reached.
       * @param deltaX {Integer} the distance on axis between pointerdown and pointerup.
       * @param duration {Number} the swipe duration.
       * @return {Number} the transition duration.
       */
      _calculateTransitionDuration: function _calculateTransitionDuration(deltaX, duration) {
        var distanceX = this.__P_392_9 - Math.abs(deltaX);
        var transitionDuration = distanceX / Math.abs(deltaX) * duration;
        return transitionDuration / 1000;
      },
      /**
       * Handles the native scroll event on the carousel container.
       * This is needed for preventing "scrollIntoView" method.
       *
       * @param evt {qx.event.type.Native} the native scroll event.
       */
      _onNativeScroll: function _onNativeScroll(evt) {
        var nativeEvent = evt.getNativeEvent();
        nativeEvent.srcElement.scrollLeft = 0;
        nativeEvent.srcElement.scrollTop = 0;
      },
      /**
       * Applies the CSS property "transitionDuration" to the carouselScroller.
       * @param value {Number} the target value of the transitionDuration.
       */
      _setTransitionDuration: function _setTransitionDuration(value) {
        qx.bom.element.Style.set(this.__P_392_6.getContentElement(), "transitionDuration", value + "s");
      },
      /**
       * Snaps carouselScroller offset to a carouselPage.
       * It determines which carouselPage is the nearest and moves
       * carouselScrollers offset till nearest carouselPage's left border is aligned to carousel's left border.
       */
      _snapCarouselPage: function _snapCarouselPage() {
        this._setTransitionDuration(this.getTransitionDuration());
        var leastDistance = 10000;
        var nearestPageIndex = 0;

        // Determine nearest snapPoint.
        for (var i = 0; i < this.__P_392_4.length; i++) {
          var snapPoint = -i * this.__P_392_9;
          var distance = this.__P_392_1[0] - snapPoint;
          if (Math.abs(distance) < leastDistance) {
            leastDistance = Math.abs(distance);
            nearestPageIndex = i;
          }
        }
        if (this.getCurrentIndex() == nearestPageIndex) {
          this._refreshScrollerPosition();
        } else {
          this.setCurrentIndex(nearestPageIndex);
        }
      },
      /**
       * Updates the pagination indicator of this carousel.
       * Removes the active state from from paginationLabel with oldActiveIndex,
       * Adds actives state to paginationLabel new ActiveIndex.
       * @param newActiveIndex {Integer} Index of paginationLabel which should have active state
       */
      _updatePagination: function _updatePagination(newActiveIndex) {
        for (var i = 0; i < this.__P_392_5.length; i++) {
          this.__P_392_5[i].removeCssClass("active");
        }
        var newActiveLabel = this.__P_392_5[newActiveIndex];
        if (newActiveLabel && newActiveLabel.getContainerElement()) {
          newActiveLabel.addCssClass("active");
        }
        if (this.__P_392_5.length) {
          var paginationStyle = window.getComputedStyle(this.__P_392_7.getContentElement());
          var paginationWidth = parseFloat(paginationStyle.width, 10);
          if (isNaN(paginationWidth)) {
            return;
          }
          var paginationLabelWidth = paginationWidth / this.__P_392_5.length;
          var left = null;
          var translate = this.__P_392_9 / 2 - newActiveIndex * paginationLabelWidth - paginationLabelWidth / 2;
          if (paginationWidth < this.__P_392_9) {
            left = this.__P_392_9 / 2 - paginationWidth / 2 + "px";
            translate = 0;
          }
          qx.bom.element.Style.set(this.__P_392_7.getContentElement(), "left", left);
          this.__P_392_7.setTranslateX(translate);
        }
      },
      /**
       * Assign new position of carousel scrolling container.
       * @param x {Integer} scroller's x position.
       */
      _updateScrollerPosition: function _updateScrollerPosition(x) {
        if (isNaN(x) || this.__P_392_6.getContentElement() === null) {
          return;
        }
        this.__P_392_6.setTranslateX(x);
      },
      /**
       * Remove all listeners.
       */
      _removeListeners: function _removeListeners() {
        this.__P_392_6.removeListener("pointerdown", this._onPointerDown, this);
        this.__P_392_6.removeListener("track", this._onTrack, this);
        this.__P_392_6.removeListener("pointerup", this._onPointerUp, this);
        this.__P_392_6.removeListener("swipe", this._onSwipe, this);
        this.__P_392_6.removeListener("touchmove", qx.bom.Event.preventDefault, this);
        this.removeListener("appear", this._onContainerUpdate, this);
        qx.event.Registration.removeListener(window, "orientationchange", this._onContainerUpdate, this);
        qx.event.Registration.removeListener(window, "resize", this._onContainerUpdate, this);
        qx.event.Registration.removeListener(this.getContentElement(), "scroll", this._onNativeScroll, this);
      }
    },
    destruct: function destruct() {
      this._removeListeners();
      this._disposeObjects("__P_392_6", " __pagination");
      qx.util.DisposeUtil.destroyContainer(this);
      qx.util.DisposeUtil.disposeArray(this, "__P_392_5");
      this.__P_392_4 = this.__P_392_5 = this.__P_392_0 = this.__P_392_1 = this.__P_392_2 = this.__P_392_3 = this.__P_392_11 = null;
    }
  });
  qx.ui.mobile.container.Carousel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Carousel.js.map?dt=1705596680529