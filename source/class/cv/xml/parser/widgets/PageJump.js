/* PageJump.js 
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
 *
 */
qx.Class.define('cv.xml.parser.widgets.PageJump', {
  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    afterParse: function(xml, path) {
      var data = cv.data.Model.getInstance().getWidgetData(path);
      var widgetInfo = qx.bom.Selector.query('widgetinfo > *', xml)[0];
      if (widgetInfo!=undefined) {
        data.classes += " infoaction";
      }
    },
    getAttributeToPropertyMappings: function () {
      return {
        'target'      : { 'default': '0' },
        'active_scope': { target: 'activeScope', 'default': 'target' },
        'name'        : {},
        'path'        : { target: 'targetPath' }
      };
    },
    /**
     * Handle page change events and update the active state of this PageJump
     *
     * @param ev {Event}
     * @protected
     */
    _onScrollToPage: function(ev) {
      var page_id = ev.getData();
      var page = cv.structure.WidgetFactory.getInstanceById(page_id);
      var model = cv.data.Model.getInstance();
      var name = page.getName();

      // remove old active classes
      qx.bom.Selector.query('.pagejump.active').forEach(function(elem) {
        qx.bom.element.Class.remove(elem, 'active');
      }, this);
      qx.bom.Selector.query('.pagejump.active_ancestor').forEach(function(elem) {
        qx.bom.element.Class.remove(elem, 'active_ancestor');
      }, this);

      // and set the new active ones
      qx.bom.Selector.query('.pagejump').forEach(function(elem) {
        var data = model.getWidgetDataByElement(elem);
        if (name == data.target) {
          qx.bom.element.Class.add(elem, 'active');
        }
      }, this);

      // now set the active ancestors
      var parentPage = cv.util.Tree.getParentWidget(page, "page");
      // set for all parent pages apart from the root page
      while (parentPage != null && cv.util.Tree.getParentWidget(parentPage, "page") != null) {
        var parentName = parentPage.getName();

        qx.bom.Selector.query('.pagejump').forEach(function(elem) {
          var data = model.getWidgetDataByElement(elem);
          if (parentName == data.target || (data.active_scope == "path" && data.path != undefined && data.path.match(parentName + "$"))) {
            qx.bom.element.Class.add(elem, 'active_ancestor');
          }
        });
        // recursively find pagejumps for parent pages
        parentPage = cv.util.Tree.getParentWidget(parentPage, "page");
      }
    }
  },

  defer: function(statics) {
    // register the parser
    cv.xml.Parser.addHandler("pagejump", statics);
    cv.xml.Parser.addHook("pagejump", "after", statics.afterParse, statics);
    cv.xml.Parser.addHook("pagejump", "after", cv.role.HasChildren.parseChildren, cv.role.HasChildren);
    qx.event.message.Bus.subscribe("path.pageChanged", statics._onScrollToPage, statics);
  }
});
