/* ApiViewer.js
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
 * Theme for the qxl.apiviewer application, adjusted to match the colors of
 * the CometVisu homepage (dark background, orange accent) instead of the
 * default light "Indigo" theme.
 */
qx.Theme.define('cv.theme.ApiViewer', {
  title: 'CometVisu API Viewer theme',

  meta: {
    color: cv.theme.apiviewer.Color,
    decoration: qx.theme.indigo.DecorationDark,
    font: qx.theme.indigo.Font,
    appearance: cv.theme.apiviewer.Appearance,
    icon: qx.theme.icon.Tango
  }
});
