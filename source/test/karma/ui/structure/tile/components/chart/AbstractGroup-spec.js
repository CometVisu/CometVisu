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
 * Unit tests for cv.ui.structure.tile.components.chart.AbstractGroup
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the AbstractGroup chart component', () => {
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
      }
    };
  });

  afterEach(() => {
    if (group) {
      group.dispose();
      group = null;
    }
  });

  it('should create an AbstractGroup (via concrete subclass)', () => {
    group = new cv.ui.structure.tile.components.chart.LineGroup(chart, 'line');
    expect(group).not.toBeNull();
    expect(group.getType()).toBe('line');
  });

  it('should have default properties', () => {
    group = new cv.ui.structure.tile.components.chart.LineGroup(chart, 'line');
    expect(group.getStroke()).toBe('none');
    expect(group.getStrokeLinecap()).toBe('round');
    expect(group.getStrokeLinejoin()).toBe('round');
    expect(group.getStrokeWidth()).toBe(1.5);
    expect(group.getStrokeOpacity()).toBe(1);
    expect(group.getFill()).toBe('none');
    expect(group.getMixBlendMode()).toBe('normal');
  });

  it('should set and get stroke', () => {
    group = new cv.ui.structure.tile.components.chart.LineGroup(chart, 'line');
    group.setStroke('#FF0000');
    expect(group.getStroke()).toBe('#FF0000');
  });

  it('should set and get strokeLinecap', () => {
    group = new cv.ui.structure.tile.components.chart.LineGroup(chart, 'line');
    group.setStrokeLinecap('butt');
    expect(group.getStrokeLinecap()).toBe('butt');
  });

  it('should set and get strokeLinejoin', () => {
    group = new cv.ui.structure.tile.components.chart.LineGroup(chart, 'line');
    group.setStrokeLinejoin('bevel');
    expect(group.getStrokeLinejoin()).toBe('bevel');
  });

  it('should set and get strokeWidth', () => {
    group = new cv.ui.structure.tile.components.chart.LineGroup(chart, 'line');
    group.setStrokeWidth(2.5);
    expect(group.getStrokeWidth()).toBe(2.5);
  });

  it('should set and get strokeOpacity', () => {
    group = new cv.ui.structure.tile.components.chart.LineGroup(chart, 'line');
    group.setStrokeOpacity(0.5);
    expect(group.getStrokeOpacity()).toBe(0.5);
  });

  it('should set and get fill', () => {
    group = new cv.ui.structure.tile.components.chart.LineGroup(chart, 'line');
    group.setFill('#00FF00');
    expect(group.getFill()).toBe('#00FF00');
  });

  it('should set and get mixBlendMode', () => {
    group = new cv.ui.structure.tile.components.chart.LineGroup(chart, 'line');
    group.setMixBlendMode('multiply');
    expect(group.getMixBlendMode()).toBe('multiply');
  });

  it('should add and check dataset', () => {
    group = new cv.ui.structure.tile.components.chart.LineGroup(chart, 'line');
    const dataset = {
      getKey: jasmine.createSpy('getKey').and.returnValue('test-key')
    };
    
    group.addDataset(dataset);
    expect(group.hasDataset('test-key')).toBe(true);
    expect(group.hasDataset('other-key')).toBe(false);
  });

  it('should get data for datasets', () => {
    group = new cv.ui.structure.tile.components.chart.LineGroup(chart, 'line');
    const dataset1 = {
      getKey: jasmine.createSpy('getKey').and.returnValue('key1')
    };
    const dataset2 = {
      getKey: jasmine.createSpy('getKey').and.returnValue('key2')
    };
    
    group.addDataset(dataset1);
    group.addDataset(dataset2);
    
    const data = group.getData();
    expect(data.size).toBe(2);
    expect(data.has('key1')).toBe(true);
    expect(data.has('key2')).toBe(true);
  });

  it('should get container element', () => {
    group = new cv.ui.structure.tile.components.chart.LineGroup(chart, 'line');
    const container = group.getContainer();
    expect(container).toBeDefined();
  });

  it('should validate strokeLinecap values', () => {
    group = new cv.ui.structure.tile.components.chart.LineGroup(chart, 'line');
    expect(() => group.setStrokeLinecap('butt')).not.toThrow();
    expect(() => group.setStrokeLinecap('round')).not.toThrow();
    expect(() => group.setStrokeLinecap('square')).not.toThrow();
  });

  it('should validate strokeLinejoin values', () => {
    group = new cv.ui.structure.tile.components.chart.LineGroup(chart, 'line');
    expect(() => group.setStrokeLinejoin('miter')).not.toThrow();
    expect(() => group.setStrokeLinejoin('round')).not.toThrow();
    expect(() => group.setStrokeLinejoin('bevel')).not.toThrow();
  });

  it('should validate mixBlendMode values', () => {
    group = new cv.ui.structure.tile.components.chart.LineGroup(chart, 'line');
    expect(() => group.setMixBlendMode('normal')).not.toThrow();
    expect(() => group.setMixBlendMode('multiply')).not.toThrow();
    expect(() => group.setMixBlendMode('screen')).not.toThrow();
    expect(() => group.setMixBlendMode('overlay')).not.toThrow();
  });
});
