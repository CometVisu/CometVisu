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
var styles   = {}; // store the styles  

var ga_list = [];

var main_scroll;
var old_scroll = '';

visu = new CometVisu('/cgi-bin/');//{};
visu.update = function( json ) // overload the handler
{
  for( key in json )
  {
    var GA = 'GA' + key.split('/').join('_');
    var elements = $( '.' + GA );
    for( i = 0; i < elements.length; i++ )
    {
      var element = $( elements[i] );
      var value = decodeDPT( json[key], element.data('datatype') );
      element.data( 'value', value );
      $('.value', element).text( map( value, element ) );

      var style = element.data('style');
      if( style && styles[style] && styles[style][value] )
      {
        element.removeClass();
        element.addClass( 'actor ' + GA + ' ' + styles[style][value] );
      }
      switch( element.data( 'type' ) )
      { 
        case 'toggle':
          element.removeClass( value == '0' ? 'switchPressed' : 'switchUnpressed' );
          element.addClass(    value == '0' ? 'switchUnpressed' : 'switchPressed' );
          break;
        case 'dim':
          element.slider( 'value', value ); // only update when necessary
      }
    }
  }
}
visu.user = 'demo_user'; // example for setting a user

$(document).ready(function() {
  // get the data once the page was loaded
  window.setTimeout("$.get( 'visu_config.xml', setup_page );", 200);

  // disable text selection - it's annoying on a touch screen!
  if($.browser.mozilla)
  {//Firefox
      $('body').css('MozUserSelect','none');
  } else if($.browser.msie) {//IE
      $(document).bind('selectstart',function(){return false;});
  } else {//Opera, etc.
      $(document).mousedown(function(){return false;});
  }
} );

function map( value, element )
{
  var map = element.data('mapping');
  if( map && mappings[map] && mappings[map][value])
    return mappings[map][value];
  return value;
}

/**
 * Make sure everything looks right when the window gets resized.
 * This is necessary as the scroll effect requires a fixed element size
 */
function handleResize()
{
  var uagent = navigator.userAgent.toLowerCase();

  if (/(android|blackberry|iphone|ipod|series60|symbian|windows ce|palm)/i.test(uagent)) {
      var width = $( window ).width();
      $( '#main' ).css( 'width', width );
      $( 'head' ).append( '<style type="text/css">.page{width:' + (width-0) + 'px;}</style>' );
      // do nothing
  } else {
  var width = $( window ).width();
  var height = $( window ).height() - $( '#top' ).height() - $( '#bottom' ).height() - 2;
  $( '#main' ).css( 'width', width ).css( 'height', height );
  $( 'head' ).append( '<style type="text/css">.page{width:' + (width-0) + 'px;height:' + height + 'px;}</style>' );  

  }
  main_scroll != undefined && main_scroll.seekTo( main_scroll.getIndex(), 0 ); // fix scroll
}
$( window ).bind( 'resize', handleResize );

function setup_page( xml )
{
  // adapt width for pages to show
  handleResize();

  // start with the mappings
  $( 'pages > mappings mapping', xml ).each( function(i){
    var name = $(this).attr('name');
    mappings[ name ] = {};
    $(this).find('entry').each( function(){
      mappings[ name ][ $(this).attr('value') ] = $(this).text();
    });
  });

  // then the styles
  $( 'pages > styles style', xml ).each( function(i){
    var name = $(this).attr('name');
    styles[ name ] = {};
    $(this).find('entry').each( function(){
      styles[ name ][ $(this).attr('value') ] = $(this).text();
    });
  });

  // and now setup the pages
  var page = $( 'pages > page', xml )[0]; // only one page element allowed...

  create_pages( page, '0' );

  // setup the scrollable
  main_scroll = $('#main').scrollable({keyboard: false, touch: false}).data('scrollable');
  main_scroll.onSeek( updateTopNavigation );

  $('.fast').bind('click', function(){
    main_scroll.seekTo( $(this).text() );
  });

  visu.subscribe( ga_list );
}

function create_pages( page, path )
{
  switch( page.nodeName )
  {
    case 'page':
      return design.createPage( page, path );
    case 'line':
      return design.createLine();
    case 'text':
      return design.createText( page );
    case 'info':
    case 'shade':
      return design.createInfo( page );
    case 'dim':
      return design.createDim( page );
    case 'switch':
    case 'toggle':
      return design.createSwitch( page );
    case 'trigger':
      return design.createTrigger( page );
  }
  return design.createUnknown( page );
}

function scrollToPage( page_id )
{
  $('#'+page_id).css( 'display', '' );                         // show new page
  main_scroll.seekTo( $('.page').index( $('#'+page_id)[0] ) ); // scroll to it
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

/****************************************************************************/
/* FIXME - Question: should this belong to the VisuDesign object so that it */
/* is possible to overload?!?                                               */
/****************************************************************************/
function switchAction()
{
  var data = $(this).data();
  visu.write( data.GA, data.value=='1' ? '0' : '1', data.datatype ); 
}

function triggerAction()
{
  var data = $(this).data();
  visu.write( data.GA, data.sendValue, data.datatype );
}

/**
 * The update thread to send the slider position to the bus
 */
function slideUpdate(actor)
{
  var data = actor.data();
  visu.write( data.GA, actor.slider('value'), data.datatype );
}

/**
 * Start a thread that regularily sends the silder position to the bus
 */
function slideStart(event,ui)
{
  var actor = $( '.actor', $(this).parent() );
  actor.data( 'updateFn', setInterval( function(){slideUpdate(actor);}, 250 ) ); // update KNX every 250 ms 
}

/**
 * Delete the update thread and send the final value of the slider to the bus
 */
function slideChange(event,ui)
{
  var data = $( '.actor', $(this).parent() ).data();
  var actor = $( '.actor', $(this).parent() );

  clearInterval( data.updateFn, ui.value);

  if( data.value != ui.value )
    visu.write( data.GA, ui.value, data.datatype );
}
