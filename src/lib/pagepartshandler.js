/* pagepartshandler.js (c) 2010-2015 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 * 
 * @module PagePartsHandler
 * @title  CometVisu templateengine
 */

define([ 'jquery' ], function( $ ) {
  "use strict";
  return function PagePartsHandler() {
  var thisPagePartsHandler = this;
  this.navbars = { // store informations about the nav bars
      top : {
        dynamic : false
      },
      left : {
        dynamic : false
      },
      right : {
        dynamic : false
      },
      bottom : {
        dynamic : false
      }
    };
  
  this.updateTopNavigation = function( self ) {
    if( self === undefined ) self = this;
    var path = $('#main .page').eq(self.getIndex()).attr('id').split('_');
    var id = 'id_'; // path[0];
    var nav = '<a href="javascript:templateEngine.scrollToPage(\'' + id + '\')">'
            + $('#' + id + ' h1').text() + '</a>';
    for ( var i = 1; i < path.length; i++) { // element 0 is id_ (JNK)
      id += path[i] + '_';
      if ($('#' + id ).hasClass("page")) { // FIXME is this still needed?!?
        nav += '<span> &#x25ba; </span>'
            + '<a href="javascript:templateEngine.scrollToPage(\'' + id + '\')">'
            + $('#' + id + ' h1').text() + '</a>';
      }
    }
    $('.nav_path').html(nav);
    templateEngine.handleResize();
  };

  /**
   * Change the size of the selected navbar
   * 
   * currently only "left" and "right" are implemented
   */
  this.navbarSetSize = function(position, size) {
    var cssSize = size + (isFinite(size) ? 'px' : '');
    switch (position) {
    case 'left':
      $('#navbarLeft').css({
        width : cssSize
      });
      break;

    case 'right':
      $('#centerContainer').css('padding-right', cssSize);
      $('#navbarRight').css({
        width : cssSize,
        'margin-right' : '-' + cssSize
      });
      break;
    }
  };
  
  this.getNavbarsVisibility = function(page) {
    if (templateEngine.currentPageNavbarVisibility==null) {
      var pageData=templateEngine.widgetDataGet(page.attr('id'));
      if (page==null) {
        page = templateEngine.currentPage;
      }
      if (page==null || pageData==null) return { top : 'true', bottom : 'true', left : 'true', right : 'true' };
      var shownavbar = (pageData.shownavbar != undefined ? pageData.shownavbar : {
        top : 'inherit',
        bottom : 'inherit',
        left : 'inherit',
        right : 'inherit'
      });
      // set inherit for undefined 
      for (var pos in shownavbar) {
        if (shownavbar[pos] == undefined) {
          shownavbar[pos] = 'inherit';
        }
      }
      if (pageData != null) {
        // traverse up the page tree for shownavbar
        var parentPage = templateEngine.getParentPage(page);
        while (parentPage != null) {
          // do we need to go further? Check for inheritance
          var inherit = false;
          for (var pos in shownavbar) {
            if (shownavbar[pos] == 'inherit') {
              inherit = true;
              break;
            }
          }
          if (inherit) {
            var parentPageData=templateEngine.widgetDataGet(parentPage.attr('id'));
            if (parentPageData.shownavbar != undefined) {
              for (var pos in shownavbar) {
                if (shownavbar[pos] == 'inherit') {
                  // set value of parent page
                  shownavbar[pos] = parentPageData.shownavbar[pos];
                  if (shownavbar[pos] == undefined) {
                    shownavbar[pos] = 'inherit';
                  }
                }
              }
            }
          } else {
            // we are done
            break;
          }
          parentPage = templateEngine.getParentPage(parentPage);
        }
      }
      // set default values for shownavbar if not set otherwise
      for (var pos in shownavbar) {
        if (shownavbar[pos] == undefined || shownavbar[pos] == 'inherit') {
          shownavbar[pos] = 'true';
        }
      }
      templateEngine.currentPageNavbarVisibility = shownavbar;
//      console.log(shownavbar);
    }
    return templateEngine.currentPageNavbarVisibility;
  };

  /**
   * update the visibility ob top-navigation, footer and navbar for this page
   * 
   * @param page
   */
  this.updatePageParts = function( page, speed ) {
    // default values
    var showtopnavigation = true;
    var showfooter = true;
    var shownavbar = thisPagePartsHandler.getNavbarsVisibility(page);
    var pageData = templateEngine.widgetDataGet(page.attr('id'));
    if (pageData != null) {
      if (pageData.showtopnavigation != undefined) {
        showtopnavigation = pageData.showtopnavigation != "false";
      } else {
        // traverse up the page tree
        var parentPage = templateEngine.getParentPage(page);
        while (parentPage != null) {
          var parentData = templateEngine.widgetDataGet(parentPage.attr('id'));
          if (parentData.showtopnavigation != undefined) {
            showtopnavigation = parentData.showtopnavigation != "false";
            break;
          }
          parentPage = templateEngine.getParentPage(parentPage);
        }
      }
      if (pageData.showfooter != undefined) {
        showfooter = pageData.showfooter != "false";
      } else {
        // traverse up the page tree
        var parentPage = templateEngine.getParentPage(page);
        while (parentPage != null) {
          var parentData = templateEngine.widgetDataGet(parentPage.attr('id'));
          if (parentData.showfooter != undefined) {
            showfooter = parentData.showfooter != "false";
            break;
          }
          parentPage = templateEngine.getParentPage(parentPage);
        }
      }
    }
    
    if (showtopnavigation) {
      if ($('#top').css("display") == "none") {
        $('#top, #top > *').css("display", "block");
        thisPagePartsHandler.removeInactiveNavbars(page.attr('id'));
      }
    } else {
      if ($('#top').css("display") != "none") {
        $('#top').css("display", "none");
        thisPagePartsHandler.removeInactiveNavbars(page.attr('id'));
      }
    }
    if (showfooter) {
      if ($('#bottom').css("display") == "none") {
        $('#bottom').css("display", "block");
        thisPagePartsHandler.removeInactiveNavbars(page.attr('id'));
      }
    } else {
      if ($('#bottom').css("display") != "none") {
        $('#bottom').css("display", "none");
        thisPagePartsHandler.removeInactiveNavbars(page.attr('id'));
      }
    }
    [ 'Left', 'Top', 'Right', 'Bottom' ].forEach( function(value) {
      var 
        key = value.toLowerCase(),
        $navbar = $('#navbar' + value),
        display = $navbar.css("display"),
        isLoading = $navbar[0].classList.contains('loading');
      if (shownavbar[key] == 'true') {
        if (display == "none" || isLoading) {
          thisPagePartsHandler.fadeNavbar( value, "in", speed );
          thisPagePartsHandler.removeInactiveNavbars(page.attr('id'));
        }
      } else {
        if (display != "none" || isLoading) {
          thisPagePartsHandler.fadeNavbar( value, "out", speed );
        }
      }
    });
  };

  /**
   * fades in/out a navbar
   * 
   * @param position
   *                [Top|Left|Right|Bottom]
   * @param direction
   *                [in|out]
   * @param speed
   *                time in milliseconds
   */
  this.fadeNavbar = function(position, direction, speed) {
    speed = (speed !== undefined) ? speed : templateEngine.main_scroll.getConf().speed;
    var initCss = {};
    var targetCss = {};
    var navbar = $('#navbar' + position);
    var key = position.toLowerCase();
    var fn = function() {
      
    };
    switch (direction) {
    case "in":
      if (navbar.css('display') == 'none') {
        initCss.display = 'block';
      }
      targetCss[key] = 0;
      switch (position) {
      case "Top":
      case "Bottom":
        initCss[key] = -navbar.height();
        break;
      case "Left":
      case "Right":
        initCss[key] = -navbar.width();
        break;
      }
      break;
    case "out":
      fn = function() {
        navbar.css("display", "none");
      };
      switch (position) {
      case "Top":
      case "Bottom":
        targetCss[key] = -navbar.height();
        break;
      case "Left":
      case "Right":
        targetCss[key] = -navbar.width();
        break;
      }
      break;
    }
    navbar.css(initCss);
    if( speed == 0 ) {
      navbar.css(targetCss);
      fn();
    } else {
      navbar.animate(targetCss, speed, templateEngine.main_scroll.getConf().easing, fn);
    }
  };

  /**
   * traverse down the page tree from root page id_ -> .. -> page_id activate
   * all navbars in that path deactivate all others
   * 
   * @param page_id
   */
  this.initializeNavbars = function(page_id) {
    thisPagePartsHandler.removeInactiveNavbars(page_id);
    var tree = [ $('#id_').get(0) ];
    if (page_id != "id_") {
      var parts = page_id.split("_");
      parts.pop();
      parts[0] = '';
      for ( var i = 0; i < parts.length; i++) {
        var item = $('#id' + parts.slice(0, i + 1).join('_') + "_.page",
            '#pages');
        if (item.size() == 1) {
          tree.push(item.get(0));
        }
      }
    }
    var level = 1;
    $(tree).each(function(i) {
      var id = $(this).attr('id');
      var topNav = $('#' + id + 'top_navbar');
      var rightNav = $('#' + id + 'right_navbar');
      var bottomNav = $('#' + id + 'bottom_navbar');
      var leftNav = $('#' + id + 'left_navbar');
      // console.log(tree.length+"-"+level+"<="+topNav.data('scope'));
      if (topNav.size() > 0) {
        if (topNav.data('scope') == undefined || topNav.data('scope') < 0
            || tree.length - level <= topNav.data('scope')) {
          topNav.addClass('navbarActive');
        } else {
          topNav.removeClass('navbarActive');
        }
      }
      if (rightNav.size() > 0) {
        if (rightNav.data('scope') == undefined
            || rightNav.data('scope') < 0
            || tree.length - level <= rightNav.data('scope')) {
          rightNav.addClass('navbarActive');
        } else {
          rightNav.removeClass('navbarActive');
        }
      }
      if (bottomNav.size() > 0) {
        if (bottomNav.data('scope') == undefined
            || bottomNav.data('scope') < 0
            || tree.length - level <= bottomNav.data('scope')) {
          bottomNav.addClass('navbarActive');
        } else {
          bottomNav.removeClass('navbarActive');
        }
      }
      if (leftNav.size() > 0) {
        if (leftNav.data('scope') == undefined || leftNav.data('scope') < 0
            || tree.length - level <= leftNav.data('scope')) {
          leftNav.addClass('navbarActive');
        } else {
          leftNav.removeClass('navbarActive');
        }
      }
      level++;
    });
  };

  this.removeInactiveNavbars = function(page_id) {
    // remove all navbars that do not belong to this page
    $('.navbar.navbarActive').each(function(i) {
      var navBarPath = this.id.split('_');
      // skip last 2 elements e.g. '_top_navbar'
      navBarPath = navBarPath.slice(0, navBarPath.length - 2).join('_');
      var expr = new RegExp("^" + navBarPath + ".*", "i");
      if (navBarPath != page_id && !expr.test(page_id)) {
        $(this).removeClass('navbarActive');
      }
    });
  };
}

}); // end define