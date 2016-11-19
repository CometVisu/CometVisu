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
 * TODO: complete docs
 *
 * @module structure/pure/PageJump
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2012
 */
qx.Class.define('cv.structure.pure.PageJump', {
  extend: cv.structure.pure.AbstractWidget,
  include: [
    cv.role.HasChildren,
    cv.role.HasAnimatedButton
  ],

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    this.base(arguments, props);
    cv.MessageBroker.getInstance().subscribe("path."+this.getPath()+".afterPageChange", this._onScrollToPage, this);
  },

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
      init: ""
    },
    targetPath : {
      check: "String",
      init: null,
      nullable: true
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {

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

    downaction: this.beforeDownAction,

    action: function( path, actor, isCanceled ) {
      this.beforeAction(path, actor, isCanceled);
      if( isCanceled ) return;

      var target = this.getTarget();
      if (this.getTargetPath() !== null) {
        target = cv.TemplateEngine.getInstance().getPageIdByPath(target,this.getTargetPath());
      }
      cv.TemplateEngine.getInstance().scrollToPage( target );
    },

    /**
     * Handle page change events and update the active state of this PageJump
     *
     * @prptected
     */
    _onScrollToPage: function(event, page_id) {
      var page = $('#' + page_id);
      var name = templateEngine.widgetData[page_id].name;

      // remove old active classes
      $('.pagejump.active').removeClass('active');
      $('.pagejump.active_ancestor').removeClass('active_ancestor');

      // and set the new active ones
      $('.pagejump').each(function () {
        var $pagejump = $(this);
        var data = templateEngine.getWidgetDataByElement(this);
        if (name == data.target) {
          $pagejump.addClass('active');
        }
      });

      // now set the active ancestors
      var parentPage = templateEngine.getParentPage(page);
      // set for all parent pages apart from the root page
      while (parentPage != null && templateEngine.getParentPage(parentPage) != null) {
        var
          parentId = parentPage.attr('id'),
          parentName = templateEngine.widgetData[parentId].name;

        $('.pagejump').each(function () {
          var $pagejump = $(this);
          var data = templateEngine.getWidgetDataByElement(this);
          if (parentName == data.target || (data.active_scope == "path" && data.path != undefined && data.path.match(parentName + "$"))) {
            $pagejump.addClass('active_ancestor');
          }
        });
        // recursively find pagejumps for parent pages
        parentPage = templateEngine.getParentPage(parentPage);
      }
    }
  },

  defer: function() {
    // register the parser
    cv.xml.Parser.addHandler("pagejump", cv.structure.pure.PageJump);
    cv.xml.Parser.addHook("pagejump", "after", cv.structure.pure.PageJump.afterParse, cv.structure.pure.PageJump);
  }
});
