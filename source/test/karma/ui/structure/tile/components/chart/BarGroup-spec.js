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
 * Unit tests for cv.ui.structure.tile.components.chart.BarGroup
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the BarGroup chart component', () => {
  let chart;
  let group;

  beforeEach(function() {
    // Create a mock chart object with required methods
    chart = {
      getSvgElement: jasmine.createSpy('getSvgElement').and.returnValue({
        attr: jasmine.createSpy('attr').and.returnValue({
          attr: jasmine.createSpy('attr')
        })
      }),
      data: {
        getIndicesForKey: jasmine.createSpy('getIndicesForKey').and.returnValue([0, 1, 2])
      },
      getXAxis: jasmine.createSpy('getXAxis').and.returnValue({
        getScale: jasmine.createSpy('getScale')
      }),
      getYAxis: jasmine.createSpy('getYAxis').and.returnValue({
        getScale: jasmine.createSpy('getScale')
      })
    };
  });

  afterEach(() => {
    if (group) {
      group.dispose();
      group = null;
    }
  });

  it('should create a BarGroup', () => {
    group = new cv.ui.structure.tile.components.chart.BarGroup(chart, 'bar');
    expect(group).not.toBeNull();
    expect(group.getType()).toBe('bar');
  });

  it('should be an instance of AbstractGroup', () => {
    group = new cv.ui.structure.tile.components.chart.BarGroup(chart, 'bar');
    expect(group instanceof cv.ui.structure.tile.components.chart.AbstractGroup).toBe(true);
  });

  it('should initialize with chart', () => {
    group = new cv.ui.structure.tile.components.chart.BarGroup(chart, 'bar');
    expect(chart.getSvgElement).toHaveBeenCalledWith('g', ['bar'], jasmine.any(Object));
  });
});
