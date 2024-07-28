/* Unknown-spec.js 
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
 * Unit tests for unkown widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe('testing a unknown widget', function() {
  it('should test the unknown creator', function() {
    qx.locale.Manager.getInstance().setLocale('en');
    const data = cv.parser.pure.WidgetParser.parse(document.createElement('unknown_widget'), 'id_0', null, 'text');
    const inst = cv.ui.structure.WidgetFactory.createInstance('unknown', data);
    const unknown = cv.util.String.htmlStringToDomElement(inst.getDomString());

    expect(unknown.querySelector('pre').textContent).toBe('unknown: unknown_widget');
  });
});
