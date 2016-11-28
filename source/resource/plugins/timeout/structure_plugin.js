/**
 * This plugins jumps back to a defined page after a given timeout period
 *
 * @author Carsten Tschach (Carsten@Tschach.com)
 * @since 2012
 */

define( ['structure_custom' ], function( VisuDesign_Custom ) {
  "use strict";
  var timeoutIdleCount   = 0;
  var timeoutCurrentPage = "";
  var timeoutCurrentPageTitle = "";
  var timeoutTargetPage  = "";
  var timeoutDebug       = 'false';

  VisuDesign_Custom.prototype.addCreator("timeout", {
  create : function(page, path) {
    var $p = $(page);

    var target  = "id_";   // Set default go back to Start Page
    var timeout = 600;      // Set default to 10 Minutes
    var debug   = 'false';  // Set debug off by default

    if ( $p.attr('target') ) { target       = $p.attr('target'); }
    if ( $p.attr('time')   ) { timeout      = $p.attr('time');   }
    if ( $p.attr('debug')  ) { timeoutDebug = $p.attr('debug');  }

    timeoutPrintDebug("TIMEOUT: Timeout Set to : " + timeout);
    timeoutPrintDebug("TIMEOUT: Target Page: " + target);

    timeoutTargetPage = target;

    var deltaT = timeout * 100;
    var idleInterval = setInterval(function() {timeoutTrigger();}, deltaT);
    
    // Reset Counter on every interaction
    $(document).bind('scroll',      function(e) { timeoutIdleCount = 0; });
    $(document).bind('mousemove',   function(e) { timeoutIdleCount = 0; });
    $(document).bind('click',       function(e) { timeoutIdleCount = 0; });
    $(document).bind('keypress',    function(e) { timeoutIdleCount = 0; });
    $(document).bind('mousewheel',  function(e) { timeoutIdleCount = 0; });
    $(document).bind('scrollstart', function(e) { timeoutIdleCount = 0; });

    $(document).bind('touchstart',  function(e) { timeoutIdleCount = 0; });
    $(document).bind('touchmove',   function(e) { timeoutIdleCount = 0; });
    $(document).bind('touchend',    function(e) { timeoutIdleCount = 0; });

    // Keep track of current page
    $(window).bind('scrolltopage', function(page, path) {
      timeoutCurrentPage = path; 
      timeoutCurrentPageTitle = $("div > h1","#"+path).text();
      timeoutIdleCount   = 0;
      /* We could trun on and off the above binds if we are already on the right page 
      
      if (timeoutCurrentPage == timeoutTargetPage) {
        console.log("XXXXXX TIMEOUT: Scrolled to Target Page: " + path);
      } else {
        console.log("XXXXXX TIMEOUT: Scrolled to: " + path + " ("+timeoutTargetPage + ")");
      }
      */
    });

    return '';
  }
});


  function timeoutTrigger() {
  timeoutPrintDebug("TIMEOUT: Got Trigger (" + timeoutIdleCount + ")");
  timeoutIdleCount++;
  if (timeoutIdleCount >= 10) { 
    timeoutIdleCount = 0;

    var page_id = timeoutTargetPage;

    if (timeoutCurrentPage != timeoutTargetPage && timeoutCurrentPageTitle != timeoutTargetPage) {
      timeoutPrintDebug("TIMEOUT: Got Timeout - Now Goto Page " + timeoutTargetPage); 
      templateEngine.scrollToPage(timeoutTargetPage);
      templateEngine.currentPage.scrollTop(0);
      //templateEngine.updateTopNavigation();
    } else {
      timeoutPrintDebug("TIMEOUT: Already on page " + timeoutTargetPage); 
      templateEngine.currentPage.scrollTop(0);
    }
  }
}

  function timeoutPrintDebug(s) {
  if (timeoutDebug == 'true') console.log(s);
}

});

