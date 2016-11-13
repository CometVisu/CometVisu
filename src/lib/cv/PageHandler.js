/* PageHandler.js 
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
 * @since 2016
 */
// FIXME and TODO: This class is currently just a quick hack to get rid
// of the jQuery-Tools Scrollable. It should be enhanced to allow different
// page transition animations like blending, etc. pp.
define([ 'jquery', 'joose' ], function( $ ) {
  "use strict";

  Class('cv.PageHandler', {
    isa: cv.Object,

    has: {
      speed : { is: 'rw', init: 400 }, // time in milliseconds
      easing : { is: 'rw', init: 'swing' }, // name of the easing function
      currentPath : { is:'rw', init: '' }
    },

    methods: {

      // TODO: remove callbacks
      seekTo : function( target, speed ) {
        this.currentPath !== '' && templateEngine.callbacks[this.currentPath] && templateEngine.callbacks[this.currentPath].exitingPageChange.forEach( function( callback ){
          callback( this.currentPath, target );
        });

        var
          page = $('#' + target),
          callbacks = templateEngine.callbacks[target];

        if( 0 === page.length ) // check if page does exist
          return;

        if (callbacks) {
          callbacks.beforePageChange.forEach(function (callback) {
            callback(target);
          });
        }

        templateEngine.resetPageValues();

        templateEngine.currentPage = page;

        page.addClass('pageActive activePage');// show new page

        if (callbacks) {
          callbacks.duringPageChange.forEach(function (callback) {
            callback(target);
          });
        }

        // update visibility of navbars, top-navigation, footer
        templateEngine.pagePartsHandler.updatePageParts( page, speed );

        // now the animation
        var leftStart = 0, leftEnd = 0;
        if( speed > 0 ) {
          var scrollLeft = page.position().left != 0;
          // jump to the page on the left of the page we need to scroll to
          if (scrollLeft) {
            leftEnd = -page.width();
          } else {
            leftStart = -page.position().left - page.width();
          }
        }
        $('#pages').css('left', leftStart );
        $('#pages').animate( {left:leftEnd}, speed, this.easing, function(){
          // final stuff
          this.currentPath = target;
          templateEngine.pagePartsHandler.updateTopNavigation( target );
          $('.activePage', '#pages').removeClass('activePage');
          $('.pageActive', '#pages').removeClass('pageActive');
          $(templateEngine.currentPage).addClass('pageActive activePage');// show new page
          $('#pages').css('left', 0 );
          if (callbacks) {
            this.currentPath !== '' && templateEngine.callbacks[this.currentPath].afterPageChange.forEach(function (callback) {
              callback(this.currentPath);
            });
          }
        }.bind(this));
      },

      setSpeed : function( newSpeed ) {
        this.speed = +newSpeed;
      },

      getIndex : function() {
        return $( '#pages > .page' ).index( $('#' + this.currentPath) );
      }
    }
  });
});