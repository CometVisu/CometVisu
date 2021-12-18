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
    //console.log('Cols:', columns, tileWidth);
    style.setProperty('--tileCellWidth', tileWidth/3 + 'px');
    lastWindowWidth = window.innerWidth;
  }
}
resizeTiles();
