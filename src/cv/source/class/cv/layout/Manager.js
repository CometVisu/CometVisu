/**
 * @class cv.layout.Manager
 */
qx.Class.define('cv.layout.Manager', {

  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    // use to recognize if the screen width has crossed the maxMobileScreenWidth
    lastBodyWidth: 0,
    currentPageUnavailableWidth: -1,
    currentPageUnavailableHeight: -1,
    currentPageNavbarVisibility: null,
    oldWidth: -1,
    usedRowspans: {},

    getCurrentPageNavbarVisibility: function () {
      if (this.currentPageNavbarVisibility == null) {
        this.currentPageNavbarVisibility = Config.templateEngine.pagePartsHandler.getNavbarsVisibility(Config.templateEngine.currentPage);
      }
      return this.currentPageNavbarVisibility;
    },

    // return S, M or L depening on the passed width
    getColspanClass: function (width) {
      if (width <= Config.maxScreenWidthColspanS)
        return 'S';
      if (width <= Config.maxScreenWidthColspanM)
        return 'M';
      return 'L';
    },

    adjustColumns: function () {
      var
        width = this.getAvailableWidth(),
        oldClass = this.getColspanClass(this.oldWidth),
        newClass = this.getColspanClass(width);

      this.oldWidth = width;

      return oldClass != newClass;
    },

    /**
     * return the available width for a the currently visible page
     * the available width is calculated by subtracting the following elements widths (if they are visible) from the body width
     * - Left-Navbar
     * - Right-Navbar
     */
    getAvailableWidth: function () {
      // currently this calculation is done once after every page scroll (where Config.templateEngine.currentPageUnavailableWidth is reseted)
      // if the screen width falls below the threshold which activates/deactivates the mobile.css
      // the calculation has to be done again, even if the page hasn´t changed (e.g. switching between portrait and landscape mode on a mobile can cause that)
      var bodyWidth = $('body').width();
      var mobileUseChanged = (this.lastBodyWidth < Config.maxMobileScreenWidth) != (bodyWidth < Config.maxMobileScreenWidth);
      if (this.currentPageUnavailableWidth < 0 || mobileUseChanged || true) {
        //      console.log("Mobile.css use changed "+mobileUseChanged);
        this.currentPageUnavailableWidth = 0;
        var navbarVisibility = this.getCurrentPageNavbarVisibility(Config.templateEngine.currentPage);
        var widthNavbarLeft = navbarVisibility.left == "true" && $('#navbarLeft').css('display') != "none" ? Math.ceil($('#navbarLeft').outerWidth()) : 0;
        if (widthNavbarLeft >= bodyWidth) {
          // Left-Navbar has the same size as the complete body, this can happen, when the navbar has no content
          // maybe there is a better solution to solve this problem
          widthNavbarLeft = 0;
        }
        var widthNavbarRight = navbarVisibility.right == "true" && $('#navbarRight').css('display') != "none" ? Math.ceil($('#navbarRight').outerWidth()) : 0;
        if (widthNavbarRight >= bodyWidth) {
          // Right-Navbar has the same size as the complete body, this can happen, when the navbar has no content
          // maybe there is a better solution to solve this problem
          widthNavbarRight = 0;
        }
        this.currentPageUnavailableWidth = widthNavbarLeft + widthNavbarRight + 1; // remove an additional pixel for Firefox
        //      console.log("Width: "+bodyWidth+" - "+widthNavbarLeft+" - "+widthNavbarRight);
      }
      this.lastBodyWidth = bodyWidth;
      return bodyWidth - this.currentPageUnavailableWidth;
    },

    /**
     * return the available height for a the currently visible page
     * the available height is calculated by subtracting the following elements heights (if they are visible) from the window height
     * - Top-Navigation
     * - Top-Navbar
     * - Bottom-Navbar
     * - Statusbar
     *
     * Notice: the former way to use the subtract the $main.position().top value from the total height leads to errors in certain cases
     *         because the value of $main.position().top is not reliable all the time
     */
    getAvailableHeight: function () {
      var windowHeight = $(window).height();
      this.currentPageUnavailableHeight = 0;
      var navbarVisibility = this.getCurrentPageNavbarVisibility(Config.templateEngine.currentPage);
      var heightStr = "Height: " + windowHeight;
      if ($('#top').css('display') != 'none' && $('#top').outerHeight(true) > 0) {
        this.currentPageUnavailableHeight += Math.max($('#top').outerHeight(true), $('.nav_path').outerHeight(true));
        heightStr += " - " + Math.max($('#top').outerHeight(true), $('.nav_path').outerHeight(true));
      }
      else {
        heightStr += " - 0";
      }
      //      console.log($('#navbarTop').css('display')+": "+$('#navbarTop').outerHeight(true));
      if ($('#navbarTop').css('display') != 'none' && navbarVisibility.top == "true" && $('#navbarTop').outerHeight(true) > 0) {
        this.currentPageUnavailableHeight += $('#navbarTop').outerHeight(true);
        heightStr += " - " + $('#navbarTop').outerHeight(true);
      }
      else {
        heightStr += " - 0";
      }
      if ($('#navbarBottom').css('display') != 'none' && navbarVisibility.bottom == "true" && $('#navbarBottom').outerHeight(true) > 0) {
        this.currentPageUnavailableHeight += $('#navbarBottom').outerHeight(true);
        heightStr += " - " + $('#navbarBottom').outerHeight(true);
      }
      else {
        heightStr += " - 0";
      }
      if ($('#bottom').css('display') != 'none' && $('#bottom').outerHeight(true) > 0) {
        this.currentPageUnavailableHeight += $('#bottom').outerHeight(true);
        heightStr += " - #bottom:" + $('#bottom').outerHeight(true);
      }
      else {
        heightStr += " - 0";
      }
      if (this.currentPageUnavailableHeight > 0) {
        this.currentPageUnavailableHeight += 1;// remove an additional pixel for Firefox
      }
      //console.log(heightStr);
      //console.log(windowHeight+" - "+Config.templateEngine.currentPageUnavailableHeight);
      return windowHeight - this.currentPageUnavailableHeight;
    },

    rowspanClass: function (rowspan) {
      this.usedRowspans[rowspan] = true;
      return 'rowspan rowspan' + rowspan;
    },

    dataColspan: function (data) {
      if (this.width <= Config.maxScreenWidthColspanS)
        return data.colspanS;
      if (this.width <= Config.maxScreenWidthColspanM)
        return data.colspanM;
      return data.colspan;
    },

    /**
     * applies the correct width to the widgets corresponding to the given colspan setting
     */
    applyColumnWidths: function () {
      var
        width = this.getAvailableWidth();

      // all containers
      ['#navbarTop', '#navbarLeft', '#main', '#navbarRight', '#navbarBottom'].forEach(function (area) {
        var
          allContainer = $(area + ' .widget_container'),
          areaColumns = $(area).data('columns');
        allContainer.each(function (i, e) {
          var
            $e = $(e),
            data = Config.templateEngine.getWidgetData(e.id),
            ourColspan = this.dataColspan(data);

          var w = 'auto';
          if (ourColspan > 0) {
            var areaColspan = areaColumns || Config.defaultColumns;
            w = Math.min(100, ourColspan / areaColspan * 100) + '%';
          }
          $e.css('width', w);
        }.bind(this));
        // and elements inside groups
        var areaColumns = $('#main').data('columns');
        var adjustableElements = $('.group .widget_container');
        adjustableElements.each(function (i, e) {
          var
            $e = $(e),
            data = Config.templateEngine.getWidgetData(e.id),
            ourColspan = this.dataColspan(data);
          if (ourColspan == undefined) {
            // workaround for nowidget groups
            ourColspan = this.dataColspan(Config.templateEngine.getWidgetDataByElement($e.children('.group')));
          }
          var w = 'auto';
          if (ourColspan > 0) {
            var areaColspan = areaColumns || Config.defaultColumns;
            var groupColspan = Math.min(areaColspan, this.dataColspan(Config.templateEngine.getWidgetDataByElement($e.parentsUntil(
              '.widget_container', '.group'))));
            w = Math.min(100, ourColspan / groupColspan * 100) + '%'; // in percent
          }
          $e.css('width', w);
        }.bind(this));
      }, this);
    }
  }
});
