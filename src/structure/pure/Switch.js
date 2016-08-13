/* Switch.js 
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
 *
 * @module Switch 
 * @title  CometVisu Switch 
 */


/**
 * The switch widget shows two states (e.g. ON and OFF) and can toggle between them.
 *
 * @widget_example <meta>
 *   <caption>Configuration example of a switch widget using mapping and styling</caption>
 *   <screenshot name="switch_example_on">
 *    <caption>Switch turned on</caption>
 *    <data address="0/0/0">1</data>
 *   </screenshot>
 *   <screenshot name="switch_example_off">
 *    <caption>Switch turned off</caption>
 *    <data address="0/0/0">0</data>
 *   </screenshot>
 * </meta>
 * <cv-meta>
 *  <mappings>
 *    <mapping name="OnOff">
 *      <entry value="0">O</entry>
 *      <entry value="1">I</entry>
 *    </mapping>
 *  </mappings>
 *  <stylings>
 *    <styling name="GreyGreen">
 *      <entry value="0">grey</entry>
 *      <entry value="1">green</entry>
 *    </styling>
 *  </stylings>
 * </cv-meta>
 * <switch mapping="OnOff" styling="GreyGreen">
 *   <layout colspan="3" />
 *   <label>Switch</label>
 *   <address transform="DPT:1.001" mode="readwrite">0/0/0</address>
 * </switch>
 * @module structure/pure/Switch
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
 
  design.basicdesign.addCreator('switch', {
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
    var ret_val = basicdesign.createDefaultWidget( 'switch', $e, path, flavour, type, this.update );
    // and fill in widget specific data
    var data = templateEngine.widgetDataInsert( path, {
      'on_value'  : $e.attr('on_value' ) || 1,
      'off_value' : $e.attr('off_value') || 0
    } );
    
    ret_val += '<div class="actor switchUnpressed"><div class="value">-</div></div>';
    
    return ret_val + '</div>';
  },
  /**
   * Description
   * @method update
   * @param {} ga
   * @param {} d
   * @return 
   */
  update: function( ga, d ) { 
    var 
      element = $(this),
      data  = templateEngine.widgetDataGetByElement( element ),
      actor = element.find('.actor'),
      value = basicdesign.defaultUpdate( ga, d, element, true, element.parent().attr('id') ),
      off   = templateEngine.map( data['off_value'], data['mapping'] );
    actor.removeClass( value == off ? 'switchPressed' : 'switchUnpressed' );
    actor.addClass(    value == off ? 'switchUnpressed' : 'switchPressed' );
  },
  /**
   * Description
   * @method action
   * @param {} path
   * @param {} actor
   * @param {} isCaneled
   * @return 
   */
  action: function( path, actor, isCaneled ) {
    if( isCaneled ) return;
    
    var 
      widgetData  = templateEngine.widgetDataGet( path );
    
    for( var addr in widgetData.address )
    {
      if( !(widgetData.address[addr][1] & 2) ) continue; // skip when write flag not set
      templateEngine.visu.write( addr, templateEngine.transformEncode( widgetData.address[addr][0], widgetData.basicvalue == widgetData.off_value ? widgetData.on_value : widgetData.off_value ) );
    }
  }
});

}); // end define