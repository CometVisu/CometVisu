/*
 * Copyright (c) 2025, Christian Mayer and the CometVisu contributors.
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
 *
 */

/**
 * Unit tests for <cv-chart> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-chart> component of the tile structure', () => {
  let oldController;

  // Helper to wait for async DOM updates, making tests cleaner
  const wait = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

  beforeEach(function() {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
    document.body.classList.remove('loading');
    document.body.innerHTML = '';
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
    document.body.classList.add('loading');
  });

  it('should create a default chart', function() {
    const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('CV-CHART');
    expect(element._instance instanceof cv.ui.structure.tile.components.Chart).toBe(true);
  });

  it('should create a chart with title', async function() {
    const element = this.createTileWidgetWithComponent('cv-chart', {title: 'Test'}, '');
    const widget = element.parentElement.parentElement;
    // The component init might schedule async DOM updates
    await wait();
    const titleElement = widget.querySelector(':scope > header > label.title');
    expect(titleElement).not.toBeNull();
    expect(titleElement.textContent.trim()).toBe('Test');
  });

  describe('testing series and selection attributes', () => {
    const matrix = [
      {selection: 'none', series: 'day', expected: []},
      {selection: 'all', series: 'day', expected: ['hour', 'day', 'week', 'month', 'year']},
      {selection: 'hour,day', series: 'week', expected: ['hour', 'day', 'week']}
    ];

    for (const {selection, series, expected} of matrix) {
      it(`should create a chart with ${selection} selection and ${series} series`, async function() {
        const element = this.createTileWidgetWithComponent('cv-chart', { selection, series }, '');
        const widget = element.parentElement.parentElement;

        await wait();

        expect(element._instance.getCurrentSeries()).toBe(series);
        expect(widget.querySelectorAll(':scope > header > label.title > .popup.series > cv-option').length).toBe(expected.length);
        if (expected.length > 0) {
          expect(widget.querySelector(':scope > header > button.prev')).not.toBeNull();
          expect(widget.querySelector(':scope > header > button.next')).not.toBeNull();
        } else {
          expect(widget.querySelector(':scope > header > button.prev')).toBeNull();
          expect(widget.querySelector(':scope > header > button.next')).toBeNull();
        }
        for (const option of expected) {
          expect(widget.querySelector(`:scope > header > label.title > .popup.series > cv-option[key="${option}"]`)).not.toBeNull();
        }
      });
    }
  });
});
