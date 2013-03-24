/* compatability.js (c) 2013 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
 * @module Compatability
 * @title  CometVisu helper functions for compatability issues
 */
if( /(msie)/i.test(navigator.userAgent.toLowerCase()) )
{
  var IE_version = /MSIE\s([\d]+)/;
  if( IE_version.exec( navigator.userAgent ) != null ) 
    if( 10 <= parseFloat( RegExp.$1 )
      return; // Exit
  alert( 'Sorry, but Internet Explorer prior version 10.0 is not supported!' );
}

if (typeof (console) == "undefined") {
    console = {};
    console.log = console.debug = console.info = console.warn = console.error = function() {}
}

/**
 * 
 *  Javascript sprintf
 *  http://www.webtoolkit.info/
 *
 *
 **/

sprintfWrapper = {
  
  init : function () {
    
    if (typeof arguments == "undefined") { return null; }
    if (arguments.length < 1) { return null; }
    if (typeof arguments[0] != "string") { return null; }
    if (typeof RegExp == "undefined") { return null; }
    
    var string = arguments[0];
    var exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
    var matches = new Array();
    var strings = new Array();
    var convCount = 0;
    var stringPosStart = 0;
    var stringPosEnd = 0;
    var matchPosEnd = 0;
    var newString = '';
    var match = null;
    
    while (match = exp.exec(string)) {
      if (match[9]) { convCount += 1; }
      
      stringPosStart = matchPosEnd;
      stringPosEnd = exp.lastIndex - match[0].length;
      strings[strings.length] = string.substring(stringPosStart, stringPosEnd);
      
      matchPosEnd = exp.lastIndex;
      matches[matches.length] = {
        match: match[0],
        left: match[3] ? true : false,
        sign: match[4] || '',
        pad: match[5] || ' ',
        min: match[6] || 0,
        precision: match[8],
        code: match[9] || '%',
        negative: parseFloat(arguments[convCount]) < 0 ? true : false,
        argument: String(arguments[convCount])
      };
    }
    strings[strings.length] = string.substring(matchPosEnd);
    
    if (matches.length == 0) { return string; }
    if ((arguments.length - 1) < convCount) { return null; }
    
    var code = null;
    var match = null;
    var i = null;
    
    for (i=0; i<matches.length; i++) {
      
      if (matches[i].code == '%') { substitution = '%' }
      else if (matches[i].code == 'b') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(2));
        substitution = sprintfWrapper.convert(matches[i], true);
      }
      else if (matches[i].code == 'c') {
        matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument)))));
        substitution = sprintfWrapper.convert(matches[i], true);
      }
      else if (matches[i].code == 'd') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 'f') {
        matches[i].argument = String(Math.abs(parseFloat(matches[i].argument)).toFixed(matches[i].precision ? matches[i].precision : 6));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 'o') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(8));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 's') {
        matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision : matches[i].argument.length)
        substitution = sprintfWrapper.convert(matches[i], true);
      }
      else if (matches[i].code == 'x') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 'X') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
        substitution = sprintfWrapper.convert(matches[i]).toUpperCase();
      }
      else {
        substitution = matches[i].match;
      }
      
      newString += strings[i];
      newString += substitution;
      
    }
    newString += strings[i];
    
    return newString;
    
  },
  
  convert : function(match, nosign){
    if (nosign) {
      match.sign = '';
    } else {
      match.sign = match.negative ? '-' : match.sign;
    }
    var l = match.min - match.argument.length + 1 - match.sign.length;
    var pad = new Array(l < 0 ? 0 : l).join(match.pad);
    if (!match.left) {
      if (match.pad == "0" || nosign) {
        return match.sign + pad + match.argument;
      } else {
        return pad + match.sign + match.argument;
      }
    } else {
      if (match.pad == "0" || nosign) {
        return match.sign + match.argument + pad.replace(/0/g, ' ');
      } else {
        return match.sign + match.argument + pad;
      }
    }
  }
}

sprintf = sprintfWrapper.init;

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
  },
  /**
   * heavily inspired by: http://stackoverflow.com/questions/13066712/how-to-load-a-list-of-javascript-files-and-call-a-callback-after-all-of-them-are
   */
  getOrderedScripts: function(files, callback) {
    if( 'object' === typeof files && 0 == files.length && callback )
    {
      callback();
    } else {
      if( 'string' === typeof files )
        files = [ files ];
      $.ajax({
        url: files.shift(),
        dataType: 'script',
        async: false,
        success: files.length
          ? function(){ $.getOrderedScripts(files, callback);}
          : callback
      });
    }
  },
  /**
   * Include files on this place. This will be replaced by the content of the
   * script during packaging
   */
  includeScripts: function(files, callback) {
    this.getOrderedScripts(files, callback);
  },
  // inspired by http://stackoverflow.com/questions/2685614/load-external-css-file-like-scripts-in-jquery-which-is-compatible-in-ie-also
  getCSS: function( url, parameters ) {
    var cssLink = $( '<link/>' );
    $( 'head' ).append( cssLink ); //IE hack: append before setting href
    cssLink.attr( $.extend( parameters, {
      rel:  "stylesheet",
      type: "text/css",
      href: $.ajaxSettings.cache ? url : url + '?_=' + (new Date()).valueOf()
    }) );
  }
});