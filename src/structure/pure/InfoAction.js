/* InfoAction.js 
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
 * The infoaction widget is a combination of an info/text widget and an "action"-widget, e.g. switch or trigger.
 * 
 * Use case: if you have a group of lights, you can show the number of lights currently switched on
 * and control the whole group in one widget.
 *
 * @widget_example <settings>
 *   <caption>Example combines an info widget to show the number of lights currently switched on, and an Switch to control them</caption>
 *   <screenshot name="infoaction_lights">
 *     <data address="0/0/0">4</data>
 *     <data address="0/0/1">1</data>
 *   </screenshot>
 * </settings>
 * <meta>
 *  <mappings>
 *    <mapping name="OnOff">
 *      <entry value="0">Off</entry>
 *      <entry value="1">On</entry>
 *    </mapping>
 *  </mappings>
 *  <stylings>
 *    <styling name="GreyGreen">
 *      <entry value="0">grey</entry>
 *      <entry value="1">green</entry>
 *    </styling>
 *  </stylings>
 * </meta>
 * <infoaction>
 *  <layout colspan="4"/>
 *  <label>Lights</label>
 * 	<widgetinfo>
 *    <info>
 *     <address transform="DPT:9.001">0/0/0</address>
 *    </info>
 *  </widgetinfo>
 *  <widgetaction>
 *   <switch mapping="OnOff" styling="GreyGreen">
 *    <layout colspan="3" />
 *    <address transform="DPT:1.001" mode="readwrite">0/0/1</address>
 *   </switch>
 *  </widgetaction>
 * </infoaction>
 *
 * @module structure/pure/InfoAction
 * @requires structure/pure
 * @author Tobias Bräutigam
 * @since 0.10.0 (as widget), 0.9.2 (as plugin)
 */
define( ['_common' ], function( design ) {
  "use strict";

  design.basicdesign.addCreator("infoaction", {
      /**
       * Creates the InfoAction widget
       *
       * @method create
       * @param {} element
       * @param {} path
       * @param {} flavour
       * @param {} type
       * @return String - HTML representation if the widget as string
       */
      create: function(element, path, flavour, type) {
        return createWidget(false, element, path, flavour, type);
      }
    });
  /**
   * Creates the InfoAction widget
   *
   * @method createWidget
   * @param {} isInfo
   * @param {} element
   * @param {} path
   * @param {} flavour
   * @param {} type
   * @return String - HTML representation if the widget as string
   */
  function createWidget(isInfo, element, path, flavour, type) {
      var $e = $(element);

      // create the main structure
      var ret_val = templateEngine.design.createDefaultWidget('infoaction', $e, path, flavour, type);
      // and fill in widget specific data
      var data = templateEngine.widgetDataInsert( path, {
        content           : getWidgetElements($e, path)
      } );
      ret_val += data.content;
      return ret_val + '</div>';
    }
   
  /**
   * Description
   * @method getWidgetElements
   * @param {} xmlElement
   * @param {} path
   * @param {} flavour
   * @param {} type
   * @return ret_val
   */
  function getWidgetElements(xmlElement, path, flavour, type) {
      var infoWidget = $('widgetinfo > *', xmlElement).first()[0];
      var actionWidget = $('widgetaction > *', xmlElement).first()[0];
      var data = templateEngine.widgetDataInsert( path+"_0", {
        containerClass           : "widgetinfo"
      } );
      data = templateEngine.widgetDataInsert( path+"_1", {
        containerClass           : "widgetaction"
      } );
      
      var ret_val = templateEngine.create_pages(infoWidget, path+"_0", flavour, infoWidget.nodeName);
      ret_val += templateEngine.create_pages(actionWidget, path+"_1", flavour, actionWidget.nodeName);
      return ret_val;
    }
});
