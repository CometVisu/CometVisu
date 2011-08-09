/* templateengine.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

var design = new VisuDesign_Custom();

var mappings = {}; // store the mappings
var stylings = {}; // store the stylings

var ga_list = [];

var main_scroll;
var old_scroll = '';

visu = new CometVisu('../cgi-bin/');//{};
visu.update = function( json ) // overload the handler
{
  for( key in json )
  {
    $.event.trigger( '_' + key, json[key] );
  }
}
visu.user = 'demo_user'; // example for setting a user

$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
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
});

var configSuffix = "";
if ($.getUrlVar("config")) {
    configSuffix = "_" + $.getUrlVar("config");
}

var forceReload = false;
if( $.getUrlVar('forceReload') ) {
  forceReload = $.getUrlVar('forceReload') != 'false'; // true unless set to false
}

$(document).ready(function() {
  // get the data once the page was loaded
  $.ajaxSetup({cache: !forceReload});
  window.setTimeout("$.get( 'visu_config" + configSuffix + ".xml', parseXML );", 200);

  // disable text selection - it's annoying on a touch screen!
  /*
   * Now in the CSS!
  if($.browser.mozilla)
  {//Firefox
      $('body').css('MozUserSelect','none');
  } else if($.browser.msie) {//IE
      $(document).bind('selectstart',function(){return false;});
  } else {//Opera, etc.
      $(document).mousedown(function(){return false;});
  }
  */
} );

$(window).unload(function() {
  visu.stop();
});

function transformEncode( transformation, value )
{
  return transformation in Transform ?
    Transform[ transformation ].encode( value ) :
    value;
}

function transformDecode( transformation, value )
{
  return transformation in Transform ?
    Transform[ transformation ].decode( value ) :
    value;
}

function map( value, element )
{
  var map = element.data('mapping');
  if( map && mappings[map] && (mappings[map][value] || mappings[map]['range']) )
  {
    if( mappings[map]['range'] ) value = parseFloat( value );
    if( mappings[map][value] ) return mappings[map][value];

    var range = mappings[map]['range'];
    for( var min in range )
    {
      if( min > value ) continue;
      if( range[min][0] < value ) continue; // check max
      return range[min][1];
    }
  }
  return value;
}

/**
 * Make sure everything looks right when the window gets resized.
 * This is necessary as the scroll effect requires a fixed element size
 */
function handleResize()
{
  var uagent = navigator.userAgent.toLowerCase();

if (/(android|blackberry|iphone|ipod|ipad|series60|symbian|windows ce|palm)/i.test(uagent)) {      var width = $( window ).width();
      $( '#main' ).css( 'width', width );
      $( 'head' ).append( '<style type="text/css">.page{width:' + (width-0) + 'px;}</style>' );
      // do nothing
  } else {
      var width = $( window ).width();
      var height = $( window ).height() - $( '#top' ).outerHeight(true) - $( '#bottom' ).outerHeight(true) - 2;
      $( '#main' ).css( 'width', width ).css( 'height', height );
      $( 'head' ).append( '<style type="text/css">.page{width:' + (width-0) + 'px;height:' + height + 'px;}</style>' );
  }
  main_scroll != undefined && main_scroll.seekTo( main_scroll.getIndex(), 0 ); // fix scroll
}
$( window ).bind( 'resize', handleResize );

function parseXML(xml) {
  // erst mal den Cache für AJAX-Requests wieder aktivieren
  $.ajaxSetup({cache: true});

  var design = $( 'pages', xml ).attr('design');
  $( 'head' ).append( '<link rel="stylesheet" type="text/css" href="designs/' + design + '/basic.css" />' );
  $( 'head' ).append( '<link rel="stylesheet" type="text/css" href="designs/' + design + '/mobile.css" media="only screen and (max-device-width: 480px)" />' );

  // start with the plugins
  var pluginsToLoad = 0;
  $( 'meta > plugins plugin', xml ).each( function(i){
    pluginsToLoad += 1;
    var name = 'plugins/' + $(this).attr('name') + '/structure_plugin.js';
    if( forceReload )
      name += '?_=' + (new Date().getTime());
    var html_doc = document.getElementsByTagName('body')[0];
    js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src' , name             );
    html_doc.appendChild(js);

    js.onreadystatechange = function () {
        if (js.readyState == 'complete') {
            pluginsToLoad -= 1;
            if (pluginsToLoad <= 0) {
                setup_page(xml);
            }
        }
    }

    js.onload = function () {
        pluginsToLoad -= 1;
        if (pluginsToLoad <= 0) {
            setup_page(xml);
        }
    }
  } );

  // then the mappings
  $( 'meta > mappings mapping', xml ).each( function(i){
    var name = $(this).attr('name');
    mappings[ name ] = {};
    $(this).find('entry').each( function(){
      if( $(this).attr('value') )
      {
        mappings[ name ][ $(this).attr('value') ] = $(this).text();
      } else {
        if( ! mappings[ name ][ 'range' ] ) mappings[ name ][ 'range' ] = {};
        mappings[ name ][ 'range' ][ parseFloat($(this).attr('range_min')) ] =
          [ parseFloat( $(this).attr('range_max') ), $(this).text() ];
      }
    });
  });

  // then the stylings
  $( 'meta > stylings styling', xml ).each( function(i){
    var name = $(this).attr('name');
    stylings[ name ] = {};
    $(this).find('entry').each( function(){
      if( $(this).attr('value') )
      {
        stylings[ name ][ $(this).attr('value') ] = $(this).text();
      } else { // a range
        if( ! stylings[ name ][ 'range' ] ) stylings[ name ][ 'range' ] = {};
        stylings[ name ][ 'range' ][ parseFloat($(this).attr('range_min')) ] =
          [ parseFloat( $(this).attr('range_max') ), $(this).text() ];
      }
    });
  });

  // then the status bar
  $( 'meta > statusbar status', xml ).each( function(i){
    var type      = $(this).attr('type');
    var condition = $(this).attr('condition');
    var extend    = $(this).attr('hrefextend');
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    var editMode = 'edit_config.html' == sPage;
    if( editMode  && '!edit' == condition ) return;
    if( !editMode && 'edit'  == condition ) return;
    var text = this.textContent;
    switch( extend )
    {
      case 'all':    // append all parameters
        var search = window.location.search.replace( /\$/g, '$$$$' );
        text = text.replace( /(href="[^"]*)(")/g, '$1' + search + '$2' );
        break;
      case 'config': // append config file info
        var search = window.location.search.replace( /\$/g, '$$$$' );
        search = search.replace( /.*(config=[^&]*).*|.*/, '?$1' );
        text = text.replace( /(href="[^"]*)(")/g, '$1' + search + '$2' );
        break;
    }
    $('.footer').html( $('.footer').html() + text );
  });

  // adapt width for pages to show
  handleResize();

    if (pluginsToLoad <= 0) {
        setup_page(xml);
    }


}

function setup_page( xml )
{
  // and now setup the pages
  var page = $( 'pages > page', xml )[0]; // only one page element allowed...

  create_pages(page, '0');

  // setup the scrollable
  main_scroll = $('#main').scrollable({keyboard: false, touch: false}).data('scrollable');
  main_scroll.onSeek( updateTopNavigation );
  
  if ($.getUrlVar('startpage')) {
    scrollToPage( $.getUrlVar('startpage'), 0 );
  }

  $('.fast').bind('click', function(){
    main_scroll.seekTo( $(this).text() );
  });

  visu.subscribe( ga_list );
  $("#pages").triggerHandler("done");
}

function create_pages( page, path, flavour ) {

    var creator = design.getCreator(page.nodeName);
    var retval = creator.create(page, path, flavour);

    node = $(page).get(0);
    var attributes = {};
    if (typeof node.attributes != "undefined") {
        for(var i=0; i<node.attributes.length; i++)  {
            if(node.attributes.item(i).specified) {
                attributes[node.attributes.item(i).nodeName]=node.attributes.item(i).nodeValue
            }
        }
    } else {
        $.extend(attributes, node);
    }

    var configData = {attributes: {}, elements: {}}
    if (typeof creator.attributes != "undefined") {
        $.each(creator.attributes, function (index, e) {
            if ($(page).attr(index)) {
                configData.attributes[index] = $(page).attr(index);
            }
        });
    }

    if (typeof creator.elements != "undefined") {
        $.each(creator.elements, function (index, e) {
            var elements = $(page).find(index);
            configData.elements[index] = elements;
        });
    }

    retval.data("configData", configData)
        .data("path", path)
        .data("nodeName", page.nodeName)
        .data("textContent", page.textContent);
  return retval;
}

function scrollToPage( page_id, speed )
{
  $('#'+page_id).css( 'display', '' );                         // show new page
  main_scroll.seekTo( $('.page').index( $('#'+page_id)[0] ), speed ); // scroll to it
}

function updateTopNavigation()
{
  var path = $('.page').eq( this.getIndex() ).attr('id').split( '_' );
  var id = ''; //path[0];
  var nav = '';
  for( var i = 0; i < path.length; i++ )
  {
    id  += path[i];
    nav += (0==i ? '' : ' &#x25ba; ')
        +  '<a href="javascript:scrollToPage(\'' +id+ '\')">'
        + $('#' + id + ' h1').text() + '</a>';
    id  += '_';
  }
  $('.nav_path').html( nav );
  var new_array = path;
  var old_array = old_scroll;
  old_scroll = path;
  path = path.join('_');
  for( var i = new_array.length; i < old_array.length; i++ )
  {
    path += '_' + old_array[i]; // reuse of path...
    $('#'+path).css('display','none');
  }
}

/**
 * Show a popup of type "type".
 * The attributes is an type dependend object
 * This function returnes a jQuery object that points to the whole popup,
 * so it's content can be easily extended
 */
function showPopup( type, attributes )
{
  //var retval = design.popups[ type ].create( attributes ); //page, path );
  //return retval;
  if( !design.popups[ type ] ) type = 'unknown';

  return design.popups[ type ].create( attributes );
}

/**
 * Remove the popup.
 * The parameter is the jQuery object returned by the showPopup function
 */
function removePopup( jQuery_object )
{
  jQuery_object.remove();
}

/****************************************************************************/
/* FIXME - Question: should this belong to the VisuDesign object so that it */
/* is possible to overload?!?                                               */
/****************************************************************************/
function refreshAction( target, src )
{
  target.src = src + '&' + new Date().getTime();
}
function setupRefreshAction()
{
  var refresh = $(this).data('refresh');
  if( refresh && refresh > 0 )
  {
    var target = $('img', $(this) )[0];
    var src = target.src;
    if( src.indexOf('?') < 0 ) src += '?';
    $(this).data('interval', setInterval( function(){refreshAction(target, src);}, refresh ) );
  }
}
