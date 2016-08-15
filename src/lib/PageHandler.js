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
define([ 'jquery' ], function( $ ) {
  "use strict";
  
  var
    speed = 400, // time in milliseconds
    easing = 'swing', // name of the easing function
    currentPath = '',
    undefined;

  return function() {
    var self = this;
    
    this.seekTo = function( target, speed )
    {
      currentPath !== '' && templateEngine.callbacks[currentPath].exitingPageChange.forEach( function( callback ){
        callback( currentPath, target );
      });      
      
      var 
        page = $('#' + target),
        callbacks = templateEngine.callbacks[target];
      
      if( 0 === page.length ) // check if page does exist
        return;
    
      callbacks.beforePageChange.forEach( function( callback ){
        callback( target );
      });

      templateEngine.resetPageValues();
      
      templateEngine.currentPage = page;

      page.addClass('pageActive activePage');// show new page
      
      callbacks.duringPageChange.forEach( function( callback ){
        callback( target );
      });
      
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
      $('#pages').animate( {left:leftEnd}, speed, easing, function(){
        // final stuff
        currentPath = target;
        templateEngine.pagePartsHandler.updateTopNavigation( self );
        $('.activePage', '#pages').removeClass('activePage');
        $('.pageActive', '#pages').removeClass('pageActive');
        templateEngine.currentPage.addClass('pageActive activePage');// show new page
        $('#pages').css('left', 0 );
        currentPath !== '' && templateEngine.callbacks[currentPath].afterPageChange.forEach( function( callback ){
          callback( currentPath );
        });
      });
    };
    
    this.setSpeed = function( newSpeed )
    {
      speed = +newSpeed;
    }
    
    this.getSpeed = function()
    {
      return speed;
    }
    
    this.getEasing = function()
    {
      return easing;
    }
    
    this.getIndex = function()
    {
      return $( '#pages > .page' ).index( $('#' + currentPath) );
    }
  }
});