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
 * Unit tests for cv.ui.structure.tile.components.chart.YAxis
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the YAxis chart component', () => {
  let chart;
  let axis;

  beforeEach(function() {
    // Create a mock chart object with required methods and event support
    chart = new qx.core.Object();
    chart.getSvgElement = jasmine.createSpy('getSvgElement').and.returnValue({
      call: jasmine.createSpy('call'),
      attr: jasmine.createSpy('attr').and.returnValue({
        attr: jasmine.createSpy('attr')
      }),
      select: jasmine.createSpy('select').and.returnValue({
        style: jasmine.createSpy('style'),
        empty: jasmine.createSpy('empty').and.returnValue(true)
      }),
      append: jasmine.createSpy('append').and.returnValue({
        attr: jasmine.createSpy('attr').and.returnValue({
          attr: jasmine.createSpy('attr').and.returnValue({
            attr: jasmine.createSpy('attr').and.returnValue({
              attr: jasmine.createSpy('attr').and.returnValue({
                text: jasmine.createSpy('text')
              })
            })
          })
        })
      }),
      remove: jasmine.createSpy('remove')
    });
    chart.getWidth = jasmine.createSpy('getWidth').and.returnValue(400);
    chart.getHeight = jasmine.createSpy('getHeight').and.returnValue(300);
    chart.getMarginTop = jasmine.createSpy('getMarginTop').and.returnValue(20);
    chart.getMarginBottom = jasmine.createSpy('getMarginBottom').and.returnValue(30);
    chart.getMarginLeft = jasmine.createSpy('getMarginLeft').and.returnValue(40);
    chart.getMarginRight = jasmine.createSpy('getMarginRight').and.returnValue(50);
    chart.setMarginLeft = jasmine.createSpy('setMarginLeft');
    chart.bind = jasmine.createSpy('bind');
  });

  afterEach(() => {
    if (axis) {
      axis.dispose();
      axis = null;
    }
    if (chart) {
      chart.dispose();
      chart = null;
    }
  });

  it('should create a left YAxis', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis', false);
    expect(axis).not.toBeNull();
    expect(axis.getType()).toBe('axis');
    expect(axis.getScale()).toBeDefined();
  });

  it('should create a right YAxis', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis', true);
    expect(axis).not.toBeNull();
    expect(axis.getType()).toBe('axis');
  });

  it('should update range based on chart dimensions', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis', false);
    const expectedRange = [300 - 30, 20]; // height - marginBottom to marginTop
    expect(axis.getRange()).toEqual(expectedRange);
  });

  it('should respond to chart height changes', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis', false);
    const oldRange = axis.getRange();
    
    chart.getHeight.and.returnValue(400);
    chart.fireEvent('changeHeight');
    
    const newRange = axis.getRange();
    expect(newRange).not.toEqual(oldRange);
    expect(newRange[0]).toBeGreaterThan(oldRange[0]);
  });

  it('should set range override and stop listening to chart changes', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis', false);
    const customRange = [0, 100];
    
    axis.setRangeOverride(customRange);
    expect(axis.getRange()).toEqual(customRange);
    
    // Changing chart dimensions should not affect the axis range anymore
    chart.getHeight.and.returnValue(400);
    chart.fireEvent('changeHeight');
    expect(axis.getRange()).toEqual(customRange);
  });

  it('should restore automatic range when override is cleared', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis', false);
    const customRange = [0, 100];
    
    axis.setRangeOverride(customRange);
    expect(axis.getRange()).toEqual(customRange);
    
    axis.setRangeOverride(null);
    const expectedRange = [300 - 30, 20]; // back to auto
    expect(axis.getRange()).toEqual(expectedRange);
  });

  it('should bind ticks to chart height', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis', false);
    expect(chart.bind).toHaveBeenCalledWith('height', axis, 'ticks', jasmine.any(Object));
  });

  it('should adjust left margin when domain requires more space', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis', false);
    axis.setShow(true);
    axis.setDomain([0, 1000]);
    expect(chart.setMarginLeft).toHaveBeenCalled();
  });
});
