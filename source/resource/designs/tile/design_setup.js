/* design_setup.js 
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

let lastWindowWidth = 0;
window.addEventListener('resize', () => {
  window.requestAnimationFrame(resizeTiles);
});

/**
 * Resize tile width to consume the available screen width
 */
function resizeTiles() {
  const page = document.querySelector('cv-page.active');
  if (lastWindowWidth !== window.innerWidth && page) {
    const style = document.querySelector(':root').style;
    let spacing = parseInt(style.getPropertyValue('--spacing')) || 8;
    const pageStyle = getComputedStyle(page);
    let pageXPadding = parseInt(pageStyle.paddingLeft) + parseInt(pageStyle.paddingRight);
    if (isNaN(pageXPadding)) {
      // eslint-disable-next-line no-console
      console.error('page padding could not be calculated using fallback of 16px');
      pageXPadding = 16;
    }
    // paddingLeft + paddingRight (2*spacing)
    let availableWidth = window.innerWidth - pageXPadding;
    if (availableWidth >= 1000) {
      // reset to defaults
      style.setProperty('--spacing', '8px');
      style.setProperty('--tileCellWidth', '64px');
    } else {
      const minWidth = 168;
      const columns = Math.max(1, Math.floor(availableWidth / minWidth));
      if (columns === 1) {
        availableWidth -= spacing;
        style.setProperty('--spacing', spacing + 'px');
      } else if (spacing > 8) {
        spacing = 8;
        availableWidth = window.innerWidth - spacing * 2;
        style.setProperty('--spacing', spacing + 'px');
      }
      const tileWidth = availableWidth / columns - (columns - 1) * spacing;
      const cellWidth = Math.floor(tileWidth / 3);
      //console.log('Cols:', columns, tileWidth, 'aw:', availableWidth, 'padX:', pageXPadding);
      style.setProperty('--tileCellWidth', cellWidth + 'px');
      qx.event.message.Bus.dispatchByName('cv.design.tile.cellWidthChanged', cellWidth);
    }
    lastWindowWidth = window.innerWidth;
  }
}
setTimeout(resizeTiles, 100);
