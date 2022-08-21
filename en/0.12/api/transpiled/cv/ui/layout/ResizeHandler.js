(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.layout.States": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.AnimationFrame": {},
      "qx.log.Logger": {},
      "cv.TemplateEngine": {},
      "qx.event.Timer": {},
      "cv.ui.structure.WidgetFactory": {},
      "cv.ui.layout.Manager": {},
      "cv.Config": {},
      "qx.dom.Element": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ResizeHandler.js 
   * 
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
    type: 'static',

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
      __P_489_0: true,
      __P_489_1: 0,
      validationQueue: [],
      reset: function reset() {
        this.states.resetAll();
        this.$pageSize = null;
        this.$navbarTop = null;
        this.$navbarBottom = null;
        this.width = 0;
        this.height = 0;
      },
      __P_489_2: null,
      getPageSize: function getPageSize(noCache) {
        if (!this.$pageSize || noCache === true) {
          this.$pageSize = document.querySelector('#pageSize');
        }

        return this.$pageSize;
      },
      getNavbarTop: function getNavbarTop(noCache) {
        if (!this.$navbarTop || noCache === true) {
          this.$navbarTop = document.querySelector('#navbarTop');
        }

        return this.$navbarTop;
      },
      getNavbarBottom: function getNavbarBottom(noCache) {
        if (!this.$navbarBottom || noCache === true) {
          this.$navbarBottom = document.querySelector('#navbarBottom');
        }

        return this.$navbarBottom;
      },
      queueJob: function queueJob(callback) {
        if (this.validationQueue.indexOf(callback) === -1) {
          this.validationQueue.push(callback);
        }

        if (!this.__P_489_2) {
          this.__P_489_2 = qx.bom.AnimationFrame.request(this.flush, this);
        }
      },
      flush: function flush() {
        while (this.validationQueue.length) {
          var job = this.validationQueue.shift();
          job.apply(this);
        }

        this.__P_489_2 = null;
      },
      makeAllSizesValid: function makeAllSizesValid() {
        if (this.states.isPageSizeInvalid()) {
          this.makePagesizeValid();
        } // must be first due to dependencies


        if (this.states.isNavbarInvalid()) {
          this.makeNavbarValid();
        }

        if (this.states.isRowspanInvalid()) {
          this.makeRowspanValid();
        }

        if (this.states.isBackdropInvalid()) {
          this.makeBackdropValid();
        }
      },
      makeBackdropValid: function makeBackdropValid() {
        this.queueJob(this.__P_489_3);
      },
      __P_489_3: function __P_489_3() {
        qx.log.Logger.debug(this, 'makeBackdropValid'); // TODO: this is structure.pure specific and should be handled by the structure itself

        var templateEngine = cv.TemplateEngine.getInstance();
        var page = templateEngine.getCurrentPage();

        if (!page) {
          return;
        } // TODO use page object


        if (page.getPageType() === '2d') {
          var cssPosRegEx = /(\d*)(.*)/;
          var backdrop = page.getDomElement().querySelector('div > ' + page.getBackdropType());

          try {
            var backdropSVG = page.getBackdropType() === 'embed' ? backdrop.getSVGDocument() : null;
            var backdropBBox = backdropSVG ? backdropSVG.children[0].getBBox() : {};
            var backdropNWidth = backdrop.naturalWidth || backdropBBox.width || this.width;
            var backdropNHeight = backdrop.naturalHeight || backdropBBox.height || this.height;
            var backdropFixed = page.getSize() === 'fixed';
            var backdropScale = backdropFixed ? 1 : Math.min(this.width / backdropNWidth, this.height / backdropNHeight);
            var backdropWidth = backdropNWidth * backdropScale;
            var backdropHeight = backdropNHeight * backdropScale;
            var backdropPos = page.getBackdropAlign().split(' ');
            var backdropLeftRaw = backdropPos[0].match(cssPosRegEx);
            var backdropTopRaw = backdropPos[1].match(cssPosRegEx);
            var backdropLeft = backdropLeftRaw[2] === '%' ? (this.width - backdropWidth) * +backdropLeftRaw[1] / 100 : +backdropLeftRaw[1];
            var backdropTop = backdropTopRaw[2] === '%' ? this.height > backdropHeight ? (this.height - backdropHeight) * +backdropTopRaw[1] / 100 : 0 : +backdropTopRaw[1];
            var uagent = navigator.userAgent.toLowerCase();

            if (backdrop.complete === false || page.getBackdropType() === 'embed' && backdropSVG === null || backdropBBox.width === 0 && backdropBBox.height === 0 || this.width === 0 && this.height === 0) {
              // backdrop not available yet - reload
              qx.event.Timer.once(this.invalidateBackdrop, this, 100);
              return;
            } // backdrop available


            if (page.getSize() === 'scaled' && page.getBackdropType() === 'embed' && backdropSVG && backdropSVG.children[0].getAttribute('preserveAspectRatio') !== 'none') {
              backdropSVG.children[0].setAttribute('preserveAspectRatio', 'none');
            } // Note 1: this here is a work around for older browsers that can't use
            // the object-fit property yet.
            // Currently (26.05.16) only Safari is known to not support
            // object-position although object-fit itself does work
            // Note 2: The embed element always needs it


            if ((page.getBackdropType() === 'embed' || uagent.indexOf('safari') !== -1 && uagent.indexOf('chrome') === -1) && page.getSize() !== 'scaled') {
              backdrop.style.width = backdropWidth + 'px';
              backdrop.style.height = backdropHeight + 'px';
              backdrop.style.left = backdropLeft + 'px';
              backdrop.style.top = backdropTop + 'px';
            }

            if (backdropFixed && !backdropSVG) {
              if (this.height < backdropHeight) {
                backdrop.style.height = backdropHeight + 'px';
              } else {
                backdrop.style.height = '100%';
              }
            }

            page.getDomElement().querySelectorAll('.widget_container').forEach(function (widgetContainer) {
              var widget = cv.ui.structure.WidgetFactory.getInstanceById(widgetContainer.id);
              var value;
              var layout = widget.getResponsiveLayout();
              var scale = backdropScale;

              if (layout) {
                // this assumes that a .widget_container has only one child and this
                // is the .widget itself
                var style = widgetContainer.children[0].style;

                if (layout.scale === 'false') {
                  scale = 1.0;
                }

                if ('x' in layout) {
                  value = layout.x.match(cssPosRegEx);

                  if (value[2] === 'px') {
                    style.left = backdropLeft + value[1] * scale + 'px';
                  } else {
                    style.left = layout.x;
                  }
                }

                if ('y' in layout) {
                  value = layout.y.match(cssPosRegEx);

                  if (value[2] === 'px') {
                    style.top = backdropTop + value[1] * scale + 'px';
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
            this.__P_489_1 = 0;
          } catch (e) {
            if (e.name === 'NotSupportedError') {
              if (this.__P_489_1 <= 5) {
                qx.bom.AnimationFrame.request(this.__P_489_3, this);
                this.__P_489_1++;
              }
            }

            qx.log.Logger.error(this, e);
          }
        }

        this.states.setBackdropInvalid(false);
      },
      makeNavbarValid: function makeNavbarValid() {
        this.queueJob(this.__P_489_4);
      },
      __P_489_4: function __P_489_4() {
        qx.log.Logger.debug(this, 'makeNavbarValid');

        if (cv.ui.layout.Manager.adjustColumns()) {
          // the amount of columns has changed -> recalculate the widgets widths
          cv.ui.layout.Manager.applyColumnWidths();
        }

        this.states.setNavbarInvalid(false);
      },
      makePagesizeValid: function makePagesizeValid() {
        if (this.__P_489_0 === true) {
          // do not queue -> call now
          this.__P_489_0 = false;

          this.__P_489_5();
        } else {
          this.queueJob(this.__P_489_5);
        }
      },
      __P_489_5: function __P_489_5() {
        if (!cv.Config.currentPageId) {
          return;
        }

        qx.log.Logger.debug(this, 'makePagesizeValid');
        var page = cv.ui.structure.WidgetFactory.getInstanceById(cv.Config.currentPageId);

        if (page && !page.isInitialized()) {
          page.addListenerOnce('changeInitialized', this.__P_489_5, this);
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
      makeRowspanValid: function makeRowspanValid() {
        this.queueJob(this.__P_489_6);
      },
      __P_489_6: function __P_489_6() {
        qx.log.Logger.debug(this, 'makeRowspanValid');
        var elem = document.querySelector('#calcrowspan');

        if (!elem) {
          elem = qx.dom.Element.create('div', {
            'class': 'clearfix',
            'id': 'calcrowspan',
            'html': '<div id="containerDiv" class="widget_container"><div class="widget clearfix text" id="innerDiv"></div>'
          });
          document.body.appendChild(elem);
        } // use the internal div for height as in mobile view the elem uses the full screen height


        this.__P_489_7(elem.querySelector('#containerDiv'));
      },
      __P_489_7: function __P_489_7(elem) {
        var rect = elem.getBoundingClientRect();
        var height = Math.round(rect.bottom - rect.top);

        if (height === 0) {
          // not ready try again
          var self = this;
          window.requestAnimationFrame(function () {
            self.__P_489_7(elem);
          });
          return;
        }

        var styles = '';

        for (var rowspan in cv.Config.configSettings.usedRowspans) {
          styles += '.rowspan.rowspan' + rowspan + ' { height: ' + Math.round(rowspan * height) + 'px;}\n';
        }

        var calcrowspan = document.querySelector('#calcrowspan');

        if (calcrowspan) {
          calcrowspan.parentNode.removeChild(calcrowspan);
        } // set css style


        var rowSpanStyle = document.querySelector('#rowspanStyle');

        if (rowSpanStyle) {
          rowSpanStyle.innerHTML = styles;
        }

        this.states.setRowspanInvalid(false);
      },
      invalidateBackdrop: function invalidateBackdrop() {
        qx.log.Logger.debug(this, 'backdrop');
        this.states.setBackdropInvalid(true);
        this.makeAllSizesValid();
      },
      invalidateNavbar: function invalidateNavbar() {
        qx.log.Logger.debug(this, 'invalidateNavbar');
        this.states.setNavbarInvalid(true);
        this.states.setPageSizeInvalid(true);
        this.makeAllSizesValid();
      },
      invalidateRowspan: function invalidateRowspan() {
        this.states.setRowspanInvalid(true);
        this.makeAllSizesValid();
      },
      invalidateScreensize: function invalidateScreensize() {
        qx.log.Logger.debug(this, 'invalidateScreensize');
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
  cv.ui.layout.ResizeHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ResizeHandler.js.map?dt=1661116939807