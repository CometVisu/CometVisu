(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.pure.AbstractWidget": {
        "construct": true,
        "require": true
      },
      "cv.ui.common.HasChildren": {
        "require": true
      },
      "cv.ui.common.HasAnimatedButton": {
        "require": true
      },
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      },
      "cv.data.Model": {},
      "cv.util.Tree": {},
      "cv.Application": {},
      "qx.event.message.Bus": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* PageJump.js 
   * 
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
    extend: cv.ui.structure.pure.AbstractWidget,
    include: [cv.ui.common.HasChildren, cv.ui.common.HasAnimatedButton],

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(props) {
      if (!props.name) {
        // when there is no name the widget has no actor as clickable subelement, so we need
        // to bind the click events to the whole widget
        props.bindClickToWidget = true;
      }

      cv.ui.structure.pure.AbstractWidget.constructor.call(this, props);
    },

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      target: {
        check: 'String',
        init: '0'
      },
      activeScope: {
        check: ['target', 'path'],
        init: 'target'
      },
      name: {
        check: 'String',
        nullable: true
      },
      targetPath: {
        check: 'String',
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
      _onScrollToPage: function _onScrollToPage(ev) {
        var page_id = ev.getData();
        var page = cv.ui.structure.WidgetFactory.getInstanceById(page_id);
        var model = cv.data.Model.getInstance();
        var name = page.getName(); // remove old active classes

        document.querySelectorAll('.pagejump.active').forEach(function (elem) {
          elem.classList.remove('active');
        }, this);
        document.querySelectorAll('.pagejump.active_ancestor').forEach(function (elem) {
          elem.classList.remove('active_ancestor');
        }, this); // and set the new active ones

        document.querySelectorAll('.pagejump').forEach(function (elem) {
          var data = model.getWidgetDataByElement(elem);

          if (name === data.target) {
            elem.classList.add('active');
          }
        }, this); // now set the active ancestors

        var parentPage = cv.util.Tree.getParentWidget(page, 'page'); // set for all parent pages apart from the root page

        var pageJumps = document.querySelectorAll('.pagejump');

        var markPageJumps = function markPageJumps(parentName, elem) {
          var data = model.getWidgetDataByElement(elem);

          if (parentName === data.target || data.activeScope === 'path' && (typeof data.path === 'string' && data.path.match(parentName + '$') || typeof data.targetPath === 'string' && data.targetPath.match(parentName + '$'))) {
            elem.classList.add('active_ancestor');
          }
        };

        while (parentPage && cv.util.Tree.getParentWidget(parentPage, 'page')) {
          pageJumps.forEach(function (elem) {
            markPageJumps(parentPage.getName(), elem);
          }); // recursively find pagejumps for parent pages

          parentPage = cv.util.Tree.getParentWidget(parentPage, 'page');
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
      _getInnerDomString: function _getInnerDomString() {
        var actor = '<div class="actor switchUnpressed';

        if (this.getAlign()) {
          actor += ' ' + this.getAlign();
        }

        actor += '">';

        if (this.getName()) {
          actor += '<div class="value">' + this.getName() + '</div>';
        }

        actor += '</div>';
        return actor + this.getChildrenDomString();
      },
      // overridden
      action: function action() {
        var target = this.getTarget();

        if (this.getTargetPath() !== null) {
          target = cv.Application.structureController.getPageIdByPath(target, this.getTargetPath());
        }

        cv.Application.structureController.scrollToPage(target);
      }
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass('pagejump', statics);
      qx.event.message.Bus.subscribe('path.pageChanged', statics._onScrollToPage, statics);
    }
  });
  cv.ui.structure.pure.PageJump.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PageJump.js.map?dt=1664617280828