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
      "cv.ui.common.Operate": {
        "require": true
      },
      "cv.ui.common.HasAnimatedButton": {
        "require": true
      },
      "cv.ui.common.BasicUpdate": {
        "require": true
      },
      "cv.TemplateEngine": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Refresh.js 
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
   * With the widget refresh, the visu is added a switch, which allows the visu to reload the displayed data.
   *
   * @author Christian Mayer
   * @since 2014
   */
  qx.Class.define('cv.ui.structure.pure.Refresh', {
    extend: cv.ui.structure.AbstractWidget,
    include: [cv.ui.common.Operate, cv.ui.common.HasAnimatedButton, cv.ui.common.BasicUpdate],

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      sendValue: {
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
      _onDomReady: function _onDomReady() {
        cv.ui.structure.pure.Refresh.prototype._onDomReady.base.call(this);

        this.defaultUpdate(undefined, this.getSendValue());
      },
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        return '<div class="actor switchUnpressed"><div class="value">-</div></div>';
      },
      _action: function _action() {
        cv.TemplateEngine.getInstance().visu.restart(true);
      }
    }
  });
  cv.ui.structure.pure.Refresh.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Refresh.js.map?dt=1613591246707