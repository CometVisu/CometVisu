/* Rgb-spec.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
 * Unit tests for rgb widget
 *
 */
describe('testing a rgb widget', function() {
  it('should test the rgb creator', function() {
    const [widget, element] = this.createTestWidgetString('rgb', {}, '<label>Test</label>');

    expect(widget.getPath()).toBe('id_0');

    expect(element).toHaveClass('rgb');
    expect(element).toHaveLabel('Test');
  });

  it('should test the RGB update in R variant', function() {
    var widgetInstance = this.createTestElement('rgb', {}, null, 'Test', {variant: 'r', transform: 'OH:Number'});
    widgetInstance.update('Test', 255);

    expect(window.getComputedStyle(widgetInstance.getValueElement())['background-color']).toBe('rgb(255, 0, 0)');
  });

  it('should test the RGB update in G variant', function() {
    var widgetInstance = this.createTestElement('rgb', {}, null, 'Test', {variant: 'g', transform: 'OH:Number'});
    widgetInstance.update('Test', 255);

    expect(window.getComputedStyle(widgetInstance.getValueElement())['background-color']).toBe('rgb(0, 255, 0)');
  });

  it('should test the RGB update in B variant', function() {
    var widgetInstance = this.createTestElement('rgb', {}, null, 'Test', {variant: 'b', transform: 'OH:Number'});
    widgetInstance.update('Test', 255);

    expect(window.getComputedStyle(widgetInstance.getValueElement())['background-color']).toBe('rgb(0, 0, 255)');
  });
});
