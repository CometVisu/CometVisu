/* Compatibility.js 
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
 * CometVisu helper functions for compatability issues
 * 
 * @author Christian Mayer
 * @since 2013
 */
define( ['jquery', 'dependencies/sprintf'], function( $ ) {
  "use strict";
  if( /(msie)/i.test(navigator.userAgent.toLowerCase()) )
  {
    var IE_version = /MSIE\s([\d]+)/;
    if( IE_version.exec( navigator.userAgent ) != null ) 
      if( 10 > parseFloat( RegExp.$1 ) )
        alert( 'Sorry, but Internet Explorer prior version 10.0 is not supported!' );
  }

  if (typeof (console) == "undefined") {
    console = {};
    console.log = console.debug = console.info = console.warn = console.error = console.stamp = function() {}
  } else {
    console.stamp = (function(){
    var thisStartTime = new Date();
    return function logTimeStamp( name ){
      console.timeStamp( name );
      console.log( '[' + logTimeStamp.caller.name + '] ' + name + ': ' + (Date.now() - thisStartTime ) );
    };
  })();
  }

  var sprintfOrg = window.sprintf;

  window.sprintf = function() {
  for (var arg in arguments) {
    if (typeof arguments[arg] == "undefined")
      arguments[arg] = "<UNDEF>";
  }

  try {
    return sprintfOrg.apply(this, arguments);
  } catch( Err ) {
    return 'sprintf Error';
  }
}

  /*
   * be able to access GET-Params
   */
  $.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('#')[0].split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
  /**
   * Include files on this place. This will be replaced by the content of the
   * script during packaging
   */
  /* removed - use AMD instread!
  includeScripts: function(files, callback) {
    yepnope({
      load: files,
      callback: callback
    });
  },
  getCSS: function( url, parameters, callback ) {
    yepnope.injectCss($.ajaxSettings.cache ? url : url + '?_=' + (new Date()).valueOf(), function () {
      if (callback) {
        callback();
      } else {
        $(window).trigger('resize');
      }
    }, parameters);
  }
  */
});

  // check if the applicationCache was modified - then reload itself to prevent
  // that the user has to do an additional reload
  if( "object" === typeof window.applicationCache )
  {
    window.applicationCache.addEventListener( 'updateready', function(){
    window.location.reload(false);
  });
  }

}); // end define