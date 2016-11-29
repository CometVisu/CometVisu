/* ResizeHandler.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
 * @class cv.layout.ResizeHandler
 */
qx.Class.define('cv.layout.ResizeHandler', {

  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {

    invalidBackdrop: true,
    invalidNavbar: true,
    invalidPagesize: true,
    invalidRowspan: true,
    $pageSize: null,
    $navbarTop: null,
    $navbarBottom: null,
    width: 0,
    height: 0,

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

    makeAllSizesValid : function() {
      this.invalidPagesize && this.makePagesizeValid(); // must be first due to dependencies
      this.invalidNavbar && this.makeNavbarValid();
      this.invalidRowspan && this.makeRowspanValid();
      this.invalidBackdrop && this.makeBackdropValid();
    },

    makeBackdropValid: function () {
      var templateEngine = cv.TemplateEngine.getInstance();
      if (!templateEngine.currentPage)
        return;

      // TODO use page object
      var widgetData = cv.data.Model.getInstance().getWidgetData(qx.bom.element.Attribute.get(templateEngine.currentPage, 'id'));
      if ('2d' === widgetData.type) {
        var
          cssPosRegEx = /(\d*)(.*)/,
          backdrop = templateEngine.currentPage.children().children().filter(widgetData.backdroptype)[0],
          backdropSVG = widgetData.backdroptype === 'embed' ? backdrop.getSVGDocument() : null,
          backdropBBox = backdropSVG ? backdropSVG.children[0].getBBox() : {},
          backdropNWidth = backdrop.naturalWidth || backdropBBox.width || this.self(arguments).width,
          backdropNHeight = backdrop.naturalHeight || backdropBBox.height || this.self(arguments).height,
          backdropScale = Math.min(this.self(arguments).width / backdropNWidth, this.self(arguments).height / backdropNHeight),
          backdropWidth = backdropNWidth * backdropScale,
          backdropHeight = backdropNHeight * backdropScale,
          backdropPos = widgetData.backdropalign.split(' '),
          backdropLeftRaw = backdropPos[0].match(cssPosRegEx),
          backdropTopRaw = backdropPos[1].match(cssPosRegEx),
          backdropLeft = backdropLeftRaw[2] === '%' ? (this.self(arguments).width > backdropWidth ? ((this.self(arguments).width - backdropWidth ) * (+backdropLeftRaw[1]) / 100) : 0) : +backdropLeftRaw[1],
          backdropTop = backdropTopRaw[2] === '%' ? (this.self(arguments).height > backdropHeight ? ((this.self(arguments).height - backdropHeight) * (+backdropTopRaw[1] ) / 100) : 0) : +backdropTopRaw[1],
          uagent = navigator.userAgent.toLowerCase();

        if (backdrop.complete === false || (widgetData.backdroptype === 'embed' && backdropSVG === null)) {
          // backdrop not available yet - reload
          setTimeout(this.invalidateBackdrop, 100);
          return;
        }

        // Note 1: this here is a work around for older browsers that can't use
        // the object-fit property yet.
        // Currently (26.05.16) only Safari is known to not support
        // object-position although object-fit itself does work
        // Note 2: The embed element allways needs it
        if (
          widgetData.backdroptype === 'embed' ||
          ( uagent.indexOf('safari') !== -1 && uagent.indexOf('chrome') === -1 )
        ) {
          qx.bom.element.Style.setStyles(backdrop, {
            width: backdropWidth + 'px',
            height: backdropHeight + 'px',
            left: backdropLeft + 'px',
            top: backdropTop + 'px'
          });
        }

        qx.bom.Selector.query('.widget_container', templateEngine.currentPage).forEach(function (widgetContainer) {
          var widgetData = cv.data.Model.getInstance().getWidgetData(widgetContainer.id);
          if (widgetData.layout) {
            var
              layout = widgetData.layout,
              // this assumes that a .widget_container has only one child and this
              // is the .widget itself
              style = widgetContainer.children[0].style;

            if ('x' in layout) {
              var value = layout.x.match(cssPosRegEx);
              if ('px' === value[2]) {
                style.left = (backdropLeft + value[1] * backdropScale) + 'px';
              } else {
                style.left = layout.x;
              }
            }

            if ('y' in layout) {
              var value = layout.y.match(cssPosRegEx);
              if ('px' === value[2]) {
                style.top = (backdropTop + value[1] * backdropScale) + 'px';
              } else {
                style.top = layout.y;
              }
            }

            if ('width' in layout)
              style.width = layout.width;

            if ('height' in layout)
              style.height = layout.height;
          }
        });
      }

      this.invalidBackdrop = false;
    },

    makeNavbarValid: function () {
      if (!this.__request) {
        this.__makeNavbarValid();
      }
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
          // Top/Bottom-Navbar is not initialized yet, wait some time and recalculate available height
          // this is an ugly workaround, if someone can come up with a better solution, feel free to implement it
          this.__request = qx.bom.AnimationFrame.request(this.__makeNavbarValid, this);
          return;
        }
      }
      console.trace("make navbar valid");
      if (cv.layout.Manager.adjustColumns()) {
        // the amount of columns has changed -> recalculate the widgets widths
        cv.layout.Manager.applyColumnWidths();
      }
      this.__request = null;
      this.invalidNavbar = false;
    },

    makePagesizeValid: function () {
      this.width = cv.layout.Manager.getAvailableWidth();
      this.height = cv.layout.Manager.getAvailableHeight();
      this.getPageSize().innerHTML = '#main,.page{width:' + (this.width - 0) + 'px;height:' + this.height + 'px;}';

      this.invalidPagesize = false;
    },

    makeRowspanValid: function () {
      var elem = qx.bom.Html.clean(['<div class="clearfix" id="calcrowspan"><div id="containerDiv" class="widget_container"><div class="widget clearfix text" id="innerDiv" /></div></div>'])[0];
      qx.dom.Element.insertEnd(elem, document.body);
      this.__updateRowHeight(elem);
    },

    __updateRowHeight: function(elem) {
      var height = qx.bom.element.Dimension.getHeight(elem);
      if (height  === 0) {
        // not ready try again
        qx.bom.AnimationFrame.request(qx.lang.Function.curry(this.__updateRowHeight, elem), this);
        return;
      }
      var styles = '';

      for (var rowspan in cv.layout.Manager.usedRowspans) {
        styles += '.rowspan.rowspan' + rowspan
          + ' { height: '
          + Math.round((rowspan - 1) * height)
          + "px;}\n";
      }
      elem.remove();

      // set css style
      qx.bom.Selector.query('#rowspanStyle')[0].innerHTML = styles;
      this.invalidRowspan = false;
    },

    invalidateBackdrop: function () {
      this.invalidBackdrop = true;
      this.makeAllSizesValid();
    },
    invalidateNavbar: function () {
      this.invalidNavbar = true;
      this.invalidPagesize = true;
      this.makeAllSizesValid();
    },
    invalidateRowspan: function () {
      this.invalidRowspan = true;
      this.makeAllSizesValid();
    },
    invalidateScreensize: function () {
      this.invalidPagesize = true;
      this.invalidBackdrop = true;
      this.makeAllSizesValid();
    }
  }
});