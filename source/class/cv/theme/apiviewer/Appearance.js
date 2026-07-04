/* Appearance.js
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
 * Appearance theme for the API Viewer.
 *
 * Based on the dark Indigo appearance theme (qx.theme.indigo.AppearanceDark)
 * instead of qxl.apiviewer.Appearance's light base, so that all standard
 * widgets pick up the dark styling. The API Viewer specific appearances
 * (originally defined in qxl.apiviewer.Appearance) are re-applied here with
 * colors that work on a dark background instead of the hardcoded "white" /
 * light-blue values used by the default apiviewer theme.
 */
qx.Theme.define('cv.theme.apiviewer.Appearance', {
  title: 'CometVisu API Viewer Appearance',
  extend: qx.theme.indigo.AppearanceDark,

  appearances: {
    toggleview: {
      style(states) {
        return {
          width: 240,
          decorator: 'main'
        };
      }
    },

    detailviewer: {
      style(states) {
        return {
          backgroundColor: 'background-pane',
          decorator: 'main',
          padding: [10, 0, 10, 0]
        };
      }
    },

    legend: {
      include: 'scrollarea',
      alias: 'scrollarea',

      style(states) {
        return {
          contentPadding: [10, 10, 10, 10],
          backgroundColor: 'background-pane'
        };
      }
    },

    'legendview-label-important': {
      style(states) {
        return {
          textColor: 'highlight',
          font: 'bold'
        };
      }
    },

    'legendview-label': {
      style(states) {
        return {
          textColor: 'text'
        };
      }
    },

    tabview: {
      style(states) {
        return {
          contentPadding: 0
        };
      }
    },

    'tabview/pane': {
      style(states) {
        return {
          minHeight: 100,

          marginBottom: states.barBottom ? -1 : 0,
          marginTop: states.barTop ? -1 : 0,
          marginLeft: states.barLeft ? -1 : 0,
          marginRight: states.barRight ? -1 : 0
        };
      }
    }
  }
});
