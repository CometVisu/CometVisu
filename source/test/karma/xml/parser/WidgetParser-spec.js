/* WidgetParser-spec.js 
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
 * @author Tobias Bräutigam
 * @since 2021
 */
describe('testing the widget parser', function() {
  it('should test the label parsing', function () {
    const label = qx.dom.Element.create('label');
    label.innerHTML = 'Test<!--comment-->';
    const result = cv.parser.pure.WidgetParser.parseLabel(label);
    expect(result).toBe('<div class="label">Test</div>');
  });

  it('should test the label parsing with icon', function () {
    const label = qx.dom.Element.create('label');
    label.innerHTML = 'Test<icon name="fts_door_open" color="red" flavour="custom"></icon>';
    const result = cv.parser.pure.WidgetParser.parseLabel(label);
    const element = cv.util.String.htmlStringToDomElement(result);
    expect(element.className).toBe('label');
    expect(element.childNodes.length).toBe(2);
    const [textChild, iconChild] = element.childNodes;
    expect(textChild.nodeType).toBe(Node.TEXT_NODE);
    expect(textChild.textContent).toBe('Test');
    expect(iconChild.nodeType).toBe(Node.ELEMENT_NODE);
    expect(iconChild.tagName.toLowerCase()).toBe('i');
    expect(iconChild.getAttribute('style')).toBe('color:#ff4444;');
    expect(iconChild.classList.contains('icon')).toBeTruthy();
    expect(iconChild.classList.contains('knxuf-fts_door_open')).toBeTruthy();
    expect(iconChild.childNodes.length).toBe(0);
  });
});
