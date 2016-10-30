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
define( ['_common', 'lib/cv/role/Update'], function() {
  "use strict";
  Class('cv.structure.pure.WidgetInfoAction', {
    isa: cv.structure.pure.AbstractWidget,
    does: cv.role.HasChildren,

    has: {
      childObjects: { is: 'rw', init: {} }
    },

    after: {
      initialized: function(props) {
        var childs = this.getChildObjects();
        Joose.A.each( this.getChildren(), function(path) {
          var data = templateEngine.widgetDataGet(path);
          var widget = cv.structure.WidgetFactory.createInstance(data.$$type, data);
          if (widget) {
            childs.push(widget);
          }
        }, this);
      }
    },

    augment: {
      getDomString: function () {
        var content = '<div class="widget_container '+this.$$type+'" id="'+this.getPath()+'" data-type="'+this.$$type+'">';
        Joose.A.each( this.getChildObjects(), function(child) {
          content += child.getDomString();
        });
        return content + '</div>';
      }
    }
  });
  cv.xml.Parser.addHandler("widgetinfo", cv.structure.pure.WidgetInfoAction);
  cv.xml.Parser.addHandler("widgetaction", cv.structure.pure.WidgetInfoAction);

  Class('cv.structure.pure.InfoAction', {
    isa: cv.structure.pure.AbstractWidget,

    does: cv.role.HasChildren,

    augment: {
      getDomString: function () {
        return this.getChildrenDomString();
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("infoaction", cv.structure.pure.InfoAction);
}); // end define
