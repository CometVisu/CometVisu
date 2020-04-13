/* Refresh-spec.js 
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
 * Unit tests for refresh widget
 *
 */
describe("testing a refresh widget", function() {

  it("should test the refresh creator", function() {
    var res = this.createTestWidgetString("refresh", {}, '<label>Test</label>');
    var widget = cv.util.String.htmlStringToDomElement(res[1]);
    expect(res[0].getPath()).toBe("id_0");

    expect(widget).toHaveClass('refresh');
    expect(widget).toHaveLabel('Test');
  });

  it("should test the refresh actor", function() {
    var res = this.createTestElement("refresh");
    cv.TemplateEngine.getInstance().visu = jasmine.createSpyObj('visu', ['restart']);

    spyOn(res, "defaultUpdate");
    this.initWidget(res);
    qx.event.Registration.fireEvent(res.getActor(), "tap");

    expect(cv.TemplateEngine.getInstance().visu.restart).toHaveBeenCalled();
  });

});