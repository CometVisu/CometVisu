/* Slide-spec.js 
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
 * Unit tests for slide widget
 *
 */
describe('testing a slide widget', function() {
  // disabled until jquery dep has been removed
  it('should test the slide creator', function() {
    const [widget, element] = this.createTestWidgetString('slide', {}, '<label>Test</label>');

    expect(widget.getPath()).toBe('id_0');

    expect(element).toHaveClass('slide');
    expect(element).toHaveLabel('Test');
  });

  it('should test the min/max and step settings', function() {
    var widgetInstance = this.createTestElement('slide', {min: 30, max: 130, step: 5});

    expect(widgetInstance.getMin()).toBe(30);
    expect(widgetInstance.getMax()).toBe(130);
    expect(widgetInstance.getStep()).toBe(5);
  });

  it('should test the min/max settings from transform', function() {
    var widgetInstance = this.createTestElement('slide', {}, null, null, {transform: 'DPT:5.004'});

    expect(widgetInstance.getMin()).toBe(0.0);
    expect(widgetInstance.getMax()).toBe(255.0);
  });

  it('should test incoming data', function() {
    var widgetInstance = this.createTestElement('slide', {}, null, 'Test_slide', {transform: 'DPT:5.004'});
    this.initWidget(widgetInstance);
    widgetInstance.update('Test_slide', '64');

    expect(widgetInstance.getBasicValue()).toBe(100);
  });

  it('should not re-send incoming data', function() {
    var widgetInstance = this.createTestElement('slide', {}, null,
      ['Test_slide_read', 'Test_slide_write'],
      [{transform: 'DPT:5.004', mode: 'read'}, {transform: 'DPT:5.004', mode: 'write'}]);
    this.initWidget(widgetInstance);
    spyOn(widgetInstance, 'sendToBackend');
    widgetInstance.update('Test_slide_read', '64');

    expect(widgetInstance.getBasicValue()).toBe(100);
    expect(widgetInstance.sendToBackend).not.toHaveBeenCalled();
  });
});
