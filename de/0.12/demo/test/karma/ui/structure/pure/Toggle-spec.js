/* Toggle-spec.js 
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
 * Unit tests for toggle widget
 *
 */
describe('testing a toggle widget', function() {
  it('should test the toggle creator', function() {
    const [widget, element] = this.createTestWidgetString('toggle', {}, '<label>Test</label>');

    expect(widget.getPath()).toBe('id_0');

    expect(element).toHaveClass('toggle');
    expect(element).toHaveLabel('Test');
  });

  it('should test the action value return', function() {
    cv.Config.addMapping('test', {0: 0, 1: 1});
    var res = this.createTestElement('toggle', {mapping: 'test'});

    expect(res.getActionValue()).toBe('0');
    res.setBasicValue(0);

    expect(res.getActionValue()).toBe('1');
    cv.Config.clearMappings();
  });
});
