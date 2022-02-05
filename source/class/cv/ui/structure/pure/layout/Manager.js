/* Manager.js 
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


/**
 */
qx.Class.define('cv.ui.structure.pure.layout.Manager', {

  type: 'static',

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

    LAYOUT_MODE: 'DEFAULT',

    COLSPAN_CLASS: null,

    getCurrentPageNavbarVisibility: function () {
      if (this.currentPageNavbarVisibility === null ||
        this.currentPageNavbarVisibility.left === null ||
        this.currentPageNavbarVisibility.right === null ||
        this.currentPageNavbarVisibility.top === null ||
        this.currentPageNavbarVisibility.bottom === null
      ) {
        this.currentPageNavbarVisibility = cv.Application.structureController.pagePartsHandler.getNavbarsVisibility(cv.Application.structureController.getCurrentPage());
      }
      return this.currentPageNavbarVisibility;
    },

    // return S, M or L depening on the passed width
    getColspanClass: function (width) {
      if (width <= cv.Config.maxScreenWidthColspanS) {
        return 'S';
      }
      if (width <= cv.Config.maxScreenWidthColspanM) {
        return 'M';
      }
      return 'L';
    },

    adjustColumns: function () {
      const width = this.getAvailableWidth();
      const oldClass = this.getColspanClass(this.oldWidth);
      const newClass = this.getColspanClass(width);

      this.oldWidth = width;
      this.COLSPAN_CLASS = newClass;
      return oldClass !== newClass;
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
      const bodyWidth = document.documentElement.clientWidth;
      //      console.log("Mobile.css use changed "+mobileUseChanged);
      this.currentPageUnavailableWidth = 0;
      const navbarVisibility = this.getCurrentPageNavbarVisibility();

      const left = document.querySelector('#navbarLeft');
      let widthNavbarLeft = 0;
      if (left) {
        const leftRect = left.getBoundingClientRect();
        widthNavbarLeft = navbarVisibility.left === true && window.getComputedStyle(left)['display'] !== 'none' ? Math.round(leftRect.right - leftRect.left) : 0;
      }
      if (widthNavbarLeft >= bodyWidth || qx.core.Init.getApplication().getMobile()) {
        // Left-Navbar has the same size as the complete body, this can happen, when the navbar has no content
        // maybe there is a better solution to solve this problem
        // OR: we have a mobile device where the nav bar is floating above the other content
        widthNavbarLeft = 0;
      }
      const right = document.querySelector('#navbarRight');
      let widthNavbarRight = 0;
      if (right) {
        const rightRect = right.getBoundingClientRect();
        widthNavbarRight = navbarVisibility.right === true && window.getComputedStyle(right)['display'] !== 'none' ? Math.round(rightRect.right - rightRect.left) : 0;
      }
      if (widthNavbarRight >= bodyWidth || qx.core.Init.getApplication().getMobile()) {
        // Right-Navbar has the same size as the complete body, this can happen, when the navbar has no content
        // maybe there is a better solution to solve this problem
        // OR: we have a mobile device where the nav bar is floating above the other content
        widthNavbarRight = 0;
      }
      this.currentPageUnavailableWidth = widthNavbarLeft + widthNavbarRight + 1; // remove an additional pixel for Firefox
      //      console.log("Width: "+bodyWidth+" - "+widthNavbarLeft+" - "+widthNavbarRight);

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
     * Notice: the former way to use the subtract the main.position().top value from the total height leads to errors in certain cases
     *         because the value of main.position().top is not reliable all the time
     */
    getAvailableHeight: function () {
      const windowHeight = document.documentElement.clientHeight;
      this.currentPageUnavailableHeight = 0;
      const emptyRect = {
        top: 0,
        bottom: 0
      };
      const navbarVisibility = this.getCurrentPageNavbarVisibility();
      const topNav = document.querySelector('#navbarTop');
      const top = document.querySelector('#top');
      const bottomNav = document.querySelector('#navbarBottom');
      const bottom = document.querySelector('#bottom');
      const topNavDisplay = topNav ? window.getComputedStyle(topNav)['display'] : 'none';
      const topDisplay = top ? window.getComputedStyle(top)['display'] : 'none';
      const bottomNavDisplay = bottomNav ? window.getComputedStyle(bottomNav)['display'] : 'none';
      const bottomDisplay = bottom ? window.getComputedStyle(bottom)['display'] : 'none';
      const topRect = top ? top.getBoundingClientRect() : emptyRect;
      const topHeight = Math.round(topRect.bottom - topRect.top);
      const topNavRect = topNav ? topNav.getBoundingClientRect() : emptyRect;
      const topNavHeight = Math.round(topNavRect.bottom - topNavRect.top);
      const bottomNavRect = bottomNav ? bottomNav.getBoundingClientRect() : emptyRect;
      const bottomNavHeight = Math.round(bottomNavRect.bottom - bottomNavRect.top);
      const bottomRect = bottom ? bottom.getBoundingClientRect() : emptyRect;
      const bottomHeight = Math.round(bottomRect.bottom - bottomRect.top);
      const nav_pathRect = document.querySelector('.nav_path').getBoundingClientRect();
      const navPathHeight = Math.round(nav_pathRect.bottom - nav_pathRect.top);

      if (topDisplay !== 'none' && topHeight > 0) {
        this.currentPageUnavailableHeight += Math.max(topHeight, navPathHeight);
      }
      if (topNavDisplay !== 'none' && navbarVisibility.top === true && topNavHeight > 0) {
        this.currentPageUnavailableHeight += topNavHeight;
      }
      if (bottomNavDisplay !== 'none' && navbarVisibility.bottom === true && bottomNavHeight > 0) {
        this.currentPageUnavailableHeight += bottomNavHeight;
      }
      if (bottomDisplay !== 'none' && bottomHeight > 0) {
        this.currentPageUnavailableHeight += bottomHeight;
      }
      if (this.currentPageUnavailableHeight > 0) {
        this.currentPageUnavailableHeight += 1;// remove an additional pixel for Firefox
      }
      return windowHeight - this.currentPageUnavailableHeight;
    },

    rowspanClass: function (rowspan) {
      cv.Config.configSettings.usedRowspans[rowspan] = true;
      return 'rowspan rowspan' + rowspan;
    },

    getWidgetColspan: function(widget, width) {
      if (widget.getColspan) {
        if (width <= cv.Config.maxScreenWidthColspanS) {
          return widget.getColspanS();
        }
        if (width <= cv.Config.maxScreenWidthColspanM) {
          return widget.getColspanM();
        }
        return widget.getColspan();
      }
      return 0;
    },

    getLayoutSuffix: function (width) {
      let suffix = '';
      if (width <= cv.Config.maxScreenWidthColspanS) {
        suffix = '-s';
      } else if (width <= cv.Config.maxScreenWidthColspanM) {
        suffix = '-m';
      }
      return suffix;
    },

    /**
     * applies the correct width to the widgets corresponding to the given colspan setting
     *
     * @param selector {String?} only update elements found by the given selector
     * @param includeNavbars {Boolean?} also update navbar elements (default: true)
     */
    applyColumnWidths: function (selector, includeNavbars) {
      const width = this.getAvailableWidth();
      let mainAreaColspan = cv.Config.defaultColumns;
      const main = document.querySelector('#main');
      if (main) {
        const mainAreaColumns = document.querySelector('#main').dataset['columns'];
        if (mainAreaColumns) {
          mainAreaColspan = parseInt(mainAreaColumns);
        }
      }

      const pageSelector = selector ? selector : '#main .activePage';
      let selectors = [];

      if (includeNavbars === true) {
        selectors = ['#navbarTop', '#navbarLeft', pageSelector, '#navbarRight', '#navbarBottom'];
      } else {
        selectors = [pageSelector];
      }

      selectors.forEach(function (area) {
        const allContainer = document.querySelectorAll(area + ' .widget_container');
        if (allContainer.length > 0) {
          let areaColspan = cv.Config.defaultColumns
          const areaElement = document.querySelector(area);
          if (areaElement) {
            const areaColumns = areaElement.dataset['columns'];
            if (areaColumns) {
              areaColspan = parseInt(areaColumns);
            }
          }
          allContainer.forEach(function(child) {
            const widget = cv.ui.structure.WidgetFactory.getInstanceByElement(child);
            const ourColspan = this.getWidgetColspan(widget, width);

            let w = 'auto';
            if (ourColspan > 0) {
              w = Math.min(100, ourColspan / areaColspan * 100) + '%';
            }
            this.__applyWidthClass(child, w);
          }, this);
        }

        // and elements inside groups
        const adjustableElements = document.querySelectorAll(area + ' .group .widget_container');
        adjustableElements.forEach(function (e) {
          const widget = cv.ui.structure.WidgetFactory.getInstanceByElement(e);
          let ourColspan = this.getWidgetColspan(widget, width);
          if (ourColspan === null) {
            // workaround for nowidget groups
            const groupChild = cv.util.Tree.getChildWidgets(widget, 'group')[0];
            ourColspan = this.getWidgetColspan(groupChild, width);
          }
          let w = 'auto';
          if (ourColspan > 0) {
            let groupColspan = mainAreaColspan;
            const parentGroupElement = cv.util.Tree.getParent(e, '.widget_container', '.group', 1)[0];
            if (parentGroupElement) {
              const parentGroupWidget = cv.ui.structure.WidgetFactory.getInstanceByElement(parentGroupElement.parentNode);
              if (parentGroupWidget) {
                groupColspan = Math.min(mainAreaColspan, this.getWidgetColspan(parentGroupWidget, width));
              }
            }
            w = Math.min(100, ourColspan / groupColspan * 100) + '%'; // in percent
          }
          this.__applyWidthClass(e, w);
        }, this);
      }, this);
    },

    __applyWidthClass: function (elem, widthClassSuffix) {
      if (widthClassSuffix === 'auto') {
        elem.style.width = widthClassSuffix;
      } else {
        switch (this.LAYOUT_MODE) {
          case 'GRID':
            // remove all old width related classes
            elem.classList.forEach(function (cssClass) {
              if (cssClass.startsWith('width-')) {
                elem.classList.remove(cssClass);
              }
            }, this);
            elem.classList.add('width-' + parseInt(widthClassSuffix));
            break;

          default:
            elem.style.width = widthClassSuffix;
            break;
        }
      }
    }
  }
});
