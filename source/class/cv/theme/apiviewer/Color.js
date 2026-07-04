/* Color.js
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
 * Color palette for the API Viewer theme, aligned with the colors used on
 * the CometVisu homepage (dark background, orange accent).
 */
qx.Theme.define('cv.theme.apiviewer.Color', {
  extend: qx.theme.indigo.ColorDark,

  colors: {
    // base backgrounds (cv.theme.dark.Color palette)
    background: '#0d0d0d',
    'light-background': '#1a1a1a',
    'background-pane': '#1a1a1a',
    'background-selected': '#402400',
    'background-selected-disabled': '#4d3a26',
    'background-disabled': '#242424',

    // text
    font: '#ffffff',
    text: '#ffffff',
    'text-disabled': '#666666',
    'text-selected': '#ffffff',

    // accent (CometVisu orange)
    highlight: '#ff8000',
    'highlight-shade': '#ffb347',
    link: '#ff8000',

    // borders
    'border-main': '#333333',
    'border-light': '#333333',
    'border-separator': '#333333',
    'window-border': '#333333',
    'window-border-inner': '#333333',

    // form controls
    button: '#242424',
    'button-border': '#333333',
    'button-border-hovered': '#ff8000',

    // scrollbar
    'scrollbar-bright': '#242424',
    'scrollbar-dark': '#0d0d0d',

    // tabview
    'tabview-unselected': '#a0a0a0',

    // table
    'table-header': '#242424',
    'table-header-cell': '#242424',
    'table-row-background-even': '#1a1a1a',
    'table-row-background-odd': '#141414',
    'table-row-background-selected': '#402400',
    'table-row-background-focused': '#242424',
    'table-row-background-focused-selected': '#402400'
  }
});
