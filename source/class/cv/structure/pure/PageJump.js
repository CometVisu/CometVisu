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
 * The pagejump widget can be used to link the visu pages.
 * The function is similar to hyperlinks.
 *
 * @author Christian Mayer
 * @since 2012
 */
qx.Class.define('cv.structure.pure.PageJump', {
  extend: cv.structure.AbstractWidget,
  include: [
    cv.role.HasChildren,
    cv.role.HasAnimatedButton
  ],

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
     * @protected
     */
    _onScrollToPage: function(page_id) {
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

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    target : {
      check: "String",
      init: "0"
    },
    activeScope : {
      check: ['target', 'path'],
      init: 'target'
    },
    name : {
      check: "String",
      nullable: true
    },
    targetPath : {
      check: "String",
      nullable: true
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {

    // overridden
    _getInnerDomString: function() {
      var actor = '<div class="actor switchUnpressed';
      if (this.getAlign()) {
        actor += this.getAlign();
      }
      actor += '">';
      if (this.getName()) {
        actor += '<div class="value">' + this.getName() + '</div>';
      }
      actor += '</div>';
      return actor + this.getChildrenDomString();
    },

    // overridden
    action: function() {
      var target = this.getTarget();
      if (this.getTargetPath() !== null) {
        target = cv.TemplateEngine.getInstance().getPageIdByPath(target,this.getTargetPath());
      }
      cv.TemplateEngine.getInstance().scrollToPage( target );
    }
  },

  defer: function(statics) {
    // register the parser
    cv.xml.Parser.addHandler("pagejump", cv.structure.pure.PageJump);
    cv.xml.Parser.addHook("pagejump", "after", statics.afterParse, statics);
    cv.xml.Parser.addHook("pagejump", "after", cv.role.HasChildren.parseChildren, cv.role.HasChildren);
    cv.MessageBroker.getInstance().subscribe("path.pageChanged", statics._onScrollToPage, statics);
  }
});
