/* Text-spec.js 
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
 * Unit tests for text widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe("testing a text widget", function() {

  it("should test the text creator", function() {

    var res = this.createTestWidgetString("text", {}, '<label>Test</label>');
    var text = cv.util.String.htmlStringToDomElement(res[1]);
    expect(res[0].getPath()).toBe("id_0");

    expect(text).toHaveClass('text');
    // the text widget does not add the 'label' class to the label-div, so the toHaveLabel
    // helper does not work here and we have to check it manually
    var label = Array.from(text.children).filter(function(m){return m.matches("div");})[0];
    expect(label.innerText).toBe('Test');
  });
});