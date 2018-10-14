/* ResizeHandler.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


/*
 * Make sure everything looks right when the window gets resized. This is
 * necessary as the scroll effect requires a fixed element size
 */
/**
 * Manager for all resizing issues. It ensures that the real resizing
 * calculations are only done as often as really necessary.
 *
 */
qx.Class.define('cv.ui.layout.ResizeHandler', {
  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    states: new cv.ui.layout.States(),

    $pageSize: null,
    $navbarTop: null,
    $navbarBottom: null,
    width: 0,
    height: 0,
    __initial: true,

    validationQueue: [],

    reset: function() {
      this.states.resetAll();
      this.$pageSize = null;
      this.$navbarTop = null;
      this.$navbarBottom = null;
      this.width = 0;
      this.height = 0;
    },

    __request : null,

    getPageSize: function (noCache) {
      if (!this.$pageSize || noCache === true) {
        this.$pageSize = qx.bom.Selector.query('#pageSize')[0];
      }
      return this.$pageSize;
    },

    getNavbarTop: function (noCache) {
      if (!this.$navbarTop || noCache === true) {
        this.$navbarTop = qx.bom.Selector.query('#navbarTop')[0];
      }
      return this.$navbarTop;
    },

    getNavbarBottom: function (noCache) {
      if (!this.$navbarBottom || noCache === true) {
        this.$navbarBottom = qx.bom.Selector.query('#navbarBottom')[0];
      }
      return this.$navbarBottom;
    },

    queueJob: function(name) {
      if (this.validationQueue.indexOf(name) === -1) {
        this.validationQueue.push(name);
      }
      if (!this.__request) {
        this.__request = qx.bom.AnimationFrame.request(this.flush, this);
      }
    },

    flush: function() {
      while (this.validationQueue.length) {
        var job = this.validationQueue.shift();
        this[job].apply(this);
      }
      this.__request = null;
    },

    makeAllSizesValid : function() {
      if (this.states.isPageSizeInvalid()) { this.makePagesizeValid(); } // must be first due to dependencies
      if (this.states.isNavbarInvalid()) { this.makeNavbarValid(); }
      if (this.states.isRowspanInvalid()) { this.makeRowspanValid(); }
      if (this.states.isBackdropInvalid()) { this.makeBackdropValid(); }
    },

    makeBackdropValid: function () {
      this.queueJob("__makeBackdropValid");
    },

    __makeBackdropValid: function () {
      qx.log.Logger.debug(this, "makeBackdropValid");
      // TODO: this is structure.pure specific and should be handled by the structure itself
      var templateEngine = cv.TemplateEngine.getInstance();
      var page = templateEngine.getCurrentPage();
      if (!page) {
        return;
      }
      // TODO use page object

      if ('2d' === page.getPageType()) {
        var
          cssPosRegEx = /(\d*)(.*)/,
          backdrop = qx.bom.Selector.query("div > "+page.getBackdropType(), page.getDomElement())[0],
          backdropSVG = page.getBackdropType() === 'embed' ? backdrop.getSVGDocument() : null,
          backdropBBox = backdropSVG ? backdropSVG.children[0].getBBox() : {},
          backdropNWidth = backdrop.naturalWidth || backdropBBox.width || this.width,
          backdropNHeight = backdrop.naturalHeight || backdropBBox.height || this.height,
          backdropScale = Math.min(this.width / backdropNWidth, this.height / backdropNHeight),
          backdropWidth = backdropNWidth * backdropScale,
          backdropHeight = backdropNHeight * backdropScale,
          backdropPos = page.getBackdropAlign().split(' '),
          backdropLeftRaw = backdropPos[0].match(cssPosRegEx),
          backdropTopRaw = backdropPos[1].match(cssPosRegEx),
          backdropLeft = backdropLeftRaw[2] === '%' ? (this.width > backdropWidth ? ((this.width - backdropWidth ) * (+backdropLeftRaw[1]) / 100) : 0) : +backdropLeftRaw[1],
          backdropTop = backdropTopRaw[2] === '%' ? (this.height > backdropHeight ? ((this.height - backdropHeight) * (+backdropTopRaw[1] ) / 100) : 0) : +backdropTopRaw[1],
          uagent = navigator.userAgent.toLowerCase();

        if (backdrop.complete === false || (page.getBackdropType() === 'embed' && backdropSVG === null)) {
          // backdrop not available yet - reload
          qx.event.Timer.once(this.invalidateBackdrop, this, 100);
          return;
        }

        // Note 1: this here is a work around for older browsers that can't use
        // the object-fit property yet.
        // Currently (26.05.16) only Safari is known to not support
        // object-position although object-fit itself does work
        // Note 2: The embed element allways needs it
        if (
          page.getBackdropType() === 'embed' ||
          ( uagent.indexOf('safari') !== -1 && uagent.indexOf('chrome') === -1 )
        ) {
          qx.bom.element.Style.setStyles(backdrop, {
            width: backdropWidth + 'px',
            height: backdropHeight + 'px',
            left: backdropLeft + 'px',
            top: backdropTop + 'px'
          });
        }

        qx.bom.Selector.query('.widget_container', page.getDomElement()).forEach(function (widgetContainer) {
          var widget = cv.ui.structure.WidgetFactory.getInstanceById(widgetContainer.id);
          var value;
          if (widget.getLayout()) {
            var
              layout = widget.getLayout(),
              // this assumes that a .widget_container has only one child and this
              // is the .widget itself
              style = widgetContainer.children[0].style;

            if ('x' in layout) {
              value = layout.x.match(cssPosRegEx);
              if ('px' === value[2]) {
                style.left = (backdropLeft + value[1] * backdropScale) + 'px';
              } else {
                style.left = layout.x;
              }
            }

            if ('y' in layout) {
              value = layout.y.match(cssPosRegEx);
              if ('px' === value[2]) {
                style.top = (backdropTop + value[1] * backdropScale) + 'px';
              } else {
                style.top = layout.y;
              }
            }

            if ('width' in layout) {
              style.width = layout.width;
            }

            if ('height' in layout) {
              style.height = layout.height;
            }
          }
        }, this);
      }

      this.states.setBackdropInvalid(false);
    },

    makeNavbarValid: function () {
      this.queueJob("__makeNavbarValid");
    },

    __makeNavbarValid: function() {
      if (cv.Config.mobileDevice) {
        //do nothing
      } else {
        var navbarTop = this.getNavbarTop();
        var navbarBottom = this.getNavbarBottom();
        if (
          (qx.bom.element.Style.get(navbarTop, 'display') !== 'none' && qx.bom.element.Dimension.getHeight(navbarTop) <= 2) ||
          (qx.bom.element.Style.get(navbarBottom, 'display') !== 'none' && qx.bom.element.Dimension.getHeight(navbarBottom) <= 2)
        ) {
          // Top/Bottom-Navbar is not initialized yet, re-queue the job
          new qx.util.DeferredCall(function() {
            this.queueJob("__makeNavbarValid");
          }, this).schedule();
          return;
        }
      }
      qx.log.Logger.debug(this, "makeNavbarValid");
      if (cv.ui.layout.Manager.adjustColumns()) {
        // the amount of columns has changed -> recalculate the widgets widths
        cv.ui.layout.Manager.applyColumnWidths();
      }
      this.states.setNavbarInvalid(false);
    },

    makePagesizeValid: function () {
      if (this.__initial === true) {
        // do not queue -> call now
        this.__initial = false;
        this.__makePagesizeValid();
      } else {
        this.queueJob("__makePagesizeValid");
      }
    },

    __makePagesizeValid: function() {
      if (!cv.Config.currentPageId) { return; }
      qx.log.Logger.debug(this, "makePagesizeValid");
      var page = cv.ui.structure.WidgetFactory.getInstanceById(cv.Config.currentPageId);
      if (page && !page.isInitialized()) {
        page.addListenerOnce("changeInitialized", this.__makePagesizeValid, this);
        return;
      }
      this.width = cv.ui.layout.Manager.getAvailableWidth();
      this.height = cv.ui.layout.Manager.getAvailableHeight();
      var pageSizeElement = this.getPageSize();

      if (pageSizeElement) {
        pageSizeElement.innerHTML = '#main,.page{width:' + this.width + 'px;height:' + this.height + 'px;}';
      }

      this.states.setPageSizeInvalid(false);
    },

    makeRowspanValid: function () {
      this.queueJob("__makeRowspanValid");
    },

    __makeRowspanValid: function () {
      qx.log.Logger.debug(this, "makeRowspanValid");
      var elem = qx.bom.Selector.query("#calcrowspan")[0];
      if (!elem) {
        elem = qx.dom.Element.create("div", {
          "class": "clearfix",
          "id": "calcrowspan",
          "html": '<div id="containerDiv" class="widget_container"><div class="widget clearfix text" id="innerDiv"></div>'
        });
        qx.dom.Element.insertEnd(elem, document.body);
      }
      // use the internal div for height as in mobile view the elem uses the full screen height
      this.__updateRowHeight(qx.bom.Selector.query("#containerDiv", elem)[0]);
    },

    __updateRowHeight: function(elem) {
      var height = qx.bom.element.Dimension.getHeight(elem);
      if (height === 0) {
        // not ready try again
        qx.bom.AnimationFrame.request(qx.lang.Function.curry(this.__updateRowHeight, elem), this);
        return;
      }
      var styles = '';

      for (var rowspan in cv.Config.configSettings.usedRowspans) {
        styles += '.rowspan.rowspan' + rowspan + ' { height: ' + Math.round(rowspan * height) + "px;}\n";
      }
      qx.bom.Selector.query("#calcrowspan").forEach(qx.dom.Element.remove, qx.dom.Element);

      // set css style
      var rowSpanStyle = qx.bom.Selector.query('#rowspanStyle')[0];
      if (rowSpanStyle) {
        rowSpanStyle.innerHTML = styles;
      }
      this.states.setRowspanInvalid(false);
    },

    invalidateBackdrop: function () {
      qx.log.Logger.debug(this, "backdrop");
      this.states.setBackdropInvalid(true);
      this.makeAllSizesValid();
    },
    invalidateNavbar: function () {
      qx.log.Logger.debug(this, "invalidateNavbar");
      this.states.setNavbarInvalid(true);
      this.states.setPageSizeInvalid(true);
      this.makeAllSizesValid();
    },
    invalidateRowspan: function () {
      this.states.setRowspanInvalid(true);
      this.makeAllSizesValid();
    },
    invalidateScreensize: function () {
      qx.log.Logger.debug(this, "invalidateScreensize");
      this.states.set({
        pageSizeInvalid: true,
        rowspanInvalid: true,
        navbarInvalid: true,
        backdropInvalid: true
      });
      this.makeAllSizesValid();
    }
  }
});
