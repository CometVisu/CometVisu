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
define( ['_common', 'lib/cv/role/Operate', 'lib/cv/role/HasChildren', 'lib/cv/role/HasAnimatedButton'], function() {
  "use strict";

  Class('cv.structure.pure.PageJump', {
    isa: cv.structure.pure.AbstractWidget,
    does: [
      cv.role.HasChildren
    ],

    has: {
      target      : { is: 'r', init: 0 },
      activeScope : { is: 'r', init: 'target' },
      name        : { is: 'r' },
      targetPath  : { is: 'r' }
    },

    my : {
      after: {
        parse: function(xml, path) {
          var data = templateEngine.widgetDataGet(path);
          var widgetInfo = $('widgetinfo > *', $(xml)).first()[0];
          if (widgetInfo!=undefined) {
            data.classes += " infoaction";
          }
        }
      },
      methods: {
        getAttributeToPropertyMappings: function () {
          return {
            'target'      : { default: 0 },
            'active_scope': { target: 'activeScope', default: 'target' },
            'name'        : {},
            'path'        : { target: 'targetPath'}
          };
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
            var data = templateEngine.widgetDataGetByElement(this);
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
              var data = templateEngine.widgetDataGetByElement(this);
              if (parentName == data.target || (data.active_scope == "path" && data.path != undefined && data.path.match(parentName + "$"))) {
                $pagejump.addClass('active_ancestor');
              }
            });
            // recursively find pagejumps for parent pages
            parentPage = templateEngine.getParentPage(parentPage);
          }
        }
      }
    },

    after: {
      initialized: function(props) {
        if (!this.getActor().parent().hasClass("info")) {
          this.meta.extend({
            does: cv.role.HasAnimatedButton
          })
        }
        $(window).bind('scrolltopage', this.my._onScrollToPage);
      }
    },

    augment: {
      getDomString: function () {
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
      }
    },

    methods: {

      /**
       * Get the value that should be send to backend after the action has been triggered
       *
       * @method getActionValue
       */
      getActionValue: function () {
        return null;
      },

      action: function( path, actor, isCanceled ) {
        if( isCanceled ) return;

        var target = this.getTarget();
        if (this.getTargetPath() !== undefined) {
          target = templateEngine.getPageIdByPath(target,this.getTargetPath());
        }
        templateEngine.scrollToPage( target );
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("pagejump", cv.structure.pure.PageJump);
}); // end define