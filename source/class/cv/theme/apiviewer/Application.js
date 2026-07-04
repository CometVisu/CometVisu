/* Application.js
 *
 * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
 * qxl.apiviewer.Application unconditionally loads its own "apiviewer.css"
 * stylesheet (hardcoded light colors, independent of the qooxdoo theme
 * system) in its constructor. This subclass additionally loads a CometVisu
 * specific stylesheet right afterwards so that its rules win the CSS cascade
 * (same selector specificity, later wins) and the plain-HTML parts of the API
 * Viewer (class description box, member tables, code blocks, ...) match the
 * dark CometVisu theme instead of staying light gray / white.
 *
 * The override stylesheet lives next to the original "apiviewer.css" (under
 * the "qxl/apiviewer/*" resource namespace) so that it is automatically
 * picked up by the @asset(qxl/apiviewer/*) declaration on the super class.
 */
qx.Class.define('cv.theme.apiviewer.Application', {
  extend: qxl.apiviewer.Application,

  construct() {
    super();
    const uri = qx.util.ResourceManager.getInstance().toUri('qxl/apiviewer/css/apiviewer-dark.css');
    qx.bom.Stylesheet.includeFile(uri);
  }
});
