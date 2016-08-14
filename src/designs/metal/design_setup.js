/* design_setup.js 
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
 * Design setup  for the metal design
 * 
 * @author Tobias Bräutigam
 * @since 2012
 */
$('#navbarLeft').data('columns', 6 );
$('#main').data('columns', 12 );
$('#navbarRight').data('columns', 6 );

function getOffsetCorners(elem) {
  return {
    top_left: {top: Math.round(elem.offset().top), left: Math.round(elem.offset().left) },
    bottom_left: {top: Math.round(elem.offset().top+elem.height()), left: Math.round(elem.offset().left) },
    top_right: {top: Math.round(elem.offset().top), left: Math.round(elem.offset().left+elem.width()) },
    bottom_right: {top: Math.round(elem.offset().top+elem.height()), left: Math.round(elem.offset().left+elem.width()) },
  };
}
function roundCorners() {
  // find elements in each groups corners
  $('.page.activePage .group:visible').each(function(i) {
      var group = $(this);
      // do not use this in navbars
      if (group.parents('.navbar').length>0) return;
      var groupCorners = getOffsetCorners(group);
      // if the group has a headline (=name) we must not round the upper corners
      var roundUpperCorners =  ($(this).find('.widget_container:first-child').length>0) && group.css('border-top-right-radius')!="0px";
      var threshold=5;
      $(this).find('.widget_container').each(function (i) {
        var elemCorners = getOffsetCorners($(this));
        if (roundUpperCorners) {
          // upper left corner is done by regular  css-rule  upper right corner
          if (Math.abs(elemCorners.top_right.top-groupCorners.top_right.top)<threshold && Math.abs(elemCorners.top_right.left-groupCorners.top_right.left)<threshold) {
            $(this).css({'border-top-right-radius': group.css('border-top-right-radius')});
            $(this).children().css({'border-top-right-radius': group.css('border-top-right-radius')});
          }
        }
        if (group.css('border-bottom-right-radius')!="0px" && Math.abs(elemCorners.bottom_right.top-groupCorners.bottom_right.top)<threshold && Math.abs(elemCorners.bottom_right.left-groupCorners.bottom_right.left)<threshold) {
          $(this).css({'border-bottom-right-radius': group.css('border-bottom-right-radius')});
          $(this).children().css({'border-bottom-right-radius': group.css('border-bottom-right-radius')});
        }
        if (group.css('border-bottom-left-radius')!="0px" && Math.abs(elemCorners.bottom_left.top-groupCorners.bottom_left.top)<threshold && Math.abs(elemCorners.bottom_left.left-groupCorners.bottom_left.left)<threshold) {
          $(this).css({'border-bottom-left-radius': group.css('border-bottom-left-radius')});
          $(this).children().css({'border-bottom-left-radius': group.css('border-bottom-left-radius')});
        }
      });
    });
}
$(window).bind('scrolltopage',function() {
  //$('#id_0').append(navigator.userAgent.toLowerCase());
  if (/(opera|chrome|safari)/i.test(navigator.userAgent.toLowerCase())) {
    roundCorners();
  }
});

templateEngine.bindActionForLoadingFinished(function() {
  $('#navbarLeft .navbar .widget .label,#navbarRight .navbar .widget .label').each(function(i) {
    var label = $(this);
    if (label.text().trim()!="") {
      var actor = label.siblings('.actor');
      if (label.children('img').length==0 && actor.children('.value').text().trim()!="") {
        actor.css('padding-top','0.5em');
      }
    }
  });
  // Disable borders for groups that contain widget-group as children
  $('.page > div > .widget_container > .group:not(.widget)').each(function(i) {
    var $this = $(this);
    if ($this.find('.clearfix > .widget_container > .group.widget').length>0) {
      $this.css({'border': 'none', 'margin': 0});
    }
  });
});

