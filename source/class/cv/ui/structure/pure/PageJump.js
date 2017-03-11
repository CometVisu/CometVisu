/* PageJump.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
qx.Class.define('cv.ui.structure.pure.PageJump', {
  extend: cv.ui.structure.AbstractWidget,
  include: [
    cv.ui.common.HasChildren,
    cv.ui.common.HasAnimatedButton
  ],

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
    STATICS
  ******************************************************
  */
  statics: {
    /**
     * Handle page change events and update the active state of this PageJump
     *
     * @param ev {Event}
     * @protected
     */
    _onScrollToPage: function(ev) {
      var page_id = ev.getData();
      var page = cv.ui.structure.WidgetFactory.getInstanceById(page_id);
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
        if (name === data.target) {
          qx.bom.element.Class.add(elem, 'active');
        }
      }, this);

      // now set the active ancestors
      var parentPage = cv.util.Tree.getParentWidget(page, "page");
      // set for all parent pages apart from the root page

      var pageJumps = qx.bom.Selector.query('.pagejump');
      var markPageJumps = function(parentName, elem) {
        var data = model.getWidgetDataByElement(elem);
        if (parentName === data.target || (data.active_scope === "path" && data.path !== undefined && data.path.match(parentName + "$"))) {
          qx.bom.element.Class.add(elem, 'active_ancestor');
        }
      };

      while (parentPage && cv.util.Tree.getParentWidget(parentPage, "page")) {
        pageJumps.forEach(qx.lang.Function.curry(markPageJumps, parentPage.getName()));
        // recursively find pagejumps for parent pages
        parentPage = cv.util.Tree.getParentWidget(parentPage, "page");
      }
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
    cv.ui.structure.WidgetFactory.registerClass("pagejump", statics);
    qx.event.message.Bus.subscribe("path.pageChanged", statics._onScrollToPage, statics);
  }
});
