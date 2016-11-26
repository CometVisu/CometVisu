/* Image-spec.js 
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
 * Unit tests for image widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe("testing a image widget", function() {

  it("should test the image creator", function() {

    var res = this.createTestWidgetString("image", {
      src: '',
      flavour: 'potassium'
    }, '<label>Test</label>');

    var widget = qx.bom.Html.clean([res[1]])[0];

    expect(widget).toHaveClass('image');
    expect(widget).toHaveLabel('Test');
    expect(res[0].getPath()).toBe("id_0");
    expect(qx.bom.element.Attribute.get(qx.bom.Selector.query("img", widget)[0], "style")).toBe('');
  });
  it("should test the image creator and refreshing", function() {
    var con = qx.event.Timer;
    var spiedTimer;
    spyOn(qx.event, "Timer").and.callFake(function() {
      spiedTimer = new con();
      spyOn(spiedTimer, "start");
      return spiedTimer;
    });
    var res = this.createTestElement("image", {
      src: '',
      width: '50%',
      height: '51%',
      refresh: 5
    });
    var widget = res.getDomElement();
    cv.MessageBroker.getInstance().publish("setup.dom.finished");

    expect(spiedTimer.start).toHaveBeenCalled();
    expect(qx.bom.element.Attribute.get(qx.bom.Selector.query("img", widget)[0], "style")).toBe('width:50%;height:51%;');
  });

  it("should test the image creator width size", function() {

    var res = this.createTestElement("image", {
      src: '',
      widthfit: 'true'
    });
    var widget = res.getDomElement();
    expect(qx.bom.element.Attribute.get(qx.bom.Selector.query("img", widget)[0], "style")).toBe('max-width:100%;');
  });
});