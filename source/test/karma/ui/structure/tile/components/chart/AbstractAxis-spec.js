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
 * Unit tests for cv.ui.structure.tile.components.chart.AbstractAxis
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the AbstractAxis chart component', () => {
  let chart;
  let axis;

  beforeEach(function() {
    // Create a mock chart object with required methods
    chart = {
      getSvgElement: jasmine.createSpy('getSvgElement').and.returnValue({
        call: jasmine.createSpy('call'),
        select: jasmine.createSpy('select').and.returnValue({
          style: jasmine.createSpy('style')
        })
      }),
      getWidth: jasmine.createSpy('getWidth').and.returnValue(400),
      getHeight: jasmine.createSpy('getHeight').and.returnValue(300),
      getMarginTop: jasmine.createSpy('getMarginTop').and.returnValue(20),
      getMarginBottom: jasmine.createSpy('getMarginBottom').and.returnValue(30),
      getMarginLeft: jasmine.createSpy('getMarginLeft').and.returnValue(40),
      getMarginRight: jasmine.createSpy('getMarginRight').and.returnValue(50)
    };
  });

  afterEach(() => {
    if (axis) {
      axis.dispose();
      axis = null;
    }
  });

  it('should create an axis with default properties', () => {
    axis = new cv.ui.structure.tile.components.chart.XAxis(chart, 'axis');
    expect(axis).not.toBeNull();
    expect(axis.getType()).toBe('axis');
    expect(axis.isShow()).toBe(true);
    expect(axis.getTicks()).toBeDefined();
  });

  it('should set and get domain', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis');
    const domain = [0, 100];
    axis.setDomain(domain);
    expect(axis.getDomain()).toEqual(domain);
  });

  it('should set and get range', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis');
    const range = [0, 300];
    axis.setRange(range);
    expect(axis.getRange()).toEqual(range);
  });

  it('should toggle show property', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis');
    expect(axis.isShow()).toBe(true);
    axis.setShow(false);
    expect(axis.isShow()).toBe(false);
  });

  it('should set ticks', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis');
    axis.setTicks(10);
    expect(axis.getTicks()).toBe(10);
  });

  it('should set tick format', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis');
    const formatter = (d) => d.toFixed(2);
    axis.setTickFormat(formatter);
    expect(axis.getTickFormat()).toBe(formatter);
  });

  it('should set label', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis');
    axis.setLabel('Test Label');
    expect(axis.getLabel()).toBe('Test Label');
  });

  it('should toggle show line', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis');
    expect(axis.getShowLine()).toBe(true);
    axis.setShowLine(false);
    expect(axis.getShowLine()).toBe(false);
  });

  it('should toggle show grid', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis');
    expect(axis.getShowGrid()).toBe(false);
    axis.setShowGrid(true);
    expect(axis.getShowGrid()).toBe(true);
  });

  it('should set tick size', () => {
    axis = new cv.ui.structure.tile.components.chart.YAxis(chart, 'axis');
    axis.setTickSize(10);
    expect(axis.getTickSize()).toBe(10);
  });
});
