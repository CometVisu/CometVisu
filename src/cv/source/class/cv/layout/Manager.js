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
        this.currentPageNavbarVisibility = cv.TemplateEngine.getInstance().pagePartsHandler.getNavbarsVisibility(cv.TemplateEngine.getInstance().currentPage);
      }
      return this.currentPageNavbarVisibility;
    },

    // return S, M or L depening on the passed width
    getColspanClass: function (width) {
      if (width <= cv.Config.maxScreenWidthColspanS)
        return 'S';
      if (width <= cv.Config.maxScreenWidthColspanM)
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
      // currently this calculation is done once after every page scroll (where cv.TemplateEngine.getInstance()currentPageUnavailableWidth is reseted)
      // if the screen width falls below the threshold which activates/deactivates the mobile.css
      // the calculation has to be done again, even if the page hasn´t changed (e.g. switching between portrait and landscape mode on a mobile can cause that)
      var bodyWidth = $('body').width();
      var mobileUseChanged = (this.lastBodyWidth < cv.Config.maxMobileScreenWidth) != (bodyWidth < cv.Config.maxMobileScreenWidth);
      if (this.currentPageUnavailableWidth < 0 || mobileUseChanged || true) {
        //      console.log("Mobile.css use changed "+mobileUseChanged);
        this.currentPageUnavailableWidth = 0;
        var navbarVisibility = this.getCurrentPageNavbarVisibility(cv.TemplateEngine.getInstance().currentPage);
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
      var navbarVisibility = this.getCurrentPageNavbarVisibility(cv.TemplateEngine.getInstance().currentPage);
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
      //console.log(windowHeight+" - "+cv.TemplateEngine.getInstance()currentPageUnavailableHeight);
      return windowHeight - this.currentPageUnavailableHeight;
    },

    rowspanClass: function (rowspan) {
      this.usedRowspans[rowspan] = true;
      return 'rowspan rowspan' + rowspan;
    },

    getWidgetColspan: function(widget) {
      var width = this.getAvailableWidth();
      if (width <= cv.Config.maxScreenWidthColspanS)
        return widget.getColspanS();
      if (width <= cv.Config.maxScreenWidthColspanM)
        return widget.getColspanM();
      return widget.getColspan();
    },

    /**
     * applies the correct width to the widgets corresponding to the given colspan setting
     */
    applyColumnWidths: function () {
      var width = this.getAvailableWidth();
      var mainAreaColumns = qx.bom.element.Dataset.get(qx.bom.Selector.query('#main')[0], 'columns');

      // all containers
      ['#navbarTop', '#navbarLeft', '#main', '#navbarRight', '#navbarBottom'].forEach(function (area) {
        var allContainer = qx.bom.Selector.query(area + ' .widget_container');
        if (allContainer.length > 0) {
          var areaColumns = qx.bom.element.Dataset.get(qx.bom.Selector.query(area)[0], 'columns');
          allContainer.forEach(function(child) {
            var widget = cv.structure.WidgetFactory.getInstanceByElement(child);
            var ourColspan = this.getWidgetColspan(widget);

            var w = 'auto';
            if (ourColspan > 0) {
              var areaColspan = areaColumns || cv.Config.defaultColumns;
              w = Math.min(100, ourColspan / areaColspan * 100) + '%';
            }
            qx.bom.element.Style.set(child, 'width', w);
          }, this);

        }

        // and elements inside groups
        var adjustableElements = qx.bom.Selector.query('.group .widget_container');
        adjustableElements.forEach(function (e) {
          var
            widget = cv.structure.WidgetFactory.getInstanceByElement(e),
            ourColspan = this.getWidgetColspan(widget);
          if (ourColspan === null) {
            // workaround for nowidget groups
            var groupChild = cv.util.Tree.getChildWidgets(widget, 'group')[0];
            ourColspan = this.getWidgetColspan(groupChild);
          }
          var w = 'auto';
          if (ourColspan > 0) {
            var areaColspan = parseInt(mainAreaColumns || cv.Config.defaultColumns);
            var groupColspan = areaColspan;
            var parentGroupElement = cv.util.Tree.getParent(e, '.widget_container', '.group', 1)[0];
            if (parentGroupElement) {
              var parentGroupWidget = cv.structure.WidgetFactory.getInstanceByElement(qx.dom.Element.getParentElement(parentGroupElement));
              if (parentGroupWidget) {
                groupColspan = Math.min(areaColspan, this.getWidgetColspan(parentGroupWidget));
              }
            }
            w = Math.min(100, ourColspan / groupColspan * 100) + '%'; // in percent
          }
          qx.bom.element.Style.set(e, 'width', w);
        }, this);
      }, this);
    }
  }
});
