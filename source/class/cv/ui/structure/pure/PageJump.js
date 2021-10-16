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
qx.Class.define("cv.ui.structure.pure.PageJump", {
  extend: cv.ui.structure.AbstractWidget,
  include: [
    cv.ui.common.HasChildren,
    cv.ui.common.HasAnimatedButton
  ],

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (props) {
    if (!props.name) {
      // when there is no name the widget has no actor as clickable subelement, so we need
      // to bind the click events to the whole widget
      props.bindClickToWidget = true;
    }
    this.base(arguments, props);
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
      check: ["target", "path"],
      init: "target"
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
      const page_id = ev.getData();
      const page = cv.ui.structure.WidgetFactory.getInstanceById(page_id);
      const model = cv.data.Model.getInstance();
      const name = page.getName();

      // remove old active classes
      document.querySelectorAll(".pagejump.active").forEach(function(elem) {
        elem.classList.remove("active");
      }, this);
      document.querySelectorAll(".pagejump.active_ancestor").forEach(function(elem) {
        elem.classList.remove("active_ancestor");
      }, this);

      // and set the new active ones
      document.querySelectorAll(".pagejump").forEach(function(elem) {
        const data = model.getWidgetDataByElement(elem);
        if (name === data.target) {
          elem.classList.add("active");
        }
      }, this);

      // now set the active ancestors
      let parentPage = cv.util.Tree.getParentWidget(page, "page");
      // set for all parent pages apart from the root page

      const pageJumps = document.querySelectorAll(".pagejump");
      const markPageJumps = function (parentName, elem) {
        const data = model.getWidgetDataByElement(elem);
        if (parentName === data.target || (data.activeScope === "path" && (
            (typeof data.path === "string") && data.path.match(parentName + "$") ||
            (typeof data.targetPath === "string") && data.targetPath.match(parentName + "$"))
        )) {
          elem.classList.add("active_ancestor");
        }
      };

      while (parentPage && cv.util.Tree.getParentWidget(parentPage, "page")) {
        pageJumps.forEach(function(elem) {
 markPageJumps(parentPage.getName(), elem); 
});
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
      let actor = "<div class=\"actor switchUnpressed";
      if (this.getAlign()) {
        actor += this.getAlign();
      }
      actor += "\">";
      if (this.getName()) {
        actor += "<div class=\"value\">" + this.getName() + "</div>";
      }
      actor += "</div>";
      return actor + this.getChildrenDomString();
    },

    // overridden
    action: function() {
      let target = this.getTarget();
      if (this.getTargetPath() !== null) {
        target = cv.TemplateEngine.getInstance().getPageIdByPath(target, this.getTargetPath());
      }
      cv.TemplateEngine.getInstance().scrollToPage(target);
    }
  },

  defer: function(statics) {
    cv.ui.structure.WidgetFactory.registerClass("pagejump", statics);
    qx.event.message.Bus.subscribe("path.pageChanged", statics._onScrollToPage, statics);
  }
});
