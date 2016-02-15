/* structure_plugin.js (c) 
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
 */


define( ['structure_custom', 'css!plugins/mobilemenu/mobilemenu.css'  ], function( VisuDesign_Custom ) {
  "use strict";
 
  VisuDesign_Custom.prototype.addCreator("mobilemenu", {
    create: function(element, path, flavour, type) {
      var $e = $(element);
      var data = templateEngine.widgetDataInsert( path, {
        content           : getWidgetElements($e, path)
      } );
      
      if(isTouchDevice()){
        touchScroll("navbarLeft");
      }
      if (window.innerWidth <= templateEngine.maxMobileScreenWidth){
        if (!$('#navbarLeft').hasClass('mobilemenu')){
          $('#navbarLeft').addClass('mobilemenu');
        }
        $('#navbarLeft').hide();
        $(window).bind('scrolltopage', function(){
          $('#navbarLeft .navbar').hide("slide", { direction: "left" }, 200);
          $('#navbarLeft').hide();
        });
        
        return '<div class="clearfix mobilemenuTrigger">' + data.content + '</div>';
      } else {
        return '<div class="clearfix mobilemenuTrigger" style="display: none"></div>';
      }
    },
    action: function( path, actor, isCanceled ) {
      if (window.innerWidth <= templateEngine.maxMobileScreenWidth){
        if(isTouchDevice()){
          $('#navbarLeft').show();
          $('#navbarLeft .navbar.navbarActive').show("slide", { direction: "left" }, 200);
        }
      }
    } 
  });
 
  function getWidgetElements(xmlElement, path, flavour, type) {
    var mobilemenuTrigger = $('mobilemenu > *', xmlElement).first()[0];
    var data = templateEngine.widgetDataInsert( path+"_0", {
      containerClass           : "actor"
    } );
    var ret_val = templateEngine.create_pages(mobilemenuTrigger, path+"_0", flavour, mobilemenuTrigger.nodeName);

    return ret_val;
  }
  
  function isTouchDevice(){
    try{
      document.createEvent("TouchEvent");
      return true;
    }catch(e){
      return false;
    }
  }
      
  function touchScroll(id){
    var scrollStartPos=0;

    document.getElementById(id).addEventListener("touchstart", function(event) {
      scrollStartPos=this.scrollTop+event.touches[0].pageY;
      event.preventDefault();
    },false);

    document.getElementById(id).addEventListener("touchmove", function(event) {
      this.scrollTop=scrollStartPos-event.touches[0].pageY;
      event.preventDefault();
    },false);
  }
});
