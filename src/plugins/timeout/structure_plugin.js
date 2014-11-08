/* structure_plugin.js (c) 2012 by Carsten Tschach (Carsten@Tschach.com)
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

/**
 * This plugins jumps back to a defined page after a given timeout period
 */

define( ['structure_custom' ], function( VisuDesign_Custom ) {

var timeoutIdleCount   = 0;
var timeoutCurrentPage = "";
var timeoutTargetPage  = "";
var timeoutDebug       = 'false';

VisuDesign_Custom.prototype.addCreator("timeout", {
  create : function(page, path) {
    var $p = $(page);

    var target  = "id_0";   // Set default go back to Start Page
    var timeout = 600;      // Set default to 10 Minutes
    var debug   = 'false';  // Set debug off by default

    if ( $p.attr('target') ) { target       = $p.attr('target'); }
    if ( $p.attr('time')   ) { timeout      = $p.attr('time');   }
    //if ( $p.attr('debug')  ) { timeoutDebug = $p.attr('debug');  }


    timeoutPrintDebug("AAAAAA: Before Find-by-id: " + target); 
    if (target.match(/^id_[0-9_]+$/) == null) {
      $('.page h1:contains(' + target + ')', '#pages').each(function(i) {
        timeoutPrintDebug("In find-id" + $(this).text());
        if ($(this).text() == target) {
          target = $(this).closest(".page").attr("id");
        }
      });
    }

    timeoutPrintDebug("AAAAAA: After Find-by-id: " + target);
    timeoutPrintDebug("TIMEOUT: Timeout Set to : " + timeout);
    timeoutPrintDebug("TIMEOUT: Target Page: " + target);

    timeoutTargetPage = target;

    var deltaT = timeout * 100;
    var idleInterval = setInterval("timeoutTrigger()", deltaT); 

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
      timeoutIdleCount   = 0;
      /* We could trun on and off the above binds if we are already on the right page 
      
      if (timeoutCurrentPage == timeoutTargetPage) {
        console.log("XXXXXX TIMEOUT: Scrolled to Target Page: " + path);
      } else {
        console.log("XXXXXX TIMEOUT: Scrolled to: " + path + " ("+timeoutTargetPage + ")");
      }
      */
    });

  }
});


function timeoutTrigger() {
  timeoutPrintDebug("TIMEOUT: Got Trigger (" + timeoutIdleCount + ")");
  timeoutIdleCount++;
  if (timeoutIdleCount >= 10) { 
    timeoutIdleCount = 0;

    var page_id = timeoutTargetPage;

    timeoutPrintDebug("XXXXX Before Find-by-id: " + timeoutTargetPage);
    if (timeoutTargetPage.match(/^id_[0-9_]+$/) == null) {
      $('.page h1:contains(' + timeoutTargetPage + ')', '#pages').each(function(i) { 
        timeoutPrintDebug("In find-id" + $(this).text());
        if ($(this).text() == timeoutTargetPage) {         
          timeoutTargetPage = $(this).closest(".page").attr("id");       
        }     
      });   
    }
    timeoutPrintDebug("XXXXXX After Find-by-id: " + timeoutTargetPage); 


    if (timeoutCurrentPage != timeoutTargetPage) {
      timeoutPrintDebug("TIMEOUT: Got Timeout - Now Goto Page " + timeoutTargetPage); 
      templateEngine.scrollToPage(timeoutTargetPage);
      $("#" + timeoutTargetPage).scrollTop(0);
      //templateEngine.updateTopNavigation();
    } else {
      timeoutPrintDebug("TIMEOUT: Already on page " + timeoutTargetPage); 
      $("#" + timeoutCurrentPage).scrollTop(0);
    }
  }
}

function timeoutPrintDebug(s) {
  if (timeoutDebug == 'true') console.log(s);
}

});

