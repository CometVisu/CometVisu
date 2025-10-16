/* Diagram-spec.js 
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


/**
 * Unit tests for diagram plugin
 *
 * @author Copilot
 * @since 2025
 */
describe('testing diagram plugin', function() {
  beforeAll(function(done) {
    cv.util.ScriptLoader.getInstance().setAllQueued(false);
    qx.io.PartLoader.require(['plugin-diagram'], function () {
      cv.util.ScriptLoader.getInstance().addListenerOnce('finished', function () {
        done();
      }, this);
      qx.event.Timer.once(function() {
        cv.util.ScriptLoader.getInstance().setAllQueued(true);
        cv.TemplateEngine.getInstance().setPartsLoaded(true);
      }, this, 10);
    }, this);
  });

  var originalTimeout;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('should test the diagram creator', function() {
    const [widget, element] = this.createTestWidgetString('diagram', {}, '<label>Test Diagram</label>');

    expect(element).toHaveClass('widget');
    expect(element).toHaveLabel('Test Diagram');
    expect(widget.getPath()).toBe('id_0');
  });

  it('should test the diagram creator with default width and height', function() {
    const res = this.createTestElement('diagram', {}, '<label>Test</label>', false);
    
    expect(res.getWidth()).toBe('100%');
    expect(res.getHeight()).toBe(null);
  });

  it('should test the diagram creator with custom width and height', function() {
    const res = this.createTestElement('diagram', {width: '500', height: '300'}, '<label>Test</label>', false);
    
    expect(res.getWidth()).toBe('500px');
    expect(res.getHeight()).toBe('300px');
  });

  it('should test the diagram creator with series attributes', function() {
    const res = this.createTestElement('diagram', {
      series: 'hour',
      period: '2',
      refresh: '60'
    }, '<label>Test</label>', false);
    
    expect(res.getSeries()).toBe('hour');
    expect(res.getPeriod()).toBe(2);
    expect(res.getRefresh()).toBe(60000); // refresh is converted to milliseconds
  });

  it('should test the diagram creator with grid color', function() {
    const res = this.createTestElement('diagram', {
      gridcolor: '#FF0000'
    }, '<label>Test</label>', false);
    
    expect(res.getGridcolor()).toBe('#FF0000');
  });

  it('should test the diagram creator with default grid color', function() {
    const res = this.createTestElement('diagram', {}, '<label>Test</label>', false);
    
    expect(res.getGridcolor()).toBe('#81664B');
  });

  it('should test the diagram creator with preview labels', function() {
    const res = this.createTestElement('diagram', {
      previewlabels: 'true'
    }, '<label>Test</label>', false);
    
    expect(res.getPreviewlabels()).toBe(true);
  });

  it('should test the diagram creator with popup enabled', function() {
    const res = this.createTestElement('diagram', {
      popup: 'true'
    }, '<label>Test</label>', false);
    
    expect(res.getPopup()).toBe(true);
  });

  it('should test the diagram creator with tooltip enabled', function() {
    const res = this.createTestElement('diagram', {
      tooltip: 'true'
    }, '<label>Test</label>', false);
    
    expect(res.getTooltip()).toBe(true);
  });

  it('should test the diagram creator with zoom Y axis enabled', function() {
    const res = this.createTestElement('diagram', {
      zoomYAxis: 'true'
    }, '<label>Test</label>', false);
    
    expect(res.getZoomYAxis()).toBe(true);
  });

  it('should test the diagram creator with legend position', function() {
    const res = this.createTestElement('diagram', {
      legendposition: 'nw'
    }, '<label>Test</label>', false);
    
    expect(res.getLegendposition()).toBe('nw');
  });

  it('should test the diagram creator with default legend position', function() {
    const res = this.createTestElement('diagram', {}, '<label>Test</label>', false);
    
    expect(res.getLegendposition()).toBe('ne');
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});

describe('testing diagram_info plugin', function() {
  beforeAll(function(done) {
    cv.util.ScriptLoader.getInstance().setAllQueued(false);
    qx.io.PartLoader.require(['plugin-diagram'], function () {
      cv.util.ScriptLoader.getInstance().addListenerOnce('finished', function () {
        done();
      }, this);
      qx.event.Timer.once(function() {
        cv.util.ScriptLoader.getInstance().setAllQueued(true);
        cv.TemplateEngine.getInstance().setPartsLoaded(true);
      }, this, 10);
    }, this);
  });

  var originalTimeout;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('should test the diagram_info creator', function() {
    const [widget, element] = this.createTestWidgetString('diagram_info', {}, '<label>Test Info</label>');

    expect(element).toHaveClass('widget');
    expect(element).toHaveLabel('Test Info');
    expect(widget.getPath()).toBe('id_0');
  });

  it('should test the diagram_info creator with attributes', function() {
    const res = this.createTestElement('diagram_info', {
      series: 'week',
      period: '3'
    }, '<label>Test</label>');
    
    expect(res.getSeries()).toBe('week');
    expect(res.getPeriod()).toBe(3);
  });

  it('should update diagram_info widget', function() {
    const res = this.createTestElement('diagram_info', {}, '<label>Test</label>');
    
    res.update('12/7/37', 1);
    var value = res.getValueElement();
    
    expect(value).not.toBeNull();
    // DPT:1.001 transform converts 1 to '1'
    expect(value.innerText).toBe('1');
  });

  it('should have actor element with switchUnpressed class', function() {
    const res = this.createTestElement('diagram_info', {}, '<label>Test</label>');
    var actor = res.getActor();
    
    expect(actor).not.toBeNull();
    expect(actor).toHaveClass('switchUnpressed');
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});
