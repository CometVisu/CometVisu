/* Line.js
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
 * A line tag is used to display a horizontal line in the browser to allow for a grouped and thereby tidy display of
 * elements on one page. To specify the width of the line an optional &lt;layout/&gt;-child can be added.
 *
 * @widgetexample <settings selector="hr">
 *   <caption>A line tag which uses 50% of the screen size (6 of 12 available columns)</caption>
 * </settings>
 * <line><layout colspan="6"/></line>
 *
 * @author Christian Mayer
 * @since 0.8.0 (2012)
 */
qx.Class.define('cv.ui.structure.pure.Line', {
  extend: cv.ui.structure.pure.AbstractWidget,

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    // overridden
    getDomString() {
      return '<hr ' + (this.getClasses() ? 'class="' + this.getClasses() + '"' : '') + '/>';
    }
  }
});
