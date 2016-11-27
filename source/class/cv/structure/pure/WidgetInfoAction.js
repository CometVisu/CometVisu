/* WidgetInfoAction.js 
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
 * This is a halper class for the InfoAction widget it cannot be used directly
 *
 * @author Tobias Bräutigam
 * @since 0.10.0 (as widget), 0.9.2 (as plugin)
 */
qx.Class.define('cv.structure.pure.WidgetInfoAction', {
  extend: cv.structure.pure.AbstractWidget,
  include: cv.role.HasChildren,

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    anonymous : {
      refine: true,
      init: true
    },
    childObjects: {check: "Array", init: []},
    containerClass: {check: "String", nullable: true}
  },

  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {
    afterParse: function (xml, path) {
      var data = cv.data.Model.getInstance().getWidgetData(path);
      data.containerClass = data.$$type;
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    getDomString: function () {
      return this.getChildrenDomString();
    }
  },
  defer: function () {
    cv.xml.Parser.addHandler("widgetinfo", cv.structure.pure.WidgetInfoAction);
    cv.xml.Parser.addHandler("widgetaction", cv.structure.pure.WidgetInfoAction);
    cv.xml.Parser.addHook("widgetinfo", "after", cv.structure.pure.WidgetInfoAction.afterParse, cv.structure.pure.WidgetInfoAction);
    cv.xml.Parser.addHook("widgetaction", "after", cv.structure.pure.WidgetInfoAction.afterParse, cv.structure.pure.WidgetInfoAction);
    cv.xml.Parser.addHook("widgetinfo", "after", cv.role.HasChildren.parseChildren, cv.role.HasChildren);
    cv.xml.Parser.addHook("widgetaction", "after", cv.role.HasChildren.parseChildren, cv.role.HasChildren);
  }
});
