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
    cv.structure.WidgetFactory.registerClass("pagejump", statics);
  }
});
