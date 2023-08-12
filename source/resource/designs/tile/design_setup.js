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
  if (page && lastWindowWidth !== page.offsetWidth) {
    const main = document.querySelector('main');
    const style = document.querySelector(':root').style;
    let spacing = parseInt(style.getPropertyValue('--spacing')) || 8;
    // only consider scrollbar width, when it is not already visible
    let scrollBarWidth = main.clientHeight < page.clientHeight ? 0 : spacing;
    const pageStyle = getComputedStyle(page);
    let pageXPadding = parseInt(pageStyle.paddingLeft) + parseInt(pageStyle.paddingRight);
    if (isNaN(pageXPadding)) {
      // eslint-disable-next-line no-console
      console.error('page padding could not be calculated using fallback of 16px');
      pageXPadding = 16;
    }
    // paddingLeft + paddingRight (2*spacing)
    let availableWidth = page.offsetWidth - pageXPadding - scrollBarWidth;
    const minWidth = availableWidth > 1000 ? 192 : 168;
    const columns = Math.max(1, Math.floor(availableWidth / minWidth));
    availableWidth -= (columns-1) * spacing;
    let tileWidth =availableWidth / columns;
    const cellWidth = tileWidth / 3;
    console.log('Cols:', columns, tileWidth, 'aw:', availableWidth, 'padX:', pageXPadding);
    style.setProperty('--tileCellWidth', cellWidth + 'px');
    qx.event.message.Bus.dispatchByName('cv.design.tile.cellWidthChanged', cellWidth);
    lastWindowWidth = page.offsetWidth;
    document.body.setAttribute('data-columns', columns.toString(10));
  }
}
setTimeout(resizeTiles, 100);
