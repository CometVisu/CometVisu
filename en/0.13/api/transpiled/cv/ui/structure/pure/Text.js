(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractWidget": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Text.js 
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
   * The text-tag defines static (non-changing) text to be displayed on a page. The content of a &lt;label&gt; with free text.
   *
   * @widgetexample <settings>
   *   <caption>Configuration example of a centered text widget</caption>
   *   <screenshot name="text_example" />
   * </settings>
   * <text align="center"><label>Example text</label></text>
   *
   *
   *
   * @author Christian Mayer
   * @since 0.8.0 (2012)
   */
  qx.Class.define('cv.ui.structure.pure.Text', {
    extend: cv.ui.structure.AbstractWidget,

    /*
     ******************************************************
     MEMBERS
     ******************************************************
     */
    members: {
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        return '';
      }
    }
  });
  cv.ui.structure.pure.Text.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Text.js.map?dt=1648068864190