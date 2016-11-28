/**
 * @author alltime84
 * @since 2016
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
