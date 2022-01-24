(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractBasicWidget": {
        "require": true
      },
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Break.js 
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
   * A break tag is used to start in new line for a grouped and thereby tidy display of
   * elements on one page.
   *
   * <pre class="sunlight-highlight-xml">
   * &lt;break/&gt;
   * </pre>
   *
   * @author Christian Mayer
   * @since 0.8.0 (2012)
   */
  qx.Class.define('cv.ui.structure.pure.Break', {
    extend: cv.ui.structure.AbstractBasicWidget,

    /*
     ******************************************************
       MEMBERS
     ******************************************************
     */
    members: {
      // overridden
      getDomString: function getDomString() {
        return '<br/>';
      }
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass('break', statics);
    }
  });
  cv.ui.structure.pure.Break.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Break.js.map?dt=1643061782465