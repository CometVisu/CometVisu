/* structure_plugin.js (c) 2015 by Tobias Bräutigam [tbraeutigam at gmail dot com]
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
 * This plugin add a infoaction widget, which is a combination of an info/text widget
 * and a page/pagejump/switch/trigger/... widget
 * 
 * use case: if you have a group of lights, you can show the number of turned on lights
 * 		and control the whole group in one widget
 * <infoaction>
 * 	<infowidget>
 * 
 *  </infowidget>
 *  <actionwiget>
 *  
 *  </actionwidget>
 * </infoaction>
 */

/**
 * short documentation
 *
 * widgets:
 *   - infoaction
 *
 * attributes:
 *   - series:               optional, "hour", "day" (default), "week", "month", "year"
 *   - period:               optional, number of "series" to be shown
 *   - refresh:              optional, refresh-rate in seconds, no refresh if missing
 *   - fill:                 optional, true or false - filling the space under the line
 *   - gridcolor:            optional, color for dataline and grid, HTML-colorcode
 *   - width, height:        optional, width and height of "inline"-diagram
 *   - previewlabels:        optional, show labels on "inline"-diagram
 *   - popup:                optional, make diagram clickable and open popup
 *   - legend:               optional, "none", "both", "inline", "popup" select display of legend
 *   - title:                optional, diagram title (overrides label-content)
 */
define( ['structure_custom', 'css!plugins/infoaction/infoaction.css'  ], function( VisuDesign_Custom ) {
  VisuDesign_Custom.prototype.addCreator("infoaction", {
      create: function(element, path, flavour, type) {
        return createWidget(false, element, path, flavour, type);
      },
    });
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
   
    function getWidgetElements(xmlElement, path, flavour, type) {
      var infoWidget = $('infowidget > *', xmlElement).first()[0];
      var actionWidget = $('actionwidget > *', xmlElement).first()[0];
      var data = templateEngine.widgetDataInsert( path+"_0", {
        containerClass           : "infowidget"
      } );
      data = templateEngine.widgetDataInsert( path+"_1", {
        containerClass           : "actionwidget"
      } );
      
      var ret_val = templateEngine.create_pages(infoWidget, path+"_0", flavour, infoWidget.nodeName);
      ret_val += templateEngine.create_pages(actionWidget, path+"_1", flavour, actionWidget.nodeName);
      return ret_val;
    }
});
