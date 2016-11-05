/* PagePartsHandler.js 
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


/**
 * @author Christian Mayer
 * @since 2010
 */
define([ 'jquery', 'lib/cv/structure/WidgetFactory' ], function( $ ) {
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
    // templateEngine.handleResize(); - TODO CM160528: why? This shouldn't have
    //                             any effect on the page size => commented out
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
      cv.layout.ResizeHandler.invalidateNavbar();
      break;

    case 'right':
      $('#centerContainer').css('padding-right', cssSize);
      $('#navbarRight').css({
        width : cssSize,
        'margin-right' : '-' + cssSize
      });
      cv.layout.ResizeHandler.invalidateNavbar();
      break;
    }
  };
  
  this.getNavbarsVisibility = function(page) {
    if (cv.layout.ResizeHandler.currentPageNavbarVisibility==null) {
      if (page==null) {
        page = templateEngine.currentPage;
      }
      if( page===null ) return { top : 'true', bottom : 'true', left : 'true', right : 'true' };
      if (typeof page == "string") {
        page = cv.structure.WidgetFactory.my.getInstanceById(page);
      } else if (page.attr) {
        page = cv.structure.WidgetFactory.my.getInstanceById(page.attr('id'));
      }

      if( page==null ) return { top : 'true', bottom : 'true', left : 'true', right : 'true' };
      var shownavbar = (page.getShowNavbar() != undefined ? page.getShowNavbar() : {
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
      if (page != null) {
        // traverse up the page tree for shownavbar
        var parentPage = page.getParent();
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

            if (parentPage.getShowNavbar() != undefined) {
              for (var pos in shownavbar) {
                if (shownavbar[pos] == 'inherit') {
                  // set value of parent page
                  shownavbar[pos] = parentPage.getShowNavbar()[pos];
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
          parentPage = parentPage.getParent();
        }
      }
      // set default values for shownavbar if not set otherwise
      for (var pos in shownavbar) {
        if (shownavbar[pos] == undefined || shownavbar[pos] == 'inherit') {
          shownavbar[pos] = 'true';
        }
      }
      cv.layout.ResizeHandler.currentPageNavbarVisibility = shownavbar;
      //      console.log(shownavbar);
    }
    return cv.layout.ResizeHandler.currentPageNavbarVisibility;
  };

  /**
   * update the visibility ob top-navigation, footer and navbar for this page
   * 
   * @param page
   */
  this.updatePageParts = function( xml, speed ) {
    // default values
    var page = cv.structure.WidgetFactory.my.getInstanceById(xml.attr('id'));
    var showtopnavigation = true;
    var showfooter = true;
    var shownavbar = thisPagePartsHandler.getNavbarsVisibility(page);

    if (page) {
      if (page.getShowTopNavigation() != undefined) {
        showtopnavigation = page.getShowTopNavigation();
      } else {
        // traverse up the page tree
        var parentPage = page.getParent();
        while (parentPage != null) {

          if (parentPage.getShowTopNavigation() != undefined) {
            showtopnavigation = parentPage.getShowTopNavigation();
            break;
          }
          parentPage = parentPage.getParent();
        }
      }
      if (page.getShowFooter() != undefined) {
        showfooter = page.getShowFooter();
      } else {
        // traverse up the page tree
        var parentPage = page.getParent();
        while (parentPage != null) {
          if (parentPage.getShowFooter() != undefined) {
            showfooter = parentPage.getShowFooter();
            break;
          }
          parentPage = parentPage.getParent();
        }
      }
    }
    
    if (showtopnavigation) {
      if ($('#top').css("display") == "none") {
        $('#top, #top > *').css("display", "block");
        thisPagePartsHandler.removeInactiveNavbars(page.getPath());
      }
    } else {
      if ($('#top').css("display") != "none") {
        $('#top').css("display", "none");
        thisPagePartsHandler.removeInactiveNavbars(page.getPath());
      }
    }
    if (showfooter) {
      if ($('#bottom').css("display") == "none") {
        $('#bottom').css("display", "block");
        thisPagePartsHandler.removeInactiveNavbars(page.getPath());
      }
    } else {
      if ($('#bottom').css("display") != "none") {
        $('#bottom').css("display", "none");
        thisPagePartsHandler.removeInactiveNavbars(page.getPath());
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
          thisPagePartsHandler.removeInactiveNavbars(page.getPath());
        }
      } else {
        if (display != "none" || isLoading) {
          thisPagePartsHandler.fadeNavbar( value, "out", speed );
        }
      }
    });
    cv.layout.ResizeHandler.invalidateNavbar();
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
    speed = (speed !== undefined) ? speed : templateEngine.main_scroll.getSpeed();
    var initCss = {};
    var targetCss = {};
    var navbar = $('#navbar' + position);
    var key = position.toLowerCase();
    var fn = function() {
      cv.layout.ResizeHandler.invalidateNavbar();
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
        cv.layout.ResizeHandler.invalidateNavbar();
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
      navbar.animate(targetCss, speed, templateEngine.main_scroll.getEasing(), fn);
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
        if (item.length == 1) {
          tree.push(item.get(0));
        }
      }
    }
    var level = 1;
    $(tree).each(function(i) {
      var id = $(this).attr('id');
      var topNav = $('#' + id + 'top_navbar');
      var topData = templateEngine.widgetDataGet( id + 'top_navbar' );
      var rightNav = $('#' + id + 'right_navbar');
      var rightData = templateEngine.widgetDataGet( id + 'right_navbar' );
      var bottomNav = $('#' + id + 'bottom_navbar');
      var bottomData = templateEngine.widgetDataGet( id + 'bottom_navbar' );
      var leftNav = $('#' + id + 'left_navbar');
      var leftData = templateEngine.widgetDataGet( id + 'left_navbar' );
      // console.log(tree.length+"-"+level+"<="+topData.scope);
      if (topNav.length > 0) {
        if (topData.scope == undefined || topData.scope < 0
            || tree.length - level <= topData.scope) {
          topNav.addClass('navbarActive');
        } else {
          topNav.removeClass('navbarActive');
        }
      }
      if (rightNav.length > 0) {
        if (rightData.scope == undefined
            || rightData.scope < 0
            || tree.length - level <= rightData.scope) {
          rightNav.addClass('navbarActive');
        } else {
          rightNav.removeClass('navbarActive');
        }
      }
      if (bottomNav.length > 0) {
        if (bottomData.scope == undefined
            || bottomData.scope < 0
            || tree.length - level <= bottomData.scope) {
          bottomNav.addClass('navbarActive');
        } else {
          bottomNav.removeClass('navbarActive');
        }
      }
      if (leftNav.length > 0) {
        if (leftData.scope == undefined || leftData.scope < 0
            || tree.length - level <= leftData.scope) {
          leftNav.addClass('navbarActive');
        } else {
          leftNav.removeClass('navbarActive');
        }
      }
      level++;
    });
    cv.layout.ResizeHandler.invalidateNavbar();
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