let lastWindowWidth = 0;
window.addEventListener('resize', () => {
  resizeTiles();
});

/**
 * Resize tile width to consume the available screen width
 */
function resizeTiles() {
  if (lastWindowWidth !== window.innerWidth) {
    const style = document.querySelector(':root').style;
    let spacing = parseInt(style.getPropertyValue('--spacing')) || 8;
    let availableWidth = window.innerWidth - spacing * 2;
    if (availableWidth >= 1000) {
      // reset to defaults
      style.setProperty('--spacing', '8px');
      style.setProperty('--tileCellWidth', '64px');
    } else {
      const minWidth = 168;
      const columns = Math.floor(availableWidth / minWidth);
      if (columns === 1) {
        // only one column, we cann afford some more space around the tiles
        spacing *= 2;
        availableWidth -= spacing;
        style.setProperty('--spacing', spacing + 'px');
      } else if (spacing > 8) {
        spacing = 8;
        availableWidth = window.innerWidth - spacing * 2;
        style.setProperty('--spacing', spacing + 'px');
      }
      const tileWidth = availableWidth / columns - (columns - 1) * spacing;
      const cellWidth = Math.floor(tileWidth / 3);
      //console.log('Cols:', columns, tileWidth);
      style.setProperty('--tileCellWidth', cellWidth + 'px');
      qx.event.message.Bus.dispatchByName('cv.design.tile.cellWidthChanged', cellWidth);
    }
    lastWindowWidth = window.innerWidth;
  }
}
resizeTiles();
