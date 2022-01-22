/* Info-spec.js 
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
 * Unit tests for info widget
 *
 */
describe('testing a info widget', function() {
  it('should test the info creator', function() {
    const [widget, element] = this.createTestWidgetString('info', {}, '<label>Test</label>');

    expect(element).toHaveClass('info');
    expect(element).toHaveLabel('Test');
    expect(widget.getPath()).toBe('id_0');
  });

  it('should update an info widget', function() {
    var creator = this.createTestElement('info');

    creator.update('12/7/37', 1);
    var actor = creator.getActor();

    expect(actor).not.toBe(null);
    expect(actor).toHaveValue('1');
  });
});
