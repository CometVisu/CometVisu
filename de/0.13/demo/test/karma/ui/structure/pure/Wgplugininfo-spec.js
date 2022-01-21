/* Wgplugininfo-spec.js 
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
 * Unit tests for wgplugin_info widget
 *
 */
describe('testing a wgplugin_info widget', function() {
  it('should test the wgplugin_info creator', function() {
    const [widget, element] = this.createTestWidgetString('wgplugin_info', {}, '<label>Test</label>');

    expect(widget.getPath()).toBe('id_0');

    expect(element).toHaveClass('info');
    expect(element).toHaveLabel('Test');
  });

  it('should test the wgplugin_info update', function() {
    var res = this.createTestElement('wgplugin_info', {variable: 'Test'}, '', 'Test', {transform: 'raw'});
    spyOn(res.getRequest(), 'send');
    res.update('Test', 1);
  });
});
