/* MultiTrigger.js 
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
 * TODO: complete docs
 * @module structure/pure/Multitrigger
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
 
  design.basicdesign.addCreator('multitrigger', {
  /**
   * Description
   * @method create
   * @param {} element
   * @param {} path
   * @param {} flavour
   * @param {} type
   * @return BinaryExpression
   */
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    
    // create the main structure
    var showstatus = $e.attr('showstatus') === 'true',
        ret_val    = basicdesign.createDefaultWidget( 'multitrigger', $e, path, flavour, type, showstatus ? this.update : undefined );
    // and fill in widget specific data
    var data = templateEngine.widgetDataInsert( path, {
      showstatus  : showstatus,
      button1label: $e.attr('button1label'),
      button1value: $e.attr('button1value'),
      button2label: $e.attr('button2label'),
      button2value: $e.attr('button2value'),
      button3label: $e.attr('button3label'),
      button3value: $e.attr('button3value'),
      button4label: $e.attr('button4label'),
      button4value: $e.attr('button4value')
    } );
    
    // create the actor
    ret_val += '<div class="actor_container" style="float:left">';

    if( data.button1label )
    {
      ret_val += '<div class="actor switchUnpressed">';
      ret_val += '<div class="value">' + data.button1label + '</div>';
      ret_val += '</div>';
    }
    
    if( data.button2label )
    {
      ret_val += '<div class="actor switchUnpressed">';
      ret_val += '<div class="value">' + data.button2label + '</div>';
      ret_val += '</div>';
      ret_val += '<br/>';
    }
    
    if( data.button3label )
    {
      ret_val += '<div class="actor switchUnpressed">';
      ret_val += '<div class="value">' + data.button3label + '</div>';
      ret_val += '</div>';
    }
    
    if( data.button4label )
    {
      ret_val += '<div class="actor switchUnpressed">';
      ret_val += '<div class="value">' + data.button4label + '</div>';
      ret_val += '</div>';
      ret_val += '<br/>';
    }
    
    // replace button labels by mapped values 
    if( undefined !== data.mapping )
    {
      templateEngine.postDOMSetupFns.push( function(){
        var
          $actor = $( '#' + path + ' .actor .value' ),
          v0 = basicdesign.defaultValueHandling( undefined, data.button1value, data ),
          $v0 = $actor.filter(':eq(0)'),
          v1 = basicdesign.defaultValueHandling( undefined, data.button2value, data ),
          $v1 = $actor.filter(':eq(1)'),
          v2 = basicdesign.defaultValueHandling( undefined, data.button3value, data ),
          $v2 = $actor.filter(':eq(2)'),
          v3 = basicdesign.defaultValueHandling( undefined, data.button4value, data ),
          $v3 = $actor.filter(':eq(3)');
        $v0.empty();
        basicdesign.defaultValue2DOM( v0, function(e){ $v0.append( e ) } );
        $v1.empty();
        basicdesign.defaultValue2DOM( v1, function(e){ $v1.append( e ) } );
        $v2.empty();
        basicdesign.defaultValue2DOM( v2, function(e){ $v2.append( e ) } );
        $v3.empty();
        basicdesign.defaultValue2DOM( v3, function(e){ $v3.append( e ) } );
      });
    }
    
    return ret_val + '</div></div>';
  },
  /**
   * Description
   * @method update
   * @param {} ga
   * @param {} d
   */
  update: function( ga, d ) { 
    var element = $(this),
        data  = templateEngine.widgetDataGetByElement( this ),
        thisTransform = data.address[ ga ][0],
        value = templateEngine.transformDecode( thisTransform, d );
    element.find('.actor').each( function(){
      var $this     = $(this),
          index = $this.index() < 3 ? $this.index()+1 : $this.index(),
          isPressed = value === data['button'+index+'value'];
      $this.removeClass( isPressed ? 'switchUnpressed' : 'switchPressed' )
           .addClass(    isPressed ? 'switchPressed' : 'switchUnpressed' );
    });
  },
  downaction: basicdesign.defaultButtonDownAnimation,
  /**
   * Description
   * @method action
   * @param {} path
   * @param {} actor
   * @param {} isCanceled
   */
  action: function( path, actor, isCanceled ) {
    basicdesign.defaultButtonUpAnimation( path, actor );
    if( isCanceled ) return;
    
    var
      $actor = $(actor),
      data  = templateEngine.widgetDataGet( path ),
      index = $actor.index() < 3 ? $actor.index()+1 : $actor.index(),
      value = data['button'+index+'value'];
    for( var addr in data.address )
    {
      if( !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
      templateEngine.visu.write( addr, templateEngine.transformEncode( data.address[addr][0], value ) );
    }
  }
});

}); // end define