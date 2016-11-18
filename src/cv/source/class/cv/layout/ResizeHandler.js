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
    invalidScreensize: true,
    $pageSize: null,
    $navbarTop: null,
    $navbarBottom: null,
    width: 0,
    height: 0,

    getPageSize: function () {
      if (!this.$pageSize) {
        this.$pageSize = $('#pageSize');
      }
      return this.$pageSize;
    },

    getNavbarTop: function () {
      if (!this.$navbarTop) {
        this.$navbarTop = $('#navbarTop');
      }
      return this.$navbarTop;
    },

    getNavbarBottom: function () {
      if (!this.$navbarBottom) {
        this.$navbarBottom = $('#navbarBottom');
      }
      return this.$navbarBottom;
    },

    makeAllSizesValid: function () {
      this.invalidPagesize && this.makePagesizeValid(); // must be first due to dependencies
      this.invalidNavbar && this.makeNavbarValid();
      this.invalidRowspan && this.makeRowspanValid();
      this.invalidBackdrop && this.makeBackdropValid();
    },

    makeBackdropValid: function () {
      if (!Config.templateEngine.currentPage)
        return;

      // TODO use page object
      var widgetData = Config.templateEngine.getWidgetData(Config.templateEngine.currentPage.attr('id'));
      if ('2d' === widgetData.type) {
        var
          cssPosRegEx = /(\d*)(.*)/,
          backdrop = Config.templateEngine.currentPage.children().children().filter(widgetData.backdroptype)[0],
          backdropSVG = widgetData.backdroptype === 'embed' ? backdrop.getSVGDocument() : null,
          backdropBBox = backdropSVG ? backdropSVG.children[0].getBBox() : {},
          backdropNWidth = backdrop.naturalWidth || backdropBBox.width || this.width,
          backdropNHeight = backdrop.naturalHeight || backdropBBox.height || this.height,
          backdropScale = Math.min(width / backdropNWidth, height / backdropNHeight),
          backdropWidth = backdropNWidth * backdropScale,
          backdropHeight = backdropNHeight * backdropScale,
          backdropPos = widgetData.backdropalign.split(' '),
          backdropLeftRaw = backdropPos[0].match(cssPosRegEx),
          backdropTopRaw = backdropPos[1].match(cssPosRegEx),
          backdropLeft = backdropLeftRaw[2] === '%' ? (this.width > backdropWidth ? ((this.width - backdropWidth ) * (+backdropLeftRaw[1]) / 100) : 0) : +backdropLeftRaw[1],
          backdropTop = backdropTopRaw[2] === '%' ? (this.height > backdropHeight ? ((this.height - backdropHeight) * (+backdropTopRaw[1] ) / 100) : 0) : +backdropTopRaw[1],
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
          $(backdrop).css({
            width: backdropWidth + 'px',
            height: backdropHeight + 'px',
            left: backdropLeft + 'px',
            top: backdropTop + 'px'
          });
        }

        Config.templateEngine.currentPage.find('.widget_container').toArray().forEach(function (widgetContainer) {
          var widgetData = Config.templateEngine.getWidgetData(widgetContainer.id);
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
      if (Config.mobileDevice) {
        //do nothing
      } else {
        if (
          (this.getNavbarTop().css('display') !== 'none' && this.getNavbarTop().outerHeight(true) <= 2) ||
          (this.getNavbarBottom().css('display') !== 'none' && this.getNavbarBottom().innerHeight() <= 2)
        ) {
          // Top/Bottom-Navbar is not initialized yet, wait some time and recalculate available height
          // this is an ugly workaround, if someone can come up with a better solution, feel free to implement it
          window.requestAnimationFrame(this.invalidateNavbar.bind(this));
          return;
        }
      }
      if (cv.layout.Manager.adjustColumns()) {
        // the amount of columns has changed -> recalculate the widgets widths
        cv.layout.Manager.applyColumnWidths();
      }

      this.invalidNavbar = false;
    },

    makePagesizeValid: function () {
      this.width = cv.layout.Manager.getAvailableWidth();
      this.height = cv.layout.Manager.getAvailableHeight();
      this.getPageSize().text('#main,.page{width:' + (this.width - 0) + 'px;height:' + this.height + 'px;}');

      this.invalidPagesize = false;
    },

    makeRowspanValid: function () {
      var
        dummyDiv = $(
          '<div class="clearfix" id="calcrowspan"><div id="containerDiv" class="widget_container"><div class="widget clearfix text" id="innerDiv" /></div></div>')
          .appendTo(document.body).show(),
        singleHeight = $('#containerDiv').outerHeight(false),
        singleHeightMargin = $('#containerDiv').outerHeight(true),
        styles = '';

      for (var rowspan in cv.layout.Manager.usedRowspans) {
        styles += '.rowspan.rowspan' + rowspan
          + ' { height: '
          + ((rowspan - 1) * singleHeightMargin + singleHeight)
          + "px;}\n";
      }

      $('#calcrowspan').remove();

      // set css style
      $('#rowspanStyle').text(styles);

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
      this.invalidScreensize = true;
      this.invalidPagesize = true;
      this.invalidBackdrop = true;
      this.makeAllSizesValid();
    }
  }
});