/* visudesign_pure.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
 * This class defines all the building blocks for a Visu in the "Pure" design
 */
function VisuDesign()
{
  this.createPage = function( page, path )
  {
    var ret_val = $('<div class="widget" />');
      var style = ( '0' != path ) ? 'display:none' : '';
      var name = $(page).attr('name'); //path += '_' + name;
      ret_val.addClass( 'link' );
      ret_val.append( '<a href="javascript:scrollToPage(\''+path+'\')">' + name + '</a>' );
      var childs = $(page).children();
      var container = $( '<div class="clearfix"/>' );

      container.append( '<h1>' + name + '</h1>' );
      $( childs ).each( function(i){ 
        container.append( create_pages(childs[i], path + '_' + i ) );
      } );
      $('#pages').prepend( $( '<div class="page" id="' + path + '" style="'+style+';"/>' ).append(container) );
    return ret_val;;position: relative
  }

  this.createLine = function()
  {
    return $( '<hr />' );
  }

  this.createText = function( page )
  { 
    var ret_val = $('<div class="widget" />');
    ret_val.addClass( 'text' );
    ret_val.append( '<div class="label">' + page.textContent + '</div>' );
    return ret_val;
  }

  this.createInfo =
  this.createShade = function( page )
  {
    var ret_val = $('<div class="widget" />');
      ret_val.addClass( 'info' );
      var label = '<div class="label">' + page.textContent + '</div>';
      ga_list.push( $(page).attr('address') );
      var actor = '<div class="actor GA' + $(page).attr('address').split('/').join('_') + '">';
      if( $(page).attr('pre') ) actor += '<div>' + $(page).attr('pre') + '</div>';
      actor += '<div class="value">-</div>';
      if( $(page).attr('post') ) actor += '<div>' + $(page).attr('post') + '</div>';
      actor += '</div>';
      ret_val.append( label ).append( $(actor).data( {
        'GA':       $(page).attr('address'),
        'datatype': $(page).attr('datatype'),
        'mapping' : $(page).attr('mapping'),
        'style'   : $(page).attr('style'),
      } ) );
    return ret_val;
  }

  this.createDim = function( page )
  {
    var ret_val = $('<div class="widget" />');
    ret_val.addClass( 'dim' );
    var label = '<div class="label">' + page.textContent + '</div>';
    ga_list.push( $(page).attr('address') );
    var actor = $('<div class="actor GA' + $(page).attr('address').split('/').join('_') + '" />');
    ret_val.append( label ).append( actor );
    ret_val.find('.actor').data( {
        'events':   $(actor).data( 'events' ),
        'GA':       $(page).attr('address'),
        'datatype': $(page).attr('datatype'),
        'mapping' : $(page).attr('mapping'),
        'style'   : $(page).attr('style'),
        'type'    : 'dim',
    }).slider({step:0.5, animate: true,start:slideStart,change:slideChange});//slide:slideAction});

    return ret_val;
  }

  this.createSwitch =
  this.createToggle = function( page )
  {
    var ret_val = $('<div class="widget" />');
      ret_val.addClass( 'switch' );
      var label = '<div class="label">' + page.textContent + '</div>';
      var response_address = $(page).attr('response_address');
      ga_list.push( response_address );
      var actor = '<div class="actor GA' + response_address.split('/').join('_') + ' switchUnpressed">';
      if( $(page).attr('pre') ) actor += $(page).attr('pre');
      actor += '<div class="value">-</div>';
      if( $(page).attr('post') ) actor += $(page).attr('post');
      actor += '</div>';
      ret_val.append( label ).append( $(actor).data( {
        'GA':       $(page).attr('address'),
        'datatype': $(page).attr('datatype'),
        'mapping' : $(page).attr('mapping'),
        'style'   : $(page).attr('style'),
        'type'    : 'toggle',
      } ).bind('click',switchAction) );
    return ret_val;
  }

  this.createTrigger = function( page )
  {
    var value = $(page).attr('value') ? $(page).attr('value') : 0;
    var ret_val = $('<div class="widget" />');
    ret_val.addClass( 'switch' );
    var label = '<div class="label">' + page.textContent + '</div>';
    var address = $(page).attr('address');
    var actor = '<div class="actor switchUnpressed">';
    if( $(page).attr('pre') ) actor += $(page).attr('pre');
    var map = $(page).attr('mapping');
    if( mappings[map] && mappings[map][value] )
      actor += '<div class="value">' + mappings[map][value] + '</div>';
    else
      actor += '<div class="value">' + value + '</div>';
    if( $(page).attr('post') ) actor += $(page).attr('post');
    actor += '</div>';
    ret_val.append( label ).append( $(actor).data( {
      'GA':       $(page).attr('address'),
      'datatype': $(page).attr('datatype'),
      'mapping' : $(page).attr('mapping'),
      'style'   : $(page).attr('style'),
      'type'    : 'trigger',
      'sendValue': value,
    } ).bind('click',triggerAction) );

    return ret_val;
  }

  this.createUnknown = function( page )
  {
    var ret_val = $('<div class="widget" />');
    ret_val.append( '<pre>' + page.textContent + '</pre>' );
    return ret_val;
  }

  this.switchAction = function()
  {
    var data = $(this).data();
  //  alert( data.GA + ' = ' + data.value );
    visu.write( data.GA, data.value=='1' ? '0' : '1', data.datatype ); 
  }

  this.slideAction = function(event,ui)
  {
  //alert(ui.value);
    var now = new Date().getTime();
    var data = $( '.actor', $(this).parent() ).data();
    if( data.last &&  (now - data.last) < 1000 ) return; // too fast => early exit
    $( '.actor', $(this).parent() ).data( 'last', now );  
  //$(this).parent().data();
  //  alert( data.GA + ' = ' + data.value );
    //visu.write( data.GA, data.value=='1' ? '0' : '1', data.datatype ); 
    //FIXME eigentlich richtig... visu.write( data.GA, ui.value, data.datatype ); 
  }
};
