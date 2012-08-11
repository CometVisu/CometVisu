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
 * 
 * @module Templateengine
 * @title  CometVisu templateengine
*/

var design = new VisuDesign_Custom();
var icons  = new icon();

var mappings = {}; // store the mappings
var stylings = {}; // store the stylings
var navbars  = {   // store informations about the nav bars
  top:    { dynamic: false },
  left:   { dynamic: false },
  right:  { dynamic: false },
  bottom: { dynamic: false }
};

var ga_list = [];

var main_scroll;
var old_scroll = '';

visu = new CometVisu('/cgi-bin/');
visu.update = function( json ) { // overload the handler
  for( key in json ) {
    $.event.trigger( '_' + key, json[key] );
  }
}
visu.user = 'demo_user'; // example for setting a user

var configSuffix;
if ($.getUrlVar("config")) {
  configSuffix = $.getUrlVar("config");
}

var clientDesign = "";

if (typeof forceReload == "undefined") {
  var forceReload = false;
}

if( $.getUrlVar('forceReload') ) {
  forceReload = $.getUrlVar('forceReload') != 'false'; // true unless set to false
}

// "Bug"-Fix for ID: 3204682 "Caching on web server"
// This isn't a real fix for the problem as that's part of the web browser, but
// it helps to avoid the problems on the client, e.g. when the config file
// has changed but the browser doesn't even ask the server about it...
forceReload = true;

// Disable features that aren't ready yet
// This can be overwritten in the URL with the parameter "maturity"
var use_maturity; 
if ($.getUrlVar('maturity')) {
  var url_maturity = $.getUrlVar('maturity');
  if (!isNaN(url_maturity - 0)) {
    use_maturity = url_maturity - 0;         // given directly as number
  }
  else {
    use_maturity = Maturity[url_maturity]; // or as the ENUM name
  }
}

if (isNaN(use_maturity)) {
  use_maturity = Maturity.release; // default to release
}

$(document).ready(function() {
  // get the data once the page was loaded
  $.ajax({
    url: 'visu_config' + (configSuffix ? '_' + configSuffix : '' ) + '.xml',
    cache: !forceReload,
    success: parseXML,
    error: function(jqXHR, textStatus, errorThrown){ 
      var message = 'Config-File Error! ';
      switch( textStatus )
      {
        case 'parsererror':
          message += '<br />Invalid config file!<br /><a href="check_config.php?config=' + configSuffix + '">Please check!</a>';
      }
      $('#loading').html( message );
    },
    dataType: 'xml'
});
} );

$(window).unload(function() {
  visu.stop();
});

function transformEncode( transformation, value ) {
  var basetrans = transformation.split('.')[0];
  return transformation in Transform ?
    Transform[ transformation ].encode( value ) : 
    (basetrans in Transform ? Transform[ basetrans ].encode( value ) : value);
}

function transformDecode( transformation, value ) {
  var basetrans = transformation.split('.')[0];
  return transformation in Transform ?
    Transform[ transformation ].decode( value ) : 
    (basetrans in Transform ? Transform[ basetrans ].decode( value ) : value);
}

function map( value, this_map ) {
  if( this_map && mappings[this_map] )
  {
    var m = mappings[this_map];
    
    if( m.formula ) {
      return m.formula( value );
    } else if( m[value] ) {
      return m[value];
    } else if( m['range'] ) {
      var valueFloat = parseFloat( value );
  
      var range = m['range'];
      for( var min in range ) {
        if( min > valueFloat ) continue;
        if( range[min][0] < valueFloat ) continue; // check max
        return range[min][1];
      }
    }
  }
  return value;
}

/*
 * Make sure everything looks right when the window gets resized.
 * This is necessary as the scroll effect requires a fixed element size
 */
function handleResize() {
  var uagent = navigator.userAgent.toLowerCase();
  var widthNavbarLeft  = $( '#navbarLeft'  ).width();
  var widthNavbarRight = $( '#navbarRight' ).width();
  var width = $( 'body' ).width() - widthNavbarLeft - widthNavbarRight - 1; // remove an additional pixel for Firefox

  if (/(android|blackberry|iphone|ipod|series60|symbian|windows ce|palm)/i.test(uagent)) {
    $( '#main' ).css( 'width', width );
    $( '#pageSize' ).text( '.page{width:' + (width-0) + 'px;}' );
    // do nothing
  } else {
    var height = $( window ).height()
                 - $( '#main' ).position().top
                 - $( '#navbarBottom' ).outerHeight(true)
                 - $( '#bottom'       ).outerHeight(true) - 2;
    $( '#main' ).css( 'width', width ).css( 'height', height );
    $( '#pageSize' ).text( '.page{width:' + (width-0) + 'px;height:' + height + 'px;}' );
  }
  main_scroll != undefined && main_scroll.seekTo( main_scroll.getIndex(), 0 ); // fix scroll
}
$( window ).bind( 'resize', handleResize );


function rowspanClass(rowspan) {
  var className = 'rowspan'+ rowspan;
  
  if ( !$('#'+className+'Style').get(0) ) { 
    var dummyDiv = $('<div class="clearfix" id="calcrowspan"><div id="containerDiv" class="widget_container"><div class="widget clearfix text" id="innerDiv" /></div></div>')
      .appendTo(document.body).show();
    
    var singleHeight       = $('#containerDiv').outerHeight(false);
    var singleHeightMargin = $('#containerDiv').outerHeight(true );

    $('#calcrowspan').remove();
          
    // append css style
    
    $('head').append('<style id="'+className+'Style">.rowspan' + rowspan + ' { height: ' + ((rowspan-1)*singleHeightMargin+singleHeight) + 'px; overflow:hidden; position:relative;} </style>').data(className, 1);
  } 
  
  return className;
}

function parseXML(xml) {
  // erst mal den Cache für AJAX-Requests wieder aktivieren
  $.ajaxSetup({cache: true});

  
  /* First, we try to get a design by url
   * Secondly, we try to get a predefined design in the config file
   * Otherwise we show the design selection dialog
   */
  
  // read predefined design in config
  predefinedDesign = $( 'pages', xml ).attr("design");

  // design by url
  if ($.getUrlVar("design")) {
    clientDesign = $.getUrlVar("design");
  }
  // design by config file
  else if (predefinedDesign){
    clientDesign = predefinedDesign; 
  }
  // selection dialog
  else {
    selectDesign();
  }
  
  $( 'head' ).append( '<link rel="stylesheet" type="text/css" href="designs/designglobals.css" />' );
  $( 'head' ).append( '<link rel="stylesheet" type="text/css" href="designs/' + clientDesign + '/basic.css" />' );
  $( 'head' ).append( '<link rel="stylesheet" type="text/css" href="designs/' + clientDesign + '/mobile.css" media="only screen and (max-device-width: 480px)" />' );
  $( 'head' ).append( '<link rel="stylesheet" type="text/css" href="designs/' + clientDesign + '/custom.css" />' );
  $( 'head' ).append( '<script src="designs/' + clientDesign + '/design_setup.js" type="text/javascript" />' );
  
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
    var $this = $(this);
    var name = $this.attr('name');
    mappings[ name ] = {};
    var formula = $this.find('formula');
    if( formula.length > 0 )
    {
      eval( 'var func = function(x){' + formula.text() + '; return y;}' );
      mappings[ name ][ 'formula' ] = func;
    } else {
      $this.find('entry').each( function(){
        var $localThis = $(this);
        var value = $localThis.contents();
        for( var i = 0; i < value.length; i++ )
        {
          var $v = $(value[i]);
          if( $v.is('icon') )
            value[i] = icons.getIcon( $v.attr('name') );
        }
        
        if( $localThis.attr('value') )
        {
          mappings[ name ][ $localThis.attr('value') ] = value;
        } else {
          if( ! mappings[ name ][ 'range' ] ) mappings[ name ][ 'range' ] = {};
          mappings[ name ][ 'range' ][ parseFloat($localThis.attr('range_min')) ] =
            [ parseFloat( $localThis.attr('range_max') ), value ];
        }
      });
    }
  });

  // then the stylings
  $( 'meta > stylings styling', xml ).each( function(i){
    var name = $(this).attr('name');
    var classnames = '';
    stylings[ name ] = {};
    $(this).find('entry').each( function(){
      classnames += $(this).text() + ' ';
      if( $(this).attr('value') )
      {
        stylings[ name ][ $(this).attr('value') ] = $(this).text();
      } else { // a range
        if( ! stylings[ name ][ 'range' ] ) stylings[ name ][ 'range' ] = {};
        stylings[ name ][ 'range' ][ parseFloat($(this).attr('range_min')) ] =
          [ parseFloat( $(this).attr('range_max') ), $(this).text() ];
          
      }
    });
    stylings[ name ]['classnames'] = classnames;
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
    var text = $(this).text();
    switch( extend )
    {
      case 'all':    // append all parameters
        var search = window.location.search.replace( /\$/g, '$$$$' );
        text = text.replace( /(href="[^"]*)(")/g, '$1' + search + '$2' );
        break;
      case 'config': // append config file info
        var search = window.location.search.replace( /\$/g, '$$$$' );
        search = search.replace( /.*(config=[^&]*).*|.*/, '?$1' );
		

// text = $(text).replaceWith( /(href="[^"]*)(")/g, '$1' + search + '$2' );


        text = text.replace( /(href="[^"]*)(")/g, '$1' + search + '$2' );
        break;
    }
    $('.footer').html( $('.footer').html() + text );
  });

  if (pluginsToLoad <= 0) {
    setup_page(xml);
  }
}

function setup_page( xml )
{
  // and now setup the pages
  var page = $( 'pages > page', xml )[0]; // only one page element allowed...

  create_pages(page, 'id_0');

  // all containers
  if (!/(android|blackberry|iphone|ipod|series60|symbian|windows ce|palm)/i.test(navigator.userAgent.toLowerCase())) {
    var allContainer = $('.widget_container');
    allContainer.each(function(i, e) {
      var ourColspan = $(e).children('*:first-child').data('colspan');
      var areaColspan = $(e).parentsUntil('#centerContainer').last().data('columns') || 12;
      var ourWidth = ourColspan/areaColspan*100;
      $(e).css('width', ourWidth+'%');
    });
  
    // and elements inside groups
    var adjustableElements = $('.group .widget_container');
    adjustableElements.each(function(i, e) {
      var groupColspan = $(e).parentsUntil('.widget_container', '.group').data('colspan');
      var ourColspan = $(e).children('.widget').data('colspan');
      var ourWidth = ourColspan/groupColspan*100;  // in percent
      $(e).css('width', ourWidth+'%');
    });
  };
  
  // setup the scrollable
  main_scroll = $('#main').scrollable({keyboard: false, touch: false}).data('scrollable');
  main_scroll.onSeek( updateTopNavigation );
  
  if ($.getUrlVar('startpage')) {
    scrollToPage( 'id_'+$.getUrlVar('startpage'), 0 );
  } else {
    scrollToPage( 'id_0', 0 ); // simple solution to show page name on top at start
  }

  $('.fast').bind('click', function(){
    main_scroll.seekTo( $(this).text() );
  });

  
  // reaction on browser back button
  window.onpopstate = function(e) {
    // where do we come frome?
    lastpage = $('body').data("lastpage")
    if (lastpage) {
      // browser back button takes us one level higher
      scrollToPage(lastpage);
    }
  }
  
  $('embed').each( function () {
    this.onload = function(){ 
      var svg = this.getSVGDocument();
      
      // Pipe-O-Matic:
      var pipes = svg.getElementsByClassName('pipe_group');
      $(pipes).each( function(){ 
        var pipe_group = this;
        $(this).find('path').each( function(){
          var path = this;
          var halfsize = parseInt( parseFloat( path.style.strokeWidth ) / 2 );
          var opacity = 0.15;
          for( var width = halfsize-1; width > 0; width-- )
          {
            opacity -= 0.1/halfsize;
            var n = path.cloneNode();
            n.className.baseVal += ' pipe-o-matic_clone';
            n.style.strokeWidth = width * 2;
            n.style.stroke = '#ffffff';
            n.style.strokeOpacity = opacity;
            pipe_group.insertBefore( n, path.nextElementSibling );
          }
        });
      });
    
      // Flow-O-Matic: add Paths
      var segmentLength = 40;
      var pipes = svg.getElementsByClassName('show_flow');
      $(pipes).each( function(){ 
        var pipe_group = this;
        var length = 0.0;
        $(this).find('path').each( function(){
          var path = this;
          if( path.className.animVal.split(' ').indexOf( 'pipe-o-matic_clone' ) > 0 ) return;
          var stroke = path.style.stroke;
          var r, g, b;
          if(stroke[0] == '#' )
          {
            r = parseInt( path.style.stroke.substring( 1, 3 ), 16 );
            g = parseInt( path.style.stroke.substring( 3, 5 ), 16 );
            b = parseInt( path.style.stroke.substring( 5, 7 ), 16 );
          } else if( stroke.indexOf( 'rgb(') == 0 )
          {
            var colors = stroke.replace(/[^0-9,.]*/g, '' ).split(',');
            r = colors[0];
            g = colors[1];
            b = colors[2];
          }
          var rTarget = 0; // this color should be somehow user setable - but how?
          var gTarget = 0;
          var bTarget = 0;
          function toHex( v ) { var ret = parseInt( v ).toString( 16 ); return (ret.length<2)?'0'+ret:ret; }
          for( var i = segmentLength/2; i > 0; i -= 2 )
          {
            var factor = 1-i/(segmentLength/2);
            var offset = (length+segmentLength/2-i) % segmentLength;
            var low = 2*i;
            var high = segmentLength - low;
            var n = path.cloneNode();
            n.className.baseVal += ' flow-o-matic_clone';
            n.style.stroke = '#' + toHex( r*factor+rTarget*(1-factor) ) + toHex( g*factor+gTarget*(1-factor) ) + toHex( b*factor+bTarget*(1-factor) );
            if( high > offset )
            {
              n.style.strokeDasharray = [ high - offset, low, offset, 0 ];
            } else {
              n.style.strokeDasharray = [ 0, low - (offset - high), high, offset - high ];
            }
            n.style.strokeDashoffset = length % (0.5*segmentLength);
            pipe_group.insertBefore( n, path.nextElementSibling );
          }
          length += path.getTotalLength();
        });
      });
      
      // Flow-O-Matic: add CSS
      // helper for multiple bowser support
      function createKeyframe( name, content )
      {
        return '@keyframes '         + name + " {\n" + content + "}\n" +
               '@-moz-keyframes '    + name + " {\n" + content + "}\n" +
               '@-webkit-keyframes ' + name + " {\n" + content + "}\n";
      }
      var keyframes = createKeyframe( 'move', 
        "from {  stroke-dashoffset: " + segmentLength + ";  }\n"
      + "to   {  stroke-dashoffset: 0;  }\n" );
      function createCSSRules( style, value )
      {
        return style + ': ' + value + ";\n"
          + '-moz-' + style + ': ' + value + ";\n"
          + '-webkit-' + style + ': ' + value + ";\n";
      }
      keyframes += ".flow_active path {\n"
        + createCSSRules( 'animation-duration'       , '3s'       )
        + createCSSRules( 'animation-name'           , 'move'     )
        + createCSSRules( 'animation-timing-function', 'linear'   )
        + createCSSRules( 'animation-iteration-count', 'infinite' )
        + "}\n";  
        var s = svg.createElementNS( 'http://www.w3.org/2000/svg', 'style' );
        s.setAttribute('type','text/css');
        s.textContent = keyframes;
        $( 'svg', svg ).prepend( s );
    };
  });
  
  visu.subscribe( ga_list );
  $(window).trigger('resize');
  $("#pages").triggerHandler("done");
}

function create_pages( page, path, flavour, type ) {

  var creator = design.getCreator(page.nodeName);
  var retval = creator.create(page, path, flavour, type);

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
        
  if (jQuery(retval).is(".widget") || (jQuery(retval).is(".group")) ) {
    retval = jQuery("<div class='widget_container " + 
      (retval.data("rowspanClass") ? retval.data("rowspanClass") : '')+"' />")
      .append(retval);
  }
        
  return retval;
}

function scrollToPage( page_id, speed ) {
  $('.activePage').removeClass('activePage');
  $('.pagejump.active').removeClass('active');
  if (page_id.match(/^id_[0-9_]+$/)==null) {
	  // find Page-ID by name
	  page_id = $('.page h1:contains('+page_id+')').closest(".page").attr("id");
  }
  $('#'+page_id).addClass('pageActive activePage');                         // show new page
  $('#'+page_id+'_navbar').addClass('navbarActive');

  // which is the parent of target page_id?
  // => set this id as lastpage in url for window.onpopstate handling
  var path = page_id.split( '_' );
  if (path.length > 1) {
    // above top level
    // everything besides the last number is the parent id
    path.pop();
    // store lastpage in body.data
    $('body').data("lastpage", path.join("_"));
  }
  else {
    // top level
    $('body').data("lastpage", page_id);
  }
  
  // push new state to history
  window.history.pushState(page_id, page_id, window.location.href);
    
  main_scroll.seekTo( $('#'+page_id), speed ); // scroll to it
  var pagedivs=$('div', '#'+page_id); 
  for( var i = 0; i<pagedivs.length; i++) { //check for inline diagrams & refresh
    if( /diagram_inline/.test(pagedivs[i].className)) {
      refreshDiagram(pagedivs[i]);
    }
  }
  // set pagejump for this page to active if it exists
  $(".pagejump > .actor").each(function (i) {
	  if ($(this).data().target.match(/^id_[0-9_]+$/)==null) {
		  // get page id by name
		  if ($('#'+page_id+' h1:contains('+$(this).data().target+')').size()>0) {
			  $(this).parent().addClass("active");
		  }
	  }
	  else if (page_id==$(this).data().target) {
		  $(this).parent().addClass("active");
	  }
  });
  $(window).trigger('scrolltopage',page_id);
}

function updateTopNavigation() {
  var path = $('#main .page').eq( this.getIndex() ).attr('id').split( '_' );
  var id = 'id_'; //path[0];
  var nav = '';
  for( var i = 1; i < path.length; i++ ) { // element 0 is id_ (JNK)
    id  += path[i];
    if ($('#'+id).hasClass("page")) {
    
    nav += ((1==i) ? '' : '<span> &#x25ba; </span>')
        +  '<a href="javascript:scrollToPage(\'' +id+ '\')">'
        +  $('#' + id + ' h1').text() + '</a>';
    }
    id  += '_';
  }
  $('.nav_path').html( nav );
  var new_array = path;
  var old_array = old_scroll;
  old_scroll = path;
  path = path.join('_');
  for( var i = new_array.length; i < old_array.length; i++ ) {
    path += '_' + old_array[i]; // reuse of path...
    $('#'+path).removeClass('pageActive');
    $('#'+path+'_navbar').removeClass('navbarActive');
  }
}

/*
 * Show a popup of type "type".
 * The attributes is an type dependend object
 * This function returnes a jQuery object that points to the whole popup,
 * so it's content can be easily extended
 */
function showPopup( type, attributes ) {
  //var retval = design.popups[ type ].create( attributes ); //page, path );
  //return retval;
  if( !design.popups[ type ] ) type = 'unknown';

  return design.popups[ type ].create( attributes );
}

/*
 * Remove the popup.
 * The parameter is the jQuery object returned by the showPopup function
 */
function removePopup( jQuery_object ) {
  jQuery_object.remove();
}

/****************************************************************************/
/* FIXME - Question: should this belong to the VisuDesign object so that it */
/* is possible to overload?!?                                               */
/****************************************************************************/
function refreshAction( target, src ) {
  target.src = src + '&' + new Date().getTime();
}
function setupRefreshAction() {
  var refresh = $(this).data('refresh');
  if( refresh && refresh > 0 ) {
    var target = $('img', $(this) )[0] || $('iframe', $(this) )[0];
    var src = target.src;
    if( src.indexOf('?') < 0 ) src += '?';
    $(this).data('interval', setInterval( function(){refreshAction(target, src);}, refresh ) );
  }
}


function selectDesign() {
  $body = $("body");

  $("body > *").hide();
  $body.css({backgroundColor: "black"});
    
  $div = $("<div id=\"designSelector\" />");
  $div.css({background: "#808080", width: "400px", color: "white", margin: "auto", padding: "0.5em"});
  $div.html("Loading ...");
    
  $body.append($div);
    
  $.getJSON("edit/get_designs.php", function(data) {
    $div.empty();
        
    $div.append("<h1>Please select design</h1>");
    $div.append("<p>The Location/URL will change after you have chosen your design. Please bookmark the new URL if you do not want to select the design every time.</p>");
        
    $.each(data, function(i, element) {
      var $myDiv = $("<div />");

      $myDiv.css({cursor: "pointer", padding: "0.5em 1em", borderBottom: "1px solid black", margin: "auto", width: "262px", position: "relative"});
            
      $myDiv.append("<div style=\"font-weight: bold; margin: 1em 0 .5em;\">Design: " + element + "</div>");
      $myDiv.append("<iframe src=\"designs/design_preview.html?design=" + element + "\" width=\"160\" height=\"90\" border=\"0\" scrolling=\"auto\" frameborder=\"0\" style=\"z-index: 1;\"></iframe>");
      $myDiv.append("<img width=\"60\" height=\"30\" src=\"media/arrow.png\" alt=\"select\" border=\"0\" style=\"margin: 60px 10px 10px 30px;\"/>");
            
      $div.append($myDiv);

      var $tDiv = $("<div />");
      $tDiv.css({background: "transparent", position: "absolute", height: "90px", width: "160px", zIndex: 2})
      var pos = $myDiv.find("iframe").position();
      $tDiv.css({left: pos.left + "px", top: pos.top + "px"});
      $myDiv.append($tDiv);
            
      $myDiv.hover(function() {
        // over
        $myDiv.css({background: "#bbbbbb"});
      },
      function() {
        // out
        $myDiv.css({background: "transparent"});
      });
            
      $myDiv.click(function() {
        if (document.location.search == "") {
          document.location.href = document.location.href + "?design=" + element;
        } else {
          document.location.href = document.location.href + "&design=" + element;
        }
      })
            
    })
  })
}

/**
 * Change the size of the selected navbar
 * 
 * currently only "left" and "right" are implemented
 */
function navbarSetSize( position, size )
{
  var cssSize = size + (isFinite( size ) ? 'px' : '');
  switch( position )
  {
    case 'left':
      $( '#navbarLeft'      ).css( { width: cssSize } );
      break;
      
    case 'right':
      $( '#centerContainer' ).css( 'padding-right', cssSize );
      $( '#navbarRight'     ).css( { width: cssSize, 'margin-right': '-' + cssSize } );
      break;
  }
  handleResize();
}
