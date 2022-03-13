function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractWidget": {
        "require": true
      },
      "cv.parser.WidgetParser": {},
      "cv.TemplateEngine": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* PageLink.js 
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
   * PageLink Widget for visible pages. Do not use this directly because the pagelink widget
   * is automatically added when you use a page widget with parameter <code>visible=true</code>.
   *
   * @author Tobias Bräutigam
   * @since 0.10.0 (2017)
   */
  qx.Class.define('cv.ui.structure.pure.PageLink', {
    extend: cv.ui.structure.AbstractWidget,

    /*
     ******************************************************
     PROPERTIES
     ******************************************************
     */
    properties: {
      name: {
        check: 'String',
        init: '',
        nullable: true
      },
      wstyle: {
        check: 'String',
        init: ''
      },
      address: {
        check: 'Object',
        init: {}
      },
      bindClickToWidget: {
        refine: true,
        init: true
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      // overridden
      getDomString: function getDomString() {
        var layout = this.getLayout();
        var style = _typeof(layout) === 'object' ? '' : 'style="' + cv.parser.WidgetParser.extractLayout(layout, this.getPageType()) + '"';
        var ret_val = '<div class="widget clearfix link pagelink ' + this.getClasses() + '" ' + style + '>';
        ret_val += '<div class="actor" ' + this.getWstyle() + '><a href="javascript:void(0)">' + this.getName() + '</a></div>';
        ret_val += '</div>';
        return ret_val;
      },
      // overridden
      action: function action() {
        cv.TemplateEngine.getInstance().scrollToPage(this.getPath() + '_');
      }
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass('pagelink', statics);
    }
  });
  cv.ui.structure.pure.PageLink.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PageLink.js.map?dt=1647153220135