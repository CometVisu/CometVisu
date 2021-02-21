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
      "cv.ui.common.HasChildren": {
        "require": true
      },
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* WidgetInfoAction.js 
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
   * This is a helper class for the InfoAction widget it cannot be used directly
   *
   * @author Tobias Bräutigam
   * @since 0.10.0 (as widget), 0.9.2 (as plugin)
   */
  qx.Class.define('cv.ui.structure.pure.WidgetInfoAction', {
    extend: cv.ui.structure.AbstractWidget,
    include: cv.ui.common.HasChildren,

    /*
     ******************************************************
     PROPERTIES
     ******************************************************
     */
    properties: {
      anonymous: {
        refine: true,
        init: true
      },
      childObjects: {
        check: "Array",
        init: []
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
        return this.getChildrenDomString();
      }
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass("widgetinfo", statics);
      cv.ui.structure.WidgetFactory.registerClass("widgetaction", statics);
    }
  });
  cv.ui.structure.pure.WidgetInfoAction.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WidgetInfoAction.js.map?dt=1613908094409