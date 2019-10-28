/* PagePartsHandler.js 
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


/**
 * @author Christian Mayer
 * @since 2010
 */
qx.Class.define('cv.ui.PagePartsHandler', {
  extend: qx.core.Object,

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct: function () {
    this.navbars = {
      top: {
        dynamic: false
      },
      left: {
        dynamic: false
      },
      right: {
        dynamic: false
      },
      bottom: {
        dynamic: false
      }
    };
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    navbars: null,

    updateTopNavigation: function (path) {
      path = path.split('_'); path.pop();
      var id = "id_"; //path[0];
      var pageTitle = document.querySelector("#"+id+" h1").textContent;
      var nav = '<a href="javascript:cv.TemplateEngine.getInstance().scrollToPage(\'' + id + '\')" id="breadcrump_pagejump_'+id+'">' +
        pageTitle + '</a>';
      for (var i = 1; i < path.length; i++) { // element 0 is id_ (JNK)
        id += path[i] + '_';
        var pageElem = document.querySelector("#"+id);
        if (pageElem && pageElem.classList.contains("page")) { // FIXME is this still needed?!?
          pageTitle = document.querySelector("#"+id+" h1").textContent;
          nav += '<span> &#x25ba; </span>' +
            '<a href="javascript:cv.TemplateEngine.getInstance().scrollToPage(\'' + id + '\')" id="breadcrump_pagejump_'+id+'">' +
            pageTitle + '</a>';
        }
      }
      document.querySelector(".nav_path").innerHTML = nav;
      // cv.TemplateEngine.getInstance().handleResize(); - TODO CM160528: why? This shouldn't have
      //                             any effect on the page size => commented out
    },

    /**
     * Change the size of the selected navbar
     *
     * currently only "left" and "right" are implemented
     */
    navbarSetSize: function (position, size) {
      var cssSize = size + (isFinite(size) ? 'px' : '');
      switch (position) {
        case 'left':
          document.querySelector('#navbarLeft').style.width = cssSize;
          cv.ui.layout.ResizeHandler.invalidateNavbar();
          break;

        case 'right':
          document.querySelector('#centerContainer').style["padding-right"] = cssSize;
          Object.entries({
            width: cssSize,
            'margin-right': '-' + cssSize
          }).forEach(function(key_value){document.querySelector('#navbarRight').style[key_value[0]]=key_value[1];});
          cv.ui.layout.ResizeHandler.invalidateNavbar();
          break;
      }
    },

    getNavbarsVisibility: function (page) {
      if (!page) {
        page = cv.TemplateEngine.getInstance().getCurrentPage();
      }
      if (!page) { return {top: true, bottom: true, left: true, right: true}; }
      if (typeof page === "string") {
        page = cv.ui.structure.WidgetFactory.getInstanceById(page);
      } else if (page.attributes ) {
        page = cv.ui.structure.WidgetFactory.getInstanceById(page.getAttribute('id'));
      }

      if (!page) {
        return {top: true, bottom: true, left: true, right: true};
      } else {
        return {
          top: page.getShowNavbarTop(),
          bottom: page.getShowNavbarBottom(),
          left: page.getShowNavbarLeft(),
          right: page.getShowNavbarRight()
        };
      }
    },

    /**
     * update the visibility ob top-navigation, footer and navbar for this page
     *
     * @param page {cv.ui.structure.pure.Page} page to update the parts for
     * @param speed {Number} animation duration for changes
     */
    updatePageParts: function (page, speed) {
      // default values
      var showtopnavigation = true;
      var showfooter = true;
      var shownavbar = this.getNavbarsVisibility(page);

      if (page) {
        if (!page.isInitialized()) {
          // page is not ready, defer this update
          var self = this;
          page.addListenerOnce("changeInitialized", function(){self.updatePageParts(page,speed);}, this);
          return;
        }
        showtopnavigation = page.getShowTopNavigation();
        showfooter = page.getShowFooter();
      }
      var topDisplay = window.getComputedStyle(document.querySelector("#top"))["display"];
      var bottomDisplay = window.getComputedStyle(document.querySelector("#bottom"))["display"];
      if (showtopnavigation) {
        if (topDisplay === "none") {
          document.querySelectorAll('#top, #top > *').forEach(function(elem) {
            elem.style.display = "block";
          }, this);
          this.removeInactiveNavbars(page.getPath());
        }
      } else {
        if (topDisplay !== "none") {
          document.querySelector("#top").style.display = "none";
          this.removeInactiveNavbars(page.getPath());
        }
      }
      if (showfooter) {
        if (bottomDisplay === "none") {
          document.querySelector("#bottom").style.display = "block";
          this.removeInactiveNavbars(page.getPath());
        }
      } else {
        if (bottomDisplay !== "none") {
          document.querySelector("#bottom").style.display = "none";
          this.removeInactiveNavbars(page.getPath());
        }
      }
      ['Left', 'Top', 'Right', 'Bottom'].forEach(function (value) {
        var
          key = value.toLowerCase(),
          navbar = document.querySelector('#navbar' + value),
          display = window.getComputedStyle(navbar)["display"],
          isLoading = navbar.classList.contains('loading');
        if (shownavbar[key] === true) {
          if (display === "none" || isLoading) {
            this.fadeNavbar(value, "in", speed);
            this.removeInactiveNavbars(page.getPath());
          }
        } else {
          if (display !== "none" || isLoading) {
            this.fadeNavbar(value, "out", speed);
          }
        }
      }, this);
      cv.ui.layout.ResizeHandler.invalidateNavbar();
    },

    /**
     * fades in/out a navbar
     *
     * @param position {String}  [Top|Left|Right|Bottom]
     * @param direction {String} [in|out]
     * @param speed {Number} time in milliseconds
     */
    fadeNavbar: function (position, direction, speed) {
      speed = (speed !== undefined) ? speed : cv.TemplateEngine.getInstance().main_scroll.getSpeed();
      var initCss = {};
      var targetCss = {};
      var navbar = document.querySelector('#navbar' + position);
      var key = position.toLowerCase();
      var onAnimationEnd = function () {
        cv.ui.layout.ResizeHandler.invalidateNavbar();
      };
      switch (direction) {
        case "in":
          if (window.getComputedStyle(navbar)["display"] === 'none') {
            initCss.display = 'block';
          }
          targetCss[key] = 0;
          switch (position) {
            case "Top":
            case "Bottom":
              initCss[key] = -navbar.getBoundingClientRect().height;
              break;
            case "Left":
            case "Right":
              initCss[key] = -navbar.getBoundingClientRect().width;
              break;
          }
          break;
        case "out":
          onAnimationEnd = function () {
            navbar.style.display = "none";
            cv.ui.layout.ResizeHandler.invalidateNavbar();
          };
          switch (position) {
            case "Top":
            case "Bottom":
              targetCss[key] = -navbar.getBoundingClientRect().height;
              break;
            case "Left":
            case "Right":
              targetCss[key] = -navbar.getBoundingClientRect().width;
              break;
          }
          break;
      }
      Object.entries(initCss).forEach(function(key,value){navbar.style[key]=value;});
      if (speed === 0) {
        Object.entries(targetCss).forEach(function(key,value){navbar.style[key]=value;});
        onAnimationEnd();
      } else {
        var spec = {
          duration: speed,
          timing: cv.TemplateEngine.getInstance().main_scroll.getEasing(),
          keep: 100,
          keyFrames: {
            0: initCss,
            100: targetCss
          }
        };
        var anim = qx.bom.element.Animation.animate(navbar, spec);
        anim.addListenerOnce("end", onAnimationEnd, this);
      }
    },

    /**
     * traverse down the page tree from root page id_ -> .. -> page_id activate
     * all navbars in that path deactivate all others
     *
     * @param page_id {String}
     */
    initializeNavbars: function (page_id) {
      this.removeInactiveNavbars(page_id);
      var tree = Array.from( document.querySelectorAll('#id_') );
      if (page_id !== "id_") {
        var parts = page_id.split("_");
        parts.pop();
        parts[0] = '';
        for (var i = 0; i < parts.length; i++) {
          var subPath = parts.slice(0, i + 1).join('_');
          if (subPath) {
            var item = document.querySelectorAll('#id' + subPath + "_.page");
            if (item.length === 1) {
              tree.push(item[0]);
            }
          }
        }
      }
      var level = 1;
      tree.forEach(function (elem) {
        var id = elem.getAttribute('id');
        var topNav = document.querySelector('#' + id + 'top_navbar');
        var topData = cv.data.Model.getInstance().getWidgetData(id + 'top_navbar');
        var rightNav = document.querySelector('#' + id + 'right_navbar');
        var rightData = cv.data.Model.getInstance().getWidgetData(id + 'right_navbar');
        var bottomNav = document.querySelector('#' + id + 'bottom_navbar');
        var bottomData = cv.data.Model.getInstance().getWidgetData(id + 'bottom_navbar');
        var leftNav = document.querySelector('#' + id + 'left_navbar');
        var leftData = cv.data.Model.getInstance().getWidgetData(id + 'left_navbar');
        // console.log(tree.length+"-"+level+"<="+topData.scope);
        if (topNav) {
          if (topData.scope === undefined || topData.scope < 0 || tree.length - level <= topData.scope) {
            topNav.classList.add('navbarActive');
          } else {
            topNav.classList.remove('navbarActive');
          }
        }
        if (rightNav) {
          if (rightData.scope === undefined || rightData.scope < 0 || tree.length - level <= rightData.scope) {
            rightNav.classList.add('navbarActive');
          } else {
            rightNav.classList.remove('navbarActive');
          }
        }
        if (bottomNav) {
          if (bottomData.scope === undefined || bottomData.scope < 0 || tree.length - level <= bottomData.scope) {
            bottomNav.classList.add('navbarActive');
          } else {
            bottomNav.classList.remove('navbarActive');
          }
        }
        if (leftNav) {
          if (leftData.scope === undefined || leftData.scope < 0 || tree.length - level <= leftData.scope) {
            leftNav.classList.add('navbarActive');
          } else {
            leftNav.classList.remove('navbarActive');
          }
        }
        level++;
      });
      cv.ui.layout.ResizeHandler.invalidateNavbar();
    },

    removeInactiveNavbars: function (page_id) {
      // remove all navbars that do not belong to this page
      document.querySelectorAll('.navbar.navbarActive').forEach(function (elem) {
        var navBarPath = elem.getAttribute('id').split('_');
        // skip last 2 elements e.g. '_top_navbar'
        navBarPath = navBarPath.slice(0, navBarPath.length - 2).join('_');
        var expr = new RegExp("^" + navBarPath + ".*", "i");
        if (navBarPath !== page_id && !expr.test(page_id)) {
          elem.classList.remove('navbarActive');
        }
      });
    }
  }
});